"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContrastRatio = exports.cie2000DistanceHex = exports.cie2000Distance = exports.calculateEuclideanDistance = exports.generateColorsMap = void 0;
var tslib_1 = require("tslib");
var d3 = tslib_1.__importStar(require("d3-color"));
var colorsLab_1 = require("./colorsLab");
function generateColorsMap() {
    var maxAlternative = 3;
    var allColors = tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], colorsLab_1.ralColors, true), colorsLab_1.ralDesignColors, true), colorsLab_1.ncsColors, true);
    var allColorsWithClosest = allColors.map(function (color) {
        var _a, _b, _c;
        var ralAlternative = findClosestColors(colorsLab_1.ralColors, color, maxAlternative);
        var ralDesignAlternative = findClosestColors(colorsLab_1.ralDesignColors, color, maxAlternative);
        var ncsAlternative = findClosestColors(colorsLab_1.ncsColors, color, maxAlternative);
        var res = { original: color, closestColors: [] };
        (_a = res.closestColors).push.apply(_a, ralAlternative.closestColors);
        (_b = res.closestColors).push.apply(_b, ralDesignAlternative.closestColors);
        (_c = res.closestColors).push.apply(_c, ncsAlternative.closestColors);
        return res;
    });
    return allColorsWithClosest;
}
exports.generateColorsMap = generateColorsMap;
function findClosestColors(colors, target, limit) {
    var closestColors = [];
    for (var _i = 0, colors_1 = colors; _i < colors_1.length; _i++) {
        var color = colors_1[_i];
        if (color.name === target.name) {
            continue;
        }
        // const distance = calculateEuclideanDistance(color.hex, target.hex);
        var distance = cie2000Distance(color.lab, target.lab);
        closestColors.push({ color: color, distance: distance });
    }
    closestColors.sort(function (a, b) { return a.distance - b.distance; });
    return {
        original: target,
        closestColors: closestColors.slice(0, limit), // skip the first one, which is the target itself
    };
}
function calculateEuclideanDistance(color1, color2) {
    var r1 = parseInt(color1.slice(1, 3), 16);
    var g1 = parseInt(color1.slice(3, 5), 16);
    var b1 = parseInt(color1.slice(5, 7), 16);
    var r2 = parseInt(color2.slice(1, 3), 16);
    var g2 = parseInt(color2.slice(3, 5), 16);
    var b2 = parseInt(color2.slice(5, 7), 16);
    var distance = Math.sqrt(Math.pow((r1 - r2), 2) + Math.pow((g1 - g2), 2) + Math.pow((b1 - b2), 2));
    return distance;
}
exports.calculateEuclideanDistance = calculateEuclideanDistance;
function cie2000Distance(source, target) {
    // Calculate the difference between the lightness values
    var l = source.l - target.l;
    // Calculate the difference between the a* values
    var a = source.a - target.a;
    // Calculate the difference between the b* values
    var b = source.b - target.b;
    // Calculate the CIE2000 color difference using the formula:
    // sqrt((l / kL)^2 + (a / kC)^2 + (b / kH)^2)
    // where kL, kC, and kH are constants that depend on the viewing conditions
    var kL = 1;
    var kC = 1;
    var kH = 1;
    var distance = Math.sqrt((l * l) / (kL * kL) + (a * a) / (kC * kC) + (b * b) / (kH * kH));
    return distance;
}
exports.cie2000Distance = cie2000Distance;
function cie2000DistanceHex(color1, color2) {
    // Convert the hexadecimal colors to L*a*b* values using the d3-color library
    if (color1 === color2) {
        return 0;
    }
    var lab1 = d3.lab(d3.rgb(color1));
    var lab2 = d3.lab(d3.rgb(color2));
    // Calculate the difference between the lightness values
    var l = lab1.l - lab2.l;
    // Calculate the difference between the a* values
    var a = lab1.a - lab2.a;
    // Calculate the difference between the b* values
    var b = lab1.b - lab2.b;
    // Calculate the CIE2000 color difference using the formula:
    // sqrt((l / kL)^2 + (a / kC)^2 + (b / kH)^2)
    // where kL, kC, and kH are constants that depend on the viewing conditions
    var kL = 1;
    var kC = 1;
    var kH = 1;
    var distance = Math.sqrt((l * l) / (kL * kL) + (a * a) / (kC * kC) + (b * b) / (kH * kH));
    return distance;
}
exports.cie2000DistanceHex = cie2000DistanceHex;
function getContrastRatio(color1, color2) {
    function hexToRgb(hex) {
        // Extract the red, green, and blue components from the hex string
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) {
            throw new Error("Invalid hex color: ".concat(hex));
        }
        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        };
    }
    function calcLuminance(rgb) {
        // Convert the RGB values to sRGB
        var r = rgb.r / 255;
        var g = rgb.g / 255;
        var b = rgb.b / 255;
        // Apply the sRGB to relative luminance formula
        return (0.2126 * (r <= 0.03928 ? r / 12.92 : Math.pow(((r + 0.055) / 1.055), 2.4)) +
            0.7152 * (g <= 0.03928 ? g / 12.92 : Math.pow(((g + 0.055) / 1.055), 2.4)) +
            0.0722 * (b <= 0.03928 ? b / 12.92 : Math.pow(((b + 0.055) / 1.055), 2.4)));
    }
    // Convert the hex color strings to RGB values
    var rgb1 = hexToRgb(color1.hex);
    var rgb2 = hexToRgb(color2.hex);
    // Calculate the relative luminance of the two colors
    var lum1 = calcLuminance(rgb1);
    var lum2 = calcLuminance(rgb2);
    // Calculate the contrast ratio
    var contrast = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
    return contrast;
}
exports.getContrastRatio = getContrastRatio;
//# sourceMappingURL=closest-colors.js.map