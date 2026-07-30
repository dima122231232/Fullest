import "./benefits.css"
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "@/components/copy/copy";

gsap.registerPlugin(ScrollTrigger);

export default function Benefits(){
    const section = useRef(null);
    useGSAP(() =>{
        const isMobile = window.innerWidth < 1000;
        const q = gsap.utils.selector(section);
        const one = q(".one");
        const three = q(".three");
        const backOne = q(".back-circles.one");
        const backThree = q(".back-circles.three");
        const pill = q(".benefits__pill-img")[0];
        const pills = Array.from({ length: 9 }, (_, i) => `/pills/pill-${i + 1}.png`);

        gsap.set(backOne, { yPercent: 100 });
        gsap.set(backThree, { yPercent: -100 });

        
        ScrollTrigger.create({
            trigger:section.current,
            start:"top top",
            end: () => `+=${window.innerHeight * (isMobile ? 1.7 : 1)}`,
            pin: isMobile ? false : true,
            pinSpacing:true,
            scrub:true,
            invalidateOnRefresh: true,
            onUpdate:(self) =>{
                const scrollProgress = self.progress;
                const animProgress = gsap.utils.interpolate(0, isMobile ? -80 : -140, self.progress);

                gsap.set(one, { y: animProgress });
                gsap.set(three, { y: -animProgress });

                gsap.to(backOne, { yPercent: 100, y: animProgress });
                gsap.to(backThree, { yPercent: -100, y: -animProgress });           
                
                if (!isMobile){
                    const imageIndex = Math.round(gsap.utils.interpolate(1, 9, self.progress));
                    pill.src = `/pills/pill-${imageIndex}.png`;
                }
            }
        })
    }, {scope: section})
    
    return(
        <section ref={section} className="benefits">
            <div className="container benefits__container">
                <div className="benefits__content">
                    <span className="mono">It's not just what you take.</span>
                    <Copy>
                        <p>Your supplements work best when they're supported by the right routines and environment. Fullest helps you understand the small changes that can make the biggest difference.</p>
                    </Copy>
                </div>
                <div className="benefits__visual">
                    <div className="benefits__visual-block">
                        <div className="back-circles one"></div>
                        <div className="back-circles two"></div>
                        <div className="back-circles three"></div>
                            <img src="/pills/pill-9.png" alt="pill" className="benefits__pill-img"/>
                        <div className="front-circles one"></div>
                        <div className="front-circles two"></div>
                        <div className="front-circles three"></div>
                    </div>
                    <div className="benefits-mono">
                        <span className="mono one">FORMULA</span>
                        <span className="mono two">Environment</span>
                        <span className="mono three">ROUTINES</span>
                    </div>
                </div>
            </div>
        </section>
    )
}