"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var material_1 = require("@mui/material");
var react_1 = tslib_1.__importDefault(require("react"));
var Tag = function (props) {
    var data = props.data, showAll = props.showAll, tagsToShow = props.tagsToShow, size = props.size, variant = props.variant, color = props.color, noTagMessage = props.noTagMessage, margin = props.margin;
    if (!data)
        return null;
    if (data.length === 0)
        return react_1.default.createElement("div", null, noTagMessage);
    if (data && !showAll) {
        data.splice(tagsToShow !== null && tagsToShow !== void 0 ? tagsToShow : 1, data.length - (tagsToShow !== null && tagsToShow !== void 0 ? tagsToShow : 1));
    }
    return (react_1.default.createElement(material_1.Box, { sx: {
            display: 'flex',
        } }, data.map(function (tag) { return (react_1.default.createElement(material_1.Chip, { key: tag, label: tag, size: size, variant: variant, color: color, style: { margin: margin } })); })));
};
Tag.defaultProps = {
    data: ['pippo', 'pluto', 'paperino'],
    showAll: false,
    tagsToShow: 1,
    size: 'small',
    variant: 'outlined',
    color: 'success',
    noTagMessage: 'No tags to show',
};
exports.default = Tag;
//# sourceMappingURL=tags.js.map