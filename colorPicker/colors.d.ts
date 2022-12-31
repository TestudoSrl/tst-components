import { IColor } from "./ColorPicker";
export declare const ralColors: IColor[];
export declare const ralDesignColors: IColor[];
export declare const ncsColors: IColor[];
export declare const allColorsWithClosest: {
    key: string;
    value: {
        original: {
            R: number;
            G: number;
            B: number;
            name: string;
            english: string;
            italian: string;
        };
        closestColors: {
            color: {
                R: number;
                G: number;
                B: number;
                name: string;
                english: string;
                italian: string;
            };
            distance: number;
        }[];
    };
}[];
