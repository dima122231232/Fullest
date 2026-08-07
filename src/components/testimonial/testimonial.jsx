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

        const audio = q(".testimonial__audio")[0];
        const audioOff = q(".testimonial__audio-off")[0];
        const audioOn = q(".testimonial__audio-on")[0];

        const personWidth = people[0].offsetWidth;

        const anim = {
            duration: .75,
            ease: "power2.inOut"
        };

        const audioAnim = {
            duration: .2,
            ease: "power2.out"
        };

        let activeIndex = 0;
        let audioEnabled = false;

        const create = () => {
            Draggable.get(track)?.kill();

            gsap.set(track, { x: 0 });

            const minX = Math.min(0, container.offsetWidth - track.scrollWidth);

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
            video.loop = false;
            video.muted = true;
            video.preload = "auto";
            // video.load();
        });

        const playVideo = (index) => {
            const video = videos[index];

            if (!video) return;

            video.muted = !audioEnabled;
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
                video.muted = true;
            });
        };

        const handleToggle = (value, person) => {
            const pause = person.querySelector(".testimonial__wrapper-play svg");
            const play = person.querySelector(".testimonial__wrapper-play .triangle");

            const activeIcon = value === "1" ? pause : play;
            const hiddenIcon = value === "1" ? play : pause;

            gsap.set(hiddenIcon, { opacity: 0 });

            gsap.fromTo(activeIcon, {
                opacity: 0,
                scale: .9
            }, {
                opacity: 1,
                scale: 1,
                ...audioAnim
            });
        };

        const handleAudioToggle = (value) => {
            const activeIcon = value === "1" ? audioOn : audioOff;
            const hiddenIcon = value === "1" ? audioOff : audioOn;

            gsap.set(hiddenIcon, { opacity: 0 });

            gsap.fromTo(activeIcon, {
                opacity: 0,
                scale: .9
            }, {
                opacity: 1,
                scale: 1,
                ...audioAnim
            });
        };

        const toggleAudio = () => {
            audioEnabled = !audioEnabled;

            if (audioEnabled) {
                videos.forEach((video, index) => {
                    video.muted = index !== activeIndex;
                });

                playVideo(activeIndex);
                handleAudioToggle("1");
            } else {
                videos.forEach((video) => {
                    video.muted = true;
                });

                handleAudioToggle("2");
            }
        };

        const updatePeople = (index) => {
            people.forEach((person, i) => {
                const wrapper = person.querySelector(".testimonial__wrapper");
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

            const containerRect = container.getBoundingClientRect();
            const videoRect = video.getBoundingClientRect();

            const containerCenter = containerRect.left + containerRect.width / 2;
            const videoCenter = videoRect.left + videoRect.width / 2;

            const currentX = gsap.getProperty(track, "x") || 0;
            const targetX = currentX + containerCenter - videoCenter;

            const minX = Math.min(0, container.offsetWidth - track.scrollWidth);
            const x = gsap.utils.clamp(minX, 0, targetX);

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
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            videos.forEach((video, index) => {
                const videoRect = video.getBoundingClientRect();
                const videoCenter = videoRect.left + videoRect.width / 2;
                const distance = Math.abs(containerCenter - videoCenter);

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
                person.dataset.toggle = person.dataset.toggle === "2" ? "1" : "2";

                handleToggle(person.dataset.toggle, person);

                if (person.dataset.toggle === "1") {
                    playVideo(index);
                } else {
                    pauseVideo(index);
                }
            }

            updatePeople(index);
            centerVideo(index);
        };

        const handlePersonClick = (index) => {
            umschalten(index);
        };

        const handleVideoEnded = (index) => {
            const nextIndex = index === videos.length - 1 ? 0 : index + 1;

            selectVideo(nextIndex);
        };

        people.forEach((person, index) => {
            person.addEventListener("click", () => handlePersonClick(index));
        });

        videos.forEach((video, index) => {
            video.addEventListener("ended", () => handleVideoEnded(index));
        });

        audio.addEventListener("click", toggleAudio);

        people.forEach((person, index) => {
            person.dataset.toggle = index === 0 ? "1" : "2";
            handleToggle(person.dataset.toggle, person);
        });

        handleAudioToggle("2");

        pauseAllVideos();
        playVideo(0);

        create();

        requestAnimationFrame(() => {
            centerVideo(0);
        });

        if (!isMobile) {
            window.addEventListener("resize", create);
        }

        return () => {
            window.removeEventListener("resize", create);
            audio.removeEventListener("click", toggleAudio);

            people.forEach((person, index) => {
                person.removeEventListener("click", () => handlePersonClick(index));
            });

            videos.forEach((video, index) => {
                video.removeEventListener("ended", () => handleVideoEnded(index));
            });

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

                        <div className="testimonial__audio">
                            <svg className="testimonial__audio-off" width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M457.941 256L504.97 208.971C514.342 199.598 514.342 184.403 504.97 175.03C495.597 165.657 480.402 165.657 471.029 175.03L424 222.059L376.971 175.03C367.598 165.657 352.403 165.657 343.03 175.03C333.658 184.403 333.658 199.598 343.03 208.971L390.059 256L343.03 303.029C333.658 312.402 333.658 327.597 343.03 336.97C347.716 341.657 353.857 344 360 344C366.143 344 372.284 341.657 376.971 336.971L424 289.941L471.029 336.97C475.716 341.657 481.857 344 488 344C494.143 344 500.284 341.657 504.971 336.971C514.343 327.598 514.343 312.403 504.971 303.03L457.941 256Z" fill="black"/>
                                <path d="M99 160H44C19.699 160 0 179.699 0 204V308C0 332.301 19.699 352 44 352H99C101.761 352 104 349.761 104 347V165C104 162.239 101.761 160 99 160Z" fill="black"/>
                                <path d="M280 56H256C250.731 56 245.608 57.734 241.422 60.935L137.963 140.051C136.726 140.997 136 142.465 136 144.023V367.978C136 369.535 136.726 371.004 137.963 371.95L241.422 451.065C245.608 454.266 250.731 456.001 256.001 456.001H280C293.255 456.001 304 445.256 304 432.001V80C304 66.745 293.255 56 280 56Z" fill="black"/>
                            </svg>
                            <svg className="testimonial__audio-on" width="428" height="342" viewBox="0 0 428 342" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M364.8 19.2865C356.267 12.8865 345.6 12.8865 337.067 19.2865C328.533 27.8198 326.4 40.6198 334.933 49.1531C401.067 115.286 401.067 224.086 334.933 290.22C326.4 298.753 326.4 311.553 334.933 320.086C339.2 324.353 343.467 326.486 349.867 326.486C356.267 326.486 360.533 324.353 364.8 320.086C448 239.02 448 102.486 364.8 19.2865Z" fill="black"/>
                                <path d="M302.933 81.1531C294.4 74.7531 283.733 74.7531 275.2 81.1531C266.667 89.6865 264.533 102.486 273.067 111.02C307.2 145.153 307.2 198.486 273.067 232.62C264.533 241.153 264.533 253.953 273.067 262.486C277.333 266.753 281.6 268.887 288 268.887C294.4 268.887 298.667 266.753 302.933 262.486C354.133 211.286 354.133 130.22 302.933 81.1531Z" fill="black"/>
                                <path d="M200.533 2.21977C192 -2.0469 183.467 0.0864436 177.067 6.48644L98.1333 85.4198H42.6667C19.2 85.4198 0 104.62 0 128.086V213.42C0 236.886 19.2 256.086 42.6667 256.086H98.1333L177.067 335.02C181.333 339.286 185.6 341.42 192 341.42C194.133 341.42 198.4 341.42 200.533 339.286C209.067 335.02 213.333 328.62 213.333 320.086V21.4198C213.333 12.8864 209.067 4.3531 200.533 2.21977Z" fill="black"/>
                            </svg>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}