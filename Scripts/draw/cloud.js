let clouds = [];
const cloudImg = new Image();
cloudImg.src = new URL('../../Images/Clouds/cloud1.png', import.meta.url); 

let loaded = false;
let firstLoad = true;

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
    let firstLoadnum = 5;

    for (let i = 0; i < (firstLoad ? firstLoadnum : num); i++) {
        clouds.push({
            x: firstLoad ? Math.random() * window.innerWidth : -100 - Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speed: 0.2 + Math.random() * 0.5,
            dir: Math.random() > 0.5 ? 1 : -1,
            alpha: 0.4 + Math.random() * 0.1,
            scale: 0.15 + Math.random() * 0.2
        });
    }

    firstLoad = false;
}

export function updateClouds(ctx, canvas) {
    if (!loaded) return;

    clouds.forEach(c => {
        let CLOUD_WIDTH = cloudImg.width * c.scale;

        c.x += c.speed * c.dir;

        if (c.dir === 1 && c.x > canvas.width + CLOUD_WIDTH) {
            c.x = -CLOUD_WIDTH - Math.random() * canvas.width;
            c.y = Math.random() * canvas.height;
        }
        if (c.dir === -1 && c.x < -CLOUD_WIDTH) {
            c.x = canvas.width +  Math.random() * canvas.width;
            c.y = Math.random() * canvas.height;
        }
        drawCloud(ctx, c.x, c.y, c.alpha, c.scale);
    });
}