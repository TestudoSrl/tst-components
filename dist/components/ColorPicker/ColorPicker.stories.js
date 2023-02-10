"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullFeatures = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var ColorPicker_1 = tslib_1.__importDefault(require("./ColorPicker"));
exports.default = {
    title: 'Components/ColorPicker',
    component: ColorPicker_1.default,
};
var FullFeatures = function (props) {
    return react_1.default.createElement(ColorPicker_1.default, tslib_1.__assign({}, props));
};
exports.FullFeatures = FullFeatures;
//# sourceMappingURL=ColorPicker.stories.js.map