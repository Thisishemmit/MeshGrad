import { log } from "console";

export default class Renederer {
    private gl: CanvasRenderingContext2D;
    private fillColor: string = "black";
    private strokeColor: string = "transparent";

    constructor(gl: CanvasRenderingContext2D) {
        this.gl = gl;
    }

    public resizeCanvasToDisplaySize(): void {
        const canvas = this.gl.canvas as HTMLCanvasElement;
        const width = canvas.parentElement!.clientWidth;
        const height = canvas.parentElement!.clientHeight;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }
    }

    public clear(): void {
        this.gl.clearRect(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }

    public noFill(): void {
        this.gl.fillStyle = "transparent";
    }

    public fill2(r?: number | number[] | string, g?: number, b?: number, a?: number): void {
        const colour:string | null = this.getColour(r, g, b, a);
        if (colour) {
            this.fillColor = colour;
            this.gl.fillStyle = colour;
        } else {
            this.gl.fillStyle = this.fillColor;
        }
    }

    fill(r?: number, g?: number, b?: number, a?: number): void {
        if (r) {
            this.fillColor = `rgba(${r},${g},${b},${a})`;
            this.gl.fillStyle = this.fillColor;
        } else {
            this.gl.fillStyle = this.fillColor;
        }
    }

    public noStroke(): void {
        this.gl.strokeStyle = "transparent";
    }

    public stroke1(r?: number, g?: number, b?: number, a?: number): void {
        if (r) {
            this.strokeColor = `rgba(${r},${g},${b},${a})`;
            this.gl.strokeStyle = this.strokeColor;
            console.log(this.strokeColor);

        } else {
            this.gl.strokeStyle = this.strokeColor;
            console.log(this.strokeColor);

        }
    }
    public stroke(r: number, g: number, b: number, a: number): void {
        this.strokeColor = `rgba(${r},${g},${b},${a})`;
        this.gl.strokeStyle = this.strokeColor;
    }

    public stroke2(r?: number | number[] | string, g?: number, b?: number, a?: number): void {
        const colour:string | null = this.getColour(r, g, b, a);
        if (colour) {
            this.strokeColor = colour;
            this.gl.strokeStyle = colour;
        } else {
            this.gl.strokeStyle = this.strokeColor;
        }
    }

    public getColour(r?: number | number[] | string, g?: number, b?: number, a?: number): string | null {
        if (typeof r === "string") {
            return r;
        } else if (Array.isArray(r)) {
            return `rgba(${r[0]},${r[1]},${r[2]},${r[3]})`;
        } else if (r) {
            return `rgba(${r},${g},${b},${a})`;
        }
        return null;
    }

    public point(x: number, y: number): void {
        this.gl.beginPath();
        this.gl.arc(x, y, 1, 0, Math.PI * 2);
        this.gl.fill();
        this.gl.stroke();
        this.gl.closePath();
    }

    public line(x1: number, y1: number, x2: number, y2: number): void {
        this.gl.beginPath();
        this.gl.moveTo(x1, y1);
        this.gl.lineTo(x2, y2);
        this.gl.stroke();
        this.gl.closePath();
    }

    public dashLine(x1: number, y1: number, x2: number, y2: number): void {
        this.gl.beginPath();
        this.gl.setLineDash([5, 15]);
        this.gl.moveTo(x1, y1);
        this.gl.lineTo(x2, y2);
        this.gl.stroke();
        this.gl.closePath();
        this.gl.setLineDash([]);
    }

    public rect(x: number, y: number, w: number, h: number): void {
        this.gl.beginPath();
        this.gl.rect(x, y, w, h);
        this.gl.fill();
        this.gl.stroke();
        this.gl.closePath();
    }

    public fillRect(x: number, y: number, w: number, h: number): void {
        this.gl.fillRect(x, y, w, h);
    }
    public lineWidth(width: number): void {
        this.gl.lineWidth = width;
    }

    public background(r: number, g: number, b: number, a: number): void {
        this.gl.fillStyle = `rgba(${r},${g},${b},${a})`;
        this.gl.fillRect(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }

    public ellipse(x: number, y: number, w: number, h: number): void {
        this.gl.beginPath();
        this.gl.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
        this.gl.fill();
        this.gl.stroke();
        this.gl.closePath();
    }

    public arc(x: number, y: number, w: number, h: number, start: number, stop: number): void {
        this.gl.beginPath();
        this.gl.ellipse(x, y, w, h, 0, start, stop);
        this.gl.stroke();
        this.gl.closePath();
    }

    public circle(x: number, y: number, r: number): void {
        this.gl.beginPath();
        this.gl.arc(x, y, r, 0, Math.PI * 2);
        this.gl.fill();
        this.gl.stroke();
        this.gl.closePath();
    }

    public beginShape(): void {
        this.gl.beginPath();
    }

    public vertex(x: number, y: number): void {
        this.gl.lineTo(x, y);
    }

    public endShape(): void {
        this.gl.fill();
        this.gl.stroke();
        this.gl.closePath();
    }
}
