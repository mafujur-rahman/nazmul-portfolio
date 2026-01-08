"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const services = [
    {
        title: "Brand Identity",
        description:
            "Craft visually compelling brand identities including logos, typography, and color schemes that communicate your brand's personality.",
        text: "Logo & Branding",
        bgImage: "/bg-1.jpg"
    },
    {
        title: "UI/UX Design",
        description:
            "Design intuitive user interfaces and experiences for websites and mobile apps that enhance usability and engagement.",
        text: "App & Web UI",
        bgImage: "/bg-1.jpg"
    },
    {
        title: "Web Development",
        description:
            "Design intuitive user interfaces and experiences for websites and mobile apps that enhance usability and engagement.",
        text: "App & Web UI",
        bgImage: "/bg-1.jpg"
    },
    {
        title: "Social Media Graphics",
        description:
            "Design engaging social media assets like banners, post templates, and ad creatives that boost your online presence.",
        text: "Instagram, Facebook Ads",
        bgImage: "/bg-2.jpg"
    },
    {
        title: "Custom Design",
        description:
            "Design for physical mediums such as business cards, flyers, posters, and brochures that leave a lasting impression.",
        text: "Flyers & Brochures",
        bgImage: "/bg-1.jpg"
    },
    {
        title: "Presentation Design",
        description:
            "Transform dull slides into compelling presentations with custom visuals, layouts, and infographic elements.",
        text: "Slides & Decks",
        bgImage: "/bg-2.jpg"
    },
    {
        title: "Catalog Design",
        description:
            "Collaborate to develop visual strategies, creative direction, and brand consistency across all your projects.",
        text: "1-on-1 Creative Session",
        bgImage: "/bg-1.jpg"
    },
];

export default function Services() {
    const [activeIndex, setActiveIndex] = useState(0); // For desktop
    const [hoveredIndexMobile, setHoveredIndexMobile] = useState(null); // For mobile
    const cardsRef = useRef([]);
    const descRef = useRef([]);
    const iconTextRef = useRef([]);
    const animationTimeline = useRef(null);

    // Desktop animation
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth >= 1024) {
            if (animationTimeline.current) {
                animationTimeline.current.kill();
            }

            const tl = gsap.timeline();

            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                tl.to(
                    card,
                    {
                        flexGrow: index === activeIndex ? 3 : 1,
                        duration: 0.5,
                        ease: "power2.out",
                    },
                    0
                );

                if (descRef.current[index]) {
                    if (index === activeIndex) {
                        tl.to(
                            descRef.current[index],
                            {
                                y: 0,
                                opacity: 1,
                                pointerEvents: "auto",
                                duration: 0.4,
                                ease: "power2.out",
                            },
                            0.5
                        );
                        tl.to(
                            iconTextRef.current[index],
                            {
                                x: 0,
                                opacity: 1,
                                pointerEvents: "auto",
                                duration: 0.4,
                                delay: 0.1,
                                ease: "power2.out",
                            },
                            0.6
                        );
                    } else {
                        tl.to(
                            descRef.current[index],
                            {
                                y: 50,
                                opacity: 0,
                                pointerEvents: "none",
                                duration: 0.3,
                                ease: "power2.out",
                            },
                            0
                        );
                        tl.to(
                            iconTextRef.current[index],
                            {
                                x: -10,
                                opacity: 0,
                                pointerEvents: "none",
                                duration: 0.3,
                                ease: "power2.out",
                            },
                            0
                        );
                    }
                }
            });

            animationTimeline.current = tl;
        }
    }, [activeIndex]);

    return (
        <section className="min-h-screen bg-black text-white px-4 md:px-12 lg:px-24 xl:px-48 py-20">
            <div className="text-center mb-16">
                <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold whitespace-nowrap ">
                    <span className="line-through opacity-50">One</span> a few more things.
                </h2>
                <p className="mt-4 text-gray-400 max-w-2xl md:max-w-xl mx-auto">
                    There's even more to discover. Fey brings you a collection of advanced
                    tools designed to refine and elevate your workflow.
                </p>
            </div>

            {/* Desktop layout */}
            <div className="hidden lg:flex gap-4 transition-all h-[400px] select-none">
                {services.map((service, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className={`bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl cursor-pointer relative overflow-hidden shadow-lg transition-all duration-500 flex flex-col ${index === activeIndex ? 'bg-cover bg-center' : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        style={{ 
                            flex: index === activeIndex ? 3 : 1,
                            backgroundImage: index === activeIndex ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${service.bgImage})` : ''
                        }}
                    >
                        {/* Rotated Title */}
                        <div className="rotate-90 origin-left absolute lg:left-6 xl:left-10 2xl:left-16 top-2 text-md text-white/80 w-full pointer-events-none">
                            {service.title}
                        </div>

                        {/* Description panel */}
                        <div
                            ref={(el) => (descRef.current[index] = el)}
                            className="absolute bottom-10 left-16 right-6 opacity-0 translate-y-10 pointer-events-none"
                        >
                            <div className="flex items-center mb-3 space-x-3">
                                <div className="w-1 h-8 bg-purple-500 rounded-full" />
                                <h3
                                    ref={(el) => (iconTextRef.current[index] = el)}
                                    className="text-white font-semibold text-lg flex items-center gap-2 opacity-0 -translate-x-4 pointer-events-none"
                                >
                                    <span>{service.text}</span>
                                </h3>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile / Tablet layout */}
            <div className="lg:hidden space-y-6">
                {services.map((service, index) => {
                    const isActive = activeIndex === index;

                    return (
                        <div
                            key={index}
                            className={`bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl shadow-md transition-all duration-300 ${isActive ? 'bg-cover bg-center' : ''}`}
                            onClick={() => setActiveIndex(index)}
                            onMouseEnter={() => setActiveIndex(index)}
                            style={{
                                backgroundImage: isActive ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${service.bgImage})` : ''
                            }}
                        >
                            {/* Card Title */}
                            <div className="w-full text-left p-4 cursor-pointer select-none">
                                <span className="text-lg font-semibold">{service.title}</span>
                            </div>

                            {/* Description Panel */}
                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden px-4 ${isActive ? "max-h-[300px] py-4" : "max-h-0 py-0"
                                    }`}
                            >
                                <div className="text-purple-400 mb-2">
                                    <span>{service.text}</span>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}