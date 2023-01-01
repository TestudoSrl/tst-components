import * as chroma from 'chroma-js';

import type { IColor, IColorWithClosest } from './ColorPicker';
import { ncsColors, ralColors, ralDesignColors } from './colors';


export const generateColorMap = () => {

  //calculate rgb for all colors
  const ralColorsWithRGB = calculateRGB(ralColors.map((color) => color.name));
  console.log('ralColorsWithRGB', ralColorsWithRGB);

  const ralDesignColorsWithRGB = calculateRGB(ralDesignColors.map((color) => color.name));

  const ncsColorsWithRGB = calculateRGB(ncsColors.map((color) => color.name));

  const allColorsWithRGB: IColor[] = [...ralColorsWithRGB, ...ralDesignColorsWithRGB, ...ncsColorsWithRGB];

  const allColorsWithClosest = allColorsWithRGB.map((color) => {
    const ralAlternative = findClosestColorsKNN([color], ralColorsWithRGB, 3) || [];
    const ralDesignAlternative = findClosestColorsKNN([color], ralDesignColorsWithRGB, 3) || [];
    const ncsAlternative = findClosestColorsKNN([color], ncsColorsWithRGB, 3) || [];

    const closestColors = [];

    if (ralAlternative[0]?.closestColors) {
      closestColors.push(...ralAlternative[0]?.closestColors);
    }
    if (ncsAlternative[0]?.closestColors) {
      closestColors.push(...ncsAlternative[0]?.closestColors);
    }
    if (ralDesignAlternative[0]?.closestColors) {
      closestColors.push(...ralDesignAlternative[0]?.closestColors);
    }

    return {
      original: color,
      closestColors,
    };
  });

  return allColorsWithClosest;

};


export const distanceFunction = (color1: IColor, color2: IColor) => {
  // Calcola la distanza Euclidea tra i colori nello spazio colore RGB
  const rDistance = Math.abs(color1.R - color2.R) ** 2;
  const gDistance = Math.abs(color1.G - color2.G) ** 2;
  const bDistance = Math.abs(color1.B - color2.B) ** 2;
  return Math.sqrt(rDistance + gDistance + bDistance);
};


// Definisci la funzione per trovare i colori più simili usando K-NN
export function findClosestColorsKNN(colors1: IColor[], colors2: IColor[], k: number) {
  // Crea un array per contenere i risultati
  const results: IColorWithClosest[] = [];

  k++;

  // Itera attraverso ogni colore del primo insieme
  for (const color1 of colors1) {
    // Crea un array per contenere la distanza da ogni colore del secondo insieme
    const distances = [];

    // Itera attraverso ogni colore del secondo insieme
    for (const color2 of colors2) {
      // Calcola la distanza tra i due colori
      const distance = distanceFunction(color1, color2);
      // Aggiungi la distanza all'array delle distanze
      distances.push({ color: color2, distance });
    }

    // Ordina l'array delle distanze in base alla distanza
    distances.sort((a, b) => a.distance - b.distance);

    // Seleziona i K colori più vicini saltando il primo colore (che è il colore stesso)
    const closestColors = distances.slice(1, k);

    // Aggiungi il risultato all'array dei risultati
    results.push({
      original: color1,
      closestColors,
    });
  }

  // Restituisci l'array dei risultati
  return results;
}

const calculateRGB = (colors: string[]): IColor[] => {
  console.log('calculateRGB');

  const cColo = chroma(colors).rgb();
  console.log('cColo', cColo);

  const res = colors.map((color) => {
    const family = identifyColorFamily(color);
    switch (family) {
      case 'RAL':
      // return ralToRgb(color);
      case 'RAL Design':
        return ralDesignToRgb(color);
      case 'NCS':
        return ncsToRgb(color);
      default:
        console.log('undefined color', color);
        return { name: 'undefined-' + color, R: 0, G: 0, B: 0, english: 'undefined', italian: 'undefined' };
    }
  });

  return res;

};

const identifyColorFamily = (color: string): ('RAL' | 'RAL Design' | 'NCS' | 'unknown') => {
  //test if color is RAL with regex RAL \d\d\d\d
  const ralRegex = /^RAL \d\d\d\d$/;
  if (ralRegex.test(color)) {
    return 'RAL';
  }
  //test if color is RAL Design with regex RAL \d\d\d \d\d \d\d
  const ralDesignRegex = /^RAL \d\d\d \d\d \d\d$/;
  if (ralDesignRegex.test(color)) {
    return 'RAL Design';
  }
  //test if color is NCS with regex /^S\s*\d{4}-[BGGRRYN][\dABCDEFGHIJKLMNOPQRSTUVWXYZ]*$/
  const ncsRegex = /^S\s*\d{4}-[BGGRRYN][\dABCDEFGHIJKLMNOPQRSTUVWXYZ]*$/;
  if (ncsRegex.test(color)) {
    return 'NCS';
  }
  return 'unknown';
};


