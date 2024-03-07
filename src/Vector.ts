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
    public static fromVec3(v: Vec3): Vec2 {
        return new Vec2(v.x, v.y);
    }

    public project(v: Vec2): Vec2 {
        const scalar = this.dot(v) / v.mag();
        return v.copy().setMag(scalar);
    }

    public reject(v: Vec2): Vec2 {
        return this.copy().sub(this.project(v));
    }

    public reflect(v: Vec2): Vec2 {
        return this.copy().sub(this.project(v).mult(2));
    }

    public static fromAngle(a: number): Vec2 {
        return new Vec2(Math.cos(a), Math.sin(a));
    }

    public setAngle(a: number): Vec2 {
        const m = this.mag();
        this.x = Math.cos(a) * m;
        this.y = Math.sin(a) * m;
        return this;
    }

    public setAngleBetween(v: Vec2, v2: Vec2, a: number): Vec2 {
        const angle = v.angleBetween(v2);
        if (angle !== 0) {
            const m = this.mag();
            this.x = Math.cos(angle + a) * m;
            this.y = Math.sin(angle + a) * m;
        }
        return this;
    }

    public static random(): Vec2 {
        return new Vec2(Math.random(), Math.random());
    }

    public static fromArray(a: number[]): Vec2 {
        return new Vec2(a[0], a[1]);
    }

    public toArray(): number[] {
        return [this.x, this.y];
    }

    public static fromObject(o: {x: number, y: number}): Vec2 {
        return new Vec2(o.x, o.y);
    }

    public toObject(): {x: number, y: number} {
        return {x: this.x, y: this.y};
    }



}

export class Vec3 {
    public x: number;
    public y: number;
    public z: number;
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    public add(v: Vec3): Vec3 {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return v;
    }
    public sub(v: Vec3): Vec3 {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return v;
    }
    public mult(n: number): Vec3 {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        return this;
    }
    public div(n:number): Vec3 {
        this.x /= n;
        this.y /= n;
        this.z /= n;
        return this;
    }

    public mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public normlize(): Vec3 {
        const m = this.mag();
        if (m !== 0) this.div(m);
        return this;
    }

    public setMag(n:number): Vec3 {
        this.normlize().mult(n);
        return this;
    }

    public limit(max: number): Vec3 {
        if (this.mag() > max) this.setMag(max);
        return this;
    }

    // heading is the angle of the vector in radians
    public heading(): number {
        return Math.atan2(this.y, this.x);
    }

    public rotate(a: number): Vec3 {
        const newHeading = this.heading() + a;
        const m = this.mag();
        this.x = Math.cos(newHeading) * m;
        this.y = Math.sin(newHeading) * m;
        return this;
    }

    public lerp(v: Vec3, t: number): Vec3 {
        this.x = this.x + (v.x - this.x) * t;
        this.y = this.y + (v.y - this.y) * t;
        this.z = this.z + (v.z - this.z) * t;
        return this;
    }

    public dist(v: Vec3): number {
        const dx = v.x - this.x;
        const dy = v.y - this.y;
        const dz = v.z - this.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    public copy(): Vec3 {
        return new Vec3(this.x, this.y, this.z);
    }

    public set(x: number | Vec3, y?: number, z?: number): Vec3 {
        if (typeof x === "number" && y && z) {
            this.x = x;
            this.y = y;
            this.z = z;
        } else if (x instanceof Vec3 && y === undefined && z === undefined) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        } else if (typeof x === "number" && y === undefined && z === undefined) {
            this.x = x;
            this.y = x;
            this.z = x;
        } else {
            throw new Error("Invalid arguments");
        }
        return this;
    }

    public toString(): string {
        return `x: ${this.x}, y: ${this.y}, z: ${this.z}`;
    }

    public equals(v: Vec3): boolean {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }

    public angleBetween(v: Vec3): number {
        return Math.acos(this.dot(v) / (this.mag() * v.mag()));
    }

