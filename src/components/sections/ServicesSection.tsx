"use client";
import { motion } from "motion/react";
import Image from "next/image";
export default function ServicesSection() {
  return (
    <section className="py-24 md:py-32 bg-white" id="services">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="font-['Manrope'] text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight mb-4"
          >
            Comprehensive Septic Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-['Manrope'] text-lg md:text-xl text-[#64748B]"
          >
            Precision care for every stage of your system's life cycle.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {/* Service 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="group relative h-80 md:h-[380px] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent z-10 transition-opacity duration-500 group-hover:from-brand-green/90"></div>
            <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px" className="object-cover transition-transform duration-700 group-hover:scale-105" alt="Pumping service truck" src="/images/truck.webp" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 z-20 p-4 md:p-10 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/60 to-black/10">
              <h3 className="font-['Manrope'] text-white text-2xl md:text-3xl font-bold mb-3">Septic Repair</h3>
              <p className="font-['Manrope'] text-white/90 text-sm md:text-base mb-6 leading-relaxed">
                Don't let a small leak turn into a costly property disaster. Our precision diagnostics locate the issue fast, saving your yard and your budget. We fix it right the first time, restoring your home's safety and your peace of mind immediately.
              </p>
              {/* <a className="inline-flex items-center text-white font-['Work_Sans'] font-semibold text-sm uppercase tracking-wider group/link w-fit" href="#">
                <span className="border-b-2 border-white/30 pb-1 group-hover/link:border-white transition-colors duration-300">Learn More</span>
                <span className="material-symbols-outlined text-[18px] ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1 pb-1">arrow_forward</span>
              </a> */}
            </div>
          </motion.div>

          {/* Service 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative h-80 md:h-[380px] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
          >
            <div className="absolute inset-0 bg-linear-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent z-10 transition-opacity duration-500 group-hover:from-brand-green/90"></div>
            <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px" className="object-cover transition-transform duration-700 group-hover:scale-105" alt="Installation of septic system" src="/images/digging.webp" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 z-20 p-4 md:p-8 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/60 to-black/10">
              <h3 className="font-['Manrope'] text-white text-2xl md:text-3xl font-bold mb-3">New Installation</h3>
              <p className="font-['Manrope'] text-white/90 text-sm md:text-base mb-6 leading-relaxed">
                Building a home should be exciting, not stressful. We handle everything from permitting to final landscape restoration. Our expert installs ensure your new system is built for decades of worry-free use, so you can focus on building memories, not worrying about what's underground.
              </p>
              {/* <a className="inline-flex items-center text-white font-['Work_Sans'] font-semibold text-sm uppercase tracking-wider group/link w-fit" href="#">
                <span className="border-b-2 border-white/30 pb-1 group-hover/link:border-white transition-colors duration-300">Learn More</span>
                <span className="material-symbols-outlined text-[18px] ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1 pb-1">arrow_forward</span>
              </a> */}
            </div>
          </motion.div>

          {/* Service 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group relative h-80 md:h-[380px] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
          >
            <div className="absolute inset-0 bg-linear-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent z-10 transition-opacity duration-500 group-hover:from-brand-green/90"></div>
            <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px" className="object-cover transition-transform duration-700 group-hover:scale-105" alt="A focused technician using a tablet-based diagnostic tool to perform a comprehensive septic inspection." src="/images/worker.webp" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 z-20 p-4 md:p-8 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/60 to-black/10">
              <h3 className="font-['Manrope'] text-white text-2xl md:text-3xl font-bold mb-3">Septic System Design & Permitting</h3>
              <p className="font-['Manrope'] text-white/90 text-sm md:text-base mb-6 leading-relaxed">
                We navigate the complex world of local permits and engineering for you. Our expert designs ensure your system is compliant, efficient, and built to last. We handle the paperwork and the headaches so your project stays on track and stress-free.
              </p>
              {/* <a className="inline-flex items-center text-white font-['Work_Sans'] font-semibold text-sm uppercase tracking-wider group/link w-fit" href="#">
                <span className="border-b-2 border-white/30 pb-1 group-hover/link:border-white transition-colors duration-300">Learn More</span>
                <span className="material-symbols-outlined text-[18px] ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1 pb-1">arrow_forward</span>
              </a> */}
            </div>
          </motion.div>

          {/* Service 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative h-80 md:h-[380px] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
          >
            <div className="absolute inset-0 bg-linear-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent z-10 transition-opacity duration-500 group-hover:from-brand-green/90"></div>
            <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px" className="object-cover transition-transform duration-700 group-hover:scale-105" alt="Repair of septic equipment" src="/images/work.webp" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 z-20 p-4 md:p-8 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/60 to-black/10">
              <h3 className="font-['Manrope'] text-white text-2xl md:text-3xl font-bold mb-3">Drain Field Restoration</h3>
              <p className="font-['Manrope'] text-white/90 text-sm md:text-base mb-6 leading-relaxed">
                A wet yard doesn't always mean a total system replacement. We specialize in advanced restoration techniques that breathe life back into your drain field. Save your landscape and your wallet with a solution that works without the massive excavation.
              </p>
              {/* <a className="inline-flex items-center text-white font-['Work_Sans'] font-semibold text-sm uppercase tracking-wider group/link w-fit" href="#">
                <span className="border-b-2 border-white/30 pb-1 group-hover/link:border-white transition-colors duration-300">Learn More</span>
                <span className="material-symbols-outlined text-[18px] ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1 pb-1">arrow_forward</span>
              </a> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
