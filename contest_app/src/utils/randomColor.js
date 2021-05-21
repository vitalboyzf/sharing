function getRandomNumber() {
    return Math.ceil(Math.random() * (198 - 50) + 50);
}
export function randomColor(a) {
    if (a) {
        return `rgb(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()},${a})`;
    }
    return `rgb(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`;
}