    public dot(v: Vec3): number {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    public cross(v: Vec3): Vec3 {
        const x = this.y * v.z - this.z * v.y;
        const y = this.z * v.x - this.x * v.z;
        const z = this.x * v.y - this.y * v.x;
        return new Vec3(x, y, z);
    }

    public project(v: Vec3): Vec3 {
        const scalar = this.dot(v) / v.mag();
        return v.copy().setMag(scalar);
    }

    public reject(v: Vec3): Vec3 {
        return this.copy().sub(this.project(v));
    }

    public reflect(v: Vec3): Vec3 {
        return this.copy().sub(this.project(v).mult(2));
    }
    public static fromVec2(v: Vec2, z: number): Vec3 {
        return new Vec3(v.x, v.y, z);
    }

    public static random(): Vec3 {
        return new Vec3(Math.random(), Math.random(), Math.random());
    }

    public static fromAngles(theta: number, phi: number): Vec3 {
        return new Vec3(Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta));
    }

    public static fromArray(a: number[]): Vec3 {
        return new Vec3(a[0], a[1], a[2]);
    }

    public toArray(): number[] {
        return [this.x, this.y, this.z];
    }

    public static fromObject(o: {x: number, y: number, z: number}): Vec3 {
        return new Vec3(o.x, o.y, o.z);
    }

    public toObject(): {x: number, y: number, z: number} {
        return {x: this.x, y: this.y, z: this.z};
    }

    public setFromSpherical(r: number, theta: number, phi: number): Vec3 {
        this.x = r * Math.sin(theta) * Math.cos(phi);
        this.y = r * Math.sin(theta) * Math.sin(phi);
        this.z = r * Math.cos(theta);
        return this;
    }

    public toSpherical(): {r: number, theta: number, phi: number} {
        const r = this.mag();
        const theta = Math.acos(this.z / r);
        const phi = Math.atan2(this.y, this.x);
        return {r, theta, phi};
    }

    public setAngles(theta: number, phi: number): Vec3 {
        const r = this.mag();
        this.x = r * Math.sin(theta) * Math.cos(phi);
        this.y = r * Math.sin(theta) * Math.sin(phi);
        this.z = r * Math.cos(theta);
        return this;
    }

    public setAnglesBetween(v: Vec3, v2: Vec3, theta: number, phi: number): Vec3 {
        const angle = v.angleBetween(v2);
        if (angle !== 0) {
            const r = this.mag();
            this.x = r * Math.sin(angle + theta) * Math.cos(phi);
            this.y = r * Math.sin(angle + theta) * Math.sin(phi);
            this.z = r * Math.cos(angle + theta);
        }
        return this;
    }

    public setFromCylindrical(r: number, theta: number, z: number): Vec3 {
        this.x = r * Math.cos(theta);
        this.y = r * Math.sin(theta);
        this.z = z;
        return this;
    }

    public toCylindrical(): {r: number, theta: number, z: number} {
        const r = Math.sqrt(this.x * this.x + this.y * this.y);
        const theta = Math.atan2(this.y, this.x);
        return {r, theta, z: this.z};
    }

