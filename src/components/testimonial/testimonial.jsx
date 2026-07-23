import "./testimonial.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Testimonial() {
    const section = useRef(null);

    useGSAP(() =>{

    }, {scope: section})
    return (
        <section ref={section} className="testimonial">
            <div className="testimonial__container">
                <div className="testimonial__quote">
                    <p>The supplement was honestly the easy part. What actually changed things was it telling me to move my workout earlier and cut screens off at a specific time. I wouldn't have figured that out on my own.</p>
                    <p className="md">— Jane on Sleep Fullest Formula</p>
                </div>

                <div className="testimonial__media">
                    <div className="testimonial__videos">
                        <img className="testimonial__video" src="/testimonial/p1.jpg" alt="video testimonial" />
                        <img className="testimonial__video" src="/testimonial/p2.png" alt="video testimonial" />
                        <img className="testimonial__video" src="/testimonial/p1.jpg" alt="video testimonial" />
                    </div>

                    <div className="testimonial__people">
                        <div className="testimonial__person testimonial__activity">
                            <img className="testimonial__avatar" src="/testimonial/person-1.png" alt="person" />
                            <div className="testimonial__wrapper">
                                <div className="testimonial__hidden">
                                    <div className="h"></div>
                                    <div className="testimonial__play triangle"></div>
                                    <p className="sm">Jane</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial__person">
                            <img className="testimonial__avatar" src="/testimonial/person-2.png" alt="person" />
                            <div className="testimonial__wrapper">
                                <div className="testimonial__hidden">
                                    <div className="h"></div>
                                    <div className="testimonial__play triangle"></div>
                                    <p className="sm">Marina</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial__person">
                            <img className="testimonial__avatar" src="/testimonial/person-3.png" alt="person" />
                            <div className="testimonial__wrapper">
                                <div className="testimonial__hidden">
                                    <div className="h"></div>
                                    <div className="testimonial__play triangle"></div>
                                    <p className="sm">Dmytro</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}