interface ColorI {
    rgba: RGBA;
}

type RGBA = {
    r: number;
    g: number;
    b: number;
    a: number;
};

class Color implements ColorI {
    public rgba: RGBA;

    constructor(color: string) {
        this.rgba = this.FormatExtraction(color);
    }

    private FormatExtraction(color: string): RGBA {
        if (color[0] === "#" && color.length === 7) {
            return this.HEXToRGBA(color);
        } else if (color[0] === "#" && color.length === 9) {
            return this.HEXAToRGBA(color);
        } else if (color.includes("rgba")) {
            return this.RGBAToRGBA(color);
        } else if (color.includes("rgb")) {
            return this.RGBToRGBA(color);
        } else if (color.includes("hsl")) {
            return this.HSLToRGBA(color);
        } else if (color.includes("hsla")) {
            return this.HSLAToRGBA(color);
        } else if (color.includes("hsv")) {
            return this.HSVToRGBA(color);
        } else if (color.includes("hsva")) {
            return this.HSVAToRGBA(color);
        } else if (color.includes("cmyk")) {
            return this.CMYKToRGBA(color);
        } else if (color.includes("cmyka")) {
            return this.CMYKAToRGBA(color);
        } else if (color.includes("lab")) {
            return this.LABToRGBA(color);
        } else if (color.includes("laba")) {
            return this.LABAToRGBA(color);
        } else if (color.includes("lch")) {
            return this.LCHToRGBA(color);
        } else if (color.includes("lcha")) {
            return this.LCHAToRGBA(color);
        } else {
            throw new Error("Invalid color format");
        }
    }

    private HEXToRGBA(color: string): RGBA {
        return {
            r: parseInt(color.substring(1, 3), 16),
            g: parseInt(color.substring(3, 5), 16),
            b: parseInt(color.substring(5, 7), 16),
            a: 1,
        };
    }

    private HEXAToRGBA(color: string): RGBA {
        return {
            r: parseInt(color.substring(1, 3), 16),
            g: parseInt(color.substring(3, 5), 16),
            b: parseInt(color.substring(5, 7), 16),
            a: parseInt(color.substring(7, 9), 16) / 255,
        };
    }

    private RGBAToRGBA(color: string): RGBA {
        const rgba = color.substring(5, color.length - 1).split(",");
        return {
            r: parseInt(rgba[0]),
            g: parseInt(rgba[1]),
            b: parseInt(rgba[2]),
            a: parseFloat(rgba[3]),
        };
    }

    private RGBToRGBA(color: string): RGBA {
        const rgb = color.substring(4, color.length - 1).split(",");
        return {
            r: parseInt(rgb[0]),
            g: parseInt(rgb[1]),
            b: parseInt(rgb[2]),
            a: 1,
        };
    }

    private HSLToRGB(color: string): Omit<RGBA, "a"> {
        const hsl = color.substring(4, color.length - 1).split(",");
        const h = parseInt(hsl[0]) / 360;
        const s = parseInt(hsl[1]) / 100;
        const l = parseInt(hsl[2]) / 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
        };
    }

    private HSLToRGBA(color: string): RGBA {
        const rgb = this.HSLToRGB(color);
        return { ...rgb, a: 1 };
    }

    private HSLAToRGBA(color: string): RGBA {
        const hsla = color.substring(5, color.length - 1).split(",");
        const rgb = this.HSLToRGB(`hsl(${hsla[0]},${hsla[1]},${hsla[2]})`);
        return { ...rgb, a: parseFloat(hsla[3]) };
    }

    private HSVToRGB(color: string): Omit<RGBA, "a"> {
        const hsv = color.substring(4, color.length - 1).split(",");
        const h = parseInt(hsv[0]) / 360;
        const s = parseInt(hsv[1]) / 100;
        const v = parseInt(hsv[2]) / 100;
        let r, g, b;
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
            default:
                break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
        };
    }

    private HSVToRGBA(color: string): RGBA {
        const rgb = this.HSVToRGB(color);
        return { ...rgb, a: 1 };
    }

    private HSVAToRGBA(color: string): RGBA {
        const hsva = color.substring(5, color.length - 1).split(",");
        const rgb = this.HSVToRGB(`hsv(${hsva[0]},${hsva[1]},${hsva[2]})`);
        return { ...rgb, a: parseFloat(hsva[3]) };
    }

    private CMYKToRGB(color: string): Omit<RGBA, "a"> {
        const cmyk = color.substring(5, color.length - 1).split(",");
        const c = parseInt(cmyk[0]) / 100;
        const m = parseInt(cmyk[1]) / 100;
        const y = parseInt(cmyk[2]) / 100;
        const k = parseInt(cmyk[3]) / 100;

        const r = 1 - Math.min(1, c * (1 - k) + k);
        const g = 1 - Math.min(1, m * (1 - k) + k);
        const b = 1 - Math.min(1, y * (1 - k) + k);

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
        };
    }

    private CMYKToRGBA(color: string): RGBA {
        const rgb = this.CMYKToRGB(color);
        return { ...rgb, a: 1 };
    }

    private CMYKAToRGBA(color: string): RGBA {
        const cmyka = color.substring(6, color.length - 1).split(",");
        const rgb = this.CMYKToRGB(
            `cmyk(${cmyka[0]},${cmyka[1]},${cmyka[2]},${cmyka[3]})`
        );
        return { ...rgb, a: parseFloat(cmyka[4]) };
    }

    private LABToRGB(color: string): Omit<RGBA, "a"> {
        const lab = color.substring(4, color.length - 1).split(",");
        const l = parseInt(lab[0]);
        const a = parseInt(lab[1]);
        const b = parseInt(lab[2]);

        const y = (l + 16) / 116;
        const x = a / 500 + y;
        const z = y - b / 200;

        const r = this.LABToRGBHelper(x) * 255;
        const g = this.LABToRGBHelper(y) * 255;
        const b_ = this.LABToRGBHelper(z) * 255;

        return {
            r: Math.round(r),
            g: Math.round(g),
            b: Math.round(b_),
        };
    }

    private LABToRGBHelper(c: number): number {
        if (c > 0.206893034) {
            return c * c * c;
        } else {
            return (c - 4 / 29) / 7.787037;
        }
    }

    private LABToRGBA(color: string): RGBA {
        const rgb = this.LABToRGB(color);
        return { ...rgb, a: 1 };
    }

    private LABAToRGBA(color: string): RGBA {
        const laba = color.substring(5, color.length - 1).split(",");
        const rgb = this.LABToRGB(`lab(${laba[0]},${laba[1]},${laba[2]})`);
        return { ...rgb, a: parseFloat(laba[3]) };
    }

    private LCHToRGB(color: string): Omit<RGBA, "a"> {
        const lch = color.substring(4, color.length - 1).split(",");
        const l = parseInt(lch[0]);
        const c = parseInt(lch[1]);
        const h = parseInt(lch[2]);

        const a = c * Math.cos((h * Math.PI) / 180);
        const b = c * Math.sin((h * Math.PI) / 180);

        const rgb = this.LABToRGB(`lab(${l},${a},${b})`);
        return rgb;
    }

    private LCHToRGBA(color: string): RGBA {
        const rgb = this.LCHToRGB(color);
        return { ...rgb, a: 1 };
    }

    private LCHAToRGBA(color: string): RGBA {
        const lcha = color.substring(5, color.length - 1).split(",");
        const rgb = this.LCHToRGB(`lch(${lcha[0]},${lcha[1]},${lcha[2]})`);
        return { ...rgb, a: parseFloat(lcha[3]) };
    }
}
