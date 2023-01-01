import type { IColor, IColorWithClosest } from './ColorPicker'

export const distanceFunction = (color1: IColor, color2: IColor) => {
  // Calcola la distanza Euclidea tra i colori nello spazio colore RGB
  const rDistance = (color1.R - color2.R) ** 2
  const gDistance = (color1.G - color2.G) ** 2
  const bDistance = (color1.B - color2.B) ** 2
  return Math.sqrt(rDistance + gDistance + bDistance)
}

// Definisci la funzione per trovare i colori più simili usando K-NN
export function findClosestColorsKNN(
  colors1: IColor[],
  colors2: IColor[],
  k: number
) {
  // Crea un array per contenere i risultati
  const results: IColorWithClosest[] = []

  k++

  // Itera attraverso ogni colore del primo insieme
  for (const color1 of colors1) {
    // Crea un array per contenere la distanza da ogni colore del secondo insieme
    const distances = []

    // Itera attraverso ogni colore del secondo insieme
    for (const color2 of colors2) {
      // Calcola la distanza tra i due colori
      const distance = distanceFunction(color1, color2)
      // Aggiungi la distanza all'array delle distanze
      distances.push({ color: color2, distance })
    }

    // Ordina l'array delle distanze in base alla distanza
    distances.sort((a, b) => a.distance - b.distance)

    // Seleziona i K colori più vicini saltando il primo colore (che è il colore stesso)
    const closestColors = distances.slice(1, k)

    // Aggiungi il risultato all'array dei risultati
    results.push({
      original: color1,
      closestColors,
    })
  }

  // Restituisci l'array dei risultati
  return results
}

// const generateColorMap = () => {
//   const allColors: IColor[] = [...ralColors, ...ralDesignColors, ...ncsColors]

//   const allColorsWithClosest = allColors.map((color) => {
//     const ralAlternative = findClosestColorsKNN([color], ralColors, 3) || []
//     const ralDesignAlternative =
//       findClosestColorsKNN([color], ralDesignColors, 3) || []
//     const ncsAlternative = findClosestColorsKNN([color], ncsColors, 3) || []

//     const closestColors = []

//     if (ralAlternative[0]?.closestColors) {
//       closestColors.push(...ralAlternative[0]?.closestColors)
//     }
//     if (ncsAlternative[0]?.closestColors) {
//       closestColors.push(...ncsAlternative[0]?.closestColors)
//     }
//     if (ralDesignAlternative[0]?.closestColors) {
//       closestColors.push(...ralDesignAlternative[0]?.closestColors)
//     }

//     return {
//       original: color,
//       closestColors,
//     }
//   })

//   //create a map of colors with closest colors
//   const colorMap = new Map<string, IColorWithClosest>()
//   allColorsWithClosest.forEach((color) => {
//     colorMap.set(color.original.name, color)
//   })

//   console.log(colorMap)
// }
