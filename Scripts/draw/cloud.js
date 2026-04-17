import { randomInt, randomFloat, randomList } from '../number/random.js';
let clouds = [];
let loaded = false;
let firstLoad = true;
const cloudImgs = [];
let totalImages = 25;
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
    for (let i = 0; i < (num); i++) {
        clouds.push({
            img: randomList(cloudImgs),
            x: randomInt(0, window.innerWidth),
            y: randomInt(0, window.innerHeight),
            speed: randomFloat(0.2, 0.8),
            dir: randomList([1, -1]),
            alpha: randomFloat(0.4, 0.5),
            scale: randomFloat(0.15, 0.35)
        });
    }
    firstLoad = false;
}
export function updateClouds(ctx, canvas) {
    if (!loaded) return;
    clouds.forEach(c => {
        let CLOUD_WIDTH = c.img.width * c.scale;
        let offsetMax = 20;
        c.x += c.speed * c.dir;
        if (c.dir === 1 && c.x > canvas.width) {
            c.x = -CLOUD_WIDTH - randomInt(0, offsetMax);
            c.y = randomInt(0, canvas.height);
            c.img = cloudImgs[randomInt(0, cloudImgs.length-1)];
        }
        if (c.dir === -1 && c.x < -CLOUD_WIDTH) {
            c.x = canvas.width + randomInt(0, offsetMax);
            c.y = randomInt(0, canvas.height);
            c.img = cloudImgs[randomInt(0, cloudImgs.length-1)];
        }
        drawCloud(ctx, c);
    });
}