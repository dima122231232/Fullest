import "./vision.css"
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Vision(){
    const section = useRef(null);

    useGSAP(() =>{
        const q = gsap.utils.selector(section);
        const isMobile = window.innerWidth < 1200;
        const card = q(".vision__card");
        const segment = 1 / card.length;
        const dash = q(".vision__timeline-desk .dash")[0];
        const circles = q(".circle");
        const circle = q(".divider-circle");
        const dots = q(".divider-circle--animation");
        const circleAnimation = q(".circle-animation")[0];
        const dashes = q(".vision__divider .dash");
        const part = 1 / dashes.length;

        ScrollTrigger.create({
            trigger:section.current,
            start:"top top",
            end:() => `+=${window.innerHeight * (isMobile ? 3.5 : 2)}px`,
            pin:true,
            pinSpacing:true,
            scrub:true,
            invalidateOnRefresh: true,
            onToggle: (self) => {
                if (self.isActive) {
                    gsap.to(circles, { scale: 1, duration: .2 });
                    gsap.to(circle[0], { scale: 1, duration: .2 });
                } else if (self.direction === -1) {
                    gsap.to(circles, { scale: 0, duration: .2 });
                    gsap.to(circle[0], { scale: 0, duration: .2 });
                }
            },
            onUpdate: (self) =>{
                const scrollProgress = self.progress;

                gsap.set(circleAnimation,{left:`${gsap.utils.interpolate(0, 100, scrollProgress)}%`})
                if (!isMobile) {
                    gsap.set(dash,{clipPath: `polygon(0 0, ${scrollProgress*100}% 0, ${scrollProgress*100}% 100%, 0% 100%)`})
                } else {
                    dashes.forEach((dash, i) => {
                        const progress = gsap.utils.clamp(0, 1, (scrollProgress - i * part) / part);

                        gsap.set(dash, {clipPath: `polygon(0 0, ${progress * 100}% 0, ${progress * 100}% 100%, 0 100%)`});
                        gsap.set(dots[i], {left: `max(0px, calc(${progress * 100}% - 5px))`});

                        const active = i === dashes.length - 1 ? progress > 0 : progress > 0 && progress < 1;

                        if (dots[i]._active !== active) {
                            dots[i]._active = active;

                            gsap.to(dots[i], {scale: active ? 1 : 0,duration: 0.2,overwrite: true,ease: "power1.out"});
                        }
                    });
                    
                }

                card.forEach((item, index) => {
                    const localProgress = gsap.utils.clamp(0 , 1, (scrollProgress - (index * segment + segment * (isMobile ? 0.15 : 0.5))) / (segment * (isMobile ? 0.35 : 0.5)));
                    gsap.set(item,{opacity:localProgress})
                })
                
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