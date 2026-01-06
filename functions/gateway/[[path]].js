import { verifyFirebaseToken } from '../api/_verify.js';

/**
 * Lightweight Git Gateway Proxy for Decap CMS
 * Handles requests from /gateway/* and proxies them to GitHub
 */
export async function onRequest(context) {
    const { request, env, params } = context;
    const path = params.path.join('/');

    // 1. Authenticate the request
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response('Unauthorized: Missing Token', { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const projectId = env.FIREBASE_PROJECT_ID;
    const githubToken = env.GITHUB_TOKEN;

    if (!projectId || !githubToken) {
        return new Response('Server configuration missing', { status: 500 });
    }

    try {
        // Verify user identity
        const user = await verifyFirebaseToken(token, projectId);

        // 2. Proxy to GitHub
        // Map Decap CMS requests to GitHub API
        // CMS usually calls GITHUB_API/repos/OWNER/REPO/...
        // But here it might be sending paths directly.

        const githubUrl = `https://api.github.com/${path}`;

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
        return new Response(`Forbidden: ${error.message}`, { status: 403 });
    }
}
