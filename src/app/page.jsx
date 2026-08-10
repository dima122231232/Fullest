"use client";

import "./home.css";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import Copy from "@/components/copy/copy";
import Vision from "@/components/vision/vision";
import Benefits from "@/components/benefits/benefits";
import Testimonial from "@/components/testimonial/testimonial";

gsap.registerPlugin(Flip);

export default function Home() {
    const page = useRef(null);

useLayoutEffect(() => {
    const q = gsap.utils.selector(page);

    const media = q("[data-media]")[0];
    const target = q("[data-target]")[0];
    const image = q("[data-poster]")[0];

    if (!media || !target || !image) return;

    let cancelled = false;

    const waitForPage = async () => {
        /*
         * Ждём полной загрузки страницы.
         */
        if (document.readyState !== "complete") {
            await new Promise((resolve) => {
                window.addEventListener("load", resolve, {
                    once: true
                });
            });
        }

        /*
         * Ждём шрифты.
         */
        await document.fonts.ready;

        /*
         * Ждём декодирования Hero image.
         */
        if (!image.complete) {
            await new Promise((resolve) => {
                image.addEventListener("load", resolve, {
                    once: true
                });

                image.addEventListener("error", resolve, {
                    once: true
                });
            });
        }

        if (image.decode) {
            try {
                await image.decode();
            } catch {}
        }
    };

    const waitForCopy = async () => {
        const copyElements = q("[data-copy-slide]");

        if (copyElements.length === 0) return;

        /*
         * Copy запускается независимо от этого useLayoutEffect.
         *
         * Поэтому ждём, пока ВСЕ Hero Copy-компоненты
         * закончат свою первоначальную SplitText-инициализацию.
         */
        await new Promise((resolve) => {
            const check = () => {
                if (cancelled) {
                    resolve();
                    return;
                }

                const ready = copyElements.every((element) =>
                    element.classList.contains("copy-slide-ready")
                );

                if (ready) {
                    resolve();
                    return;
                }

                requestAnimationFrame(check);
            };

            check();
        });
    };

    const startAnimation = async () => {
        /*
         * 1. Ресурсы
         */
        await waitForPage();

        if (cancelled) return;

        /*
         * 2. SplitText / Copy
         */
        await waitForCopy();

        if (cancelled) return;

        /*
         * 3. После SplitText даём браузеру закончить
         *    layout + paint.
         */
        await new Promise((resolve) => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        });

        if (cancelled) return;

        /*
         * 4. Теперь layout действительно готов.
         */
        const state = Flip.getState(media);

        target.appendChild(media);

        Flip.from(state, {
            duration: 1.5,
            ease: "power4.inOut",
            absolute: true,
            simple: true,
            onComplete: () => {
                gsap.set(media, {
                    clearProps: "all"
                });
            }
        });
    };

    startAnimation();

    return () => {
        cancelled = true;
    };
}, []);

    return (
        <main ref={page}>
            <section className="hero" data-hero>
                <div className="media" data-media>
                    <img
                        data-poster
                        src="/home/images/preloader.jpg"
                        className="hero__poster"
                        alt=""
                        fetchPriority="high"
                        decoding="async"
                    />
                </div>

                <div className="container hero__container">
                    <div className="hero__content">
                        <Copy
                            animateOnScroll={false}
                            delay={.6}
                        >
                            <h1>Your co-pilot for everyday wellbeing.</h1>
                        </Copy>

                        <Copy
                            animateOnScroll={false}
                            delay={.6}
                            type="words"
                            stagger={0.035}
                        >
                            <p className="hero__description">
                                Fullest combines personalized supplements, daily routines,
                                and environmental guidance into one formula that evolves with you.
                            </p>
                        </Copy>
                    </div>

                    <div className="hero__media-wrapper" data-target />
                </div>
            </section>

            <Vision/>

            <section className="process">
                <div className="container process__container">
                    <h4>How it Works</h4>

                    <div className="process__cards">
                        <div className="process__card">
                            <div className="process__card-block">
                                <img
                                    src="/process/photo1.jpg"
                                    alt="people"
                                    className="process__card-img"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>

                            <p>
                                Build your profile and get FULLEST FORMULA® matched to your wellness goals.
                            </p>
                        </div>

                        <div className="process__card">
                            <div className="process__card-block">
                                <img
                                    src="/process/photo2.jpg"
                                    alt="people"
                                    className="process__card-img"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>

                            <p>
                                Log how you feel and your FULLEST FORMULA® refines itself over time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Benefits/>

            <Testimonial/>
        </main>
    );
}