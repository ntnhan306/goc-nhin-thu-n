import { addCloud, updateClouds } from './draw/cloud.js';
import { resizeCanvas } from './window/resize.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
resizeCanvas(canvas, ctx);
addCloud(Math.floor(Math.random() * 6) + 9);
function loop() {
    ctx.fillStyle = '#0096eb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    updateClouds(ctx, canvas);
    requestAnimationFrame(loop);
};
loop();
window.addEventListener("resize", resizeCanvas.bind(null, canvas, ctx));