import { verifyFirebaseToken } from '../api/_verify.js';

/**
 * Lightweight Git Gateway Proxy for Decap CMS
 * Handles requests from /gateway/* and proxies them to GitHub
 */
export async function onRequest(context) {
    const { request, env, params } = context;
    const path = params.path.join('/');

    // Handle OPTIONS for CORS
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    }

    // 1. Authenticate the request
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Missing or invalid Authorization header');
        return new Response('Unauthorized: Missing Token', { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const projectId = env.FIREBASE_PROJECT_ID;
    const githubToken = env.GITHUB_TOKEN;

    if (!projectId || !githubToken) {
        console.error('Server configuration missing: FIREBASE_PROJECT_ID or GITHUB_TOKEN');
        return new Response('Server configuration missing', { status: 500 });
    }

    try {
        // Verify user identity
        const user = await verifyFirebaseToken(token, projectId);

        // Handle Decap CMS Git Gateway specific endpoints
        if (path === 'settings') {
            return new Response(JSON.stringify({
                roles: [],
                external: { github: true },
                external_labels: { github: 'GitHub' }
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        if (path === 'user') {
            return new Response(JSON.stringify(user), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        // 2. Proxy to GitHub
        // Strip 'github/' prefix if present (Decap CMS often adds it for git-gateway)
        let githubPath = path;
        if (githubPath.startsWith('github/')) {
            githubPath = githubPath.substring(7);
        }

        const githubUrl = `https://api.github.com/${githubPath}`;
        console.log(`Proxying ${request.method} request to GitHub: ${githubUrl}`);

        const githubResponse = await fetch(githubUrl, {
            method: request.method,
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Cloudflare-Git-Gateway',
                'Content-Type': request.headers.get('Content-Type') || 'application/json',
            },
            body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.arrayBuffer() : null,
        });

        const body = await githubResponse.arrayBuffer();

        return new Response(body, {
            status: githubResponse.status,
            headers: {
                'Content-Type': githubResponse.headers.get('Content-Type'),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });

    } catch (error) {
        console.error('Gateway error:', error.message);
        return new Response(`Forbidden: ${error.message}`, { status: 403 });
    }
}
