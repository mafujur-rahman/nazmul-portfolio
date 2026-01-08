'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import gsap from 'gsap';

export default function Testimonial() {
  const imageSets = [
    {
      left: '/t1.png',
      middle: '/t2.webp',
      right: '/t3.webp',
      name: 'Samir Maity',
      role: 'Inventory Manager',
      rating: 5,
      review: "Talkspace made managing our inventory so much easier. Highly recommended!",
    },
    {
      left: '/t2.webp',
      middle: '/t3.webp',
      right: '/t1.png',
      name: 'Lisa Ray',
      role: 'Marketing Lead',
      rating: 4,
      review: "The platform is intuitive and has boosted our team's productivity.",
    },
    {
      left: '/t3.webp',
      middle: '/t1.png',
      right: '/t2.webp',
      name: 'John Doe',
      role: 'Product Designer',
      rating: 5,
      review: "I love the user-friendly interface and fast support. Five stars!",
    },
  ];

  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [nextSetIndex, setNextSetIndex] = useState(1);
  const currentLeftRef = useRef(null);
  const currentMiddleRef = useRef(null);
  const currentRightRef = useRef(null);
  const nextLeftRef = useRef(null);
  const nextMiddleRef = useRef(null);
  const nextRightRef = useRef(null);
  const animationRef = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    setNextSetIndex((currentSetIndex + 1) % imageSets.length);
  }, [currentSetIndex]);

  const animateSlides = (direction) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const duration = 1;
    const ease = "power3.inOut";
    const containerWidth = 450; // Match your image width

    gsap.killTweensOf([
      currentLeftRef.current, currentMiddleRef.current, currentRightRef.current,
      nextLeftRef.current, nextMiddleRef.current, nextRightRef.current
    ]);

    gsap.set('.arrow-btn', { pointerEvents: 'none' });

    // Position next set adjacent to current set
    if (direction === 'left') {
      gsap.set([nextLeftRef.current, nextMiddleRef.current, nextRightRef.current], {
        x: containerWidth,
        opacity: 1
      });
    } else {
      gsap.set([nextLeftRef.current, nextMiddleRef.current, nextRightRef.current], {
        x: -containerWidth,
        opacity: 1
      });
    }

    const onComplete = () => {
      setCurrentSetIndex(prev => direction === 'left'
        ? (prev + 1) % imageSets.length
        : (prev - 1 + imageSets.length) % imageSets.length);

      // Wait for React state update before resetting positions
      requestAnimationFrame(() => {
        gsap.set([currentLeftRef.current, currentMiddleRef.current, currentRightRef.current], {
          x: 0,
          opacity: 1
        });
        gsap.set([nextLeftRef.current, nextMiddleRef.current, nextRightRef.current], {
          x: 0,
          opacity: 0
        });
        gsap.set('.arrow-btn', { pointerEvents: 'auto' });
        isAnimating.current = false;
      });
    };

    if (direction === 'left') {
      animationRef.current = gsap.timeline({ onComplete })
        .to([currentLeftRef.current, currentMiddleRef.current, currentRightRef.current], {
          x: -containerWidth,
          duration: duration,
          ease: ease,
        }, 0)
        .to([nextLeftRef.current, nextMiddleRef.current, nextRightRef.current], {
          x: 0,
          duration: duration,
          ease: ease,
        }, 0);
    } else {
      animationRef.current = gsap.timeline({ onComplete })
        .to([currentLeftRef.current, currentMiddleRef.current, currentRightRef.current], {
          x: containerWidth,
          duration: duration,
          ease: ease,
        }, 0)
        .to([nextLeftRef.current, nextMiddleRef.current, nextRightRef.current], {
          x: 0,
          duration: duration,
          ease: ease,
        }, 0);
    }
  };

  const nextSlide = () => animateSlides('left');
  const prevSlide = () => animateSlides('right');

  return (
    <section className="bg-black text-white px-8 overflow-x-hidden py-36">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 relative">
        {/* Left Image Container */}
        <div className="flex-shrink-0 rounded-2xl overflow-hidden w-[450px] h-96 relative -ml-[180px]">
          {/* Current Left Image */}
          <div ref={currentLeftRef} className="absolute inset-0">
            <Image
              src={imageSets[currentSetIndex].left}
              alt="Left image"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Next Left Image */}
          <div ref={nextLeftRef} className="absolute inset-0 opacity-0">
            <Image
              src={imageSets[nextSetIndex].left}
              alt="Next left image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Middle Image Container */}
        <div className="flex-shrink-0 rounded-2xl overflow-hidden w-[450px] h-96 relative z-10">
          {/* Current Middle Image */}
          <div ref={currentMiddleRef} className="absolute inset-0">
            <Image
              src={imageSets[currentSetIndex].middle}
              alt="Middle image"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Next Middle Image */}
          <div ref={nextMiddleRef} className="absolute inset-0 opacity-0">
            <Image
              src={imageSets[nextSetIndex].middle}
              alt="Next middle image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 z-20 px-6">
          <h2 className="text-5xl font-bold mb-6 pt-6">Testimonial Stories</h2>

          {/* Reviewer First Name */}
          <h3 className="text-2xl font-semibold mb-2">
            {imageSets[currentSetIndex].name.split(' ')[0]}
          </h3>

          {/* Review Text */}
          <p className="text-gray-400 max-w-lg mb-4">
            {imageSets[currentSetIndex].review}
          </p>

          {/* Star Rating */}
          <div className="flex gap-1 mb-6">
            {Array.from({ length: imageSets[currentSetIndex].rating }).map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="arrow-btn w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-gray-800"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextSlide}
              className="arrow-btn w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-gray-800"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>


        {/* Right Image Container */}
        <div className="flex-shrink-0 rounded-2xl overflow-hidden w-[450px] h-96 relative -mr-[120px]">
          {/* Current Right Image */}
          <div ref={currentRightRef} className="absolute inset-0">
            <Image
              src={imageSets[currentSetIndex].right}
              alt="Right image"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Next Right Image */}
          <div ref={nextRightRef} className="absolute inset-0 opacity-0">
            <Image
              src={imageSets[nextSetIndex].right}
              alt="Next right image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}