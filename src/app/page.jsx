"use client";

import "./home.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Home() {
    const page = useRef(null);

   useGSAP(() => {
        const q = gsap.utils.selector(page);

        const hero = q("[data-hero]")[0].getBoundingClientRect();
        const media = q("[data-media]")[0];
        const target = q("[data-target]")[0];
        const end = target.getBoundingClientRect();

        const video = q("[data-video]")[0];
        const poster = q("[data-poster]")[0];

        video.addEventListener("loadedmetadata", () => {
            video.currentTime = 0.03;
        }, { once: true });

        video.addEventListener("canplay", () => {
            gsap.delayedCall(0.5, () => {
                poster.style.display = "none";
                video.play().catch(console.error);
            });
        }, { once: true });

        gsap.to(media, {
            left: end.left - hero.left + 18,
            top: end.top - hero.top,
            width: end.width ,
            height: end.height,
            duration: 1.5,
            ease: "power4.inOut",
            onComplete: () => {
                target.appendChild(media);
                gsap.set(media, { clearProps: "all" });
                gsap.set(media, { x: 18 });
            }
        });

    }, { scope: page });

    return (
        <main ref={page}>
            <section className="hero" data-hero>
                <div className="media" data-media>
                    <video
                        data-video
                        className="hero__video"
                        src="/home/video/video.mp4"
                        muted
                        loop
                        playsInline
                        preload="auto"
                    />
                    <img
                        data-poster
                        src="/home/images/preloader.png"
                        className="hero__poster"
                    />
                </div>
                <div className="container hero__container">

                    <div className="hero__content">
                        <h1>Your co-pilot for everyday wellbeing.</h1>

                        <p className="hero__description">
                            Fullest combines personalized supplements, daily routines,
                            and environmental guidance into one formula that evolves with you.
                        </p>
                    </div>
                    <div className="hero__media-wrapper" data-target />
                </div>
            </section>
        </main>
    );
}