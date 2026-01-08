import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaStar } from "react-icons/fa";

export default function About() {
    return (
        <section className="bg-[#fdfbf8] w-full min-h-screen flex items-center justify-center py-24">
            <div className="max-w-7xl w-full flex flex-col md:flex-row items-start justify-between px-12">

                {/* LEFT SIDE CONTENT */}
                <div className="flex flex-col items-start text-left space-y-26 relative">
                    {/* Title */}
                    <div>
                        <h3 className="text-[32px] font-semibold text-[#1a2e35]">Hi! I Am</h3>
                        <h1 className="text-[40px] font-bold text-[#f4a938]">Nazmul Islam.</h1>
                    </div>

                    {/* Curved dashed path to image */}
                    <svg
                        className="absolute top-36 right-0"
                        width="250"  // length of the path
                        height="200"
                        viewBox="0 0 250 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0,0 C60,40 180,60 250,200" // cubic Bezier curve
                            stroke="#9ca3af"                 // dashed line color
                            strokeWidth="2"
                            strokeDasharray="6 6"            // makes it dashed
                            fill="transparent"
                        />
                    </svg>



                    {/* Years of Experience */}
                    <div className="flex items-center space-x-4">
                        <span className="text-[48px] font-bold text-[#1a2e35]">08</span>
                        <div className="leading-tight">
                            <p className="uppercase text-[14px] tracking-widest text-gray-600">Years</p>
                            <p className="uppercase text-[14px] tracking-widest text-gray-600">Experience</p>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-8 text-[#f4a938]">
                        <FaFacebookF size={22} className="cursor-pointer hover:text-[#1a2e35]" />
                        <FaInstagram size={22} className="cursor-pointer hover:text-[#1a2e35]" />
                        <FaTwitter size={22} className="cursor-pointer hover:text-[#1a2e35]" />
                        <FaLinkedinIn size={22} className="cursor-pointer hover:text-[#1a2e35]" />
                    </div>
                </div>

                {/* CENTER IMAGE */}
                <div className="relative flex justify-center items-center mx-8 my-16 md:my-0">
                    <div className="w-96 h-96 rounded-full overflow-hidden shadow-lg border-[8px] border-white">
                        <Image
                            src="/banner-pic.png"
                            alt="John Deo"
                            width={588}
                            height={588}
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* RIGHT SIDE CONTENT */}
                <div className="flex flex-col items-start space-y-26">
                    {/* Description Text */}
                    <p className="text-[16px] text-gray-600 w-[240px] leading-relaxed">
                        I design beautifully simple things, and I love what I do.
                    </p>

                    {/* Reviews Card */}
                    <div className="bg-white rounded-xl shadow-lg flex items-center gap-4 px-8 py-6">
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800">12k Reviews On</span>
                            <div className="flex items-center text-yellow-500 space-x-1">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>
                        </div>
                        <span className="text-xl font-bold text-gray-700">4.9</span>
                    </div>

                    {/* Creative Designer */}
                    <div>
                        <h2 className="text-[36px] italic font-bold text-[#1a2e35]">Creative</h2>
                        <h3 className="text-[26px] font-semibold text-[#2e6a5e]">Designer.</h3>
                    </div>
                </div>

            </div>
        </section>
    );
}
