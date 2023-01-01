import { useEffect, useState } from 'react';

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(null || Boolean);



    useEffect(() => {
        const userAgent = window.navigator.userAgent;
        const mobileRegex = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/;
        setIsMobile(mobileRegex.test(userAgent));
    }, []);

    return isMobile;
}

export default useIsMobile;