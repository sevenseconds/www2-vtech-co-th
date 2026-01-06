import * as jose from 'jose';

/**
 * Verifies a Firebase ID Token using jose.
 * Following the guide: https://firebase.google.com/docs/auth/admin/verify-id-tokens
 */
export async function verifyFirebaseToken(idToken, projectId) {
    if (!idToken || !projectId) {
        throw new Error('Missing token or projectId');
    }

    // 1. Fetch Google's public keys for Firebase
    const JWKS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
    const response = await fetch(JWKS_URL);
    const publicKeys = await response.json();

    // The keys are in x509 format, which isn't directly usable by jose.jwtVerify without conversion
    // However, jose supports JWKS. Since Firebase doesn't provide a standard JWKS endpoint but this x509 one,
    // we can use a simpler approach if we trust the issuer and audience.

    // A better way for Workers is to use the JWKS endpoint if available, 
    // but Firebase's OIDC discovery provides this:
    // https://securetoken.google.com/<projectId>/.well-known/openid-configuration

    const OIDC_CONFIG_URL = `https://securetoken.google.com/${projectId}/.well-known/openid-configuration`;
    const configResponse = await fetch(OIDC_CONFIG_URL);
    const config = await configResponse.json();
    const jwksUri = config.jwks_uri;

    // 2. Create a RemoteJWKSet from the jwks_uri
    const JWKS = jose.createRemoteJWKSet(new URL(jwksUri));

    // 3. Verify the token
    try {
        const { payload } = await jose.jwtVerify(idToken, JWKS, {
            issuer: `https://securetoken.google.com/${projectId}`,
            audience: projectId,
            algorithms: ['RS256'],
        });

        return payload;
    } catch (err) {
        console.error('Token verification failed:', err.message);
        throw new Error('Invalid authentication token');
    }
}
