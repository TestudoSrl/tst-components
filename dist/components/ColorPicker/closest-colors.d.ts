import type { IColor, IColorWithClosest, Lab } from './ColorPicker';
export declare function generateColorsMap(): IColorWithClosest[];
export declare function calculateEuclideanDistance(color1: string, color2: string): number;
export declare function cie2000Distance(source: Lab, target: Lab): number;
export declare function cie2000DistanceHex(color1: string, color2: string): number;
export declare function getContrastRatio(color1: IColor, color2: IColor): number;
