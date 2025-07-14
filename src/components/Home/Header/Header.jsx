'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiMenu, HiX } from 'react-icons/hi';

const Header = () => {
    const overlayRef = useRef(null);
    const nazmulRef = useRef(null);
    const ulRef = useRef(null);
    const designDigestRef = useRef(null);
    const imageRef = useRef(null);
    const creativeTextRef = useRef(null);
    const headerRef = useRef(null);
    const designerOutlineRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const sidebarRef = useRef(null);
    const menuLinksRef = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline();

        tl.to(overlayRef.current, {
            yPercent: 100,
            duration: 1.8,
            ease: 'power4.inOut',
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

        tl.from(
            [imageRef.current, creativeTextRef.current],
            {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            },
            '<'
        );

        // Marquee setup
        const setupMarquee = () => {
            if (designerOutlineRef.current) {
                const container = designerOutlineRef.current;
                const items = container.querySelectorAll('h1');
                const itemWidth = items[0]?.offsetWidth || 0;
                const totalWidth = itemWidth * items.length;

                container.style.width = `${totalWidth * 2}px`;

                const clones = Array.from(items).map(item => item.cloneNode(true));
                container.append(...clones);

                gsap.fromTo(
                    container,
                    { x: 0 },
                    {
                        x: -totalWidth,
                        duration: totalWidth / 40, // adjust for smooth speed
                        ease: 'none',
                        repeat: -1,
                    }
                );
            }
        };

        const resizeObserver = new ResizeObserver(() => {
            setupMarquee();
        });

        if (designerOutlineRef.current) {
            setupMarquee(); // Call once to initialize
            resizeObserver.observe(designerOutlineRef.current);
        }

        return () => {
            resizeObserver.disconnect();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            gsap.killTweensOf(designerOutlineRef.current);
        };
    }, []);

    // Sidebar toggle
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
                { x: 50, opacity: 0 },
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
                x: 50,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power3.in',
            });

            gsap.to(sidebarRef.current, {
                x: '100%',
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
            <section
                ref={headerRef}
                className="relative bg-black min-h-screen w-full overflow-hidden text-white font-sans px-6 "
            >
                {/* Overlay */}
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white text-black"
                >
                    <div className="overflow-hidden">
                        <span className="text-8xl lg:text-[220px] xl:text-[310px] 2xl:text-[420px] font-extrabold tracking-wider">
                            NAZMUL
                        </span>
                    </div>
                </div>

                {/* fixed Logo & Menu */}
                <div className="fixed top-0  flex justify-between items-center px-6 py-4 z-60 w-full">
                    <h1
                        ref={nazmulRef}
                        className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl xl:text-7xl tracking-widest"
                    >
                        NAZMUL
                    </h1>

                    <button
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="text-white text-3xl focus:outline-none z-50 pr-10"
                    >
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>

                {/* Background Image */}
                <div
                    ref={imageRef}
                    className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
                >
                    <Image
                        src="/banner.png"
                        alt="Hero Image"
                        width={1500}
                        height={1500}
                        className="h-full object-contain max-w-full"
                    />
                </div>

                {/* Creative Text */}
                <div
                    ref={creativeTextRef}
                    className="absolute bottom-10 left-6 sm:left-8 text-left max-w-[90%] sm:max-w-[70%] lg:max-w-[50%] z-20"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-4xl xl:text-7xl font-extrabold font-snugle">
                        CREATIVE DESIGN
                    </h2>
                    <p className="text-sm sm:text-lg lg:text-[16px] xl:max-w-full xl:text-xl text-gray-300 mt-3 font-jamgrocesque">
                        For those who think beyond boundaries. <br />
                        Craft visuals that speak louder than words.
                    </p>
                </div>

                {/* Marquee Text */}
                <div className="absolute top-1/2 left-0 w-full overflow-hidden z-20 transform -translate-y-1/2 pointer-events-none">
                    <div className="flex gap-16 w-max whitespace-nowrap" ref={designerOutlineRef}>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <h1
                                key={i}
                                className="font-snugle text-[120px] sm:text-[180px] md:text-[240px] lg:text-[320px] xl:text-[420px]"
                            >
                                DESIGNER
                            </h1>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sidebar menu */}
            <nav
                ref={sidebarRef}
                className="fixed top-0 right-0 h-full w-72 bg-black bg-opacity-95 text-white z-[10000] pointer-events-none translate-x-full"
                style={{ transform: 'translateX(100%)' }}
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
        </>
    );
};

export default Header;
