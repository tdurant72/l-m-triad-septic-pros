"use client";
import { motion } from "motion/react";

export default function AgitationSection() {
  return (
    <section className="py-24 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="font-['Manrope'] text-[#0F172A] text-4xl md:text-5xl font-black tracking-tight"
          >
            The Hidden Risks of a Neglected System
          </motion.h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-20">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-2xl p-10 md:p-12 shadow-[0_4px_20px_rgba(15,23,42,0.03)] border border-[#E2E8F0] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
          >
            <div className="w-14 h-14 bg-brand-green/10 rounded-xl flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-brand-green text-3xl">payments</span>
            </div>
            <h3 className="font-['Manrope'] text-[#0F172A] text-2xl font-bold mb-4">
              The $10,000 Surprise
            </h3>
            <p className="font-['Manrope'] text-[#64748B] text-lg leading-relaxed">
              Emergency replacements are often 5x the cost of routine care. A small oversight today can lead to a massive financial burden tomorrow.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-10 md:p-12 shadow-[0_4px_20px_rgba(15,23,42,0.03)] border border-[#E2E8F0] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
          >
            <div className="w-14 h-14 bg-brand-green/10 rounded-xl flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-brand-green text-3xl">emergency_home</span>
            </div>
            <h3 className="font-['Manrope'] text-[#0F172A] text-2xl font-bold mb-4">
              The Worst Possible Timing
            </h3>
            <p className="font-['Manrope'] text-[#64748B] text-lg leading-relaxed">
              Septic failures don’t wait for a convenient time. They happen during holidays, family gatherings, and late at night, turning your home into a danger zone.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-2xl p-10 md:p-12 shadow-[0_4px_20px_rgba(15,23,42,0.03)] border border-[#E2E8F0] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
          >
            <div className="w-14 h-14 bg-brand-green/10 rounded-xl flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-brand-green text-3xl">trending_down</span>
            </div>
            <h3 className="font-['Manrope'] text-[#0F172A] text-2xl font-bold mb-4">
              Market Value Erosion
            </h3>
            <p className="font-['Manrope'] text-[#64748B] text-lg leading-relaxed">
              A failing system is a 'red flag' that can derail a home sale instantly. Protect your property's value with a certified history of health.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center justify-center mt-12 md:mt-24"
        >
          <p className="font-['Manrope'] text-[#64748B] text-lg mb-4">
            Don't wait for a failure.
          </p>
          <button className="font-['Work_Sans'] font-semibold text-brand-green uppercase tracking-wide text-sm flex items-center gap-2 group hover:text-[#0F172A] transition-colors duration-300">
            <span className="border-b-2 border-brand-green/30 group-hover:border-[#0F172A]/50 pb-1 transition-all duration-300">
              Get a Worry-Free Inspection Today
            </span>
            <span className="material-symbols-outlined text-sm transform transition-transform group-hover:translate-x-1 pb-1">arrow_forward</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
