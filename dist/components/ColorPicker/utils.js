"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useIsMobile() {
    var _a = (0, react_1.useState)(null || Boolean), isMobile = _a[0], setIsMobile = _a[1];
    (0, react_1.useEffect)(function () {
        var userAgent = window.navigator.userAgent;
        var mobileRegex = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/;
        setIsMobile(mobileRegex.test(userAgent));
    }, []);
    return isMobile;
}
exports.default = useIsMobile;
//# sourceMappingURL=utils.js.map