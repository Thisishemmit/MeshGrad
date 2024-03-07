import Renederer from "./Renderer";
import Utils from "./Utils";
import Vec2, { Vec3, create3DVector } from "./Vector";

interface T extends HTMLElement {}

export default class SmallNode {
    public pos: Vec3;
    private r: number = 7;
    private isHover: boolean = false;
    private isClicked: boolean = false;
    private isMouseDown: boolean = false;
    constructor(x: number, y: number) {
        this.pos = create3DVector(x, y, 0);
    }

    public setPos(x: number | Vec2 | Vec3 | number[], y?: number): SmallNode {
        if ( typeof x === 'number' && typeof y === 'number' ) {
            this.pos.set2D(x, y);
        } else if (typeof x === 'number' && y === undefined) {
            this.pos.set2D(x, x);
        } else if ( x instanceof Vec2 ) {
            this.pos.set2D(x);
        } else if ( x instanceof Vec3 ) {
            this.pos.set2D(x)
        } else if ( Array.isArray(x) ) {
            this.pos.set2D(x);
        }
        return this;
    }

    public setupEventListeners(r: Renederer< T >): void {

        //hover and drag
        r.getCanvas().addEventListener("mousemove", (e) => {
            const mouseP = Utils.getMousePos(r.getCanvas(), e);
            //drag
            if (this.isMouseDown && this.isHover) {
                this.pos.set2D(mouseP);
            }

            //hover
            if (this.pos.dist2D(mouseP) < this.r) {
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
            if (this.pos.dist2D(mouseP) < this.r) {
                this.isClicked = true;
            } else {
                this.isClicked = false;
            }
        });

        //mousedown
        r.getCanvas().addEventListener("mousedown", (e) => {
            const mouseP = Utils.getMousePos(r.getCanvas(), e);
            if (this.pos.dist2D(mouseP) < this.r) {
                this.isMouseDown = true;
            }
        });

        r.getCanvas().addEventListener("mouseup", () => {
            this.isMouseDown = false;
        });
    }

    public draw(r: Renederer< T >): void {
        if (this.isClicked) {
            this.selectedDraw(r);
        } else if (this.isHover) {
            this.hoverDraw(r);
        } else {
            this.normalDraw(r);
        }
    }

    private selectedDraw(r: Renederer< T >): void {
        r.fill(255, 0, 0, 1);
        r.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    private hoverDraw(r: Renederer< T >): void {
        r.fill(0, 0, 255, 1);
        r.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    private normalDraw(r: Renederer< T >): void {
        r.fill(0, 0, 0, 1);
        r.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    public getPos(): Vec3 {
        return this.pos;
    }

    public getRadius(): number {
        return this.r;
    }

    public isMouseHover(): boolean {
        return this.isHover;
    }

    public isMouseClick(): boolean {
        return this.isClicked;
    }


}
