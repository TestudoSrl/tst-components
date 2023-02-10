"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var tags_1 = tslib_1.__importDefault(require("./tags"));
exports.default = {
    title: 'Components/Tag',
    component: tags_1.default,
};
var Default = function (props) {
    return react_1.default.createElement(tags_1.default, tslib_1.__assign({}, props));
};
exports.Default = Default;
//# sourceMappingURL=tags.stories.js.map