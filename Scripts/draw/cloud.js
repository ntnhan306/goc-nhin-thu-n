let clouds = [];

let loaded = false;
let firstLoad = true;

const cloudImgs = [];
let totalImages = 1;
let loadedCount = 0;

for (let i = 1; i <= totalImages; i++) {
    const img = new Image();
    img.src = new URL(`../../Images/Clouds/cloud${i}.png`, import.meta.url);

    img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
            loaded = true;
        }
    };

    cloudImgs.push(img);
}

export function drawCloud(ctx, cloud) {
    ctx.save();

    ctx.globalAlpha = cloud.alpha;
    
    ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.img.width * cloud.scale, cloud.img.height * cloud.scale );

    ctx.restore();
}

export function addCloud(num) {
    clouds = [];
    let firstLoadNum = 5;

    for (let i = 0; i < (firstLoad ? firstLoadNum : num); i++) {
        clouds.push({
            img: cloudImgs[Math.floor(Math.random() * cloudImgs.length)],
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
        let CLOUD_WIDTH = c.img.width * c.scale;

        c.x += c.speed * c.dir;

        if (c.dir === 1 && c.x > canvas.width + CLOUD_WIDTH) {
            c.x = -CLOUD_WIDTH - Math.random() * canvas.width;
            c.y = Math.random() * canvas.height;
        }
        if (c.dir === -1 && c.x < -CLOUD_WIDTH) {
            c.x = canvas.width +  Math.random() * canvas.width;
            c.y = Math.random() * canvas.height;
        }
        drawCloud(ctx, c);
    });
}