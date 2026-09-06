export const firebaseConfig = {
    apiKey: "AIzaSyCwuiBVVNPOjlMdYh4QR5C-cbU4EiD0tw0",
    authDomain: "goc-nhin-thu-n.firebaseapp.com",
    projectId: "goc-nhin-thu-n",
    storageBucket: "goc-nhin-thu-n.firebasestorage.app",
    messagingSenderId: "474916495677",
    appId: "1:474916495677:web:68c425155e5f0823ed2554",
    measurementId: "G-SL1CBREY3F"
};

export const FIREBASE_REST_API = {
    getLoginUrl: (apiKey) => `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    getRegisterUrl: (apiKey) => `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
};