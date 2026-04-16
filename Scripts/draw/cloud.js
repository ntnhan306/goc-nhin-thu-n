let clouds = [];
const cloudImg = new Image();
cloudImg.src = new URL('../../Images/Clouds/cloud1.png', import.meta.url); 

let loaded = false;

cloudImg.onload = () => {
    loaded = true;
};

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
            x: -100 - Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speed: 0.2 + Math.random() * 0.5,
            alpha: 0.4 + Math.random() * 0.1,
            scale: 0.2 + Math.random() * 0.2
        });
    }
}

export function updateClouds(ctx, canvas) {
    if (!loaded) return;

    clouds.forEach(c => {
        let CLOUD_WIDTH = cloudImg.width * c.scale;

        c.x += c.speed;

        if (c.x > canvas.width + CLOUD_WIDTH) {
            c.x = -CLOUD_WIDTH - Math.random() * window.innerWidth;
            c.y = Math.random() * window.innerHeight;
        }

        drawCloud(ctx, c.x, c.y, c.alpha, c.scale);
    });
}