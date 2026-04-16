import { addCloud, updateClouds } from './draw/cloud.js';

const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

addCloud(10);

function loop() {

    ctx.fillStyle = '#0096eb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    updateClouds(ctx, canvas);

    requestAnimationFrame(loop);

};

loop();