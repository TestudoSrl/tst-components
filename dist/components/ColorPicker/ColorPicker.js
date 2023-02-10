"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Close_1 = tslib_1.__importDefault(require("@mui/icons-material/Close"));
var Search_1 = tslib_1.__importDefault(require("@mui/icons-material/Search"));
var Stars_1 = tslib_1.__importDefault(require("@mui/icons-material/Stars"));
var material_1 = require("@mui/material");
var system_1 = require("@mui/system");
var react_1 = tslib_1.__importStar(require("react"));
var react_virtualized_1 = require("react-virtualized");
var closest_colors_1 = require("./closest-colors");
var utils_1 = tslib_1.__importDefault(require("./utils"));
var useDebounce = function (value, delay) {
    var _a = (0, react_1.useState)(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    (0, react_1.useEffect)(function () {
        var handler = setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};
var ColorPicker = function (props) {
    var colorsInStock = props.colorsInStock, showCloestColors = props.showCloestColors, onSelectedColor = props.onSelectedColor;
    var _a = (0, react_1.useState)(''), searchInput = _a[0], setSearchInput = _a[1];
    var debouncedSearchInput = useDebounce(searchInput, 300);
    var _b = (0, react_1.useState)(false), openPicker = _b[0], setOpenPicker = _b[1];
    var isMobile = (0, utils_1.default)();
    var allColorsWithClosest = (0, react_1.useMemo)(function () {
        var colorMap = (0, closest_colors_1.generateColorsMap)();
        return colorMap;
    }, []);
    var filteredColors = (0, react_1.useMemo)(function () {
        return allColorsWithClosest.filter(function (color) {
            return color.original.name.toLowerCase().includes(debouncedSearchInput.toLowerCase()) ||
                color.original.description.toLowerCase().includes(debouncedSearchInput.toLowerCase());
        });
    }, [debouncedSearchInput, showCloestColors, colorsInStock]);
    var _c = (0, react_1.useState)({ selectedColor: '', textColor: '', name: '' }), selectedColor = _c[0], setSelectedColor = _c[1];
    var handleSelectColor = function (_a) {
        var color = _a.selectedColor, name = _a.name, textColor = _a.textColor;
        setSelectedColor({ selectedColor: color, name: name, textColor: textColor });
        setOpenPicker(false);
        onSelectedColor(name);
    };
    var handleClose = function () {
        setOpenPicker(false);
    };
    var _d = (0, react_1.useState)('contained'), buttonStyle = _d[0], setButtonStyle = _d[1];
    var renderStar = function (color) {
        if (!colorsInStock)
            return;
        var iconSize = isMobile ? 12 : 18;
        if (colorsInStock && colorsInStock.includes(color)) {
            return react_1.default.createElement(Stars_1.default, { sx: { fontSize: iconSize } });
        }
        return react_1.default.createElement(react_1.default.Fragment, null);
    };
    var renderPicker = function () { return (react_1.default.createElement(material_1.Dialog, { open: openPicker, onClose: handleClose, fullScreen: isMobile },
        react_1.default.createElement(material_1.DialogTitle, null,
            react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
                react_1.default.createElement(material_1.Grid, { item: true, xs: 8 },
                    react_1.default.createElement(material_1.TextField, { fullWidth: true, label: "Search..", value: searchInput, onChange: function (event) { return setSearchInput(event.target.value); }, InputProps: {
                            startAdornment: (react_1.default.createElement(material_1.InputAdornment, { position: "start" },
                                react_1.default.createElement(Search_1.default, null))),
                            endAdornment: (react_1.default.createElement(material_1.InputAdornment, { position: "end" },
                                react_1.default.createElement(material_1.IconButton, { "aria-label": "Clear search input", onClick: function () { return setSearchInput(''); } },
                                    react_1.default.createElement(Close_1.default, null)))),
                        } })),
                react_1.default.createElement(material_1.Grid, { item: true, xs: 4, display: "flex", alignItems: "center", justifyContent: "flex-end" },
                    showCloestColors && (react_1.default.createElement(material_1.Switch, { value: buttonStyle === 'contained', onClick: function () {
                            switch (buttonStyle) {
                                case 'contained':
                                    setButtonStyle('text');
                                    break;
                                case 'text':
                                    setButtonStyle('contained');
                                    break;
                            }
                        } })),
                    react_1.default.createElement(material_1.IconButton, { onClick: function () { return setOpenPicker(!openPicker); } },
                        react_1.default.createElement(Close_1.default, null))))),
        react_1.default.createElement(material_1.DialogContent, null,
            react_1.default.createElement(system_1.Box, null,
                react_1.default.createElement(material_1.Grid, { container: true, spacing: 1 },
                    react_1.default.createElement(react_virtualized_1.List, { width: 600, height: 800, rowCount: filteredColors.length, rowHeight: showCloestColors ? 270 : 99, rowRenderer: function (_a) {
                            var index = _a.index, style = _a.style;
                            var color = filteredColors[index];
                            return (react_1.default.createElement("div", { key: index, style: style }, renderCard(color)));
                        } })))))); };
    var renderCard = function (color) {
        var textColor = '#000000';
        var colorDistance = (0, system_1.getContrastRatio)(color.original.hex, textColor);
        if (colorDistance < 3.5)
            textColor = '#ffffff';
        var res = (react_1.default.createElement(material_1.Grid, { item: true, xs: 12, key: color.original.name },
            react_1.default.createElement(material_1.Card, { key: color.original.name, variant: "outlined", style: {
                    backgroundColor: color.original.hex,
                } },
                react_1.default.createElement(material_1.CardContent, null,
                    react_1.default.createElement(material_1.MenuItem, { onClick: function () {
                            return handleSelectColor({
                                name: color === null || color === void 0 ? void 0 : color.original.name,
                                selectedColor: color.original.hex,
                                textColor: textColor,
                            });
                        } },
                        react_1.default.createElement(material_1.Grid, { container: true, spacing: 1 },
                            react_1.default.createElement(material_1.Grid, { item: true, xs: 11, alignItems: 'flex-start' },
                                react_1.default.createElement(material_1.Typography, { fontSize: 20, color: textColor }, color === null || color === void 0 ? void 0 : color.original.name),
                                react_1.default.createElement(material_1.Typography, { fontSize: 10, color: textColor }, color === null || color === void 0 ? void 0 : color.original.description)),
                            react_1.default.createElement(material_1.Grid, { item: true, xs: 1, display: 'flex', alignContent: 'flex-end', alignItems: 'center' }, renderStar(color === null || color === void 0 ? void 0 : color.original.name)))),
                    showCloestColors && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(material_1.Divider, { style: { marginBottom: 10 } }),
                        react_1.default.createElement(material_1.Grid, { container: true, spacing: 1, key: color.original.name + '-cloest' }, color === null || color === void 0 ? void 0 : color.closestColors.map(function (closestColors) {
                            return renderAlternativesColor(closestColors, textColor);
                        }))))))));
        return res;
    };
    var buttonWidth = isMobile ? '100px' : '160px';
    var fontSize = isMobile ? 9 : 14;
    var renderAlternativesColor = function (closestColors, textColor) {
        var res = (react_1.default.createElement(material_1.Grid, { item: true, xs: 4, key: closestColors.color.name },
            react_1.default.createElement(material_1.Grid, { container: true, spacing: 0 },
                react_1.default.createElement(material_1.Grid, { item: true, xs: 9 },
                    react_1.default.createElement(material_1.Button, { style: {
                            backgroundColor: closestColors.color.hex,
                            color: textColor,
                            width: buttonWidth,
                            height: '40px',
                        }, variant: buttonStyle, onClick: function () {
                            handleSelectColor({
                                name: closestColors.color.name,
                                selectedColor: closestColors.color.hex,
                                textColor: textColor,
                            });
                        } },
                        react_1.default.createElement(material_1.Grid, { container: true, spacing: 0 },
                            react_1.default.createElement(material_1.Grid, { item: true, xs: 11 },
                                react_1.default.createElement(material_1.Typography, { fontSize: fontSize, color: textColor }, closestColors.color.name),
                                react_1.default.createElement(material_1.Typography, { fontSize: 10, color: textColor }, closestColors.distance.toFixed())),
                            react_1.default.createElement(material_1.Grid, { item: true, xs: 1, display: "flex", alignContent: 'flex-end', alignItems: 'center' }, renderStar(closestColors.color.name))))))));
        return res;
    };
    return (filteredColors && (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Button, { value: selectedColor.name || 'Seleziona colore', variant: 'contained', style: {
                backgroundColor: selectedColor.selectedColor,
                color: selectedColor.textColor,
            }, onClick: function () {
                if (selectedColor.name) {
                    setSearchInput(selectedColor.name);
                }
                setOpenPicker(!openPicker);
            } }, selectedColor.name || 'Seleziona colore'),
        openPicker && renderPicker())));
};
ColorPicker.defaultProps = {
    showCloestColors: true,
    colorsInStock: ['RAL 1000', 'S 0500-N', 'S 0505-G90Y'],
};
exports.default = (0, react_1.memo)(ColorPicker);
//# sourceMappingURL=ColorPicker.js.map