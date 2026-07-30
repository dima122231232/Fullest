"use client";

import "./home.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Copy from "@/components/copy/copy";
import Vision from "@/components/vision/vision";
import Benefits from "@/components/benefits/benefits";
import Testimonial from "@/components/testimonial/testimonial";

gsap.registerPlugin(useGSAP);

export default function Home() {
    const page = useRef(null);
    

    useGSAP(() => {
        const isMobile = window.innerWidth < 800;
        const q = gsap.utils.selector(page);

        const hero = q("[data-hero]")[0].getBoundingClientRect();
        const media = q("[data-media]")[0];
        const target = q("[data-target]")[0];
        const end = target.getBoundingClientRect();

        const video = q("[data-video]")[0];
        const poster = q("[data-poster]")[0];

        // video.addEventListener("loadedmetadata", () => {
        //     video.currentTime = 0.03;
        // }, { once: true });

        // video.addEventListener("canplay", () => {
        //     gsap.delayedCall(0.5, () => {
        //         poster.style.display = "none";
        //         video.play().catch(console.error);
        //     });
        // }, { once: true });

        gsap.to(media, {
            left: end.left - hero.left,
            top: end.top - hero.top,
            width: end.width ,
            height: end.height,
            duration: 1.5,
            delay:.5,
            y:isMobile ? 200 : 0,
            ease: "power4.inOut",
            onComplete: () => {
                target.appendChild(media);
                gsap.set(media, { clearProps: "all" });
            }
        });

    }, { scope: page });

    return (
        <main ref={page}>
            <section className="hero" data-hero>
                <div className="media" data-media>
                    <img
                        data-poster
                        src="/home/images/preloader.jpg"
                        className="hero__poster"
                    />
                </div>
                <div className="container hero__container">

                    
                        <div className="hero__content">
                            <Copy 
                            animateOnScroll={false} 
                            delay={1}
                            ><h1>Your co-pilot for everyday wellbeing.</h1></Copy>

                            <Copy 
                            animateOnScroll={false} 
                            delay={1}
                            type="words"
                            stagger={0.035}

                            ><p className="hero__description">
                                Fullest combines personalized supplements, daily routines,
                                and environmental guidance into one formula that evolves with you.
                            </p></Copy>
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
                                <img src="/process/photo1.jpg" alt="people" className="process__card-img"/>
                            </div>
                            <p>Build your profile and get  FULLEST FORMULA® matched to your wellness goals.</p>
                        </div>

                        <div className="process__card">
                            <div className="process__card-block">
                                <img src="/process/photo2.jpg" alt="people" className="process__card-img"/>
                            </div>
                            <p>Log how you feel and your FULLEST FORMULA® refines itself over time.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Benefits/>

            <Testimonial/>
        </main>
    );
}