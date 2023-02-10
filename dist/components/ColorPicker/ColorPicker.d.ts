import React from 'react';
export interface ColorPickerProps {
    onSelectedColor: (color: string) => void;
    colorsInStock: string[];
    showCloestColors: boolean;
}
export interface IColor {
    name: string;
    hex: string;
    description: string;
    lab: Lab;
}
export interface Lab {
    l: number;
    a: number;
    b: number;
    opacity: number;
}
export interface IColorWithDistance {
    color: IColor;
    distance: number;
}
export interface IColorWithClosest {
    original: IColor;
    closestColors: IColorWithDistance[];
}
declare const _default: React.NamedExoticComponent<ColorPickerProps>;
export default _default;
