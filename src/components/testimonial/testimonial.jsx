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

    useGSAP(() => {
        const isMobile = window.innerWidth < 800;
        const q = gsap.utils.selector(section);

        const container = q(".testimonial__videos")[0];
        const track = q(".testimonial__track")[0];

        const people = q(".testimonial__person");
        const videos = q(".testimonial__video");
        const personWidth = people[0].offsetWidth;

        const anim = {
            duration: .75,
            ease: "power2.inOut"
        };

        let activeIndex = 0;

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

            Draggable.get(track).vars.onThrowComplete = syncActiveVideo;
        };

        videos.forEach((video) => {
            video.loop = true;
        });

        const playVideo = (index) => {
            const video = videos[index];

            if (!video) return;

            video.play().catch(() => {});
        };

        const pauseVideo = (index) => {
            const video = videos[index];

            if (!video) return;

            video.pause();
        };

        const pauseAllVideos = () => {
            videos.forEach((video) => {
                video.pause();
            });
        };

        const handleToggle = (value, person) => {
            const pause = person.querySelector(".testimonial__wrapper-play svg");

            const play = person.querySelector(".testimonial__wrapper-play .triangle");

            if (value === "1") {
                gsap.set(pause, { opacity: 1 });
                gsap.set(play, { opacity: 0 });
            }

            if (value === "2") {
                gsap.set(pause, { opacity: 0 });
                gsap.set(play, { opacity: 1 });
            }
        };

        const updatePeople = (index) => {
            people.forEach((person, i) => {
                const wrapper = person.querySelector(
                    ".testimonial__wrapper"
                );

                const isActive = i === index;

                gsap.to(person, {
                    width: isActive ? personWidth : "2rem",
                    transform: isActive ? "translateX(.75rem)" : "translateX(0rem)",
                    ...anim
                });

                gsap.to(wrapper, {
                    width: isActive ? personWidth : 0,
                    scale: isActive ? 1 : 0,
                    ...anim
                });
            });
        };

        const centerVideo = (index) => {
            const video = videos[index];

            if (!video) return;

            const containerRect =
                container.getBoundingClientRect();

            const videoRect =
                video.getBoundingClientRect();

            const containerCenter =
                containerRect.left +
                containerRect.width / 2;

            const videoCenter =
                videoRect.left +
                videoRect.width / 2;

            const currentX =
                gsap.getProperty(track, "x") || 0;

            const targetX =
                currentX +
                containerCenter -
                videoCenter;

            const minX = Math.min(
                0,
                container.offsetWidth - track.scrollWidth
            );

            const x = gsap.utils.clamp(
                minX,
                0,
                targetX
            );

            gsap.to(track, {
                x,
                ...anim
            });
        };

        const selectVideo = (index) => {
            const person = people[index];

            if (!person) return;

            if (index !== activeIndex) {
                pauseAllVideos();

                activeIndex = index;

                person.dataset.toggle = "1";

                handleToggle("1", person);

                playVideo(index);
            }

            updatePeople(index);
            centerVideo(index);
        };

        const syncActiveVideo = () => {
            const containerRect =
                container.getBoundingClientRect();

            const containerCenter =
                containerRect.left +
                containerRect.width / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            videos.forEach((video, index) => {
                const videoRect =
                    video.getBoundingClientRect();

                const videoCenter =
                    videoRect.left +
                    videoRect.width / 2;

                const distance = Math.abs(
                    containerCenter - videoCenter
                );

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            selectVideo(closestIndex);
        };

        const umschalten = (index) => {
            const person = people[index];

            if (!person) return;

            if (index !== activeIndex) {
                pauseAllVideos();

                activeIndex = index;

                person.dataset.toggle = "1";

                handleToggle("1", person);

                playVideo(index);
            } else {
                person.dataset.toggle =
                    person.dataset.toggle === "2"
                        ? "1"
                        : "2";

                handleToggle(
                    person.dataset.toggle,
                    person
                );

                if (person.dataset.toggle === "1") {
                    playVideo(index);
                } else {
                    pauseVideo(index);
                }
            }

            updatePeople(index);
            centerVideo(index);
        };

        people.forEach((person, index) => {
            person.addEventListener("click", () => {
                umschalten(index);
            });
        });

        people.forEach((person, index) => {
            person.dataset.toggle = index === 0 ? "1" : "2";

            handleToggle(
                person.dataset.toggle,
                person
            );
        });

        pauseAllVideos();
        playVideo(0);

        create();

        requestAnimationFrame(() => {
            centerVideo(0);
        });

        if(!isMobile){
            window.addEventListener("resize", create);
        }

        return () => {
            window.removeEventListener("resize", create);
            pauseAllVideos();
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
                            <video className="testimonial__video" src="/home/video/video.mp4" muted playsInline ></video>
                            <video className="testimonial__video" src="/home/video/video.mp4" muted playsInline ></video>
                            <video className="testimonial__video" src="/home/video/video.mp4" muted playsInline ></video>
                            {/* <img className="testimonial__video" src="/testimonial/p1.jpg" alt="video testimonial" />
                            <img className="testimonial__video" src="/testimonial/p2.png" alt="video testimonial" />
                            <img className="testimonial__video" src="/testimonial/p1.jpg" alt="video testimonial" /> */}

                        </div>
                    </div>

                    <div className="testimonial__container-people">
                        <div className="testimonial__people">
                            <div className="testimonial__person testimonial__activity">
                                <img className="testimonial__avatar" src="/testimonial/person-1.png" alt="person" />
                                <div className="testimonial__wrapper">
                                    <div className="testimonial__hidden">
                                        <div className="h"></div>
                                        <div className="testimonial__wrapper-play">
                                            <div className="testimonial__play triangle"></div>
                                            <svg width="39" height="48" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.262 40.976C13.262 44.638 10.293 47.607 6.631 47.607C2.969 47.607 0 44.638 0 40.976V6.631C0 2.969 2.969 0 6.631 0C10.293 0 13.262 2.969 13.262 6.631V40.976Z" fill="black"/>
                                            <path d="M38.1482 40.976C38.1482 44.638 35.1792 47.607 31.5172 47.607C27.8552 47.607 24.8862 44.638 24.8862 40.976V6.631C24.8872 2.969 27.8562 0 31.5172 0C35.1792 0 38.1482 2.969 38.1482 6.631V40.976Z" fill="black"/>
                                            </svg>

                                        </div>
                                        <p className="sm">Jane</p>
                                    </div>
                                </div>
                            </div>

                            <div className="testimonial__person">
                                <img className="testimonial__avatar" src="/testimonial/person-2.png" alt="person" />
                                <div className="testimonial__wrapper">
                                    <div className="testimonial__hidden">
                                        <div className="h"></div>
                                        <div className="testimonial__wrapper-play">
                                            <div className="testimonial__play triangle"></div>
                                            <svg width="39" height="48" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.262 40.976C13.262 44.638 10.293 47.607 6.631 47.607C2.969 47.607 0 44.638 0 40.976V6.631C0 2.969 2.969 0 6.631 0C10.293 0 13.262 2.969 13.262 6.631V40.976Z" fill="black"/>
                                            <path d="M38.1482 40.976C38.1482 44.638 35.1792 47.607 31.5172 47.607C27.8552 47.607 24.8862 44.638 24.8862 40.976V6.631C24.8872 2.969 27.8562 0 31.5172 0C35.1792 0 38.1482 2.969 38.1482 6.631V40.976Z" fill="black"/>
                                            </svg>

                                        </div>
                                        <p className="sm">Marina</p>
                                    </div>
                                </div>
                            </div>

                            <div className="testimonial__person">
                                <img className="testimonial__avatar" src="/testimonial/person-3.png" alt="person" />
                                <div className="testimonial__wrapper">
                                    <div className="testimonial__hidden">
                                        <div className="h"></div>
                                        <div className="testimonial__wrapper-play">
                                            <div className="testimonial__play triangle"></div>
                                            <svg width="39" height="48" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.262 40.976C13.262 44.638 10.293 47.607 6.631 47.607C2.969 47.607 0 44.638 0 40.976V6.631C0 2.969 2.969 0 6.631 0C10.293 0 13.262 2.969 13.262 6.631V40.976Z" fill="black"/>
                                            <path d="M38.1482 40.976C38.1482 44.638 35.1792 47.607 31.5172 47.607C27.8552 47.607 24.8862 44.638 24.8862 40.976V6.631C24.8872 2.969 27.8562 0 31.5172 0C35.1792 0 38.1482 2.969 38.1482 6.631V40.976Z" fill="black"/>
                                            </svg>

                                        </div>
                                        <p className="sm">Dmytro</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}