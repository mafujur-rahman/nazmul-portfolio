'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiMenu, HiX, HiArrowDown } from 'react-icons/hi';
import { MdOutgoingMail } from "react-icons/md";
import About from '../About/About';

const Header = () => {
    const overlayRef = useRef(null);
    const nazmulRef = useRef(null);
    const ulRef = useRef(null);
    const designDigestRef = useRef(null);
    const headerRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const sidebarRef = useRef(null);
    const menuLinksRef = useRef([]);
    const designerTextRef = useRef(null);
    const creativeTextRef = useRef(null);
    const rotatingTextRef = useRef(null);

    // Text to rotate in the "CREATIVE" position
    const rotatingTexts = ['CREATIVE', 'GRAPHICS', 'UI/UX', 'DIGITAL'];
    const [currentRotatingText, setCurrentRotatingText] = useState(0);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline();

        // Initial overlay animation
        tl.to(overlayRef.current, {
            yPercent: 100,
            duration: 1.8,
            ease: 'power4.inOut',
        });

        // Designer text fill animation
        tl.fromTo(
            designerTextRef.current,
            { 
                backgroundImage: 'linear-gradient(to top, white 0%, white 0%, transparent 0%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
            },
            {
                backgroundImage: 'linear-gradient(to top, white 0%, white 100%, transparent 100%)',
                duration: 1.5,
                ease: 'power2.inOut',
                delay: 0.5
            },
            '>-1.5'
        );

        // Other elements animation
        tl.from(
            [nazmulRef.current, ulRef.current, designDigestRef.current],
            {
                y: 50,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: 'power3.out',
            },
            '>-0.8'
        );

        // Creative text animation (slides down from above)
        tl.from(
            creativeTextRef.current,
            {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'back.out(1.7)'
            },
            '>-1.5'
        );

        // Set up rotating text animation
        const rotateInterval = setInterval(() => {
            // Animate out
            gsap.to(rotatingTextRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => {
                    setCurrentRotatingText((prev) => 
                        (prev + 1) % rotatingTexts.length
                    );
                    // Reset position before animating in
                    gsap.set(rotatingTextRef.current, {
                        y: -50,
                        opacity: 0
                    });
                    // Animate in
                    gsap.to(rotatingTextRef.current, {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: 'power2.out'
                    });
                }
            });
        }, 3000);


        return () => {
            clearInterval(rotateInterval);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Sidebar toggle (left side)
    useEffect(() => {
        if (!sidebarRef.current) return;

        if (menuOpen) {
            gsap.to(sidebarRef.current, {
                x: 0,
                duration: 0.5,
                ease: 'power3.out',
                pointerEvents: 'auto',
            });

            gsap.fromTo(
                menuLinksRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: 'power3.out',
                }
            );
        } else {
            gsap.to(menuLinksRef.current, {
                x: -50,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power3.in',
            });

            gsap.to(sidebarRef.current, {
                x: '-100%',
                duration: 0.5,
                delay: 0.3,
                ease: 'power3.in',
                pointerEvents: 'none',
            });
        }
    }, [menuOpen]);

    const navItems = [
        'HOME',
        'ABOUT',
        'SERVICES',
        'PORTFOLIO',
        'PRICING',
        'CONTACT',
    ];

    return (
        <>
            <div>
                <section
                    ref={headerRef}
                    className="relative bg-black min-h-screen w-full overflow-hidden text-white font-sans px-6 bg-[url('/b-pic.jpg')] bg-cover bg-center flex flex-col justify-between"
                >
                    {/* Overlay */}
                    <div
                        ref={overlayRef}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-white "
                    >
                    </div>

                    {/* Sidebar menu (left side) */}
                    <nav
                        ref={sidebarRef}
                        className="fixed top-0 left-0 h-full w-72 bg-black bg-opacity-95 text-white z-[10000] pointer-events-none -translate-x-full"
                        style={{ transform: 'translateX(-100%)' }}
                    >
                        <div className="flex justify-end p-6">
                            <button
                                aria-label="Close menu"
                                onClick={() => setMenuOpen(false)}
                                className="text-white text-3xl focus:outline-none"
                            >
                                <HiX />
                            </button>
                        </div>

                        <ul className="flex flex-col items-center space-y-10 mt-10 text-2xl font-jamgrotesque">
                            {navItems.map((item, idx) => (
                                <li
                                    key={item}
                                    ref={(el) => (menuLinksRef.current[idx] = el)}
                                    className="cursor-pointer hover:text-gray-400 transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Fixed Logo & Menu */}
                    <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-10 py-6 z-60 w-full">
                        <button
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="text-white text-3xl focus:outline-none z-50"
                        >
                            {menuOpen ? <HiX /> : <HiMenu />}
                        </button>

                        <div ref={nazmulRef}>
                            <img src="/logo-3.png" alt="" className="w-48 h-auto" />
                        </div>

                        <div>
                            <MdOutgoingMail className="w-8 h-auto" />
                        </div>
                    </div>

                    {/* Center Content */}
                    <div className="flex flex-col items-center justify-center flex-grow text-center px-4 pt-44">
                        <h1 className="text-7xl md:text-8xl lg:text-[100px] xl:text-[120px] 2xl:text-[140px] font-bold leading-none w-full">
                            <span 
                                ref={creativeTextRef}
                                className="block h-[1em] overflow-hidden relative"
                            >
                                <span 
                                    ref={rotatingTextRef}
                                    className="block"
                                >
                                    {rotatingTexts[currentRotatingText]}
                                </span>
                            </span>
                            <span 
                                ref={designerTextRef}
                                className="text-7xl md:text-8xl lg:text-[120px] xl:text-[150px] 2xl:text-[200px] font-bold leading-none w-full"
                            >
                                DESIGNER
                            </span>
                        </h1>
                        <p className="mt-8 max-w-2xl text-lg md:text-xl text-gray-300">
                            I create modern, user-friendly, and visually stunning designs that elevate your brand's digital presence.
                        </p>

                        {/* Scroll Down */}
                        <div className="mt-16 flex flex-col items-center gap-2 animate-bounce">
                            <span className="text-gray-400 text-sm">Scroll Down</span>
                            <HiArrowDown className="text-2xl" />
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex justify-between items-end pb-6 pt-4">
                        {/* Left side with vertical line and text */}
                        <div className="flex items-center gap-4">
                            <div className="w-[2px] h-12 bg-gray-500"></div>
                            <span className="uppercase tracking-widest text-sm text-gray-400">Portfolio 2026</span>
                        </div>

                        {/* Right side with social links */}
                        <div className="flex items-center gap-6 text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">Instagram</a>
                            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-white transition-colors">Dribbble</a>
                            <a href="#" className="hover:text-white transition-colors">Behance</a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Header;