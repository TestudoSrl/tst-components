import type { IColor, IColorWithClosest } from './ColorPicker';
import { ncsColors, ralColors, ralDesignColors } from './colors';

export function generateColorMap(): IColorWithClosest[] {
  const maxAlternative = 3;

  const allColors: IColor[] = [...ralColors, ...ralDesignColors, ...ncsColors];

  const allColorsWithClosest = allColors.map((color) => {
    const ralAlternative = findClosestColors(ralColors, color, maxAlternative);
    const ralDesignAlternative = findClosestColors(ralDesignColors, color, maxAlternative);
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
    const distance = calculateEuclideanDistance(color.hex, target.hex);
    closestColors.push({ color, distance });
  }

  closestColors.sort((a, b) => a.distance - b.distance);

  return {
    original: target,
    closestColors: closestColors.slice(0, limit),
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