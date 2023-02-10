export declare const updateColorMapRal: () => Promise<void>;
export declare const updateColorMapRalDesign: () => Promise<void>;
export declare const updateAllColors: () => Promise<void>;
export interface Lab {
    a: number;
    b: number;
    l: number;
    opacity: number;
}
export interface IColorWithLab {
    name: string;
    hex: string;
    description?: string;
    lab?: Lab;
}
export interface Rgb {
    r: number;
    g: number;
    b: number;
}
export interface Hsl {
    h: number;
    s: number;
    l: number;
}
export interface Hsb {
    h: number;
    s: number;
    b: number;
}
export interface Cmyk {
    c: string;
    m: string;
    y: string;
    k: string;
}
export interface ColorDetails {
    name: string;
    originalHex: string;
    hex: string;
    diff: boolean;
    websafe: string;
    rgb: Rgb;
    hsl: Hsl;
    hsb: Hsb;
    cmyk: Cmyk;
}
