import Renederer from "./Renderer";

let gl: CanvasRenderingContext2D;
//empty div with class .mesh-grad
const div = document.querySelector('.mesh-grad')!
console.log(12);

const canvas = document.createElement('canvas');
div.appendChild(canvas);
canvas.width = div.clientWidth;
canvas.height = div.clientHeight;
gl = canvas.getContext('2d')!

const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
}

const r = new Renederer(gl);

r.resizeCanvasToDisplaySize();
const draw = () => {
    r.fill(255, 0, 0, 1);
    r.noStroke();
    r.rect(0, 0, 100, 100);
}

draw();
