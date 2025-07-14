"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Highlight = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        // Split all paragraphs individually, store refs
        const powering = new SplitType(
            section.querySelector("p.powering"),
            { types: "words" }
        );
        const eightyBillion = new SplitType(
            section.querySelector("p.gradient-cyan"),
            { types: "words" }
        );
        const minutesOf = new SplitType(
            section.querySelector("p.gradient-pink"),
            { types: "words" }
        );
        const videoVoice = new SplitType(
            section.querySelector("p.video-voice"),
            { types: "words" }
        );
        const everyMonth = new SplitType(
            section.querySelector("p.every-month"),
            { types: "words" }
        );

        // All words in order:
        const allWords = [
            ...powering.words,
            ...eightyBillion.words,
            ...minutesOf.words,
            ...videoVoice.words,
            ...everyMonth.words,
        ];

        // Initial styles - all gray
        gsap.set(allWords, { color: "#525252" });

        // Pin & animate
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${section.offsetHeight}`,
                scrub: true,
                pin: true,
                anticipatePin: 1,
            },
        });

        tl.to(
            allWords,
            {
                duration: 0.01,
                color: (i, target) => {
                    // If word belongs to cyan gradient line
                    if (eightyBillion.words.includes(target)) return "transparent";
                    // If word belongs to pink gradient line
                    if (minutesOf.words.includes(target)) return "transparent";
                    // Otherwise white
                    return "#ffffff";
                },
                stagger: 0.15,
                ease: "none",
                onUpdate: () => {
                    // Add gradient classes only for relevant words, remove from others
                    eightyBillion.words.forEach((word) => {
                        if (gsap.getProperty(word, "color") === "transparent") {
                            word.classList.add(
                                "bg-gradient-to-r",
                                "from-cyan-400",
                                "to-white",
                                "bg-clip-text",
                                "text-transparent"
                            );
                        } else {
                            word.classList.remove(
                                "bg-gradient-to-r",
                                "from-cyan-400",
                                "to-white",
                                "bg-clip-text",
                                "text-transparent"
                            );
                        }
                    });
                    minutesOf.words.forEach((word) => {
                        if (gsap.getProperty(word, "color") === "transparent") {
                            word.classList.add(
                                "bg-gradient-to-r",
                                "from-white",
                                "to-pink-500",
                                "bg-clip-text",
                                "text-transparent"
                            );
                        } else {
                            word.classList.remove(
                                "bg-gradient-to-r",
                                "from-white",
                                "to-pink-500",
                                "bg-clip-text",
                                "text-transparent"
                            );
                        }
                    });
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-black py-20 px-4 md:px-10 lg:px-44 min-h-screen"
        >
            <div className="text-left leading-tight max-w-8xl mx-auto">
                <h2 className="text-2xl text-white leading-tight mb-4">
                    GROW WITH THE LEADING PLATFORM
                </h2>

                <p className="text-[140px] font-extrabold leading-none tracking-tight powering">
                    POWERING
                </p>
                <p
                    className="text-[140px] font-extrabold leading-none tracking-tight gradient-cyan"
                >
                    80 BILLION
                </p>
                <p
                    className="text-[140px] font-extrabold leading-none tracking-tight gradient-pink"
                >
                    MINUTES OF
                </p>
                <p className="text-[140px] font-extrabold leading-none tracking-tight video-voice">
                    VIDEO AND VOICE
                </p>
                <p className="text-[140px] font-extrabold leading-none tracking-tight every-month">
                    EVERY MONTH
                </p>
            </div>
        </section>
    );
};

export default Highlight;
