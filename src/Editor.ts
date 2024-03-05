import { SmallNode } from "./EditorShapes";
import Renederer from "./Renderer";
import Utils from "./Utils";
import Vec2 from "./Vector";

export default class Editor<T extends HTMLElement>{
    private shapes: SmallNode[] = [];
    private r: Renederer<T>;
    private size: Vec2 = new Vec2(0, 0);
    constructor(r: Renederer<T>) {
        this.r = r;
        this.init();
        this.onDoubleClick();
        this.onAnyMoveUpdate();
        this.draw();
    }
    onDoubleClick() {
        this.r.getCanvas().addEventListener("dblclick", (e) => {
            const mouseP = Utils.getMousePos(this.r.getCanvas(), e);
            this.shapes.push(new SmallNode(mouseP.x, mouseP.y));
        });
    }

    onAnyMoveUpdate() {
        //mouse move / up / down , click, double click.
        this.r.getCanvas().addEventListener("mousemove", () => {
            this.draw();
        });
        this.r.getCanvas().addEventListener("mouseup", () => {
            this.draw();
        });
        this.r.getCanvas().addEventListener("mousedown", () => {
            this.draw();
        });
        this.r.getCanvas().addEventListener("click", () => {
            this.draw();
        });
        this.r.getCanvas().addEventListener("dblclick", () => {
            this.draw();
        });
    }
    init() {
        this.onDoubleClick();
        this.draw();
        this.size.set(this.r.getCanvas().clientWidth, this.r.getCanvas().clientHeight);
        console.log(this.r.getCanvas().width, this.r.getCanvas().height,
            this.r.getCanvas().clientWidth, this.r.getCanvas().clientHeight,
            window.devicePixelRatio)    ;

        const corners: SmallNode[] = [
            new SmallNode( 0 + 15, 0 + 15),
            new SmallNode(this.size.x - 15, 0 + 15),
        ];
        corners.forEach((c) => {
            c.setupEventListeners(this.r);
            this.shapes.push(c);
        });
    }

    draw() {
        this.r.background(210, 210, 210, 1);
        this.shapes.forEach((s) => {
            s.draw(this.r);
        });
    }

}
