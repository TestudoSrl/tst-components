"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var test_1 = tslib_1.__importDefault(require("./test"));
exports.default = {
    title: 'Components/Test',
    component: test_1.default,
};
var Default = function (props) {
    return react_1.default.createElement(test_1.default, tslib_1.__assign({}, props));
};
exports.Default = Default;
//# sourceMappingURL=test.stories.js.map