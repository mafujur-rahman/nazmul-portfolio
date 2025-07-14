'use client';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    return (
        <footer className="relative bg-black text-white py-20 px-6 border-t border-white/10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                {/* Left: Brand or Logo */}
                <div className="text-2xl font-bold text-white/90 tracking-wide">
                    <span className="text-cyan-400">Nazmul</span>
                </div>

                {/* Center: Navigation Links */}
                <nav className="flex justify-center gap-6 text-sm text-white/60" aria-label="Footer navigation">
                    <a href="#home" className="hover:text-white transition-colors duration-300">
                        Home
                    </a>
                    <a href="#about" className="hover:text-white transition-colors duration-300">
                        About
                    </a>
                    <a href="#services" className="hover:text-white transition-colors duration-300">
                        Services
                    </a>
                    <a href="#portfolio" className="hover:text-white transition-colors duration-300">
                        Portfolio
                    </a>
                    <a href="#contact" className="hover:text-white transition-colors duration-300">
                        Contact
                    </a>
                </nav>

                {/* Right: Email Subscribe */}
                <div className="flex flex-col md:items-end gap-3">
                    <label htmlFor="email" className="text-sm text-white/70 mb-1 select-none">
                        Stay in the loop:
                    </label>
                    <div className="relative w-full md:w-72">
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-white/50 px-5 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                        />
                        <button
                            className="absolute right-1 top-1 bottom-1 bg-cyan-500 hover:bg-cyan-600 px-6 rounded-full text-sm font-semibold transition duration-300 shadow-md"
                            aria-label="Subscribe to newsletter"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="max-w-6xl mx-auto mt-12 border-t border-white/10"></div>

            {/* Bottom Bar: Socials + Copyright */}
            <div className="max-w-6xl mx-auto mt-6 flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0 text-white/50 text-xs select-none">
                {/* Social Icons Left */}
                <div className="flex justify-center md:justify-start gap-6">
                    <a
                        href="https://twitter.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        className="hover:text-cyan-400 transition-colors duration-300"
                    >
                        <FaTwitter className="h-5 w-5" />
                    </a>

                    <a
                        href="https://linkedin.com/in/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-cyan-400 transition-colors duration-300"
                    >
                        <FaLinkedinIn className="h-5 w-5" />
                    </a>

                    <a
                        href="https://github.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="hover:text-cyan-400 transition-colors duration-300"
                    >
                        <FaGithub className="h-5 w-5" />
                    </a>
                </div>

                {/* Copyright Right */}
                <div className="text-center md:text-right">
                    &copy; {new Date().getFullYear()} Nazmul. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
