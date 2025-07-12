import React from 'react';

const About = () => {
    return (
        <div className='bg-white px-56 py-24'>
            <div className="flex items-start justify-between ">
                <div className="flex items-end gap-4">
                    {/* Large BE text */}
                    <h1 className="text-[150px] font-snugle font-bold leading-none">BE</h1>
                </div>

                {/* Right section with line and quote */}
                <div className="flex items-center gap-4 pt-6">
                    <p className="w-32 h-[3px] bg-black"></p>
                    <p>Design is thinking made visual</p>
                </div>
            </div>

            {/* Subtext aligned at bottom */}
            <div className="leading-snug text-6xl font-bold">
                <p className='ml-44 -mt-20'>A PART OF THE CREATIVE MOVEMENT</p>
                AND CRAFT VISUAL EXPERIENCES THAT
                INSPIRE AND ENGAGE.
            </div>
        </div>
    );
};

export default About;
