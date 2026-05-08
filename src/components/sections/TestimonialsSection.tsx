"use client";
import { motion } from "motion/react";

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-[#F8FAFC]" id="testimonials">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="font-['Manrope'] text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight mb-4"
          >
            What Our Neighbors Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-['Manrope'] text-lg md:text-xl text-[#64748B]"
          >
            Trusted by hundreds of homeowners and real estate professionals.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Testimonial 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white p-8 md:p-10 border border-[#E2E8F0] rounded-[2rem] shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-shadow duration-300 relative"
          >
            <span className="absolute top-8 right-8 text-8xl text-brand-green/5 font-serif leading-none material-symbols-outlined select-none h-10 w-10">format_quote</span>
            <div className="flex text-brand-green mb-6 space-x-1 relative z-10">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="font-['Manrope'] text-[#0F172A] text-lg leading-relaxed mb-8 relative z-10 font-medium">
              "I've never seen a septic company so professional. Their tracker app let me know exactly when they were arriving. My yard looks like they weren't even here."
            </p>
            <div className="pt-6 border-t border-[#E2E8F0] mt-auto relative z-10">
              <p className="font-['Manrope'] font-bold text-[#0F172A] mb-0.5">Sarah J.</p>
              <p className="font-['Work_Sans'] font-medium text-[#64748B] text-xs uppercase tracking-wider">Homeowner</p>
            </div>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-8 md:p-10 border border-[#E2E8F0] rounded-[2rem] shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-shadow duration-300 relative"
          >
            <span className="absolute top-8 right-8 text-8xl text-brand-green/5 font-serif leading-none material-symbols-outlined select-none h-10 w-10">format_quote</span>
            <div className="flex text-brand-green mb-6 space-x-1 relative z-10">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="font-['Manrope'] text-[#0F172A] text-lg leading-relaxed mb-8 relative z-10 font-medium">
              "The inspection report was so thorough. It gave us real leverage when selling our house. Truly the best in the business when it comes to communication."
            </p>
            <div className="pt-6 border-t border-[#E2E8F0] mt-auto relative z-10">
              <p className="font-['Manrope'] font-bold text-[#0F172A] mb-0.5">Mark R.</p>
              <p className="font-['Work_Sans'] font-medium text-[#64748B] text-xs uppercase tracking-wider">Real Estate Agent</p>
            </div>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white p-8 md:p-10 border border-[#E2E8F0] rounded-[2rem] shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-shadow duration-300 relative"
          >
            <span className="absolute top-8 right-8 text-8xl text-brand-green/5 font-serif leading-none material-symbols-outlined select-none h-10 w-10">format_quote</span>
            <div className="flex text-brand-green mb-6 space-x-1 relative z-10">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="font-['Manrope'] text-[#0F172A] text-lg leading-relaxed mb-8 relative z-10 font-medium">
              "L&amp;M Septic saved us from a major disaster. Their emergency team was there within two hours and fixed the pump immediately. Lifesavers."
            </p>
            <div className="pt-6 border-t border-[#E2E8F0] mt-auto relative z-10">
              <p className="font-['Manrope'] font-bold text-[#0F172A] mb-0.5">Elena W.</p>
              <p className="font-['Work_Sans'] font-medium text-[#64748B] text-xs uppercase tracking-wider">Property Manager</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
