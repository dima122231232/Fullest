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
    const ua = navigator.userAgent;

    const isIOS = /iPhone|iPad|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);
    const isTouch = "ontouchstart" in window;

    const options: LenisOptions = {
      autoRaf: false,

      // 🎯 Десктоп — кинематографичный smooth
      duration: isTouch ? 1 : 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),

      smoothWheel: true,

      // 📱 Touch логика
      smoothTouch: isIOS ? false : true,
      syncTouch: isIOS ? false : true,

      // Android можно чуть усилить
      touchMultiplier: isAndroid ? 1.2 : 1,

      wheelMultiplier: 1,

      // 🔗 якоря
      anchors: true,
    };

    const instance = new Lenis(options);
    setLenis(instance);

    // 🔥 GSAP sync
    instance.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      instance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 💡 фикс для ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove((time) => {
        instance.raf(time * 1000);
      });
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}