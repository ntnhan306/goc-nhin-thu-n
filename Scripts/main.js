import cloud from './draw/cloud.js';
// import island from './draw/island.js';
import title from './draw/title.js';
import { resizeCanvas } from './window/resize.js';
import { randomInt } from './utils/random.js';
import { initAuthUI } from './components/authUI.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
resizeCanvas(canvas, ctx);
cloud.addCloud(randomInt(9, 16));
// island.createIslands(canvas);
// island.initIslandEvents(canvas);
function loop() {
    ctx.fillStyle = '#0096eb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    cloud.updateClouds(ctx, canvas);
    // island.updateIslands(ctx, canvas);
    title.updateTitle(ctx, canvas);
    requestAnimationFrame(loop);
};
loop();
window.addEventListener("resize", resizeCanvas.bind(null, canvas, ctx));
window.addEventListener('DOMContentLoaded', () => {
    initAuthUI();
});