    public add2D(v: Vec2): Vec3 {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    public sub2D(v: Vec2): Vec3 {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    public mult2D(n: number): Vec3 {
        this.x *= n;
        this.y *= n;
        return this;
    }

    public div2D(n: number): Vec3 {
        this.x /= n;
        this.y /= n;
        return this;
    }

    public mag2D(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public normlize2D(): Vec3 {
        const m = this.mag();
        if (m !== 0) this.div(m);
        return this;
    }

    public setMag2D(n: number): Vec3 {
        this.normlize().mult(n);
        return this;
    }

    public limit2D(max: number): Vec3 {
        if (this.mag() > max) this.setMag(max);
        return this;
    }

    public heading2D(): number {
        return Math.atan2(this.y, this.x);
    }

    public rotate2D(a: number): Vec3 {
        const newHeading = this.heading() + a;
        const m = this.mag();
        this.x = Math.cos(newHeading) * m;
        this.y = Math.sin(newHeading) * m;
        return this;
    }

    public lerp2D(v: Vec3, t: number): Vec3 {
        this.x = this.x + (v.x - this.x) * t;
        this.y = this.y + (v.y - this.y) * t;
        return this;
    }

    public dist2D(x: number | number[] | Vec2 | Vec3, y?: number): number {
        if (typeof x === "number" && y) {
            const dx = x - this.x;
            const dy = y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        } else if (x instanceof Vec2 && y === undefined) {
            const dx = x.x - this.x;
            const dy = x.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        } else if (x instanceof Vec3 && y === undefined) {
            const dx = x.x - this.x;
            const dy = x.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        } else if (Array.isArray(x) && y === undefined) {
            if (x.length !== 2) console.warn("Array length should be 2 but got " + x.length);
            const dx = x[0] - this.x;
            const dy = x[1] - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        } else if (x === undefined && y === undefined) {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        } else {
            throw new Error(`Invalid arguments: ${x}, ${y}`);
        }
    }
    public copy2D(): Vec3 {
        return new Vec3(this.x, this.y, 0);
    }

    public set2D(x: number | number[] | Vec2 | Vec3,y?: number): Vec3 {
        if (typeof x === "number" && y) {
            this.x = x;
            this.y = y;
        } else if (x instanceof Vec2 && y === undefined) {
            this.x = x.x;
            this.y = x.y;
        } else if (typeof x === "number" && y === undefined) {
            this.x = x;
            this.y = x;
        } else if (x instanceof Vec3 && y === undefined) {
            this.x = x.x;
            this.y = x.y;
        } else if(Array.isArray(x) && y === undefined) {
            if (x.length !== 2) console.warn("Array length should be 2 but got " + x.length);
            this.x = x[0];
            this.y = x[1];
        } else if (x === undefined && y === undefined) {
            this.x = 0;
            this.y = 0;
        } else {
            throw new Error(`Invalid arguments: ${x}, ${y}`);
        }
        return this;
    }
    public to2d(): Vec2 {
        return new Vec2(this.x, this.y);
    }


}

//dynamic functions

function createVector(x?: number | Vec2 | number[], y?: number): Vec2 {
    if (typeof x === "number" && y) {
        return new Vec2(x, y);
    } else if (typeof x === "number" && y === undefined) {
        return new Vec2(x, x);
    } else if (x instanceof Vec2 && y === undefined) {
        return x.copy();
    } else if (Array.isArray(x) && y === undefined) {
        if (x.length !== 2) console.warn("Array length should be 2 but got " + x.length);

        return new Vec2(x[0], x[1]);
    } else if (x === undefined && y === undefined) {
        return new Vec2(0, 0);
    } else {
        throw new Error(`Invalid arguments: ${x}, ${y}`);
    }
}

function create3DVector(x?: number | Vec3 | Vec2 | number[], y?: number | number[], z?: number): Vec3 {
    if (typeof x === "number" && typeof y === "number" && z) {
        return new Vec3(x, y, z);
    } else if (typeof x === "number" && Array.isArray(y) && z === undefined) {
        if (y.length !== 2) console.warn("Array length should be 2 but got " + y.length);
        return new Vec3(x, y[0], y[1]);
    } else if (typeof x === "number" && y === undefined && z === undefined) {
        return new Vec3(x, x, x);
    } else if (x instanceof Vec3 && y === undefined && z === undefined) {
        return x.copy();
    } else if (x instanceof Vec2 && y === undefined && z === undefined) {
        return Vec3.fromVec2(x, 0);
    } else if (Array.isArray(x) && y === undefined && z === undefined) {
        if (x.length !== 3) console.warn("Array length should be 3 but got " + x.length);

        return new Vec3(x[0], x[1], x[2]);
    } else if (x === undefined && y === undefined && z === undefined) {
        return new Vec3(0, 0, 0);
    } else {
        throw new Error(`Invalid arguments: ${x}, ${y}, ${z}`);
    }
}

function random2D(): Vec2 {
    return Vec2.random();
}

function random3D(): Vec3 {
    return Vec3.random();
}

export {createVector, create3DVector, random2D, random3D};
