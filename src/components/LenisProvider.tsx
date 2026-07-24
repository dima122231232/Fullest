"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import type { LenisOptions } from "lenis";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const options: LenisOptions = {
      autoRaf: false,

      duration: 1.2,

      easing: (t) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      smoothWheel: true,

      syncTouch: false,

      touchMultiplier: 1.2,

      wheelMultiplier: 1,

      anchors: true,
    };

    const instance = new Lenis(options);

    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);

      instance.off("scroll", ScrollTrigger.update);

      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}