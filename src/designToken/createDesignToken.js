"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.designToken = void 0;
var tslib_1 = require("tslib");
var styles_1 = require("@mui/material/styles");
var tokenJson_1 = tslib_1.__importDefault(require("./tokenJson"));
var types_1 = require("./types");
(0, types_1.assertCast)(styles_1.createTheme);
exports.designToken = (0, styles_1.createTheme)(tokenJson_1.default);
exports.default = styles_1.createTheme;
//# sourceMappingURL=createDesignToken.js.map