import "./benefits.css"
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Copy from "@/components/copy/copy";

gsap.registerPlugin(ScrollTrigger);

export default function Benefits(){
    const section = useRef(null);

    useGSAP((context) =>{
        const isMobile = window.innerWidth < 1000;
        const q = context.selector;

        const one = q(".one");
        const three = q(".three");
        const backOne = q(".back-circles.one");
        const backThree = q(".back-circles.three");
        const pill = q(".benefits__pill-img")[0];


        gsap.set(backOne, { yPercent: 100 });
        gsap.set(backThree, { yPercent: -100 });

        const endValue = window.innerHeight * (isMobile ? 1.2 : 1);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section.current,
                start: "top top",
                end: `+=${endValue}`,
                pin: isMobile ? false : true,
                pinSpacing: true,
                scrub: true,
                invalidateOnRefresh: true
            }
        });

        const yValue = isMobile ? -80 : -140;

        tl.to(one, { y: yValue }, 0)
          .to(three, { y: -yValue }, 0)
          .to(backOne, { y: yValue }, 0)
          .to(backThree, { y: -yValue }, 0);

    }, {scope: section});

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

                        <img src="/pills/pill-benefits.png" alt="pill" className="benefits__pill-img"/>

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