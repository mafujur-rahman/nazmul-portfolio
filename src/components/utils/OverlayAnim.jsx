'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const OverlayAnim = () => {
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    document.body.style.visibility = 'visible';

    const overlay = overlayRef.current;
    const text = textRef.current;

    // Initial setup
    gsap.set(overlay, {
      '--clip-top': '0%',
      opacity: 1,
      pointerEvents: 'auto',
    });

    gsap.set(text, { xPercent: -100, y: 0, scale: 1 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    // Animate overlay clip top (slide overlay up)
    tl.to(overlay, {
      '--clip-top': '100%',
      duration: 1.5,
      onComplete: () => {
        overlay.style.pointerEvents = 'none';
      },
    });

    // Animate text: slide in from left, move down, and scale down
    tl.to(
      text,
      {
        xPercent: 0,
        y: 30, // move down 30px
        scale: 0.85, // scale down to 85%
        duration: 1,
      },
      '-=1' // start 1 second before overlay animation finishes
    );

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-auto flex items-end justify-center pb-24 bg-white"
      style={{
        clipPath: 'polygon(0 var(--clip-top), 100% var(--clip-top), 100% 100%, 0% 100%)',
        color: 'black',
      }}
    >
      <div className="overflow-hidden">
        <span
          ref={textRef}
          className="text-8xl lg:text-[220px] xl:text-[310px] 2xl:text-[420px] font-extrabold tracking-wider"
        >
          NAZMUL
        </span>
      </div>
    </div>
  );
};
