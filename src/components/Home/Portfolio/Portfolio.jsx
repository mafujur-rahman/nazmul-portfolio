"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const projects = [
  "/image-1.avif",
  "/image-2.jpg",
  "/image-3.png",
  "/image-1.avif",
];

export default function Portfolio() {
  const imageWrapperRef = useRef(null);
  const [active, setActive] = useState(0);

  // 🔹 GSAP reveal animation
  const revealImage = (src) => {
    const slide = document.createElement("div");
    slide.className = "absolute inset-0";

    slide.innerHTML = `
      <img src="${src}" class="w-full h-full object-cover" />
    `;

    imageWrapperRef.current.appendChild(slide);

    gsap.fromTo(
      slide,
      { clipPath: "inset(0 0 0 100%)" },
      {
        clipPath: "inset(0 0 0 0%)",
        duration: 1.3,
        ease: "power4.out",
      }
    );
  };

  // autoplay
  useEffect(() => {
    revealImage(projects[0]);

    const interval = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % projects.length;
        revealImage(projects[next]);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleThumbClick = (i) => {
    setActive(i);
    revealImage(projects[i]);
  };

  return (
    <section className="w-full  px-6 md:px-16 py-20 bg-gradient-to-r from-cyan-400 to-pink-500">
      
      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start h-full">
        
        {/* LEFT — TEXT */}
        <div className="flex flex-col justify-start">
          <h2 className="text-white text-5xl md:text-6xl font-bold tracking-wide mb-6">
            FEATURED <span className="font-light">PROJECTS</span>
          </h2>

          <p className="text-white/90 text-base leading-relaxed max-w-md">
            Every project I create has a story behind it. It’s not just about
            “making a website.” It’s about exploring an idea, experimenting,
            failing a few times, and then finally watching it come alive on
            screen.
          </p>
        </div>

        {/* RIGHT — IMAGE + THUMBNAILS */}
        <div className="flex flex-col justify-start gap-4">
          
          {/* MAIN IMAGE */}
          <div className="relative w-full h-[360px] overflow-hidden rounded-lg shadow-lg">
            <div ref={imageWrapperRef} className="absolute inset-0" />
          </div>

          {/* THUMBNAILS FULL WIDTH */}
          <div className="flex gap-4 w-full">
            {projects.map((src, i) => (
              <button
                key={i}
                onClick={() => handleThumbClick(i)}
                className={`relative flex-1 h-24 overflow-hidden rounded-lg border transition-all
                  ${active === i
                    ? "border-white"
                    : "border-white/30 hover:border-white/70"
                  }
                `}
              >
                <Image
                  src={src}
                  alt="project thumbnail"
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
