'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiMenu, HiX } from 'react-icons/hi';
import { MdOutgoingMail } from "react-icons/md";


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
                className="relative bg-black min-h-screen w-full overflow-hidden text-white font-sans px-6 bg-[url('/b-pic.jpg')] h-full bg-cover bg-center "
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

                {/* Sidebar menu */}
                {/* <nav
                    ref={sidebarRef}
                    className="fixed top-0 left-0 h-full w-72 bg-black bg-opacity-95 text-white z-[10000] pointer-events-none translate-x-full"
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
                </nav> */}


                {/* fixed Logo & Menu */}
                <div
                    className="fixed top-0 flex justify-between  px-10 pt-6 z-60 w-full "
                >
                    <button
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="text-white text-3xl focus:outline-none z-50 pr-10"
                    >
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>

                    <div
                        ref={nazmulRef}
                    >
                        <img src="/logo-1.png" alt="" className='w-60 h-auto pt-3' />
                    </div>

                    <div >
                        <MdOutgoingMail className='w-8 h-auto  '/>
                    </div>


                </div>


            </section>


        </>
    );
};

export default Header;
