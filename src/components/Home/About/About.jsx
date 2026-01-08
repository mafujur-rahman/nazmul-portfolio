"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const containerRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="relative w-full min-h-screen px-6 lg:px-20 py-24 bg-black overflow-hidden">
      
      <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 w-full">
        
        {/* LEFT TEXT COLUMN */}
        <div className="lg:w-2/5 flex flex-col justify-center text-white space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wide">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              ABOUT <span className="font-light">ME</span>
            </span>
          </h1>

          <p className="text-lg leading-relaxed opacity-90">
            Hi, I'm Nazmul, a professional Graphic Designer crafting visually
            compelling experiences for brands and digital media.
          </p>

          <p className="text-lg leading-relaxed opacity-90">
            I combine creativity with strategy to deliver designs that communicate
            effectively, from branding and UI/UX to illustration and digital campaigns.
          </p>

          <p className="text-lg leading-relaxed opacity-90">
            Passionate about minimalism, modern aesthetics, and attention to detail,
            I turn ideas into visuals that leave a lasting impression.
          </p>

          <p className="text-lg leading-relaxed font-semibold text-cyan-400">
            Let’s collaborate to bring your brand’s story to life.
          </p>
        </div>

        {/* RIGHT IMAGE COLUMN */}
        <div
          ref={containerRef}
          onMouseMove={handleMove}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          className="lg:w-3/5 relative w-full h-[550px] lg:h-[700px] rounded-xl overflow-hidden cursor-none"
        >
          <Image
            src="/about.jpg"
            alt="Nazmul"
            fill
            className="object-cover rounded-xl"
            priority
          />

          {active && (
            <div
              className="glass-circle"
              style={{ left: pos.x, top: pos.y }}
            >
              <span className="glass-label">Nazmul</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
