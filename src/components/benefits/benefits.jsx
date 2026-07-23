import "./benefits.css"
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Benefits(){
    const section = useRef(null);

    useGSAP(() =>{

    }, {scope: section})
    
    return(
        <section ref={section} className="benefits">
            <div className="container benefits__container">
                <div className="benefits__content">
                    <span className="mono">It's not just what you take.</span>
                    <p>Your supplements work best when they're supported by the right routines and environment. Fullest helps you understand the small changes that can make the biggest difference.</p>
                </div>
                <div className="benefits__visual">
                    <div className="benefits__visual-block">
                        <img src="/pills/pill-9.png" alt="pill" className="benefits__pill-img"/>
                        <div className="benefits__item" >
                            <div className="benefits__circle-block">
                                <div className="benefits__circle benefits__circle--top"></div>
                                <div className="benefits__circle benefits__circle--bottom"></div>
                            </div>
                            <span className="mono">Environment</span>
                        </div>
                        <div className="benefits__item" >
                            <div className="benefits__circle-block">
                                <div className="benefits__circle benefits__circle--top"></div>
                                <div className="benefits__circle benefits__circle--bottom"></div>
                            </div>
                            <span className="mono">ROUTINES</span>
                        </div>
                        <div className="benefits__item" >
                            <div className="benefits__circle-block">
                                <div className="benefits__circle benefits__circle--top"></div>
                                <div className="benefits__circle benefits__circle--bottom"></div>
                            </div>
                            <span className="mono">FORMULA</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}