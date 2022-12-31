import React from 'react';
export interface ColorPickerProps {
    title: string;
    onSelected: (color: string) => void;
}
export interface IColor {
    R: number;
    G: number;
    B: number;
    name: string;
    english: string;
    italian: string;
}
export interface IColorWithClosest {
    original: IColor;
    closestColors: {
        color: IColor;
        distance: number;
    }[];
}
declare const ColorPicker: React.FC<ColorPickerProps>;
export default ColorPicker;
