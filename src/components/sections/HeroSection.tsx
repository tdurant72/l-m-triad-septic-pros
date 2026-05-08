"use client";
import { motion } from "motion/react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center overflow-hidden bg-white">
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/L&M-hero.webp"
          alt="L&M Septic service truck and a family on a lush lawn"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:object-right"
          referrerPolicy="no-referrer"
        />
        {/* Solid white to transparent gradient to hide image under text but fade out smoothly */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/20 md:via-white/70 md:to-transparent md:w-[85%] lg:w-[70%]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full flex justify-start my-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:max-w-[640px] lg:max-w-[720px] bg-white/90 backdrop-blur-md md:bg-white/95 p-8 sm:p-10 md:p-14 lg:p-16 rounded-[2rem] shadow-[0_8px_40px_rgba(15,23,42,0.08)] border border-white"
        >
          {/* Trust Badge / Pre-header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-1 rounded-full mb-8 shadow-sm"
          >
            <span className="material-symbols-outlined text-brand-green text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="font-['Work_Sans'] text-[12px] sm:text-[13px] text-[#0F172A] font-semibold uppercase tracking-widest">
              Top-Rated in the Triad
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-['Manrope'] text-4xl sm:text-4xl lg:text-5xl font-black leading-[1.05] text-[#0F172A] tracking-[-0.03em] mb-4"
          >
            Protect Your Home. Preserve Your <span className="text-brand-green">Peace of Mind.</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-['Manrope'] text-lg sm:text-xl text-[#0F172A] font-extrabold mb-4"
          >
            The Triad's Trusted Choice for Worry-Free Septic Systems.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-['Manrope'] text-[#64748B] text-lg sm:text-xl leading-relaxed mb-6 max-w-[600px]"
          >
            A failing septic system is more than a mess, it's a threat to your property and your family's comfort. At L&M Septic, we handle the dirty work so you never have to. From precision installations to proactive maintenance, we ensure your home’s most critical infrastructure is invisible, functional, and fully compliant.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <a href="tel:3365786972" className="bg-yellow-300 text-brand-green flex items-center justify-center gap-2 cursor-pointer px-8 py-4 sm:py-5 rounded-xl font-['Work_Sans'] font-semibold text-sm sm:text-[15px] hover:bg-yellow-500 transition-colors shadow-[0_8px_20px_rgba(14,118,59,0.25)] active:scale-95 transform text-center">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
              Call Now: (336) 578-6972
            </a>
            <a href="#services" className="bg-white text-[#0F172A] flex items-center justify-center cursor-pointer border-2 border-[#E2E8F0] px-8 py-4 sm:py-5 rounded-xl font-['Work_Sans'] font-semibold text-sm sm:text-[15px] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] transition-colors active:scale-95 transform text-center">
              Explore Our Services
            </a>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-px w-full bg-gradient-to-r from-[#E2E8F0] to-transparent mb-8"
          ></motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-10"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full flex items-center justify-center text-[#0F172A] shadow-sm">
                <span className="material-symbols-outlined text-[20px]">shield</span>
              </div>
              <div>
                <p className="font-['Manrope'] text-[#0F172A] font-bold text-[15px]">Licensed & Insured</p>
                <p className="font-['Manrope'] text-[#64748B] text-[13px]">Full Property Coverage</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-green/10 border border-brand-green/20 rounded-full flex items-center justify-center text-brand-green shadow-sm">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <div>
                <p className="font-['Manrope'] text-[#0F172A] font-bold text-[15px]">4.9/5 Average Rating</p>
                <p className="font-['Manrope'] text-[#64748B] text-[13px]">Based on 200+ Reviews</p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
