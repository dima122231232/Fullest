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
            isMobile
                ? {
                    smoothWheel: true,

                    lerp: 0.08,

                    syncTouch: true,
                    syncTouchLerp: 0.1,
                    touchInertiaMultiplier: 5,

                    wheelMultiplier: 1,
                    touchMultiplier: 1,
                }
                : {
                    smoothWheel: true,
                    lerp: 0.08,
                    wheelMultiplier: 1,
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