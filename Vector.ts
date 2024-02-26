interface VectorI {
    x: number;
    y: number;
    z: number;

    add(v: Vector): Vector;
    subtract(v: Vector): Vector;
    multiply(v: Vector): Vector;
    divide(v: Vector): Vector;
    scale(s: number): Vector;
    dot(v: Vector): number;
    cross(v: Vector): Vector;
    magnitude(): number;
    normalize(): Vector;
    distance(v: Vector): number;
    angle(v: Vector): number;
    equals(v: Vector): boolean;
    clone(): Vector;
    set(x: number, y: number, z: number): Vector;
    setX(x: number): Vector;
    setY(y: number): Vector;
    setZ(z: number): Vector;
    toArray(): number[];
    toString(): string;
}

class Vector implements VectorI {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    public subtract(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    public multiply(v: Vector): Vector {
        return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
    }

    public divide(v: Vector): Vector {
        return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
    }

    public scale(s: number): Vector {
        return new Vector(this.x * s, this.y * s, this.z * s);
    }

    public dot(v: Vector): number {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    public cross(v: Vector): Vector {
        return new Vector(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public normalize(): Vector {
        return this.scale(1 / this.magnitude());
    }

    public distance(v: Vector): number {
        return this.subtract(v).magnitude();
    }

    public angle(v: Vector): number {
        return Math.acos(this.dot(v) / (this.magnitude() * v.magnitude()));
    }

    public equals(v: Vector): boolean {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }

    public clone(): Vector {
        return new Vector(this.x, this.y, this.z);
    }

    public set(x: number, y: number, z: number): Vector {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    public setX(x: number): Vector {
        this.x = x;
        return this;
    }

    public setY(y: number): Vector {
        this.y = y;
        return this;
    }

    public setZ(z: number): Vector {
        this.z = z;
        return this;
    }

    public toArray(): number[] {
        return [this.x, this.y, this.z];
    }

    public toString(): string {
        return `Vector(${this.x}, ${this.y}, ${this.z})`;
    }

    public static add(v1: Vector, v2: Vector): Vector {
        return v1.add(v2);
    }

    public static subtract(v1: Vector, v2: Vector): Vector {
        return v1.subtract(v2);
    }

    public static multiply(v1: Vector, v2: Vector): Vector {
        return v1.multiply(v2);
    }

    public static divide(v1: Vector, v2: Vector): Vector {
        return v1.divide(v2);
    }

    public static scale(v: Vector, s: number): Vector {
        return v.scale(s);
    }

    public static dot(v1: Vector, v2: Vector): number {
        return v1.dot(v2);
    }

    public static cross(v1: Vector, v2: Vector): Vector {
        return v1.cross(v2);
    }

    public static magnitude(v: Vector): number {
        return v.magnitude();
    }

    public static normalize(v: Vector): Vector {
        return v.normalize();
    }

    public static distance(v1: Vector, v2: Vector): number {
        return v1.distance(v2);
    }

    public static angle(v1: Vector, v2: Vector): number {
        return v1.angle(v2);
    }

    public static equals(v1: Vector, v2: Vector): boolean {
        return v1.equals(v2);
    }

    public static clone(v: Vector): Vector {
        return v.clone();
    }
}

