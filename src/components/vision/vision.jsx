import "./vision.css"
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Vision(){
    const section = useRef(null);

   useGSAP(() => {
    const isMobile = window.innerWidth < 1200;

    const cards = gsap.utils.toArray(".vision__card");
    const desktopDash = document.querySelector(".vision__timeline-desk .dash");
    const circles = gsap.utils.toArray(".circle");
    const dividerCircles = gsap.utils.toArray(".divider-circle");
    const dots = gsap.utils.toArray(".divider-circle--animation");
    const circleAnimation = document.querySelector(".circle-animation");

    const mobileDashes = isMobile
        ? gsap.utils.toArray(".vision__divider .dash")
        : [];

    const segment = 1 / cards.length;
    const part = isMobile ? 1 / mobileDashes.length : 0;

    const setCircleLeft = gsap.quickSetter(circleAnimation, "left", "%");
    const setOpacity = cards.map(card => gsap.quickSetter(card, "opacity"));

    ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: `+=${window.innerHeight * (isMobile ? 3.5 : 2)}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,

        onToggle(self) {
            const scale = self.isActive ? 1 : self.direction === -1 ? 0 : null;

            if (scale !== null) {
                gsap.to(circles, {
                    scale,
                    duration: .2,
                    overwrite: true
                });

                gsap.to(dividerCircles[0], {
                    scale,
                    duration: .2,
                    overwrite: true
                });
            }
        },

        onUpdate(self) {
            const progress = self.progress;

            setCircleLeft(progress * 100);

            if (!isMobile) {
                gsap.set(desktopDash, {
                    clipPath: `polygon(0 0, ${progress * 100}% 0, ${progress * 100}% 100%, 0 100%)`
                });
            } else {
                mobileDashes.forEach((dash, i) => {
                    const local = gsap.utils.clamp(
                        0,
                        1,
                        (progress - i * part) / part
                    );

                    gsap.set(dash, {
                        clipPath: `polygon(0 0, ${local * 100}% 0, ${local * 100}% 100%, 0 100%)`
                    });

                    gsap.set(dots[i], {
                        left: `max(0px, calc(${local * 100}% - 5px))`
                    });

                    const active =
                        i === mobileDashes.length - 1
                            ? local > 0
                            : local > 0 && local < 1;

                    if (dots[i]._active !== active) {
                        dots[i]._active = active;

                        gsap.to(dots[i], {
                            scale: active ? 1 : 0,
                            duration: .2,
                            overwrite: true,
                            ease: "power1.out"
                        });
                    }
                });
            }

            cards.forEach((_, index) => {
                const local = gsap.utils.clamp(
                    0,
                    1,
                    (
                        progress -
                        (index * segment +
                            segment * (isMobile ? .15 : .5))
                    ) /
                        (segment * (isMobile ? .35 : .5))
                );

                setOpacity[index](local);
            });
        }
    });

}, { scope: section });
    
    
    return(
        <>
        <section ref={section} className="vision">
            <div className="vision__container">
                <span className="mono vision__mono">Too many promises</span>

                <div className="vision__content">

                    <div className="vision__cards">

                        <div className="vision__card">
                            <div className="vision__images">
                                <img src="/pills/pill-1.png" alt="pill" className = "pill"/>
                                <img src="/pills/pill-2.png" alt="pill" className = "pill"/>
                                <img src="/pills/pill-3.png" alt="pill" className = "pill"/>
                            </div>
                            <p className="md vision-md">Fall asleep faster</p>
                        </div>

                        <div className="vision__card">
                            <div className="vision__images">
                                <img src="/pills/pill-4.png" alt="pill" className = "pill"/>
                            </div>
                            <p className="md vision-md">Calm your mind</p>
                        </div>

                        <div className="vision__divider">
                            <div className="divider-circle" style={{scale:0}}></div><div className="divider-circle divider-circle--animation"></div>
                            <div className="dash"></div>
                        </div>

                        <div className="vision__card">
                            <div className="vision__images">
                                <img src="/pills/pill-5.png" alt="pill" className = "pill"/>
                                <img src="/pills/pill-6.png" alt="pill" className = "pill"/>
                                <img src="/pills/pill-7.png" alt="pill" className = "pill"/>
                            </div>
                            <p className="md vision-md">Deep sleep</p>
                        </div>

                        <div className="vision__card">
                            <div className="vision__images">
                                <img src="/pills/pill-8.png" alt="pill" className = "pill"/>
                            </div>
                            <p className="md vision-md">Better rest</p>
                        </div>

                        <div className="vision__divider">
                            <div className="divider-circle divider-circle--animation"></div>
                            <div className="dash"></div>    
                        </div>

                        <div className="vision__card">
                            <div className="vision__images">
                                <img src="/pills/pill-9.png" alt="pill" className = "pill"/>
                            </div>
                            <p className="md vision-md">Reduce stress</p>
                        </div>

                        <div className="vision__divider">
                            <div className="divider-circle divider-circle--animation"></div>
                            <div className="dash"></div>    
                        </div>

                    </div>

                    <div className="vision__timeline-desk">
                        <div className="circle"></div>
                        <div className="dash"></div>
                        <div className="circle circle-animation"></div>
                    </div>


                </div>

                <p className="vision-title">Because what works for one body may not work for yours.</p>
            </div>
        </section>
        <div >
            <div className="container vision-block--container">
                <span className="mono">Our Vision</span>
                <h2>Finding what works for your body shouldn't take endless trial and error.</h2>
            </div>
        </div>
        </>
    )
}