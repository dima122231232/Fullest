"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }) {
    useEffect(() => {
        const isTouch =
            window.matchMedia("(pointer: coarse)").matches ||
            navigator.maxTouchPoints > 0;

        const lenis = new Lenis(
            isTouch
                ? {
                      autoRaf: false,

                      // мобильные
                      syncTouch: true,
                      syncTouchLerp: 0.08,
                      touchMultiplier: 1,

                      smoothWheel: false,
                      anchors: true,
                  }
                : {
                      autoRaf: false,

                      // десктоп
                      duration: 1.2,
                      smoothWheel: true,
                      wheelMultiplier: 1,

                      anchors: true,
                  }
        );

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