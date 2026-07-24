"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: false,

            duration: 1.2,

            smoothWheel: true,

            syncTouch: true,

            wheelMultiplier: 1,

            touchMultiplier: 1,

            anchors: true,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const update = (time) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);

        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, []);

    return children;
}