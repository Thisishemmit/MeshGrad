export interface RendererI {
    setContext(context: CanvasRenderingContext2D): void;
    getContext(): CanvasRenderingContext2D;
    setLineWidth(width: number): void;
    setStrokeColor(color: string): void;
    setFillColor(color: string): void;
    setBackColor(color: string | "transparent"): void;
    clear(): void;
    line(x1: number, y1: number, x2: number, y2: number): void;
    circle(x: number, y: number, radius: number): void;
    rect(x: number, y: number, width: number, height: number): void;
    text(x: number, y: number, text: string): void;
    point(x: number, y: number): void;
    eclipse(x: number, y: number, radiusX: number, radiusY: number): void;
    arrow(x1: number, y1: number, x2: number, y2: number): void;
    getLineWidth(): number;
    getStrokeColor(): string;
    getFillColor(): string;
    getBackColor(): string;
}

export default class Renderer implements RendererI {
    private context: CanvasRenderingContext2D;
    private lineWidth: number = 1;
    private strokeColor: string = 'black';
    private fillColor: string = 'black';
    private backColor: string = 'white';
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    setContext(context: CanvasRenderingContext2D): void {
        this.context = context;
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    setLineWidth(width: number): void {
        this.lineWidth = width;
        this.context.lineWidth = width;
    }

    setStrokeColor(color: string): void {
        this.strokeColor = color;
        this.context.strokeStyle = color;
    }

    setFillColor(color: string): void {
        this.fillColor = color;
        this.context.fillStyle = color;
    }

    setBackColor(color: string | "transparent"): void {
        if (color === "transparent") {
            return;
        } else {
            this.backColor = color;
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        }
    }

    clear(): void {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    line(x1: number, y1: number, x2: number, y2: number): void {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    circle(x: number, y: number, radius: number): void {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2);
        this.context.stroke();
    }

    rect(x: number, y: number, width: number, height: number): void {
        this.context.beginPath();
        this.context.rect(x, y, width, height);
        this.context.stroke();
    }

    text(x: number, y: number, text: string): void {
        this.context.fillText(text, x, y);
    }

    point(x: number, y: number): void {
        this.context.fillRect(x, y, 1, 1);
    }

    eclipse(x: number, y: number, radiusX: number, radiusY: number): void {
        this.context.beginPath();
        this.context.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
        this.context.stroke();
    }

    arrow(x1: number, y1: number, x2: number, y2: number): void {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.beginPath();
        this.context.moveTo(x2, y2);
        this.context.lineTo(x2 - 10, y2 - 10);
        this.context.lineTo(x2 - 10, y2 + 10);
        this.context.lineTo(x2, y2);
        this.context.fill();
    }

    getLineWidth(): number {
        return this.lineWidth;
    }

    getStrokeColor(): string {
        return this.strokeColor;
    }

    getFillColor(): string {
        return this.fillColor;
    }

    getBackColor(): string {
        return this.backColor;
    }
}
