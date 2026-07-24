"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, ShieldCheck, Home } from "lucide-react";

export default function AboutUsSection() {
  const pillars = [
    {
      icon: <MapPin className="w-6 h-6 text-brand-green" />,
      title: "Triad Roots",
      description: "Owned and operated by lifelong Triad residents. We know the local soil, regulations, and neighborhoods across Greensboro, Winston-Salem, High Point, and Burlington.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-green" />,
      title: "Honesty & Integrity",
      description: "Built on transparency. We believe in honest pricing, clear explanations of system needs, and only proposing repairs that are genuinely necessary.",
    },
    {
      icon: <Home className="w-6 h-6 text-brand-green" />,
      title: "The Invisible Covenant",
      description: "We view every service visit as a commitment. We show up on time, respect your property, and ensure your home's most critical infrastructure remains functional and invisible.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] border-t border-b border-[#E2E8F0]" id="about-us">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Intro, Image */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="font-['Work_Sans'] text-xs font-bold tracking-widest uppercase text-brand-green mb-2 block">
                Who We Are
              </span>
              <h2 className="font-['Manrope'] text-4xl md:text-5xl font-black tracking-tight text-[#0F172A]">
                About Us
              </h2>
            </div>
            
            <p className="font-['Manrope'] text-[#64748B] text-base sm:text-lg leading-relaxed max-w-[500px]">
              L&M Septic is built on a simple foundation: honesty and integrity. To us, these aren't just corporate values—they are the core of how we treat our neighbors and conduct our daily work in the Triad.
            </p>

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-[0_8px_30px_rgba(15,23,42,0.06)] mt-2">
              <Image
                src="/images/local.webp"
                alt="L&M Septic hard at work at a local home"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column: Value Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex gap-6 hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0 group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                  {pillar.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-['Manrope'] text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="font-['Manrope'] text-[#64748B] text-sm sm:text-base leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}