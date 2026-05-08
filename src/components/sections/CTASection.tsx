"use client";
import { motion } from "motion/react";

export default function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-brand-green text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-white blur-[120px] rounded-full mix-blend-overlay"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[120%] bg-white blur-[100px] rounded-full mix-blend-overlay"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-[1280px] mx-auto px-6 text-center"
      >
        <h2 className="font-['Manrope'] text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
          Ready for absolute peace of mind?
        </h2>
        <p className="font-['Manrope'] text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of homeowners who trust L&amp;M Septic for their invisible infrastructure. Don't wait until it becomes a visible problem.
        </p>
        <a href="tel:3365786972" className="bg-white text-[#0F172A] px-5 py-3 font-['Work_Sans'] font-bold uppercase tracking-wider text-sm sm:text-base rounded-xl shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 transform transition-all active:scale-95 flex items-center justify-center mx-auto gap-3  max-w-2xs">
          <span className="material-symbols-outlined text-[20px]">call</span>
          Call (336) 578-6972
        </a>
      </motion.div>
    </section>
  );
}