function ralDesignToRgb(ral: string): IColor {
  if (identifyColorFamily(ral) !== 'RAL Design') {
    throw new Error('Invalid RAL Design color string ' + ral);
  }
  // Normalize the RAL Design color code and split it
  const ralValues = ral.toUpperCase().trim().split(' ')

  // Extract the chromaticity coordinates from the RAL Design color code
  const L = parseInt(ralValues[1]);
  const a = parseInt(ralValues[2]);
  const b = parseInt(ralValues[3]);

  // Convert the chromaticity coordinates to the CIE XYZ color space
  const X = (L + 16) / 116 + a / 500;
  const Y = (L + 16) / 116;
  const Z = (L + 16) / 116 - b / 200;

  // Convert the CIE XYZ values to the RGB color space
  const R = 3.2406 * X - 1.5372 * Y - 0.4986 * Z;
  const G = -0.9689 * X + 1.8758 * Y + 0.0415 * Z;
  const B = 0.0557 * X - 0.2040 * Y + 1.0570 * Z;

  // Normalize the RGB values to the range [0, 1] and return them as a tuple
  const normalizedValue = [R, G, B].map((c) => c <= 0.0031308 ? 12.92 * c : (1 + 0.055) * Math.pow(c, 1 / 2.4) - 0.055) as [number, number, number];
  return { name: ral, R: normalizedValue[0], G: normalizedValue[1], B: normalizedValue[2], english: '', italian: '' };
}

export function ncsToRgb(ncs: string): IColor {
  // Normalize the NCS color code
  ncs = ncs.toUpperCase().trim();

  // Extract the chroma and lightness values from the NCS color code
  const chroma = parseInt(ncs.slice(1, 4));
  const lightness = ncs.substring(4, 6);

  // Convert the chroma and lightness values to the LCH color space
  const L = lightnessToL(lightness);
  const C = chromaToC(chroma);
  const H = hueToH(ncs[7]);


  // Convert the LCH values to the RGB color space
  const rgb = lchToRgb(L, C, H)

  // Normalize the RGB values to the range [0, 1] and return them as a tuple
  return { name: ncs, R: rgb.r, G: rgb.b, B: rgb.b, english: '', italian: '' };
}

function chromaToC(chroma: number): number {
  return chroma / 9 * 140;
}

function lchToRgb(l: number, c: number, h: number): { r: number, g: number, b: number } {
  // Convert LCH to LAB
  const radians = h * Math.PI / 180;
  const a = c * Math.cos(radians);
  const b0 = c * Math.sin(radians);

  // Convert LAB to XYZ
  const y = (l + 16) / 116;
  const x = a / 500 + y;
  const z = y - b0 / 200;

  const x3 = x ** 3;
  const y3 = y ** 3;
  const z3 = z ** 3;

  const xyz = {
    x: x3 > 0.008856 ? x3 : (x - 16 / 116) / 7.787,
    y: l > 7.9996247999999985 ? y3 : l / 903.3,
    z: z3 > 0.008856 ? z3 : (z - 16 / 116) / 7.787,
  };

  // Convert XYZ to RGB
  const r = xyz.x * 3.2406 + xyz.y * -1.5372 + xyz.z * -0.4986;
  const g = xyz.x * -0.9689 + xyz.y * 1.8758 + xyz.z * 0.0415;
  const b = xyz.x * 0.0557 + xyz.y * -0.2040 + xyz.z * 1.0570;

  const r2 = r > 0.0031308 ? 1.055 * r ** (1 / 2.4) - 0.055 : 12.92 * r;
  const g2 = g > 0.0031308 ? 1.055 * g ** (1 / 2.4) - 0.055 : 12.92 * g;
  const b2 = b > 0.0031308 ? 1.055 * b ** (1 / 2.4) - 0.055 : 12.92 * b;

  return {
    r: Math.round(r2 * 255),
    g: Math.round(g2 * 255),
    b: Math.round(b2 * 255),
  };
}


function hueToH(hue: string): number {
  switch (hue) {
    case "Y":
      return 60;
    case "R":
      return 120;
    case "B":
      return 180;
    case "G":
      return 240;
    case "N":
      return 300;
    case "M":
      return 0;
    default:
      throw new Error(`Invalid NCS hue value: ${hue}`);
  }
}


function lightnessToL(lightness: string): number {
  const Lmin = 8.2;
  const Lmax = 124;
  const lightnessMin = 1;
  const lightnessMax = 23;
  return Lmin + (parseInt(lightness) - lightnessMin) * (Lmax - Lmin) / (lightnessMax - lightnessMin);
}