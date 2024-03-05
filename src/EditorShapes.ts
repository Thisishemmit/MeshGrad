import Vec2 from "./Vector";

import Renederer from "./Renderer";
import Utils from "./Utils";
interface T extends HTMLElement {
}
export class SmallNode {
    public pos: Vec2;
    private r: number = 7;
    private isHover: boolean = false;
    private isClicked: boolean = false;
    private isMouseDown: boolean = false;
    constructor(x: number, y: number) {
        this.pos = new Vec2(x, y);
    }

    setPos(x: number, y: number) {
        this.pos.set(x, y);
        return this;
    }

    setupEventListeners(r: Renederer < T >) {
        //hover and drag
        r.getCanvas().addEventListener("mousemove", (e) => {
            const mouseP = Utils.getMousePos(r.getCanvas(), e);
            //drag
            if (this.isMouseDown && this.isHover) {
                this.pos.set(mouseP);
            }
            //hover
            if (this.pos.dist(mouseP) < this.r) {
                if (!this.isHover) {
                    this.isHover = true;
                }
            } else {
                if (this.isHover) {
                    this.isHover = false;
                }
            }
        });

        //click
        r.getCanvas().addEventListener("click", (e) => {
            const mouseP = Utils.getMousePos(r.getCanvas(), e);
            if (this.pos.dist(mouseP) < this.r) {
                this.isClicked = true;
            } else {
                this.isClicked = false;
            }
        });

        //mousedown
        r.getCanvas().addEventListener("mousedown", (e) => {
            const mouseP = Utils.getMousePos(r.getCanvas(), e);
            if (this.pos.dist(mouseP) < this.r) {
                this.isMouseDown = true;
            }
        });

        r.getCanvas().addEventListener("mouseup", () => {
            this.isMouseDown = false;
        });
    }

    draw(r: Renederer < T >) {
        if (this.isClicked) {
            this.selectedDraw(r);
        } else if (this.isHover) {
            this.hoverDraw(r);
        } else {
            this.normalDraw(r);
        }
    }

    selectedDraw(r: Renederer < T >) {
        r.lineWidth(1.5);
        //fill color #1aa5f0
        // stroke color #F0F4F5
        r.stroke(250, 250, 250, 1);
        r.fill(26, 165, 240, 1);
        r.circle(this.pos.x, this.pos.y, this.r);
    }

    hoverDraw(r: Renederer < T >) {
        r.lineWidth(1);
        //fill color #1181bd
        // stroke color #F0F4F5
        r.stroke(240, 244, 245, 0);
        r.fill(17, 129, 189, 1);
        r.circle(this.pos.x, this.pos.y, this.r);
    }

    normalDraw(r: Renederer < T >) {
        r.noStroke();
        r.fill(26, 165, 240, 1);
        r.circle(this.pos.x, this.pos.y, this.r);
    }
}
