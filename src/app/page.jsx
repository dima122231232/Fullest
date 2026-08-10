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
             * Ждём полной загрузки ресурсов страницы.
             */
            if (document.readyState !== "complete") {
                await new Promise((resolve) => {
                    window.addEventListener("load", resolve, {
                        once: true
                    });
                });
            }

            /*
             * Ждём готовности шрифтов.
             */
            await document.fonts.ready;

            /*
             * Дополнительно ждём декодирования изображения,
             * которое участвует в FLIP.
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

        const startAnimation = async () => {
            await waitForPage();

            if (cancelled) return;

            /*
             * Даём браузеру завершить layout и paint
             * перед измерением FLIP.
             */
            await new Promise((resolve) => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(resolve);
                });
            });

            if (cancelled) return;

            /*
             * ============================================================
             * ТВОЯ СТАРАЯ FLIP-ЛОГИКА
             * ============================================================
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