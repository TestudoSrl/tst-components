"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var material_1 = require("@mui/material");
var react_1 = tslib_1.__importDefault(require("react"));
var generateColors_1 = require("./generateColors");
var Test = function () {
    return (react_1.default.createElement(material_1.Button, { variant: "contained", onClick: function () { (0, generateColors_1.updateAllColors)(); } }, "Start"));
};
exports.default = Test;
//# sourceMappingURL=test.js.map