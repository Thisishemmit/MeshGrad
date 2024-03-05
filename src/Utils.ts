import Vec2 from "./Vector";

export default class Utils {
    public static getMousePos(canvas: HTMLCanvasElement, e: MouseEvent): Vec2 {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return new Vec2(x, y);
    }

    public static map(value: number, min1: number, max1: number, min2: number, max2: number): number {
        return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
    }
}
