import "./testimonial.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

import Copy from "@/components/copy/copy";

gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin);
export default function Testimonial() {
    const section = useRef(null);
    const videos = useRef(null);

useGSAP(() => {
    const q = gsap.utils.selector(section);

    const container = q(".testimonial__videos")[0];
    const track = q(".testimonial__track")[0];

    const create = () => {
        Draggable.get(track)?.kill();

        gsap.set(track, { x: 0 });

        const minX = Math.min(
            0,
            container.offsetWidth - track.scrollWidth
        );

        Draggable.create(track, {
            trigger: container,
            type: "x",
            bounds: {
                minX,
                maxX: 0
            },
            inertia: true,
            cursor: "grab",
            activeCursor: "grabbing"
        });
    };

    create();

    window.addEventListener("resize", create);

    return () => {
        window.removeEventListener("resize", create);
        Draggable.get(track)?.kill();
    };
}, { scope: section });
    return (
        <section ref={section} className="testimonial">
            <div className="testimonial__container">
                <div className="testimonial__quote">
                    <Copy>
                        <p>The supplement was honestly the easy part. What actually changed things was it telling me to move my workout earlier and cut screens off at a specific time. I wouldn't have figured that out on my own.</p>
                        <p className="md">— Jane on Sleep Fullest Formula</p>
                    </Copy>
                </div>

                <div className="testimonial__media">
                    <div className="testimonial__videos">
                        <div className="testimonial__track">
                            <img className="testimonial__video" src="/testimonial/p1.jpg" alt="video testimonial" />
                            <img className="testimonial__video" src="/testimonial/p2.png" alt="video testimonial" />
                            <img className="testimonial__video" src="/testimonial/p1.jpg" alt="video testimonial" />
                            <img className="testimonial__video" src="/testimonial/p2.png" alt="video testimonial" />
                            <img className="testimonial__video" src="/testimonial/p1.jpg" alt="video testimonial" />
                            <img className="testimonial__video" src="/testimonial/p2.png" alt="video testimonial" />

                        </div>
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