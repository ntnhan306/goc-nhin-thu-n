import { firebaseConfig, FIREBASE_REST_API } from '../config/firebase.js';

export async function handleLogin(request, env) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ message: 'Vui lòng cung cấp đầy đủ email và mật khẩu.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const apiKey = env.FIREBASE_API_KEY || firebaseConfig.apiKey;
        const url = FIREBASE_REST_API.getLoginUrl(apiKey);

        const fbResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, returnSecureToken: true })
        });

        const fbData = await fbResponse.json();

        if (!fbResponse.ok) {
            return new Response(JSON.stringify({ message: fbData.error?.message || 'Đăng nhập thất bại.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Lấy tên đã lưu trên Firebase, nếu chưa có sẽ fallback về phần trước của email
        const userName = fbData.displayName || email.split('@')[0];

        return new Response(JSON.stringify({
            token: fbData.idToken,
            user: {
                email: fbData.email,
                localId: fbData.localId,
                name: userName
            }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        return new Response(JSON.stringify({ message: 'Lỗi hệ thống server: ' + err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function handleRegister(request, env) {
    try {
        const { name, email, password } = await request.json();

        if (!email || !password || !name) {
            return new Response(JSON.stringify({ message: 'Vui lòng điền đầy đủ thông tin đăng ký (bao gồm cả tên).' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const apiKey = env.FIREBASE_API_KEY || firebaseConfig.apiKey;
        
        // Bước 1: Tạo tài khoản với email và password trên Firebase Auth
        const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
        const fbResponse = await fetch(signUpUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, returnSecureToken: true })
        });

        const fbData = await fbResponse.json();

        if (!fbResponse.ok) {
            return new Response(JSON.stringify({ message: fbData.error?.message || 'Đăng ký thất bại.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const idToken = fbData.idToken;

        // Bước 2: Cập nhật displayName (tên người dùng) ngay sau khi tạo tài khoản thành công
        const updateUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`;
        await fetch(updateUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idToken: idToken,
                displayName: name,
                returnSecureToken: true
            })
        });

        return new Response(JSON.stringify({
            message: 'Đăng ký thành công',
            user: { 
                email: fbData.email, 
                localId: fbData.localId, 
                name: name 
            }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        return new Response(JSON.stringify({ message: 'Lỗi hệ thống server: ' + err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}