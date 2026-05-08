"use client";
import { motion } from "motion/react";

export default function SolutionSection() {
  return (
    <section className="py-24 md:py-32 bg-white" id="protection-plan">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          {/* Protection Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] mb-6"
          >
            <span className="material-symbols-outlined text-brand-green text-[18px]">security</span>
            <span className="font-['Work_Sans'] font-semibold text-[#0F172A] text-xs sm:text-sm uppercase tracking-widest">
              L&amp;M Certified Protection
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-['Manrope'] text-[#0F172A] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
          >
            Total Home Protection, On Autopilot.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-['Manrope'] font-medium text-[#64748B] text-lg sm:text-xl leading-relaxed"
          >
            Stop guessing and start protecting. Our Worry-Free Maintenance Plan is designed to keep your system healthy and your family safe.
          </motion.p>
        </div>

        {/* Features 3-Column Layout */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-20">
          {/* Feature 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center text-center p-8 md:p-10 border border-[#F1F5F9] rounded-3xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300"
          >
            <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-6 text-brand-green">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 0" }}>fact_check</span>
            </div>
            <h3 className="font-['Manrope'] text-[#0F172A] text-xl font-extrabold mb-4">
              Scheduled Health Checks
            </h3>
            <p className="font-['Manrope'] font-medium text-[#64748B] text-[15px] sm:text-base leading-relaxed">
              We track your system’s health so you don’t have to. Proactive inspections catch 95% of issues before they become expensive household emergencies.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center text-center p-8 md:p-10 border border-[#F1F5F9] rounded-3xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300 transform md:-translate-y-4"
          >
            <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-6 text-brand-green">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <h3 className="font-['Manrope'] text-[#0F172A] text-xl font-extrabold mb-4">
              Priority Emergency Response
            </h3>
            <p className="font-['Manrope'] font-medium text-[#64748B] text-[15px] sm:text-base leading-relaxed">
              As a plan member, you’re always first in line. If the unexpected happens, our team is dispatched to your door within hours, not days.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center text-center p-8 md:p-10 border border-[#F1F5F9] rounded-3xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300"
          >
            <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-6 text-brand-green">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
            </div>
            <h3 className="font-['Manrope'] text-[#0F172A] text-xl font-extrabold mb-4">
              Digital Maintenance Log
            </h3>
            <p className="font-['Manrope'] font-medium text-[#64748B] text-[15px] sm:text-base leading-relaxed">
              We maintain a certified, digital history of your system’s health. Boost your property value with a verifiable record of professional care.
            </p>
          </motion.div>
        </div>

        {/* Call to Action and Footer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <button className="bg-[#0F172A] text-white px-10 py-5 rounded-full font-['Work_Sans'] font-semibold text-base sm:text-lg hover:bg-[#1E293B] hover:shadow-[0_8px_24px_rgba(15,23,42,0.25)] transition-all duration-300 active:scale-95 transform mb-6 flex items-center gap-3">
            Join the Protection Plan
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
          <div className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-green text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <p className="font-['Manrope'] font-medium text-[#64748B] text-sm sm:text-[15px]">
              Join 500+ Triad homeowners who never worry about their septic system.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
