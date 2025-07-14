'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef(null);
    const priceRefs = useRef([]);

    useEffect(() => {
        const title = titleRef.current;
        const cards = cardsRef.current;

        // Pin Pricing title
        ScrollTrigger.create({
            trigger: title,
            start: "top 10%",
            end: "+=680",
            pin: true,
            pinSpacing: false,
            scrub: true,
        });

        // Animate card entrance
        gsap.fromTo(
            cards,
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: true,
                },
            }
        );

        // Fade out title after cards
        gsap.to(title, {
            opacity: 0,
            scrollTrigger: {
                trigger: cards,
                start: "bottom center",
                end: "bottom top",
                scrub: true,
            },
        });

        // Animate pricing values
        priceRefs.current.forEach((el, i) => {
            const finalPrices = [299, 799, 1499];
            const obj = { val: 0 };

            gsap.to(obj, {
                val: finalPrices[i],
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%",
                },
                onUpdate: () => {
                    if (el) el.textContent = `$${Math.floor(obj.val)}`;
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    const plans = [
        {
            title: "Starter",
            desc: "Perfect for individuals starting out with their brand.",
            features: ["Logo Design", "Business Card", "Social Media Kit"],
            price: "$299",
        },
        {
            title: "Professional",
            desc: "Ideal for startups seeking complete brand identity.",
            features: [
                "Logo + Brand Identity",
                "Print Design",
                "Social Templates",
                "Brand Guide",
            ],
            price: "$799",
        },
        {
            title: "Enterprise",
            desc: "Comprehensive branding for agencies and companies.",
            features: [
                "Full Branding Suite",
                "UI/UX Design",
                "Website Design (Figma)",
                "Marketing Materials",
            ],
            price: "$1499",
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative  bg-black px-6 py-32"
        >
            {/* Title */}
            <div
                ref={titleRef}
                className="text-center text-white text-[130px] font-black tracking-tight "
            >
                Pricing
            </div>

            {/* Cards */}
            <div
                ref={cardsRef}
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-20"
            >
                {plans.map((plan, i) => (
                    <div
                        key={i}
                        className="relative group rounded-3xl p-10 text-white shadow-xl flex flex-col justify-between bg-white/10 backdrop-blur-xl border border-white/10 transition-all duration-300 transform hover:scale-[1.035] overflow-hidden before:z-[-1]"
                    >
                        <div>
                            <h3 className="text-3xl font-bold text-cyan-400 mb-4">
                                {plan.title}
                            </h3>
                            <p className="text-gray-300 mb-6">{plan.desc}</p>
                            <ul className="text-sm text-gray-200 mb-6 space-y-2">
                                {plan.features.map((item, j) => (
                                    <li key={j}>✔ {item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div
                                ref={(el) => (priceRefs.current[i] = el)}
                                className="text-4xl font-extrabold text-white mb-6"
                            >
                                $0
                            </div>
                            <button className="w-full bg-cyan-600 hover:bg-cyan-700 transition-all text-white py-3 rounded-xl font-semibold tracking-wide">
                                Choose Plan
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Pricing;
