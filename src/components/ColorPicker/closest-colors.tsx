import * as d3 from 'd3-color';

import type { IColor, IColorWithClosest } from './ColorPicker';
import { ncsColors, ralColors, ralDesignColors } from './colors';

export function generateColorMap(): IColorWithClosest[] {
  const maxAlternative = 3;

  const allColors: IColor[] = [...ralColors, ...ralDesignColors, ...ncsColors];

  const allColorsWithClosest = allColors.map((color) => {
    const ralAlternative = findClosestColors(ralColors, color, maxAlternative);
    // const ralDesignAlternative = findClosestColors(ralDesignColors, color, maxAlternative);
    const ncsAlternative = findClosestColors(ncsColors, color, maxAlternative);

    const res: IColorWithClosest = { original: color, closestColors: [] };

    res.closestColors.push(...ralAlternative.closestColors);
    // res.closestColors.push(...ralDesignAlternative.closestColors);
    res.closestColors.push(...ncsAlternative.closestColors);

    return res;
  });

  return allColorsWithClosest;
}

function findClosestColors(colors: IColor[], target: IColor, limit: number): IColorWithClosest {
  const closestColors: { color: IColor; distance: number }[] = [];

  for (const color of colors) {
    if (color.name === target.name) {
      continue;
    }

    // const distance = calculateEuclideanDistance(color.hex, target.hex);

    const distance = cie2000DistanceHex(color.hex, target.hex);
    closestColors.push({ color, distance });
  }

  closestColors.sort((a, b) => a.distance - b.distance);

  return {
    original: target,
    closestColors: closestColors.slice(0, limit), //skip the first one, which is the target itself
  };
}

export function calculateEuclideanDistance(color1: string, color2: string): number {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);
  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const distance = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
  return distance;
}

export function cie2000DistanceHex(color1: string, color2: string) {
  // Convert the hexadecimal colors to L*a*b* values using the d3-color library

  if (color1 === color2) {
    return 0;
  }
  const lab1 = d3.lab(d3.rgb(color1));
  const lab2 = d3.lab(d3.rgb(color2));

  // Calculate the difference between the lightness values
  const l = lab1.l - lab2.l;

  // Calculate the difference between the a* values
  const a = lab1.a - lab2.a;

  // Calculate the difference between the b* values
  const b = lab1.b - lab2.b;

  // Calculate the CIE2000 color difference using the formula:
  // sqrt((l / kL)^2 + (a / kC)^2 + (b / kH)^2)
  // where kL, kC, and kH are constants that depend on the viewing conditions
  const kL = 1;
  const kC = 1;
  const kH = 1;
  const distance = Math.sqrt((l * l) / (kL * kL) + (a * a) / (kC * kC) + (b * b) / (kH * kH));

  return distance;
}

export function cie2000DistanceRgb(color1: string, color2: string) {
  // Convert the hexadecimal colors to L*a*b* values using the d3-color library
  const lab1 = d3.lab(color1);
  const lab2 = d3.lab(color2);

  // Calculate the difference between the lightness values
  const l = lab1.l - lab2.l;

  // Calculate the difference between the a* values
  const a = lab1.a - lab2.a;

  // Calculate the difference between the b* values
  const b = lab1.b - lab2.b;

  // Calculate the CIE2000 color difference using the formula:
  // sqrt((l / kL)^2 + (a / kC)^2 + (b / kH)^2)
  // where kL, kC, and kH are constants that depend on the viewing conditions
  const kL = 1;
  const kC = 1;
  const kH = 1;
  const distance = Math.sqrt((l * l) / (kL * kL) + (a * a) / (kC * kC) + (b * b) / (kH * kH));

  return distance;
}
