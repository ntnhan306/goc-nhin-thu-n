import { handleLogin, handleRegister } from './api/auth.js';
function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
}
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders() });
        }
        let response;
        if (url.pathname === '/api/auth/login' && request.method === 'POST') {
            response = await handleLogin(request, env);
        } else if (url.pathname === '/api/auth/register' && request.method === 'POST') {
            response = await handleRegister(request, env);
        } else {
            response = new Response(JSON.stringify({ message: 'API Endpoint not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const newHeaders = new Headers(response.headers);
        for (const [key, value] of Object.entries(corsHeaders())) {
            newHeaders.set(key, value);
        }
        return new Response(response.body, {
            status: response.status,
            headers: newHeaders
        });
    }
};