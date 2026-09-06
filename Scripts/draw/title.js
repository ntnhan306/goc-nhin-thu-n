let loaded = false;
let titleImg = null;
let titleText = "GÓC NHÌN THỨ ℕ"
const img = new Image();
img.src = new URL('../../Images/UI/scroll_banner.png', import.meta.url);
img.onload = () => {loaded = true;};
titleImg = img;
function drawTitle(ctx, canvas) {
    if (!loaded || !titleImg) return;
    const bannerWidth = titleImg.width * 0.5, bannerHeight = titleImg.height * 0.5;
    const centerX = canvas.width / 2, y = 30;
    ctx.save();
    ctx.drawImage(titleImg, centerX - bannerWidth / 2, y, bannerWidth, bannerHeight);
    ctx.restore();
    const text = titleText;
    ctx.save();
    ctx.font = 'bold 36px Cambria Math';
    ctx.fillStyle = '#4a0e0e';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.shadowOffsetX = 1; ctx.shadowOffsetY = 1; ctx.shadowBlur = 2; ctx.shadowColor = '#3d2314';
    const radius = bannerWidth * 1.45, centerTextY = y + bannerHeight / 2 + 688;
    const arcSpan = Math.PI * 0.13, startAngle = Math.PI * -0.5 - arcSpan / 2;
    const angleStep = arcSpan / (text.length - 1), textCenterY = centerTextY - radius;
    ctx.save();
    ctx.translate(centerX, textCenterY);
    ctx.rotate(-1 * (Math.PI / 180));
    ctx.translate(-centerX, -textCenterY);
    for (let i = 0; i < text.length; i++) {
        const angle = startAngle + i * angleStep;
        ctx.save();
        ctx.translate(centerX + radius * Math.cos(angle), centerTextY + radius * Math.sin(angle));
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillText(text[i], 0, 0);
        ctx.restore();
    }
    ctx.restore(); ctx.restore();
}
export function createTitle(canvas) {}
export function updateTitle(ctx, canvas) {
    drawTitle(ctx, canvas);
}
export default { createTitle, updateTitle };