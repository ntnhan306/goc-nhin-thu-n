export function initAuthUI() {
    const OLD_ID='auth-ui-container';
    const OLD_STYLE_ID='auth-ui-style';
    const OLD_MODAL_ID='auth-modal-overlay';
    const API_BASE='https://goc-nhin-thu-n.ntnhan3062.workers.dev';
    const STORAGE_TOKEN='auth_token';
    const STORAGE_USER='auth_user';
    const STORAGE_NAME='auth_username';
    const STORAGE_EMAIL='auth_email';
    document.getElementById(OLD_ID)?.remove();
    document.getElementById(OLD_STYLE_ID)?.remove();
    document.getElementById(OLD_MODAL_ID)?.remove();
    const container=document.createElement('div');
    container.id=OLD_ID;
    Object.assign(container.style,{position:'fixed',top:'40px',right:'clamp(8px,2vw,30px)',zIndex:'1000',display:'flex',alignItems:'center',justifyContent:'flex-end',gap:'10px',padding:'12px',overflow:'visible',maxWidth:'calc(100vw - 16px)',boxSizing:'border-box',fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Segoe UI',Roboto,sans-serif"});
    const style=document.createElement('style');
    style.id=OLD_STYLE_ID;
    style.textContent=`
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
#auth-ui-container,#auth-ui-container *,#auth-ui-container *::before,#auth-ui-container *::after,#auth-modal-overlay,#auth-modal-overlay *,#auth-modal-overlay *::before,#auth-modal-overlay *::after{box-sizing:border-box}
#auth-ui-container{overflow:visible!important}
#auth-ui-container .soap-liquid-btn,#auth-ui-container .soap-liquid-circle{position:relative;isolation:isolate;overflow:visible;border:none!important;outline:none!important;color:#fff;cursor:pointer;background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:inset 2px 2px 12px rgba(0,105,255,.30),inset -3px -3px 14px rgba(0,75,210,.18),inset 0 0 26px rgba(0,105,255,.10)!important;-webkit-tap-highlight-color:transparent;flex-shrink:0;transform-origin:center;transition:transform .32s cubic-bezier(.16,1,.3,1),box-shadow .45s cubic-bezier(.16,1,.3,1),background .3s ease}
#auth-ui-container .soap-liquid-btn{min-height:52px;width:auto;padding:14px 28px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:inherit;font-size:14.5px;font-weight:600;letter-spacing:-.2px;line-height:1.3;text-align:center;white-space:nowrap;text-shadow:0 1px 4px rgba(0,40,120,.22)}
#auth-ui-container .soap-liquid-btn>span{display:inline-flex;align-items:center;width:max-content;min-width:0;white-space:nowrap;overflow:visible;text-overflow:clip;line-height:1.3;flex:0 0 auto}
#auth-ui-container .soap-liquid-btn>span svg{width:16px;height:16px;flex:0 0 16px;display:block}
#auth-ui-container .soap-liquid-circle{width:52px;height:52px;min-width:52px;min-height:52px;padding:0;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:0 0 52px}
#auth-ui-container .soap-liquid-btn::before,#auth-ui-container .soap-liquid-circle::before{content:'';position:absolute;inset:1px;border-radius:inherit;pointer-events:none;box-shadow:inset 2px 2px 8px rgba(255,255,255,.24),inset -3px -3px 11px rgba(0,70,210,.20),inset 0 0 22px rgba(0,105,255,.12)}
#auth-ui-container .soap-liquid-btn::after,#auth-ui-container .soap-liquid-circle::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:inset 0 0 3px rgba(60,145,255,.20)}
#auth-ui-container .soap-liquid-btn:hover,#auth-ui-container .soap-liquid-circle:hover{transform:scale(1.075);background:rgba(0,105,255,.018)!important;box-shadow:inset 2px 2px 15px rgba(0,105,255,.40),inset -3px -3px 17px rgba(0,75,210,.22),inset 0 0 32px rgba(0,105,255,.14)!important}
#auth-ui-container .soap-liquid-btn:hover::before,#auth-ui-container .soap-liquid-circle:hover::before{box-shadow:inset 2px 2px 9px rgba(255,255,255,.30),inset -3px -3px 13px rgba(0,70,210,.23),inset 0 0 25px rgba(0,105,255,.15)}
#auth-ui-container .soap-liquid-btn:focus,#auth-ui-container .soap-liquid-btn:focus-visible,#auth-ui-container .soap-liquid-circle:focus,#auth-ui-container .soap-liquid-circle:focus-visible{border:none!important;outline:none!important}
#auth-ui-container .soap-liquid-btn:active,#auth-ui-container .soap-liquid-circle:active{transform:scale(.95);transition-duration:.12s}
#auth-ui-container .auth-user-wrapper{position:relative;display:flex;align-items:center;justify-content:flex-end;gap:8px;overflow:visible;min-width:0;max-width:calc(100vw - 16px)}
#auth-ui-container .auth-user-name{cursor:pointer!important}
#auth-ui-container .auth-user-name>span{pointer-events:none}
#auth-ui-container #svg-arrow{display:block;width:15px;height:15px;flex:0 0 auto;overflow:visible;pointer-events:none;transition:transform .4s cubic-bezier(.16,1,.3,1)}
#auth-ui-container .liquid-dropdown-menu{position:absolute;top:calc(100% + 10px);right:0;z-index:1001;min-width:175px;max-width:min(320px,calc(100vw - 16px));padding:6px;display:none;flex-direction:column;gap:2px;overflow:visible;border:none!important;outline:none!important;border-radius:18px;background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:inset 2px 2px 11px rgba(0,105,255,.30),inset -3px -3px 13px rgba(0,75,210,.18),inset 0 0 24px rgba(0,105,255,.10)!important;transform-origin:top right}
#auth-ui-container .liquid-dropdown-menu.show{display:flex;animation:liquidRubberOpen .68s cubic-bezier(.16,1.35,.3,1)}
#auth-ui-container .liquid-dropdown-item{width:100%;min-height:42px;padding:10px 14px;border:none!important;outline:none!important;border-radius:12px;background:transparent;color:#fff;font-family:inherit;font-size:14px;font-weight:500;line-height:1.3;text-align:left;white-space:nowrap;overflow:visible;cursor:pointer;display:flex;align-items:center;gap:9px;transition:transform .3s cubic-bezier(.16,1,.3,1),background .2s ease,box-shadow .3s ease}
#auth-ui-container .liquid-dropdown-item svg{width:16px;height:16px;min-width:16px;display:block;pointer-events:none}
#auth-ui-container .liquid-dropdown-item:hover{background:rgba(0,105,255,.025);box-shadow:inset 1px 1px 7px rgba(0,105,255,.24),inset -2px -2px 7px rgba(0,75,210,.13);transform:translateX(3px) scale(1.015)}
#auth-ui-container .liquid-dropdown-item:focus,#auth-ui-container .liquid-dropdown-item:focus-visible{border:none!important;outline:none!important}
#auth-modal-overlay{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;width:100vw;height:100dvh;min-height:100vh;padding:max(20px,env(safe-area-inset-top)) max(20px,env(safe-area-inset-right)) max(20px,env(safe-area-inset-bottom)) max(20px,env(safe-area-inset-left));overflow:hidden;overscroll-behavior:contain;background:rgba(8,20,40,.30);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);opacity:0;visibility:hidden;transition:opacity .32s ease,visibility .32s ease}
#auth-modal-overlay.show{opacity:1;visibility:visible}
.auth-modal-content{position:relative;width:min(100%,440px);max-width:440px;min-height:0;max-height:calc(100dvh - 40px);margin:auto;padding:25px 28px;border-radius:28px;background:rgba(235,242,252,.30);border:none!important;outline:none!important;display:flex;flex-direction:column;gap:0;overflow:hidden!important;overscroll-behavior:contain;font-family:'Manrope',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;box-shadow:inset 2px 2px 18px rgba(255,255,255,.42),inset -4px -4px 22px rgba(0,80,220,.16),inset 0 0 35px rgba(0,105,255,.10),0 20px 70px rgba(0,35,100,.12);transform:translateY(22px) scale(.94);opacity:0;transition:transform .48s cubic-bezier(.16,1.2,.3,1),opacity .30s ease}
#auth-modal-overlay.show .auth-modal-content{transform:translateY(0) scale(1);opacity:1}
.auth-modal-content::before{content:'';position:absolute;inset:1px;z-index:10;border-radius:inherit;pointer-events:none;box-shadow:inset 2px 2px 12px rgba(255,255,255,.42),inset -2px -2px 15px rgba(0,90,230,.10),inset 0 0 30px rgba(255,255,255,.12)}
.auth-modal-header{position:relative;z-index:20;flex:0 0 auto;width:100%;padding:1px 34px 13px;text-align:center;overflow:visible}
.auth-modal-title{display:block;width:100%;margin:0;padding:2px 0 1px;color:#fff;text-shadow:0 1px 5px rgba(0,60,160,.28);font-family:inherit;font-size:25px;font-weight:800;line-height:1.35;letter-spacing:-.7px;overflow:visible;overflow-wrap:anywhere}
.auth-modal-subtitle{display:block;width:100%;margin:2px 0 0;padding:1px 0;color:rgba(255,255,255,.82);text-shadow:0 1px 4px rgba(0,60,160,.18);font-family:inherit;font-size:13.5px;font-weight:500;line-height:1.6;overflow:visible;overflow-wrap:anywhere}
.auth-scroll-area{position:relative;z-index:1;display:flex;flex:1 1 auto;min-height:0;width:100%;overflow:hidden}
.auth-modal-scroll{position:relative;width:100%;min-width:0;min-height:0;flex:1 1 auto;display:flex;flex-direction:column;gap:15px;padding:3px 8px 5px 5px;margin:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none;-ms-overflow-style:none}
.auth-modal-scroll::-webkit-scrollbar{display:none;width:0;height:0}
.auth-custom-scrollbar{position:absolute;top:4px;right:1px;bottom:5px;width:4px;display:none;z-index:30;pointer-events:none}
.auth-custom-scrollbar.visible{display:block}
.auth-custom-scrollbar-track{position:absolute;inset:0;width:4px;border-radius:999px;background:rgba(255,255,255,.10);box-shadow:inset 2px 2px 6px rgba(255,255,255,.20),inset -2px -2px 7px rgba(0,75,210,.08);pointer-events:auto}
.auth-custom-scrollbar-thumb{position:absolute;top:0;left:0;width:4px;min-height:24px;border-radius:999px;background:rgba(235,242,252,.22);box-shadow:inset 2px 2px 6px rgba(255,255,255,.30),inset -2px -2px 7px rgba(0,75,210,.12),0 1px 4px rgba(0,70,180,.08);pointer-events:auto;cursor:pointer;transition:background .2s ease,box-shadow .2s ease}
.auth-custom-scrollbar-thumb:hover,.auth-custom-scrollbar-thumb.dragging{background:rgba(235,242,252,.34);box-shadow:inset 2px 2px 6px rgba(255,255,255,.38),inset -2px -2px 7px rgba(0,75,210,.14),0 1px 5px rgba(0,70,180,.10)}
.auth-form{position:relative;flex:0 0 auto;width:100%;min-width:0;display:flex;flex-direction:column;gap:12px;padding:2px 1px 3px;overflow:visible!important}
.auth-field-group{position:relative;flex:0 0 auto;width:100%;min-width:0;display:flex;flex-direction:column;gap:5px;overflow:visible!important}
.auth-label{display:block;flex:0 0 auto;padding-left:2px;color:rgba(255,255,255,.92);text-shadow:0 1px 4px rgba(0,60,160,.22);font-family:inherit;font-size:12.5px;font-weight:700;line-height:1.35;white-space:nowrap}
.auth-input-wrapper{position:relative;width:100%;min-width:0;display:flex;align-items:center;overflow:visible!important}
.auth-input{display:block;width:100%;min-width:0;height:48px;padding:0 15px;border:none!important;outline:none!important;border-radius:14px;color:#fff;text-shadow:0 1px 4px rgba(0,60,160,.22);background:rgba(255,255,255,.16)!important;font-family:inherit;font-size:14px;font-weight:600;line-height:normal;box-shadow:inset 2px 2px 10px rgba(255,255,255,.38),inset -3px -3px 12px rgba(0,80,220,.12),inset 0 0 20px rgba(0,105,255,.07);-webkit-appearance:none;transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .3s ease,background .3s ease;transform-origin:center}
.auth-input::placeholder{color:rgba(255,255,255,.58);opacity:1}
.auth-input:hover{background:rgba(255,255,255,.20)!important;box-shadow:inset 2px 2px 11px rgba(255,255,255,.44),inset -3px -3px 13px rgba(0,80,220,.14),inset 0 0 23px rgba(0,105,255,.09)}
.auth-input:focus{background:rgba(255,255,255,.24)!important;box-shadow:inset 2px 2px 12px rgba(255,255,255,.50),inset -3px -3px 14px rgba(0,75,210,.16),inset 0 0 25px rgba(0,105,255,.12);transform:scale(1.012)}
.auth-input:disabled{cursor:not-allowed;opacity:.76}
.auth-input.auth-confirm-mismatch{box-shadow:inset 2px 2px 10px rgba(255,255,255,.38),inset -3px -3px 12px rgba(0,80,220,.12),inset 0 0 20px rgba(0,105,255,.07),0 0 0 2px rgba(239,68,68,.82)!important}
.auth-input.auth-confirm-mismatch:focus{background:rgba(255,255,255,.24)!important;box-shadow:inset 2px 2px 12px rgba(255,255,255,.50),inset -3px -3px 14px rgba(0,75,210,.16),inset 0 0 25px rgba(0,105,255,.12),0 0 0 2px rgba(239,68,68,.92)!important;transform:scale(1.012)}
.auth-password-input{padding-right:48px}
.auth-eye{position:absolute;top:50%;right:6px;width:34px;height:34px;min-width:34px;min-height:34px;padding:0;display:flex;align-items:center;justify-content:center;transform:translateY(-50%);border:none!important;outline:none!important;border-radius:50%;color:rgba(255,255,255,.76);background:transparent!important;cursor:pointer;overflow:visible!important;z-index:3;transition:transform .22s cubic-bezier(.16,1,.3,1),color .2s ease,box-shadow .25s ease}
.auth-eye:hover{color:#fff;transform:translateY(-50%) scale(1.08);box-shadow:inset 1px 1px 7px rgba(0,105,255,.16),inset -2px -2px 7px rgba(0,75,210,.08)}
.auth-eye:active{transform:translateY(-50%) scale(.92)}
.auth-eye:disabled{cursor:not-allowed;opacity:.55}
.auth-eye svg{width:17px;height:17px;display:block;pointer-events:none}
.auth-password-rules{position:relative;flex:0 0 auto;width:100%;display:flex;flex-direction:column;gap:3px;margin-top:1px;padding:8px 10px;border:1px solid rgba(255,255,255,.18);border-radius:12px;background:rgba(255,255,255,.05);box-shadow:inset 1px 1px 7px rgba(255,255,255,.10),inset -2px -2px 8px rgba(0,75,210,.05);overflow:visible}
.auth-password-rule{display:flex;align-items:center;gap:7px;min-height:18px;color:rgba(255,255,255,.76);font-family:inherit;font-size:11.5px;font-weight:600;line-height:1.3;transition:color .2s ease}
.auth-password-rule-icon{width:16px;height:16px;min-width:16px;min-height:16px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.68);transition:color .2s ease}
.auth-password-rule-icon svg{width:14px;height:14px;display:block;overflow:visible}
.auth-password-rule.valid{color:#22c55e}
.auth-password-rule.valid .auth-password-rule-icon{color:#22c55e;text-shadow:0 0 8px rgba(34,197,94,.28)}
.auth-password-rule.invalid{color:#ef4444}
.auth-password-rule.invalid .auth-password-rule-icon{color:#ef4444;text-shadow:0 0 8px rgba(239,68,68,.25)}
.auth-password-rule.checking{color:rgba(255,255,255,.76)}
.auth-password-rule.checking .auth-password-rule-icon{color:#fff}
.auth-password-rule.checking svg{animation:authRuleSpin .72s linear infinite}
.auth-actions{position:relative;flex:0 0 auto;width:100%;min-width:0;display:flex;gap:9px;margin-top:2px;padding:2px 1px 3px;overflow:visible!important}
.auth-btn{position:relative;isolation:isolate;flex:1 1 0;width:100%;min-width:0;min-height:48px;padding:11px 17px;border:none!important;outline:none!important;border-radius:14px;font-family:inherit;font-size:13.5px;font-weight:700;line-height:1.3;white-space:nowrap;cursor:pointer;overflow:visible!important;background:transparent!important;color:#fff;text-shadow:0 1px 4px rgba(0,60,160,.22);box-shadow:inset 2px 2px 10px rgba(255,255,255,.34),inset -3px -3px 12px rgba(0,75,210,.13),inset 0 0 21px rgba(0,105,255,.08);-webkit-tap-highlight-color:transparent;transition:transform .28s cubic-bezier(.16,1,.3,1),box-shadow .3s ease,color .2s ease,background .25s ease;transform-origin:center}
.auth-btn::before{content:'';position:absolute;inset:1px;z-index:-1;border-radius:inherit;pointer-events:none;box-shadow:inset 2px 2px 7px rgba(255,255,255,.30),inset -2px -2px 9px rgba(0,70,210,.12),inset 0 0 18px rgba(0,105,255,.07)}
.auth-btn:hover{transform:scale(1.025);color:#fff;box-shadow:inset 2px 2px 13px rgba(255,255,255,.40),inset -3px -3px 14px rgba(0,75,210,.16),inset 0 0 26px rgba(0,105,255,.11)}
.auth-btn:active{transform:scale(.96);transition-duration:.12s}
.auth-btn.submit{color:#fff;box-shadow:inset 2px 2px 11px rgba(255,255,255,.28),inset -3px -3px 14px rgba(0,45,180,.23),inset 0 0 25px rgba(0,105,255,.18)}
.auth-btn.submit:hover{color:#fff;background:rgba(0,105,255,.025)!important;box-shadow:inset 2px 2px 14px rgba(255,255,255,.34),inset -3px -3px 17px rgba(0,45,180,.26),inset 0 0 30px rgba(0,105,255,.22)}
.auth-btn.cancel{color:rgba(255,255,255,.90)}
.auth-loading{position:relative;flex:1 1 0;width:100%;height:48px;min-height:48px;display:flex;align-items:center;justify-content:center;border-radius:14px;background:rgba(255,255,255,.13);box-shadow:inset 2px 2px 10px rgba(255,255,255,.34),inset -3px -3px 12px rgba(0,75,210,.13),inset 0 0 21px rgba(0,105,255,.08);overflow:hidden}
.auth-loading::before{content:'';position:absolute;inset:1px;border-radius:inherit;pointer-events:none;box-shadow:inset 2px 2px 7px rgba(255,255,255,.26),inset -2px -2px 9px rgba(0,70,210,.10)}
.auth-spinner{position:relative;width:20px;height:20px;border:2px solid rgba(255,255,255,.25);border-top-color:#fff;border-right-color:rgba(255,255,255,.78);border-radius:50%;animation:authSpinner .72s linear infinite}
.auth-error{position:relative;flex:0 0 auto;margin-top:-2px;color:#dc2626;font-family:inherit;font-size:12px;font-weight:600;line-height:1.4;overflow-wrap:anywhere}
@keyframes authRuleSpin{to{transform:rotate(360deg)}}
@keyframes authSpinner{to{transform:rotate(360deg)}}
@keyframes liquidRubberOpen{
0%{opacity:0;transform:translateY(-10px) scale(.86,.68)}
30%{opacity:1;transform:translateY(4px) scale(1.06,1.11)}
50%{transform:translateY(-3px) scale(.965,.94)}
68%{transform:translateY(2px) scale(1.025,1.04)}
84%{transform:translateY(-.5px) scale(.992,.985)}
100%{opacity:1;transform:translateY(0) scale(1)}
}
@media(max-width:600px){
#auth-ui-container{top:16px!important;right:8px!important;left:8px!important;max-width:none;padding:8px;gap:7px}
#auth-ui-container .soap-liquid-btn{min-height:48px;padding:12px 20px;font-size:14px}
#auth-ui-container .soap-liquid-circle{width:48px;height:48px;min-width:48px;min-height:48px;flex-basis:48px}
#auth-ui-container .auth-user-wrapper{gap:6px;max-width:100%}
#auth-ui-container .liquid-dropdown-menu{max-width:calc(100vw - 16px)}
#auth-modal-overlay{align-items:flex-start;padding:max(16px,env(safe-area-inset-top)) max(14px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(14px,env(safe-area-inset-left))}
.auth-modal-content{width:100%;max-width:100%;max-height:calc(100dvh - 32px);margin:auto 0;padding:22px 20px;border-radius:23px}
.auth-modal-header{padding-left:26px;padding-right:26px;padding-bottom:11px}
.auth-modal-title{font-size:24px}
.auth-modal-subtitle{font-size:13px}
.auth-modal-scroll{padding-left:4px;padding-right:8px;gap:14px}
}
@media(max-width:380px){
#auth-ui-container .soap-liquid-btn{padding:11px 16px;font-size:13px}
#auth-ui-container .soap-liquid-circle{width:46px;height:46px;min-width:46px;min-height:46px;flex-basis:46px}
#auth-ui-container .auth-user-wrapper{gap:4px}
#auth-ui-container .auth-user-name{padding-left:15px;padding-right:15px}
.auth-modal-content{padding:21px 17px}
.auth-modal-header{padding-left:20px;padding-right:20px}
.auth-modal-scroll{padding-left:3px;padding-right:7px}
.auth-actions{flex-direction:column}
.auth-btn{flex:0 0 auto}
.auth-loading{flex:0 0 auto}
}
@media(max-height:600px){
#auth-modal-overlay{align-items:flex-start;padding-top:10px;padding-bottom:10px}
.auth-modal-content{max-height:calc(100dvh - 20px);padding-top:18px;padding-bottom:18px}
.auth-modal-header{padding-bottom:9px}
.auth-modal-title{font-size:23px;line-height:1.35}
.auth-modal-subtitle{font-size:12.5px;line-height:1.55}
.auth-modal-scroll{gap:12px}
.auth-form{gap:10px}
}
@media(prefers-reduced-motion:reduce){
#auth-ui-container *,#auth-ui-container *::before,#auth-ui-container *::after,#auth-modal-overlay *,#auth-modal-overlay *::before,#auth-modal-overlay *::after{animation:none!important;transition:none!important}
}`;
    document.head.appendChild(style);
    document.body.appendChild(container);
    let isLoggedin=false;
    let username='Không tên';
    let userData=null;
    let activeDropdown=null;
    let activeArrow=null;
    let activeModal=null;
    let activeScrollbarDestroy=null;
    try{
        const savedToken=localStorage.getItem(STORAGE_TOKEN);
        const savedUser=JSON.parse(localStorage.getItem(STORAGE_USER)||'null');
        const savedName=localStorage.getItem(STORAGE_NAME);
        const savedEmail=localStorage.getItem(STORAGE_EMAIL);
        if(savedToken&&savedUser){
            isLoggedin=true;
            userData=savedUser;
            username=savedUser.name||savedName||'Không tên';
            if(!userData.email&&savedEmail)userData.email=savedEmail;
        }else if(savedName){
            username=savedName;
        }
    }catch{}
    function saveSession(token,user){
        try{
            if(token)localStorage.setItem(STORAGE_TOKEN,token);
            if(user)localStorage.setItem(STORAGE_USER,JSON.stringify(user));
            if(user?.name)localStorage.setItem(STORAGE_NAME,user.name);
            if(user?.email)localStorage.setItem(STORAGE_EMAIL,user.email);
        }catch{}
    }
    function clearSession(){
        try{
            localStorage.removeItem(STORAGE_TOKEN);
            localStorage.removeItem(STORAGE_USER);
            localStorage.removeItem(STORAGE_NAME);
            localStorage.removeItem(STORAGE_EMAIL);
        }catch{}
        userData=null;
    }
    function closeDropdown(){
        if(activeDropdown)activeDropdown.classList.remove('show');
        if(activeArrow)activeArrow.style.transform='rotate(0deg)';
        activeDropdown=null;
        activeArrow=null;
    }
    const outsideClickHandler=e=>{
        if(!container.contains(e.target))closeDropdown();
    };
    window.addEventListener('click',outsideClickHandler);
    function createBubble(text,primary=false){
        const button=document.createElement('button');
        button.type='button';
        button.className=`soap-liquid-btn${primary?' primary':''}`;
        const span=document.createElement('span');
        span.textContent=text;
        button.appendChild(span);
        return button;
    }
    function createCircle(primary=false){
        const button=document.createElement('button');
        button.type='button';
        button.className=`soap-liquid-circle${primary?' primary':''}`;
        button.innerHTML=`<svg id="svg-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        return button;
    }
    function getEyeIcon(open=false){
        return open?`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"></path><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"></path><path d="M9.9 4.3A10.7 10.7 0 0 1 12 4c5 0 8.8 4 10 8-0.4 1.3-1.2 2.7-2.3 3.8"></path><path d="M6.2 6.2C4.5 7.5 3.3 9.4 2 12c1.2 4 5 8 10 8 1.3 0 2.5-.3 3.6-.8"></path></svg>`:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="2.7"></circle></svg>`;
    }
    function getRuleIcon(type){
        if(type==='checking')return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 3a9 9 0 1 1-6.36 2.64"></path><path d="M12 3v4"></path></svg>`;
        if(type==='valid')return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.2 4.2L19 7"></path></svg>`;
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12"></path><path d="M18 6L6 18"></path></svg>`;
    }
    function createPasswordRules(input){
        const rules=[
            {text:'Độ dài từ 6 - 20 kí tự',test:p=>p.length>=6&&p.length<=20},
            {text:'Ký tự viết hoa',test:p=>/[A-ZÀ-Ỹ]/.test(p)},
            {text:'Ký tự viết thường',test:p=>/[a-zà-ỹ]/.test(p)},
            {text:'Ký tự đặc biệt',test:p=>/[^A-Za-zÀ-ỹ0-9]/.test(p)},
            {text:'Ký tự số',test:p=>/[0-9]/.test(p)}
        ];
        const box=document.createElement('div');
        box.className='auth-password-rules';
        const items=rules.map(rule=>{
            const item=document.createElement('div');
            item.className='auth-password-rule';
            const icon=document.createElement('span');
            icon.className='auth-password-rule-icon';
            icon.innerHTML=getRuleIcon('invalid');
            const text=document.createElement('span');
            text.textContent=rule.text;
            item.append(icon,text);
            box.appendChild(item);
            return{item,icon,rule};
        });
        let timer=null;
        const update=checking=>{
            clearTimeout(timer);
            items.forEach(({item,icon})=>{
                item.classList.remove('valid','invalid','checking');
                item.classList.add(checking?'checking':'invalid');
                icon.innerHTML=getRuleIcon(checking?'checking':'invalid');
            });
            if(checking){
                timer=setTimeout(()=>{
                    const current=input.value;
                    items.forEach(({item,icon,rule})=>{
                        const valid=rule.test(current);
                        item.classList.remove('checking','valid','invalid');
                        item.classList.add(valid?'valid':'invalid');
                        icon.innerHTML=getRuleIcon(valid?'valid':'invalid');
                    });
                },250);
            }
        };
        input.addEventListener('input',()=>update(true));
        return{box,getValid:()=>rules.every(rule=>rule.test(input.value))};
    }
    function setupConfirmValidation(passwordInput,confirmInput){
        let timer=null;
        const check=()=>{
            clearTimeout(timer);
            confirmInput.classList.remove('auth-confirm-mismatch');
            if(!confirmInput.value)return;
            timer=setTimeout(()=>{
                if(confirmInput.value&&confirmInput.value!==passwordInput.value)confirmInput.classList.add('auth-confirm-mismatch');
            },250);
        };
        confirmInput.addEventListener('input',check);
        passwordInput.addEventListener('input',check);
    }
    function createField({label,type='text',name,placeholder,password=false,autocomplete='',value='',disabled=false}){
        const group=document.createElement('div');
        group.className='auth-field-group';
        const labelEl=document.createElement('label');
        labelEl.className='auth-label';
        labelEl.textContent=label;
        const wrapper=document.createElement('div');
        wrapper.className='auth-input-wrapper';
        const input=document.createElement('input');
        input.className=`auth-input${password?' auth-password-input':''}`;
        input.type=type;
        input.name=name;
        input.placeholder=placeholder;
        input.value=value;
        input.disabled=disabled;
        if(autocomplete)input.autocomplete=autocomplete;
        wrapper.appendChild(input);
        if(password){
            const eye=document.createElement('button');
            eye.type='button';
            eye.className='auth-eye';
            eye.setAttribute('aria-label','Hiện mật khẩu');
            eye.innerHTML=getEyeIcon(false);
            let open=false;
            eye.addEventListener('click',e=>{
                e.preventDefault();
                e.stopPropagation();
                if(input.disabled)return;
                open=!open;
                input.type=open?'text':'password';
                eye.innerHTML=getEyeIcon(open);
                eye.setAttribute('aria-label',open?'Ẩn mật khẩu':'Hiện mật khẩu');
            });
            wrapper.appendChild(eye);
        }
        group.append(labelEl,wrapper);
        return{group,input};
    }
    function setupCustomScrollbar(scroll,area){
        const bar=document.createElement('div');
        bar.className='auth-custom-scrollbar';
        const track=document.createElement('div');
        track.className='auth-custom-scrollbar-track';
        const thumb=document.createElement('div');
        thumb.className='auth-custom-scrollbar-thumb';
        track.appendChild(thumb);
        bar.appendChild(track);
        area.appendChild(bar);
        let dragging=false;
        let startY=0;
        let startScroll=0;
        const update=()=>{
            const viewport=scroll.clientHeight;
            const content=scroll.scrollHeight;
            const maxScroll=content-viewport;
            if(maxScroll<=1){
                bar.classList.remove('visible');
                return;
            }
            bar.classList.add('visible');
            const trackHeight=track.clientHeight;
            const thumbHeight=Math.max(24,trackHeight*(viewport/content));
            const maxThumb=Math.max(1,trackHeight-thumbHeight);
            const ratio=maxScroll>0?scroll.scrollTop/maxScroll:0;
            thumb.style.height=`${thumbHeight}px`;
            thumb.style.transform=`translateY(${maxThumb*ratio}px)`;
        };
        const move=e=>{
            if(!dragging)return;
            const trackHeight=track.clientHeight;
            const thumbHeight=thumb.offsetHeight;
            const maxThumb=Math.max(1,trackHeight-thumbHeight);
            const maxScroll=Math.max(0,scroll.scrollHeight-scroll.clientHeight);
            const delta=e.clientY-startY;
            scroll.scrollTop=startScroll+(delta/maxThumb)*maxScroll;
            update();
        };
        const stop=()=>{
            if(!dragging)return;
            dragging=false;
            thumb.classList.remove('dragging');
            document.removeEventListener('pointermove',move);
            document.removeEventListener('pointerup',stop);
        };
        thumb.addEventListener('pointerdown',e=>{
            e.preventDefault();
            e.stopPropagation();
            dragging=true;
            startY=e.clientY;
            startScroll=scroll.scrollTop;
            thumb.classList.add('dragging');
            document.addEventListener('pointermove',move);
            document.addEventListener('pointerup',stop);
        });
        track.addEventListener('pointerdown',e=>{
            if(e.target===thumb)return;
            const rect=track.getBoundingClientRect();
            const thumbHeight=thumb.offsetHeight;
            const maxThumb=Math.max(1,track.clientHeight-thumbHeight);
            const maxScroll=Math.max(0,scroll.scrollHeight-scroll.clientHeight);
            const target=Math.max(0,Math.min(maxThumb,e.clientY-rect.top-thumbHeight/2));
            scroll.scrollTop=(target/maxThumb)*maxScroll;
            update();
        });
        scroll.addEventListener('scroll',update,{passive:true});
        const resizeObserver=new ResizeObserver(update);
        resizeObserver.observe(scroll);
        resizeObserver.observe(area);
        requestAnimationFrame(update);
        return()=>{
            stop();
            resizeObserver.disconnect();
        };
    }
    async function parseResponse(response){
        let data=null;
        try{
            data=await response.json();
        }catch{}
        if(!response.ok){
            const message=typeof data?.error==='string'?data.error:data?.error?.message||data?.message||data?.detail||`Yêu cầu thất bại (${response.status}).`;
            throw new Error(String(message));
        }
        return data||{};
    }
    async function apiLogin(email,password){
        const response=await fetch(`${API_BASE}/api/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
        const data=await parseResponse(response);
        if(!data.token||!data.user)throw new Error('Máy chủ không trả về thông tin đăng nhập hợp lệ.');
        saveSession(data.token,data.user);
        userData=data.user;
        username=data.user.name||'Nhân Nguyễn';
        isLoggedin=true;
        return data;
    }
    async function apiRegister(name,email,password){
        const response=await fetch(`${API_BASE}/api/auth/register`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password})});
        return await parseResponse(response);
    }
    async function apiRename(email,oldName,newName){
        let token=null;
        try{
            token=localStorage.getItem(STORAGE_TOKEN);
        }catch{}
        if(!token)throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
        const response=await fetch(`${API_BASE}/api/auth/rename`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({email,oldName,newName})});
        const data=await parseResponse(response);
        if(!data.newName)throw new Error('Máy chủ không trả về tên mới hợp lệ.');
        return data;
    }
    function createLoadingBox(){
        const loadingBox=document.createElement('div');
        loadingBox.className='auth-loading';
        const spinner=document.createElement('span');
        spinner.className='auth-spinner';
        loadingBox.appendChild(spinner);
        return loadingBox;
    }
    function setLoading(actions,loading){
        if(loading){
            actions.replaceChildren(createLoadingBox());
            return;
        }
        actions.replaceChildren();
    }
    function closeModal(){
        const overlay=activeModal;
        if(!overlay)return;
        if(activeScrollbarDestroy){
            activeScrollbarDestroy();
            activeScrollbarDestroy=null;
        }
        overlay.classList.remove('show');
        activeModal=null;
        setTimeout(()=>{
            if(overlay.isConnected)overlay.remove();
        },340);
    }
    function openAuthModal(type,presetEmail=''){
        closeDropdown();
        if(activeModal)closeModal();
        const isLogin=type==='login';
        const isRename=type==='rename';
        const overlay=document.createElement('div');
        overlay.id=OLD_MODAL_ID;
        const modal=document.createElement('div');
        modal.className='auth-modal-content';
        const header=document.createElement('div');
        header.className='auth-modal-header';
        const title=document.createElement('div');
        title.className='auth-modal-title';
        title.textContent=isLogin?'Đăng Nhập':isRename?'Đổi tên':'Đăng Ký';
        const subtitle=document.createElement('div');
        subtitle.className='auth-modal-subtitle';
        subtitle.textContent=isLogin?'Đăng nhập để tiếp tục sử dụng tài khoản của bạn.':isRename?'Cập nhật tên hiển thị của tài khoản.':'Tạo tài khoản mới để bắt đầu sử dụng.';
        header.append(title,subtitle);
        const area=document.createElement('div');
        area.className='auth-scroll-area';
        const scroll=document.createElement('div');
        scroll.className='auth-modal-scroll';
        const form=document.createElement('form');
        form.className='auth-form';
        let passwordRules=null;
        let passwordInput=null;
        let confirmInput=null;
        let emailInput=null;
        let currentNameInput=null;
        let newNameInput=null;
        if(isLogin){
            const email=createField({label:'Email',type:'email',name:'email',placeholder:'Nhập email',autocomplete:'email',value:presetEmail});
            const password=createField({label:'Mật khẩu',type:'password',name:'password',placeholder:'Nhập mật khẩu',password:true,autocomplete:'current-password'});
            emailInput=email.input;
            form.append(email.group,password.group);
        }else if(isRename){
            const currentName=createField({label:'Tên hiện tại',type:'text',name:'oldName',placeholder:'Tên hiện tại',autocomplete:'name',value:username,disabled:true});
            const newName=createField({label:'Tên mới',type:'text',name:'newName',placeholder:'Nhập tên mới',autocomplete:'name'});
            currentNameInput=currentName.input;
            newNameInput=newName.input;
            form.append(currentName.group,newName.group);
        }else{
            const name=createField({label:'Họ và tên',type:'text',name:'name',placeholder:'Nhập họ và tên',autocomplete:'name'});
            const email=createField({label:'Email',type:'email',name:'email',placeholder:'Nhập email',autocomplete:'email'});
            const password=createField({label:'Mật khẩu',type:'password',name:'password',placeholder:'Tạo mật khẩu',password:true,autocomplete:'new-password'});
            const confirm=createField({label:'Xác nhận mật khẩu',type:'password',name:'confirmPassword',placeholder:'Nhập lại mật khẩu',password:true,autocomplete:'new-password'});
            passwordInput=password.input;
            confirmInput=confirm.input;
            passwordRules=createPasswordRules(passwordInput);
            password.group.appendChild(passwordRules.box);
            setupConfirmValidation(passwordInput,confirmInput);
            form.append(name.group,email.group,password.group,confirm.group);
        }
        const error=document.createElement('div');
        error.className='auth-error';
        const actions=document.createElement('div');
        actions.className='auth-actions';
        let submitBtn=null;
        let cancelBtn=null;
        let busy=false;
        function resetActions(){
            actions.replaceChildren();
            cancelBtn=document.createElement('button');
            cancelBtn.type='button';
            cancelBtn.className='auth-btn cancel';
            cancelBtn.textContent='Hủy';
            submitBtn=document.createElement('button');
            submitBtn.type='submit';
            submitBtn.className='auth-btn submit';
            submitBtn.textContent=isLogin?'Đăng Nhập':isRename?'Đổi Tên':'Đăng Ký';
            cancelBtn.addEventListener('click',e=>{
                e.preventDefault();
                e.stopPropagation();
                if(!busy)closeModal();
            });
            actions.append(cancelBtn,submitBtn);
        }
        function disableForm(state){
            form.querySelectorAll('input,.auth-eye').forEach(el=>{
                if(el===currentNameInput)el.disabled=true;
                else el.disabled=state;
            });
        }
        resetActions();
        form.addEventListener('submit',async e=>{
            e.preventDefault();
            e.stopPropagation();
            if(busy)return;
            error.textContent='';
            const data=new FormData(form);
            if(isLogin){
                const email=String(data.get('email')||'').trim();
                const password=String(data.get('password')||'');
                if(!email||!password){
                    error.textContent='Vui lòng nhập đầy đủ thông tin.';
                    return;
                }
                busy=true;
                disableForm(true);
                setLoading(actions,true);
                try{
                    await apiLogin(email,password);
                    closeModal();
                    render();
                }catch(err){
                    error.textContent=err?.message||'Đăng nhập thất bại.';
                    busy=false;
                    disableForm(false);
                    resetActions();
                }
                return;
            }
            if(isRename){
                const oldName=String(username||'Không tên').trim();
                const newName=String(data.get('newName')||'Không tên').trim();
                const email=String(userData?.email||localStorage.getItem(STORAGE_EMAIL)||'').trim();
                if(!oldName||!newName){
                    error.textContent='Vui lòng nhập đầy đủ thông tin.';
                    return;
                }
                if(!email){
                    error.textContent='Không tìm thấy email tài khoản.';
                    return;
                }
                if(newName===oldName){
                    error.textContent='Tên mới phải khác tên hiện tại.';
                    return;
                }
                busy=true;
                disableForm(true);
                setLoading(actions,true);
                try{
                    const result=await apiRename(email,oldName,newName);
                    username=String(result.newName).trim();
                    if(userData)userData={...userData,name:username};
                    try{
                        localStorage.setItem(STORAGE_NAME,username);
                        if(userData)localStorage.setItem(STORAGE_USER,JSON.stringify(userData));
                    }catch{}
                    closeModal();
                    render();
                }catch(err){
                    error.textContent=err?.message||'Đổi tên thất bại.';
                    busy=false;
                    disableForm(false);
                    resetActions();
                }
                return;
            }
            const name=String(data.get('name')||'').trim();
            const email=String(data.get('email')||'').trim();
            const password=String(data.get('password')||'');
            const confirmPassword=String(data.get('confirmPassword')||'');
            if(!name||!email||!password||!confirmPassword){
                error.textContent='Vui lòng nhập đầy đủ thông tin.';
                return;
            }
            if(!passwordRules.getValid()){
                error.textContent='Mật khẩu chưa đáp ứng đủ các yêu cầu.';
                return;
            }
            if(password!==confirmPassword){
                confirmInput.classList.add('auth-confirm-mismatch');
                error.textContent='Mật khẩu xác nhận không khớp.';
                return;
            }
            busy=true;
            disableForm(true);
            setLoading(actions,true);
            try{
                await apiRegister(name,email,password);
                closeModal();
                setTimeout(()=>openAuthModal('login',email),380);
            }catch(err){
                error.textContent=err?.message||'Đăng ký thất bại.';
                busy=false;
                disableForm(false);
                resetActions();
            }
        });
        form.append(error,actions);
        scroll.appendChild(form);
        area.appendChild(scroll);
        activeScrollbarDestroy=setupCustomScrollbar(scroll,area);
        modal.append(header,area);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        activeModal=overlay;
        requestAnimationFrame(()=>{
            overlay.classList.add('show');
            const firstInput=form.querySelector('input:not([disabled])');
            if(firstInput){
                firstInput.focus();
                if(isLogin&&presetEmail)firstInput.setSelectionRange(firstInput.value.length,firstInput.value.length);
            }
        });
        overlay.addEventListener('wheel',e=>{
            if(!area.contains(e.target))return;
            scroll.scrollTop+=e.deltaY;
        },{passive:true});
    }
    function getEditIcon(){
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>`;
    }
    function getLogoutIcon(){
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path></svg>`;
    }
    function createDropdownItem(text,icon,onClick){
        const button=document.createElement('button');
        button.type='button';
        button.className='liquid-dropdown-item';
        button.innerHTML=`${icon}<span>${text}</span>`;
        button.addEventListener('click',e=>{
            e.preventDefault();
            e.stopPropagation();
            onClick();
        });
        return button;
    }
    function toggleDropdown(dropdownMenu,svgArrow){
        const isOpen=dropdownMenu.classList.contains('show');
        closeDropdown();
        if(!isOpen){
            dropdownMenu.classList.add('show');
            if(svgArrow)svgArrow.style.transform='rotate(180deg)';
            activeDropdown=dropdownMenu;
            activeArrow=svgArrow;
        }
    }
    function render(){
        closeDropdown();
        container.replaceChildren();
        if(!isLoggedin){
            const loginBtn=createBubble('Đăng Nhập');
            const registerBtn=createBubble('Đăng Ký',true);
            loginBtn.addEventListener('click',e=>{
                e.stopPropagation();
                openAuthModal('login');
            });
            registerBtn.addEventListener('click',e=>{
                e.stopPropagation();
                openAuthModal('register');
            });
            container.append(loginBtn,registerBtn);
            return;
        }
        const userWrapper=document.createElement('div');
        userWrapper.className='auth-user-wrapper';
        const nameBubble=document.createElement('button');
        nameBubble.type='button';
        nameBubble.className='soap-liquid-btn primary auth-user-name';
        const name=document.createElement('span');
        name.textContent=username;
        nameBubble.appendChild(name);
        const arrowBubble=createCircle(true);
        const svgArrow=arrowBubble.querySelector('#svg-arrow');
        const dropdownMenu=document.createElement('div');
        dropdownMenu.className='liquid-dropdown-menu';
        const renameBtn=createDropdownItem('Đổi tên',getEditIcon(),()=>openAuthModal('rename'));
        const logoutBtn=createDropdownItem('Đăng Xuất',getLogoutIcon(),()=>{
            clearSession();
            isLoggedin=false;
            username='Nhân Nguyễn';
            render();
        });
        dropdownMenu.append(renameBtn,logoutBtn);
        nameBubble.addEventListener('click',e=>{
            e.preventDefault();
            e.stopPropagation();
            toggleDropdown(dropdownMenu,svgArrow);
        });
        arrowBubble.addEventListener('click',e=>{
            e.preventDefault();
            e.stopPropagation();
            toggleDropdown(dropdownMenu,svgArrow);
        });
        userWrapper.append(nameBubble,arrowBubble,dropdownMenu);
        container.appendChild(userWrapper);
    }
    render();
    return{
        login(){
            openAuthModal('login');
        },
        logout(){
            clearSession();
            isLoggedin=false;
            username='Nhân Nguyễn';
            render();
        },
        setUsername(name){
            username=String(name??'');
            if(userData)userData.name=username;
            try{
                localStorage.setItem(STORAGE_NAME,username);
                if(userData)localStorage.setItem(STORAGE_USER,JSON.stringify(userData));
            }catch{}
            render();
        },
        getUsername(){
            return username;
        },
        getUser(){
            return userData;
        },
        getToken(){
            try{
                return localStorage.getItem(STORAGE_TOKEN);
            }catch{
                return null;
            }
        },
        isLoggedIn(){
            return isLoggedin;
        },
        openLogin(){
            openAuthModal('login');
        },
        openRegister(){
            openAuthModal('register');
        },
        openRename(){
            openAuthModal('rename');
        },
        destroy(){
            closeDropdown();
            if(activeModal)closeModal();
            window.removeEventListener('click',outsideClickHandler);
            container.remove();
            style.remove();
        }
    };
}