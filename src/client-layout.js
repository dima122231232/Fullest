"use client";

import { useEffect, useMemo, useState } from "react";
import { ReactLenis } from "lenis/react";

export default function ClientLayout({ children }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 1000px)");

        const update = () => setIsMobile(media.matches);

        update();

        media.addEventListener("change", update);

        return () => media.removeEventListener("change", update);
    }, []);

    const scrollSettings = useMemo(
        () =>
            !isMobile
                ? {
                      lerp: 0.15,
                      wheelMultiplier: 1,
                      touchMultiplier: 1,
                      smoothWheel: true,
                      syncTouch: false,
                  }
                : {
                    smoothWheel: true,
                    syncTouch: true,
                    syncTouchLerp: 0.1,
                    touchInertiaMultiplier: 5,
                    lerp: 0.06,
                  },
        [isMobile]
    );

    return (
        <ReactLenis root options={scrollSettings}>
            <div className="page">
                {children}
            </div>
        </ReactLenis>
    );
}