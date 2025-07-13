"use client";

import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import gsap from "gsap";

const projects = [
    {
        top: "/image-1.avif",
        bottom: ["/image-2.jpg", "/image-3.png"],
    },
    {
        top: "/image-1.avif",
        bottom: ["/image-2.jpg", "/image-3.png"],
    },
    {
        top: "/image-1.avif",
        bottom: ["/image-2.jpg", "/image-3.png"],
    },
    {
        top: "/image-1.avif",
        bottom: ["/image-2.jpg", "/image-3.png"],
    },
    {
        top: "/image-1.avif",
        bottom: ["/image-2.jpg", "/image-3.png"],
    },
];

const Portfolio = () => {
    const [index, setIndex] = useState(0);

    const topRef = useRef(null);
    const nextTopRef = useRef(null);
    const bottomLeftRef = useRef(null);
    const bottomRightRef = useRef(null);
    const nextBottomLeftRef = useRef(null);
    const nextBottomRightRef = useRef(null);

    const goNext = () => {
        const nextIndex = (index + 1) % projects.length;
        const screenWidth = window.innerWidth;

        const tl = gsap.timeline();

        // top image slide out
        tl.to(topRef.current, {
            x: -screenWidth,
            opacity: 0,
            duration: 1.7,
            ease: "power2.inOut",
            onStart: () => {
                gsap.set(nextTopRef.current, { x: screenWidth, opacity: 1, zIndex: 10 });
            },
        });

        // top image slide in
        tl.to(
            nextTopRef.current,
            {
                x: 0,
                opacity: 1,
                duration: 1.7,
                ease: "power2.inOut",
            },
            "-=1.3"
        );

        // bottom image slide out
        tl.to(
            [bottomLeftRef.current, bottomRightRef.current],
            {
                x: -screenWidth,
                opacity: 0,
                duration: 1.7,
                ease: "power2.inOut",
                stagger: 0.3,
                onStart: () => {
                    gsap.set([nextBottomLeftRef.current, nextBottomRightRef.current], {
                        x: screenWidth,
                        opacity: 1,
                        zIndex: 10,
                    });
                },
            },
            "<"
        );

        // bottom image slide in
        tl.to(
            [nextBottomLeftRef.current, nextBottomRightRef.current],
            {
                x: 0,
                opacity: 1,
                duration: 1.7,
                ease: "power2.inOut",
                stagger: 0.3,
            },
            "-=1.3"
        );

        // cleanup
        tl.add(() => {
            setIndex(nextIndex);
            gsap.set(
                [topRef.current, bottomLeftRef.current, bottomRightRef.current],
                { x: 0, opacity: 1, zIndex: 0 }
            );
            gsap.set(
                [nextTopRef.current, nextBottomLeftRef.current, nextBottomRightRef.current],
                { x: 0, opacity: 0, zIndex: 0 }
            );
        });
    };

    // Current and next projects for images
    const currentProject = projects[index];
    const nextIndex = (index + 1) % projects.length;
    const nextProject = projects[nextIndex];

    return (
        <section className="bg-black text-white py-16 px-4 md:px-10 lg:px-16 overflow-hidden">
            <div className="max-w-6xl mx-auto relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-4xl font-bold mb-3">Featured Projects</h2>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Discover some of my finest graphic design work, blending creativity with visual storytelling to build compelling brand identities.
                        </p>
                    </div>
                    <div className="flex space-x-3 text-xl">
                        <button
                            onClick={goNext}
                            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 hover:text-white transition"
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                </div>

                {/* === TOP IMAGE === */}
                <div className="relative h-[320px] md:h-[450px] mb-10">
                    <div
                        className="absolute inset-0 rounded-xl overflow-hidden shadow-xl z-10"
                        ref={topRef}
                    >
                        <Image src={currentProject.top} alt="Top" layout="fill" className="object-cover" />
                    </div>
                    <div
                        className="absolute inset-0 rounded-xl overflow-hidden shadow-xl z-0"
                        ref={nextTopRef}
                    >
                        <Image src={nextProject.top} alt="Next Top" layout="fill" className="object-cover" />
                    </div>
                </div>

                {/* === BOTTOM IMAGES === */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    <div className="relative h-[270px]">
                        <div
                            className="absolute inset-0 rounded-xl overflow-hidden shadow-xl z-10"
                            ref={bottomLeftRef}
                        >
                            <Image
                                src={currentProject.bottom[0]}
                                alt="Bottom Left"
                                layout="fill"
                                className="object-cover"
                            />
                        </div>
                        <div
                            className="absolute inset-0 rounded-xl overflow-hidden shadow-xl z-0"
                            ref={nextBottomLeftRef}
                        >
                            <Image
                                src={nextProject.bottom[0]}
                                alt="Next Bottom Left"
                                layout="fill"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="relative h-[270px]">
                        <div
                            className="absolute inset-0 rounded-xl overflow-hidden shadow-xl z-10"
                            ref={bottomRightRef}
                        >
                            <Image
                                src={currentProject.bottom[1]}
                                alt="Bottom Right"
                                layout="fill"
                                className="object-cover"
                            />
                        </div>
                        <div
                            className="absolute inset-0 rounded-xl overflow-hidden shadow-xl z-0"
                            ref={nextBottomRightRef}
                        >
                            <Image
                                src={nextProject.bottom[1]}
                                alt="Next Bottom Right"
                                layout="fill"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
