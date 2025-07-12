'use client';

import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import About from '../About/About';

const Header = () => {
    const overlayRef = useRef(null);
    const nazmulRef = useRef(null);
    const ulRef = useRef(null);
    const designDigestRef = useRef(null);
    const imageRef = useRef(null);
    const creativeTextRef = useRef(null);
    const headerRef = useRef(null);
    const aboutRef = useRef(null);

    // Refs for the two DESIGNER text layers
    const designerSolidRef = useRef(null);
    const designerOutlineRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const tl = gsap.timeline();

        tl.to(overlayRef.current, {
            yPercent: 100,
            duration: 1.5,
            ease: 'power3.inOut',
        });

        tl.from(
            [nazmulRef.current, ulRef.current, designDigestRef.current],
            {
                y: -50,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: 'power3.out',
            },
            '>-0.8'
        );

        // Animate these ALL TOGETHER with no stagger (simultaneously)
        tl.from(
            [
                imageRef.current,
                creativeTextRef.current,
                designerSolidRef.current,
                designerOutlineRef.current,
            ],
            {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                // no stagger here — animates all at once
            },
            '<'
        );

        // Scroll-triggered animations for header elements
        ScrollTrigger.create({
            trigger: overlayRef.current,
            start: "top top",
            end: "+=100%",
            onEnter: () => {
                // Animate DESIGNER text down
                gsap.to([designerSolidRef.current, designerOutlineRef.current], {
                    y: 100,
                    duration: 1,
                    ease: 'power3.out'
                });

                // Animate CREATIVE DESIGN text smaller
                gsap.to(creativeTextRef.current, {
                    fontSize: '2rem',
                    duration: 1,
                    ease: 'power3.out'
                });
            },
            onLeaveBack: () => {
                // Reset animations when scrolling back up
                gsap.to([designerSolidRef.current, designerOutlineRef.current], {
                    y: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                });

                gsap.to(creativeTextRef.current, {
                    fontSize: '4rem',
                    duration: 0.5,
                    ease: 'power3.out'
                });
            }
        });

        // Create pinning effect for header and smooth About transition
        ScrollTrigger.create({
            trigger: headerRef.current,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            onLeave: () => {
                // When leaving the header, animate the About section to come up smoothly
                gsap.fromTo(aboutRef.current,
                    { y: '80vh', opacity: 0 },
                    { 
                        y: '20vh', 
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out'
                    }
                );
            },
            onEnterBack: () => {
                // When scrolling back up, reset the About section position
                gsap.to(aboutRef.current, {
                    y: '100vh',
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power3.in'
                });
            }
        });

        // Additional animation for full About section reveal on further scroll
        ScrollTrigger.create({
            trigger: aboutRef.current,
            start: "top 80vh", // When top of About reaches 80% viewport height
            end: "top top",
            onEnter: () => {
                gsap.to(aboutRef.current, {
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            },
            onLeaveBack: () => {
                gsap.to(aboutRef.current, {
                    y: '20vh',
                    duration: 0.5,
                    ease: 'power3.in'
                });
            }
        });

    }, []);

    return (
        <>
            <section 
                ref={headerRef}
                className="relative bg-black min-h-screen w-full overflow-hidden text-white font-sans px-6 sm:px-12 md:px-24 lg:px-3 xl:px-48"
            >
                {/* Overlay */}
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center bg-white"
                    style={{
                        clipPath: 'polygon(0 var(--clip-top), 100% var(--clip-top), 100% 100%, 0% 100%)',
                        color: 'black',
                    }}
                >
                    <div className="overflow-hidden">
                        <span className="text-8xl lg:text-[220px] xl:text-[310px] 2xl:text-[420px] font-extrabold tracking-wider">
                            NAZMUL
                        </span>
                    </div>
                </div>

                {/* Center Image */}
                <div
                    ref={imageRef}
                    className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                >
                    <Image
                        src="/banner.png"
                        alt="Hero Image"
                        width={1500}
                        height={1500}
                        className="h-full object-contain max-w-full"
                    />
                </div>

                {/* Top Nav and Newsletter */}
                <div className="absolute top-6 left-6 sm:left-8 right-6 sm:right-8 z-20 flex flex-col md:flex-row justify-between gap-8">
                    {/* Logo & Nav */}
                    <div className="flex flex-col md:flex-row gap-22">
                        <h1
                            ref={nazmulRef}
                            className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl xl:text-7xl tracking-widest"
                        >
                            NAZMUL
                        </h1>
                        <ul
                            ref={ulRef}
                            className="mt-3 space-y-1 text-lg sm:text-xl md:text-2xl text-white font-jamgrotesque md:ml-8"
                        >
                            {['HOME', 'ABOUT', 'SERVICES', 'PORTFOLIO', 'PRICING', 'CONTACT'].map(
                                (item, idx) => (
                                    <li
                                        key={idx}
                                        className="group flex items-center gap-2 cursor-pointer relative"
                                    >
                                        <div
                                            className={`w-[2px] h-[1em] bg-white transition-opacity duration-300 ${item === 'HOME' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                                }`}
                                            aria-hidden="true"
                                        ></div>
                                        <span className="transition-transform duration-300 group-hover:translate-x-2">
                                            {item}
                                        </span>
                                    </li>
                                )
                            )}
                        </ul>

                    </div>

                    {/* Newsletter */}
                    <div ref={designDigestRef} className="text-right">
                        <div className="text-3xl sm:text-4xl lg:text-4xl xl:text-6xl uppercase text-white font-bold font-snugle">
                            Design Digest
                        </div>
                        <div className="mt-2 relative w-full max-w-xs sm:max-w-sm xl:max-w-md inline-block">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-4 pr-10 text-sm bg-white text-black rounded-full outline-none"
                            />
                            <button
                                type="submit"
                                className="absolute top-1/2 -translate-y-1/2 right-3 text-black text-xl"
                            >
                                <FiArrowRight />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Center Left Text */}
                <div
                    ref={creativeTextRef}
                    className="absolute z-20 top-[50%] left-6 sm:left-8 transform -translate-y-1/2 text-left max-w-[90%] sm:max-w-[70%] lg:max-w-[50%]"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-4xl xl:text-7xl font-extrabold font-snugle">
                        CREATIVE DESIGN
                    </h2>
                    <p className="text-sm sm:text-lg lg:text-[16px] xl:max-w-full xl:text-xl text-gray-300 mt-3 font-jamgrocesque">
                        For those who think beyond boundaries. <br />
                        Craft visuals that speak louder than words.
                    </p>
                </div>

                {/* Bottom Text - DESIGNER */}
                <div className="absolute -bottom-10 left-0 right-0 text-center text-[420px] font-black leading-none tracking-wide pointer-events-none">
                    {/* Outline Layer */}
                    <h1
                        ref={designerOutlineRef}
                        className="font-snugle absolute inset-0 text-transparent mix-blend-difference z-40"
                        style={{
                            WebkitTextStroke: '2px white',
                        }}
                    >
                        DESIGNER
                    </h1>

                    {/* Solid Layer */}
                    <h1
                        ref={designerSolidRef}
                        className="font-snugle text-white z-20 relative"
                    >
                        DESIGNER
                    </h1>
                </div>
            </section>

            <div ref={aboutRef} className="relative z-10 bg-white" >
                <About />
            </div>
        </>
    );
};

export default Header;