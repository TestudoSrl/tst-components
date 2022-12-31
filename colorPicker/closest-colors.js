export var distanceFunction = function (color1, color2) {
    // Calcola la distanza Euclidea tra i colori nello spazio colore RGB
    var rDistance = Math.pow((color1.R - color2.R), 2);
    var gDistance = Math.pow((color1.G - color2.G), 2);
    var bDistance = Math.pow((color1.B - color2.B), 2);
    return Math.sqrt(rDistance + gDistance + bDistance);
};
// Definisci la funzione per trovare i colori più simili usando K-NN
export function findClosestColorsKNN(colors1, colors2, k) {
    // Crea un array per contenere i risultati
    var results = [];
    k++;
    // Itera attraverso ogni colore del primo insieme
    for (var _i = 0, colors1_1 = colors1; _i < colors1_1.length; _i++) {
        var color1 = colors1_1[_i];
        // Crea un array per contenere la distanza da ogni colore del secondo insieme
        var distances = [];
        // Itera attraverso ogni colore del secondo insieme
        for (var _a = 0, colors2_1 = colors2; _a < colors2_1.length; _a++) {
            var color2 = colors2_1[_a];
            // Calcola la distanza tra i due colori
            var distance = distanceFunction(color1, color2);
            // Aggiungi la distanza all'array delle distanze
            distances.push({ color: color2, distance: distance });
        }
        // Ordina l'array delle distanze in base alla distanza
        distances.sort(function (a, b) { return a.distance - b.distance; });
        // Seleziona i K colori più vicini saltando il primo colore (che è il colore stesso)
        var closestColors = distances.slice(1, k);
        // Aggiungi il risultato all'array dei risultati
        results.push({
            original: color1,
            closestColors: closestColors
        });
    }
    // Restituisci l'array dei risultati
    return results;
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
//# sourceMappingURL=closest-colors.js.map