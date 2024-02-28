interface RendererI {
    background(color: string): void;
}

export default class Renderer implements RendererI {
    private context: CanvasRenderingContext2D;
    private _lineWidth: number = 1;
    private _fillColor: string = 'black';
    private _strokeColor: string = 'black';
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }
    background(color: string): void {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    opacity(alpha: number): void {
        this.context.globalAlpha = alpha;
    }

    clear(): void {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    point(x: number, y: number, size: number, color?: string): void {
        if (color) {
            this.context.fillStyle = color;
        }
        this.context.fillRect(x, y, size, size);
    }

    rect(x: number, y: number, width: number, height: number, color?: string): void {
        if (color) {
            this.context.fillStyle = color;
        }
        this.context.fillRect(x, y, width, height);
    }


    fill(r: number | string | number[], g: number | null, b: number | null, a: number | null): void {
        if (typeof r === 'number' && g && b && a) {
            this._fillColor = `rgba(${r},${g},${b},${a})`;
            this.context.fillStyle = this._fillColor;
        } else if (typeof r === 'number' && !g ) {
            this._fillColor = `rgba(${r},${r},${r},${1})`;
            this.context.fillStyle = this._fillColor;
        } else if (typeof r === 'number' && g && b && !a) {
            this._fillColor = `rgba(${r},${g},${b},${1})`;
            this.context.fillStyle = this._fillColor;
        } else if (typeof r === 'number' && g && !b) {
            this._fillColor = `rgba(${r},${r},${r},${g})`;
            this.context.fillStyle = this._fillColor;
        }

        if (typeof r === 'string') {
            this._fillColor = r;
            this.context.fillStyle = this._fillColor;
        }

        if (Array.isArray(r)) {
            if (r.length === 3) {
                this._fillColor = `rgba(${r[0]},${r[1]},${r[2]},${1})`;
                this.context.fillStyle = this._fillColor;
            } else if (r.length === 4) {
                this._fillColor = `rgba(${r[0]},${r[1]},${r[2]},${r[3]})`;
                this.context.fillStyle = this._fillColor;
            } else if (r.length === 1) {
                this._fillColor = `rgba(${r[0]},${r[0]},${r[0]},${1})`;
                this.context.fillStyle = this._fillColor;
            } else if (r.length === 2) {
                this._fillColor = `rgba(${r[0]},${r[0]},${r[0]},${r[1]})`;
                this.context.fillStyle = this._fillColor;
            }
        }
    }

    sFill(r: number, g: number, b: number, a: number): void {
        this._fillColor = `rgba(${r},${g},${b},${a})`;
        this.context.fillStyle = this._fillColor;
    }

    sStroke(r: number, g: number, b: number, a: number): void {
        this._strokeColor = `rgba(${r},${g},${b},${a})`;
        this.context.strokeStyle = this._strokeColor;
    }

    stroke(r: number | string | number[], g: number | null, b: number | null, a: number | null): void {
        if (typeof r === 'number' && g && b && a) {
            this._strokeColor = `rgba(${r},${g},${b},${a})`;
            this.context.strokeStyle = this._strokeColor;
        } else if (typeof r === 'number' && !g ) {
            this._strokeColor = `rgba(${r},${r},${r},${1})`;
            this.context.strokeStyle = this._strokeColor;
        } else if (typeof r === 'number' && g && b && !a) {
            this._strokeColor = `rgba(${r},${g},${b},${1})`;
            this.context.strokeStyle = this._strokeColor;
        } else if (typeof r === 'number' && g && !b) {
            this._strokeColor = `rgba(${r},${r},${r},${g})`;
            this.context.strokeStyle = this._strokeColor;
        }

        if (typeof r === 'string') {
            this._strokeColor = r;
            this.context.strokeStyle = this._strokeColor;
        }

        if (Array.isArray(r)) {
            if (r.length === 3) {
                this._strokeColor = `rgba(${r[0]},${r[1]},${r[2]},${1})`;
                this.context.strokeStyle = this._strokeColor;
            } else if (r.length === 4) {
                this._strokeColor = `rgba(${r[0]},${r[1]},${r[2]},${r[3]})`;
                this.context.strokeStyle = this._strokeColor;
            } else if (r.length === 1) {
                this._strokeColor = `rgba(${r[0]},${r[0]},${r[0]},${1})`;
                this.context.strokeStyle = this._strokeColor;
            } else if (r.length === 2) {
                this._strokeColor = `rgba(${r[0]},${r[0]},${r[0]},${r[1]})`;
                this.context.strokeStyle = this._strokeColor;
            }
        }
    }

    lineWidth(width: number): void {
        this._lineWidth = width;
        this.context.lineWidth = width;
    }

    noFill(): void {
        this.context.fillStyle = 'transparent';
    }

    noStroke(): void {
        this.context.strokeStyle = 'transparent';
        this.context.lineWidth = 0;
    }
}
