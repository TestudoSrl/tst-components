import React from 'react';
import { Box, Chip } from '@mui/material';
export var Tag = function (props) {
    var data = props.data, showAll = props.showAll, tagsToShow = props.tagsToShow, size = props.size, variant = props.variant, color = props.color, noTagMessage = props.noTagMessage, margin = props.margin;
    if (data.length === 0)
        return React.createElement("div", null, noTagMessage);
    if (data && !showAll) {
        data.splice(tagsToShow !== null && tagsToShow !== void 0 ? tagsToShow : 1, data.length - (tagsToShow !== null && tagsToShow !== void 0 ? tagsToShow : 1));
    }
    return (React.createElement(Box, { sx: {
            display: 'flex'
        } }, data.map(function (tag) { return (React.createElement(Chip, { key: tag, label: tag, size: size, variant: variant, color: color, style: { margin: margin } })); })));
};
Tag.defaultProps = {
    showAll: false,
    tagsToShow: 1,
    size: 'small',
    variant: 'outlined',
    color: 'success',
    noTagMessage: 'No tags to show'
};
//# sourceMappingURL=tags.js.map