import "./vision.css"
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Vision(){
    const section = useRef(null);

    useGSAP(() =>{

    }, {once: section})
    
    
    return(
        <section ref={section} className="vision">
            <div className="vision__container">
                <span className="mono vision__mono">Too many promises</span>

                <div className="vision__content">

                    <div className="vision__cards">

                        <div className="vision__card">
                            <div className="vision__images">
                                <img src="/vision/pill-1.png" alt="pill" className = "pill"/>
                                <img src="/vision/pill-2.png" alt="pill" className = "pill"/>
                                <img src="/vision/pill-3.png" alt="pill" className = "pill"/>
                            </div>
                            <p className="md vision-md">Fall asleep faster</p>
                        </div>

                        <div className="vision__card">
                            <div className="vision__images">
                                <img src="/vision/pill-4.png" alt="pill" className = "pill"/>
                            </div>
                            <p className="md vision-md">Calm your mind</p>
                        </div>

                        <div className="vision__card">
                            <div className="vision__images">
                                <img src="/vision/pill-5.png" alt="pill" className = "pill"/>
                                <img src="/vision/pill-6.png" alt="pill" className = "pill"/>
                                <img src="/vision/pill-7.png" alt="pill" className = "pill"/>
                            </div>
                            <p className="md vision-md">Deep sleep</p>
                        </div>

                        <div className="vision__card">
                            <div className="vision__images">
                                <img src="/vision/pill-8.png" alt="pill" className = "pill"/>
                            </div>
                            <p className="md vision-md">Better rest</p>
                        </div>

                        <div className="vision__card">
                            <div className="vision__images">
                                <img src="/vision/pill-9.png" alt="pill" className = "pill"/>
                            </div>
                            <p className="md vision-md">Reduce stress</p>
                        </div>

                    </div>

                    <div className="vision__timeline">
                        <div className="circle"></div>
                        <div className="dash"></div>
                        <div className="circle"></div>
                    </div>

                </div>

                <p className="vision-title">Because what works for one body may not work for yours.</p>
            </div>
        </section>
    )
}