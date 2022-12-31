import type { IColor, IColorWithClosest } from './ColorPicker';
export declare const distanceFunction: (color1: IColor, color2: IColor) => number;
export declare function findClosestColorsKNN(colors1: IColor[], colors2: IColor[], k: number): IColorWithClosest[];
