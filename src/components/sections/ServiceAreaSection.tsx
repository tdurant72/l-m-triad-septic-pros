"use client";
import { motion } from "motion/react";

export default function ServiceAreaSection() {
  return (
    <section className="py-24 md:py-32 bg-[#F8FAFC] relative" id="service-area">
      {/* Topographical Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="topo-pattern" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
              <path d="M-100,50 Q50,150 200,50 T500,50 M-100,150 Q50,250 200,150 T500,150 M-100,250 Q50,350 200,250 T500,250 M-100,350 Q50,450 200,350 T500,350" fill="none" stroke="#0F172A" strokeWidth="1" />
              <path d="M-80,40 Q70,140 220,40 T520,40 M-80,140 Q70,240 220,140 T520,140 M-80,240 Q70,340 220,240 T520,240 M-80,340 Q70,440 220,340 T520,340" fill="none" stroke="#0F172A" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#topo-pattern)"></rect>
        </svg>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        {/* Header content */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="font-['Manrope'] text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-6"
          >
            Local Expertise for the Piedmont Landscape.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-['Manrope'] text-[#0F172A]/80 text-lg md:text-xl font-medium leading-relaxed mb-8 text-balance"
          >
            From the red clay of Guilford County to the rolling hills of Davidson, we understand the unique demands of North Carolina soil.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block bg-brand-green/5 border border-brand-green/10 rounded-full px-6 md:px-8 py-3 md:py-4 shadow-sm"
          >
            <p className="font-['Manrope'] font-bold text-brand-green text-base md:text-lg text-balance">
              Centrally located in High Point, NC, we provide rapid, reliable service to every home and business within a 50-mile radius.
            </p>
          </motion.div>
        </div>

        {/* Two-Column Split */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Left Column: Why Local Matters */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-1/2"
          >
            <h3 className="font-['Manrope'] text-[#0F172A] text-2xl md:text-3xl font-extrabold mb-5">
              Why Local Matters
            </h3>
            <p className="font-['Manrope'] text-[#0F172A]/80 text-lg leading-relaxed mb-8">
              Piedmont soil is notoriously tricky. Our team specializes in systems designed to thrive in heavy clay and varying water tables, ensuring your system passes NC health codes the first time.
            </p>

            <h4 className="font-['Manrope'] text-[#0F172A] font-extrabold text-lg mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-green">map</span>
              Counties We Cover:
            </h4>
            <div className="flex flex-wrap gap-3">
              {['Guilford', 'Forsyth', 'Davidson', 'Randolph', 'Alamance', 'Stokes', 'and beyond'].map((county) => (
                <span
                  key={county}
                  className="bg-white border border-[#E2E8F0] font-['Work_Sans'] font-medium text-[#0F172A] text-sm px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(15,23,42,0.02)]"
                >
                  {county}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Visual List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(15,23,42,0.04)] border border-[#E2E8F0]">
              <h4 className="font-['Manrope'] text-[#0F172A] font-extrabold text-xl mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-brand-green">location_city</span>
                Major Areas Served
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                {['High Point', 'Greensboro', 'Winston-Salem', 'Kernersville', 'Thomasville', 'Lexington', 'Burlington', 'Asheboro'].map((city) => (
                  <div key={city} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-brand-green text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                    </div>
                    <span className="font-['Work_Sans'] font-medium text-[#0F172A] text-[17px] tracking-wide">
                      {city}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 md:mt-24 text-center"
        >
          <p className="font-['Manrope'] text-lg text-[#0F172A]/80 font-medium mb-4">
            Check if you're in our 50-mile 'Peace of Mind' zone.
          </p>
          <button className="font-['Work_Sans'] font-semibold text-brand-green uppercase tracking-wide text-sm flex items-center justify-center gap-2 group hover:text-[#0F172A] transition-colors duration-300 mx-auto">
            <span className="border-b-2 border-brand-green/30 group-hover:border-[#0F172A]/50 pb-1 transition-all duration-300">
              View Full Service Map
            </span>
            <span className="material-symbols-outlined text-sm transform transition-transform group-hover:translate-x-1 pb-1">arrow_forward</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
