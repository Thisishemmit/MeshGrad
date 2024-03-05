export default class Vec2 {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public add(v: Vec2): Vec2 {
        this.x += v.x;
        this.y += v.y;
        return v;
    }
    public sub(v: Vec2): Vec2 {
        this.x -= v.x;
        this.y -= v.y;
        return v;
    }
    public mult(n: number): Vec2 {
        this.x *= n;
        this.y *= n;
        return this;
    }
    public div(n:number): Vec2 {
        this.x /= n;
        this.y /= n;
        return this;
    }

    public mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public normlize(): Vec2 {
        const m = this.mag();
        if (m !== 0) this.div(m);
        return this;
    }

    public setMag(n:number): Vec2 {
        this.normlize().mult(n);
        return this;
    }

    public limit(max: number): Vec2 {
        if (this.mag() > max) this.setMag(max);
        return this;
    }

    // heading is the angle of the vector in radians
    public heading(): number {
        return Math.atan2(this.y, this.x);
    }

    public rotate(a: number): Vec2 {
        const newHeading = this.heading() + a;
        const m = this.mag();
        this.x = Math.cos(newHeading) * m;
        this.y = Math.sin(newHeading) * m;
        return this;
    }

    public lerp(v: Vec2, t: number): Vec2 {
        this.x = this.x + (v.x - this.x) * t;
        this.y = this.y + (v.y - this.y) * t;
        return this;
    }

    public dist(v: Vec2): number {
        const dx = v.x - this.x;
        const dy = v.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public copy(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    public set(x: number | Vec2, y?: number): Vec2 {
        if (typeof x === "number" && y) {
            this.x = x;
            this.y = y;
        } else if (x instanceof Vec2 && y === undefined) {
            this.x = x.x;
            this.y = x.y;
        } else if (typeof x === "number" && y === undefined) {
            this.x = x;
            this.y = x;
        } else {
            throw new Error("Invalid arguments");
        }
        return this;
    }
    public toString(): string {
        return `x: ${this.x}, y: ${this.y}`;
    }

    public equals(v: Vec2): boolean {
        return this.x === v.x && this.y === v.y;
    }

    public angleBetween(v: Vec2): number {
        return Math.acos(this.dot(v) / (this.mag() * v.mag()));
    }

    public dot(v: Vec2): number {
        return this.x * v.x + this.y * v.y;
    }

    public cross(v: Vec2): number {
        return this.x * v.y - this.y * v.x;
    }
}

