let clouds = [];
const cloudImg = new Image();
cloudImg.src = new URL('../../Images/Clouds/cloud1.png', import.meta.url); 

export function drawCloud(ctx, x, y, alpha = 0.8, scale = 1) {
    ctx.save();

    ctx.globalAlpha = alpha;
    
    ctx.drawImage(cloudImg, x, y, cloudImg.width * scale, cloudImg.height * scale)

    ctx.restore();
}

export function addCloud(num) {
    clouds = [];

    for (let i = 0; i < num; i++) {
        clouds.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speed: 0.2 + Math.random() * 0.5,
            alpha: 0.4 + Math.random() * 0.1,
            scale: 0.2 + Math.random() * 0.2
        });
    }
}

export function updateClouds(ctx, canvas) {
    clouds.forEach(c => {

        c.x += c.speed;

        if (c.x > canvas.width) {
            c.x = -60;
            c.y = Math.random() * 200;
        }

        drawCloud(ctx, c.x, c.y, c.alpha, c.scale);
    });
}