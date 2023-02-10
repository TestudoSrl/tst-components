"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAllColors = exports.updateColorMapRalDesign = exports.updateColorMapRal = void 0;
var tslib_1 = require("tslib");
/* eslint-disable prettier/prettier */
var d3 = tslib_1.__importStar(require("d3-color"));
var colors_1 = require("../ColorPicker/colors");
var updateColorMapRal = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var targetUrl, proxyUrl, correctedColors, colorDetails, colorProcessed, _a, ralColors_1, ralColors_1_1, color, urlWithColor, response, processedColor, linkC, responseText, obj, e_1_1, link;
    var _b, e_1, _c, _d;
    return tslib_1.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                targetUrl = 'https://rgb.to/save/json/ral/';
                proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                correctedColors = [];
                colorDetails = [];
                colorProcessed = [
                    'RAL 2017',
                    'RAL 9012',
                    'RAL 1000',
                    'RAL 1001',
                    'RAL 1002',
                    'RAL 1003',
                    'RAL 1004',
                    'RAL 1005',
                    'RAL 1006',
                    'RAL 1007',
                    'RAL 1011',
                    'RAL 1012',
                    'RAL 1013',
                    'RAL 1014',
                    'RAL 1015',
                    'RAL 1016',
                    'RAL 1017',
                    'RAL 1018',
                    'RAL 1019',
                    'RAL 1020',
                    'RAL 1021',
                    'RAL 1023',
                    'RAL 1024',
                    'RAL 1026',
                    'RAL 1027',
                    'RAL 1028',
                    'RAL 1032',
                    'RAL 1033',
                    'RAL 1034',
                    'RAL 1035',
                    'RAL 1036',
                    'RAL 1037',
                    'RAL 2000',
                    'RAL 2001',
                    'RAL 2002',
                    'RAL 2003',
                    'RAL 2004',
                    'RAL 2005',
                    'RAL 2007',
                    'RAL 2008',
                    'RAL 2009',
                    'RAL 2010',
                    'RAL 2011',
                    'RAL 2012',
                    'RAL 2013',
                    'RAL 3000',
                    'RAL 3001',
                    'RAL 3002',
                    'RAL 3003',
                    'RAL 3004',
                    'RAL 3005',
                    'RAL 3007',
                    'RAL 3009',
                    'RAL 3011',
                    'RAL 3012',
                    'RAL 3013',
                    'RAL 3014',
                    'RAL 3015',
                    'RAL 3016',
                    'RAL 3017',
                    'RAL 3018',
                    'RAL 3020',
                    'RAL 3022',
                    'RAL 3024',
                    'RAL 3026',
                    'RAL 3027',
                    'RAL 3028',
                    'RAL 3031',
                    'RAL 3032',
                    'RAL 3033',
                    'RAL 4001',
                    'RAL 4002',
                    'RAL 4003',
                    'RAL 4004',
                    'RAL 4005',
                    'RAL 4006',
                    'RAL 4007',
                    'RAL 4008',
                    'RAL 4009',
                    'RAL 4010',
                    'RAL 4011',
                    'RAL 4012',
                    'RAL 5000',
                    'RAL 5001',
                    'RAL 5002',
                    'RAL 5003',
                    'RAL 5004',
                    'RAL 5005',
                    'RAL 5007',
                    'RAL 5008',
                    'RAL 5009',
                    'RAL 5010',
                    'RAL 5011',
                    'RAL 5012',
                    'RAL 5013',
                    'RAL 5014',
                    'RAL 5015',
                    'RAL 5017',
                    'RAL 5018',
                    'RAL 5019',
                    'RAL 5020',
                    'RAL 5021',
                    'RAL 5022',
                    'RAL 5023',
                    'RAL 5024',
                    'RAL 5025',
                    'RAL 5026',
                    'RAL 6000',
                    'RAL 6001',
                    'RAL 6002',
                    'RAL 6003',
                    'RAL 6004',
                    'RAL 6005',
                    'RAL 6006',
                    'RAL 6007',
                    'RAL 6008',
                    'RAL 6009',
                    'RAL 6010',
                    'RAL 6011',
                    'RAL 6012',
                    'RAL 6013',
                    'RAL 6014',
                    'RAL 6015',
                    'RAL 6016',
                    'RAL 6017',
                    'RAL 6018',
                    'RAL 6019',
                    'RAL 6020',
                    'RAL 6021',
                    'RAL 6022',
                    'RAL 6024',
                    'RAL 6025',
                    'RAL 6026',
                    'RAL 6027',
                    'RAL 6028',
                    'RAL 6029',
                    'RAL 6032',
                    'RAL 6033',
                    'RAL 6034',
                    'RAL 6035',
                    'RAL 6036',
                    'RAL 6037',
                    'RAL 6038',
                    'RAL 7000',
                    'RAL 7001',
                    'RAL 7002',
                    'RAL 7003',
                    'RAL 7004',
                    'RAL 7005',
                    'RAL 7006',
                    'RAL 7008',
                    'RAL 7009',
                    'RAL 7010',
                    'RAL 7011',
                    'RAL 7012',
                    'RAL 7013',
                    'RAL 7015',
                    'RAL 7016',
                    'RAL 7021',
                    'RAL 7022',
                    'RAL 7023',
                    'RAL 7024',
                    'RAL 7026',
                    'RAL 7030',
                    'RAL 7031',
                    'RAL 7032',
                    'RAL 7033',
                    'RAL 7034',
                    'RAL 7035',
                    'RAL 7036',
                    'RAL 7037',
                    'RAL 7038',
                    'RAL 7039',
                    'RAL 7040',
                    'RAL 7042',
                    'RAL 7043',
                    'RAL 7044',
                    'RAL 7045',
                    'RAL 7046',
                    'RAL 7047',
                    'RAL 7048',
                    'RAL 8000',
                    'RAL 8001',
                    'RAL 8002',
                    'RAL 8003',
                    'RAL 8004',
                    'RAL 8007',
                    'RAL 8008',
                    'RAL 8011',
                    'RAL 8012',
                    'RAL 8014',
                    'RAL 8015',
                    'RAL 8016',
                    'RAL 8017',
                    'RAL 8019',
                    'RAL 8022',
                    'RAL 8023',
                    'RAL 8024',
                    'RAL 8025',
                    'RAL 8028',
                    'RAL 8029',
                    'RAL 9001',
                ];
                _e.label = 1;
            case 1:
                _e.trys.push([1, 11, 12, 17]);
                _a = true, ralColors_1 = tslib_1.__asyncValues(colors_1.ralColors);
                _e.label = 2;
            case 2: return [4 /*yield*/, ralColors_1.next()];
            case 3:
                if (!(ralColors_1_1 = _e.sent(), _b = ralColors_1_1.done, !_b)) return [3 /*break*/, 10];
                _d = ralColors_1_1.value;
                _a = false;
                _e.label = 4;
            case 4:
                _e.trys.push([4, , 8, 9]);
                color = _d;
                urlWithColor = targetUrl + color.name.replace('RAL ', '');
                if (colorProcessed.length > 0 && colorProcessed.includes(color.name)) {
                    return [3 /*break*/, 9];
                }
                // wait 10 seconds before each request
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
            case 5:
                // wait 10 seconds before each request
                _e.sent();
                return [4 /*yield*/, fetch(proxyUrl + urlWithColor, { headers: { origin: 'http://localhost:6006' } })];
            case 6:
                response = _e.sent();
                if (response.status !== 200) {
                    processedColor = correctedColors.map(function (c) { return c.name; });
                    linkC = document.createElement('a');
                    linkC.setAttribute('href', 'data:text/plain;charset=utf-8,' +
                        encodeURIComponent(JSON.stringify({ correctedColors: correctedColors, processedCoror: processedColor }, null, 2)));
                    linkC.setAttribute('download', 'colors.json');
                    linkC.click();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, response.text()];
            case 7:
                responseText = _e.sent();
                // check if the response is valid json
                if (!responseText.startsWith('{')) {
                    return [3 /*break*/, 9];
                }
                obj = JSON.parse(responseText);
                color.hex = obj.hex;
                obj.name = color.name;
                correctedColors.push(color);
                colorDetails.push(obj);
                return [3 /*break*/, 9];
            case 8:
                _a = true;
                return [7 /*endfinally*/];
            case 9: return [3 /*break*/, 2];
            case 10: return [3 /*break*/, 17];
            case 11:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 17];
            case 12:
                _e.trys.push([12, , 15, 16]);
                if (!(!_a && !_b && (_c = ralColors_1.return))) return [3 /*break*/, 14];
                return [4 /*yield*/, _c.call(ralColors_1)];
            case 13:
                _e.sent();
                _e.label = 14;
            case 14: return [3 /*break*/, 16];
            case 15:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 16: return [7 /*endfinally*/];
            case 17:
                link = document.createElement('a');
                link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify({ correctedColors: correctedColors }, null, 2)));
                link.setAttribute('download', 'colors.json');
                link.click();
                return [2 /*return*/];
        }
    });
}); };
exports.updateColorMapRal = updateColorMapRal;
var updateColorMapRalDesign = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var correctedColors, link;
    return tslib_1.__generator(this, function (_a) {
        correctedColors = colors_1.ralDesignColors.map(function (color) {
            var value = d3.color(d3.rgb(color.R, color.G, color.B));
            var hex = value.formatHex();
            var colorWithHex = {
                name: color.name,
                hex: hex,
                description: color.english,
            };
            return colorWithHex;
        });
        link = document.createElement('a');
        link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify({ correctedColors: correctedColors }, null, 2)));
        link.setAttribute('download', 'colors.json');
        link.click();
        return [2 /*return*/];
    });
}); };
exports.updateColorMapRalDesign = updateColorMapRalDesign;
var updateAllColors = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var hexToLab, ralColorsWithLab, ralDesignColorsWithLab, ncsColorsWithLab, link;
    return tslib_1.__generator(this, function (_a) {
        hexToLab = function (color) {
            var lab = d3.lab(color.hex);
            var colorWithLab = {
                name: color.name,
                hex: color.hex,
                description: color.description,
                lab: {
                    a: lab.a,
                    b: lab.b,
                    l: lab.l,
                    opacity: lab.opacity,
                },
            };
            return colorWithLab;
        };
        ralColorsWithLab = colors_1.ralColors.map(function (color) {
            return hexToLab(color);
        });
        ralDesignColorsWithLab = colors_1.ralDesignColors.map(function (color) {
            return hexToLab(color);
        });
        ncsColorsWithLab = colors_1.ncsColors.map(function (color) {
            return hexToLab(color);
        });
        link = document.createElement('a');
        link.setAttribute('href', 'data:text/plain;charset=utf-8,' +
            encodeURIComponent(JSON.stringify({ ralColors: ralColorsWithLab, ralDesignColors: ralDesignColorsWithLab, ncsColors: ncsColorsWithLab }, null, 2)));
        link.setAttribute('download', 'colors.json');
        link.click();
        return [2 /*return*/];
    });
}); };
exports.updateAllColors = updateAllColors;
//# sourceMappingURL=generateColors.js.map