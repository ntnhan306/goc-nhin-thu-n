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

export async function handleRename(request, env) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response(JSON.stringify({ message: 'Unauthorized: Thiếu token xác thực.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const idToken = authHeader.split(' ')[1];
        const { email, oldName, newName } = await request.json();

        if (!email || !oldName || !newName) {
            return new Response(JSON.stringify({ message: 'Vui lòng cung cấp đầy đủ email, tên cũ và tên mới.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const apiKey = env.FIREBASE_API_KEY || firebaseConfig.apiKey;

        const lookupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;
        const lookupRes = await fetch(lookupUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: idToken })
        });
        const lookupData = await lookupRes.json();

        if (!lookupRes.ok || !lookupData.users || lookupData.users.length === 0) {
            return new Response(JSON.stringify({ message: 'Không tìm thấy thông tin tài khoản hợp lệ.' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const userRecord = lookupData.users[0];

        if (userRecord.email !== email) {
            return new Response(JSON.stringify({ message: 'Email không khớp với tài khoản hiện tại.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const currentDisplayName = userRecord.displayName || email.split('@')[0];
        if (currentDisplayName !== oldName) {
            return new Response(JSON.stringify({ message: 'Tên cũ không chính xác so với hệ thống.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const updateUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`;
        const fbResponse = await fetch(updateUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idToken: idToken,
                displayName: newName,
                returnSecureToken: true
            })
        });

        const fbData = await fbResponse.json();

        if (!fbResponse.ok) {
            return new Response(JSON.stringify({ message: fbData.error?.message || 'Đổi tên thất bại.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({
            message: 'Đổi tên thành công',
            newName: fbData.displayName || newName
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