export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
export function randomList(list) {
    if (!list || list.length === 0) return null;
    return list[Math.floor(Math.random() * list.length)];
}