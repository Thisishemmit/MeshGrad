import Renederer from "./Renderer";

let gl: CanvasRenderingContext2D;
let mouseX = 0;
let mouseY = 0;
//empty div with class .mesh-grad
const div = document.querySelector(".mesh-grad")!;
console.log(12);

const canvas = document.createElement("canvas");
div.appendChild(canvas);
canvas.width = div.clientWidth;
canvas.height = div.clientHeight;
gl = canvas.getContext("2d")!;
if (!gl) {
    throw new Error("WebGL not supported");
}

canvas.addEventListener("touchstart", (e) => {
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
});
canvas.addEventListener("touchmove", (e) => {
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
});
canvas.addEventListener("mousedown", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
canvas.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
};

const r = new Renederer(gl);

div.addEventListener("resize", () => {
    r.resizeCanvasToDisplaySize();
});

type Vec2 = { x: number, y: number };

const drawLine = (start: Vec2, end: Vec2, a: number = 1) => {
    r.noFill();
    r.lineWidth(2);
    r.stroke(0, 255, 0, a);
    r.line(start.x, start.y, end.x, end.y);
    r.fill(255, 0, 0, a);
    r.circle(start.x, start.y, 5);
    r.circle(end.x, end.y, 5);
}

const drawDashLine = (start: Vec2, end: Vec2, a: number = 1) => {
    r.noFill();
    r.lineWidth(1.5);
    r.stroke(0, 167, 212, a);
    r.dashLine(start.x, start.y, end.x, end.y);
    r.fill(255, 120, 0, a);
    r.circle(start.x, start.y, 5);
    r.circle(end.x, end.y, 5);
}

const findMidPoint = (c: Vec2) => {
    //nice color for the mid point
    r.noFill();
    r.lineWidth(1.5);
    r.stroke(255, 0, 0, 1);
    r.vertex(c.x, c.y);
}
const p0: Vec2 = { x: 100, y: 100 };
let p1: Vec2 = { x: 300, y: 200 };
const p2: Vec2 = { x: 100, y: 400 };

function sine(t: number): number {
    return Math.sin(t)*.5 + .5;
}
function lerpVec2(start: Vec2, end: Vec2, t: number): Vec2 {
    return { x: lerp(start.x, end.x, t), y: lerp(start.y, end.y, t) };
}
let t = 0;
let dt = 0.005;
const draw = () => {
    r.clear();
    r.resizeCanvasToDisplaySize();
    p1 = { x: mouseX, y: mouseY };
    drawLine(p0, p1);
    drawLine(p1, p2);
    r.beginShape();
    for (let i = 0; i < 1; i += .01) {
        const p01 = lerpVec2(p0, p1, i);
        const p12 = lerpVec2(p1, p2, i);
        const p012 = lerpVec2(p01, p12, i);

        findMidPoint(p012)
    }

    r.endShape();

    requestAnimationFrame(draw);
};

draw();
