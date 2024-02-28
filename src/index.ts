import MeshGrad from "./MeshGrad";
import Renderer from "./Renderer";

const meshGrad = new MeshGrad(document.querySelector('.mesh-grad')!);
const g = new Renderer(meshGrad.getContexts().gl as CanvasRenderingContext2D);

function draw() {
    g.clear();
    g.rect(0, 0, 100, 100, 'rgba(0, 255, 0, 0.2)');
    requestAnimationFrame(draw);
}

draw();
