import "./vision.css"
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "@/components/copy/copy";

gsap.registerPlugin(ScrollTrigger);

export default function Vision(){
    const section = useRef(null);

    useGSAP((context) =>{
        const q = context.selector;
        const isMobile = window.innerWidth < 1200;
        const card = q(".vision__card");
        const segment = 1 / card.length;
        const dash = q(".vision__timeline-desk .dash")[0];
        const circles = q(".circle");
        const circleAnimation = q(".circle-animation")[0];
        const shown = card.map(() => false); 
        
        const anim = {
            duration: .12,
            ease: "none"
        };
        
        ScrollTrigger.create({
            trigger:section.current,
            start:"top top",
            end:() => `+=${window.innerHeight * (isMobile ? 2.2 : 2)}px`,
            pin:isMobile ? false : true,
            pinSpacing:true,
            scrub:0,
            invalidateOnRefresh: true,
            onToggle: (self) => {
                if (self.isActive) {
                    gsap.to(circles, { scale: 1, duration: .2 });
                } else if (self.direction === -1) {
                    gsap.to(circles, { scale: 0, duration: .2 });
                }
            },
            onUpdate: (self) =>{
                const scrollProgress = self.progress;
                if (!isMobile) {
                    gsap.set(circleAnimation, {x: gsap.utils.interpolate(0,dash.getBoundingClientRect().width,scrollProgress), ...anim});
                    gsap.set(dash,{clipPath: `inset(0 ${100 - scrollProgress * 100}% 0 0)`, ...anim})
                } else {
                    gsap.set(circleAnimation, {y: gsap.utils.interpolate(0,dash.getBoundingClientRect().height,scrollProgress), ...anim});
                    gsap.set(dash,{clipPath: `inset(0 0 ${100 - scrollProgress * 100}% 0)`, ...anim})
                }

                card.forEach((item, index) => {
                    const trigger = index * segment + segment * (isMobile ? 0.15 : 0.5);

                    if (scrollProgress >= trigger && !shown[index]) {
                        shown[index] = true;

                        gsap.fromTo(item,
                            {
                                opacity: 0,
                                scale:isMobile ? 1 : .9,
                            },
                            {
                                opacity: 1,
                                scale: 1,
                                duration: .3,
                                ease: "power2.out",
                                overwrite: true
                            }
                        );
                    }

                    if (scrollProgress < trigger && shown[index]) {
                        shown[index] = false;

                        gsap.to(item, {
                            opacity: 0,
                            scale:isMobile ? 1 : .9,
                            duration: .2,
                            ease: "power3.out",
                            overwrite: true
                        });
                    }
                });
            }
        })

    }, {scope: section})
    
    
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

                        <div className="vision__card">
                            <div className="vision__images">
                                <img src="/pills/pill-9.png" alt="pill" className = "pill"/>
                            </div>
                            <p className="md vision-md">Reduce stress</p>
                        </div>

                    </div>

                    <div className="vision__timeline-desk">
                        <div className="circle"></div>
                        <div className="dash"></div>
                        <div className="circle circle-animation"></div>
                    </div>


                </div>

                <Copy
                    trigger=".vision--block"
                    start="0% bottom"
                >
                    <p className="vision-title">Because what works for one body may not work for yours.</p>
                </Copy>
            </div>
        </section>
        <div className="vision--block">
            <div className="container vision-block--container">
                <span className="mono">Our Vision</span>
                <Copy>
                    <h2>Finding what works for your body shouldn't take endless trial and error.</h2>
                </Copy>
            </div>
        </div>
        </>
    )
}