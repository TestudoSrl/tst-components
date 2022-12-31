import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, InputAdornment, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { distanceFunction } from './closest-colors';
import { allColorsWithClosest } from './colors';
var useDebounce = function (value, delay) {
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
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
    var title = props.title, onSelected = props.onSelected;
    var _a = useState(''), searchInput = _a[0], setSearchInput = _a[1];
    var _b = useState(10), limit = _b[0], setLimit = _b[1];
    var debouncedSearchInput = useDebounce(searchInput, 300);
    var _c = useState(false), openPicker = _c[0], setOpenPicker = _c[1];
    var _d = useState({ selectedColor: '', textColor: '', name: '' }), selectedColor = _d[0], setSelectedColor = _d[1];
    var handleSelectColor = function (selectedColorObject) {
        setSelectedColor(selectedColorObject);
        setOpenPicker(false);
        onSelected(selectedColorObject.selectedColor);
    };
    var filteredColors = allColorsWithClosest
        .filter(function (color) {
        return color.key.toLowerCase().includes(debouncedSearchInput.toLowerCase()) ||
            color.value.original.italian
                .toLowerCase()
                .includes(debouncedSearchInput.toLowerCase()) ||
            color.value.original.english
                .toLowerCase()
                .includes(debouncedSearchInput.toLowerCase());
    })
        .slice(0, limit)
        .map(function (color) { return color.key; });
    var handleClose = function () {
        setOpenPicker(false);
    };
    var _e = useState('contained'), buttonStyle = _e[0], setButtonStyle = _e[1];
    var renderPicker = function () { return (React.createElement(Dialog, { open: openPicker, onClose: handleClose },
        React.createElement(DialogTitle, null,
            title,
            React.createElement(Grid, { container: true, spacing: 2 },
                React.createElement(Grid, { item: true, xs: 8 },
                    React.createElement(Grid, { container: true, spacing: 1 },
                        React.createElement(Grid, { item: true, xs: 9 },
                            React.createElement(TextField, { fullWidth: true, label: "Search..", value: searchInput, onChange: function (event) { return setSearchInput(event.target.value); }, InputProps: {
                                    startAdornment: (React.createElement(InputAdornment, { position: "start" },
                                        React.createElement(SearchIcon, null))),
                                    endAdornment: (React.createElement(InputAdornment, { position: "end" },
                                        React.createElement(IconButton, { "aria-label": "Clear search input", onClick: function () { return setSearchInput(''); } },
                                            React.createElement(CloseIcon, null))))
                                } })),
                        React.createElement(Grid, { item: true, xs: 3 },
                            React.createElement(TextField, { fullWidth: true, label: "Limit", value: limit, onChange: function (event) { return setLimit(Number(event.target.value)); } })))),
                React.createElement(Grid, { item: true, xs: 4, display: "flex", alignItems: "center", justifyContent: "flex-end" },
                    React.createElement(Switch, { value: buttonStyle === 'contained', onClick: function () {
                            switch (buttonStyle) {
                                case 'contained':
                                    setButtonStyle('text');
                                    break;
                                case 'text':
                                    setButtonStyle('contained');
                                    break;
                            }
                        } }),
                    React.createElement(IconButton, { onClick: function () { return setOpenPicker(!openPicker); } },
                        React.createElement(CloseIcon, null))))),
        React.createElement(DialogContent, null,
            React.createElement(DialogContentText, null,
                React.createElement(Box, null,
                    React.createElement(Grid, { container: true, spacing: 5 }, filteredColors.map(function (name) {
                        return renderCard(name);
                    }))))))); };
    var renderCard = function (name) {
        var color = allColorsWithClosest.find(function (findedColor) { return findedColor.key === name; });
        if (!color) {
            return null;
        }
        var textColorRgb = {
            R: 0,
            G: 0,
            B: 0,
            name: 'textColor',
            english: 'textColor',
            italian: 'textColor'
        };
        var textColor = "rgb(".concat(textColorRgb.R, ", ").concat(textColorRgb.G, ", ").concat(textColorRgb.B, ")");
        var colorDistance = distanceFunction({
            R: color.value.original.R,
            G: color.value.original.G,
            B: color.value.original.B,
            name: '',
            english: '',
            italian: ''
        }, textColorRgb);
        if (colorDistance < 250) {
            textColor = "rgb(255,255,255)";
        }
        var res = (React.createElement(Grid, { item: true, xs: 12 },
            React.createElement(Card, { variant: "outlined", style: {
                    backgroundColor: "rgb(".concat(color === null || color === void 0 ? void 0 : color.value.original.R, ", ").concat(color === null || color === void 0 ? void 0 : color.value.original.G, ", ").concat(color === null || color === void 0 ? void 0 : color.value.original.B, ")")
                } },
                React.createElement(CardContent, null,
                    React.createElement(Button, { style: {
                            backgroundColor: "rgb(".concat(color === null || color === void 0 ? void 0 : color.value.original.R, ", ").concat(color === null || color === void 0 ? void 0 : color.value.original.G, ", ").concat(color === null || color === void 0 ? void 0 : color.value.original.B, ")"),
                            color: textColor,
                            width: '100%'
                        }, size: "large", variant: "text", onClick: function () {
                            handleSelectColor({
                                name: color === null || color === void 0 ? void 0 : color.value.original.name,
                                selectedColor: "rgb(".concat(color === null || color === void 0 ? void 0 : color.value.original.R, ", ").concat(color === null || color === void 0 ? void 0 : color.value.original.G, ", ").concat(color === null || color === void 0 ? void 0 : color.value.original.B, ")"),
                                textColor: textColor
                            });
                        }, endIcon: color === null || color === void 0 ? void 0 : color.value.original.english },
                        React.createElement(Typography, { fontSize: 20, color: textColor }, color === null || color === void 0 ? void 0 : color.value.original.name)),
                    React.createElement(Divider, { style: { marginBottom: 10 } }),
                    React.createElement(Grid, { container: true, spacing: 1 }, color === null || color === void 0 ? void 0 : color.value.closestColors.map(function (closestColors) {
                        return renderAlternativesColor(closestColors, textColor);
                    }))))));
        return res;
    };
    var renderAlternativesColor = function (closestColors, textColor) {
        var res = (React.createElement(Grid, { item: true, xs: 4 },
            React.createElement(Grid, { container: true, spacing: 0 },
                React.createElement(Grid, { item: true, xs: 9 },
                    React.createElement(Button, { style: {
                            backgroundColor: "rgb(".concat(closestColors.color.R, ", ").concat(closestColors.color.G, ", ").concat(closestColors.color.B, ")"),
                            color: textColor,
                            width: '160px',
                            height: '20px'
                        }, variant: buttonStyle, endIcon: React.createElement(Typography, { style: { fontSize: 11 }, color: textColor }, closestColors.distance.toFixed()), onClick: function () {
                            handleSelectColor({
                                name: closestColors.color.name,
                                selectedColor: "rgb(".concat(closestColors.color.R, ", ").concat(closestColors.color.G, ", ").concat(closestColors.color.B, ")"),
                                textColor: textColor
                            });
                        } }, closestColors.color.name)))));
        return res;
    };
    return (React.createElement(React.Fragment, null,
        renderPicker(),
        React.createElement(Button, { style: {
                backgroundColor: selectedColor.selectedColor,
                color: selectedColor.textColor
            }, onClick: function () { return setOpenPicker(!openPicker); }, variant: "contained" }, selectedColor.name || 'Seleziona colore')));
};
export default ColorPicker;
//# sourceMappingURL=ColorPicker.js.map