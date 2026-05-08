"use client";
import Image from "next/image";
import { motion } from "motion/react";

export default function AboutUsSection() {
    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="flex flex-col justify-between items-center mb-12 gap-6 md:gap-8 lg:gap-10">
                    <motion.h2 initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8 }} className="font-['Manrope'] text-4xl md:text-5xl font-bold text-[#0F172A] mb-6 md:mb-0">About Us</motion.h2>
                    <div className="flex flex-row gap-6 items-start mb-6  w-full">
                        <Image src="/images/local.webp" alt="L&M Septic hard at work at a local home" width={400} height={400} className="rounded-2xl object-cover" />
                        <div className="flex flex-col w-full max-w-2xl">
                            <p className="font-['Manrope'] text-[#64748B] text-xl sm:text-2xl leading-relaxed mb-6">L&M Septic
                                is owned and operated by two lifelong Triad residents who are proud to call North Carolina home. We built this business on a simple foundation: honesty and integrity. <br /> To us, these aren't just words, they are the core of how we treat our neighbors and conduct our business.

                                We understand that when you call us, you're trusting us with your home. We view every service visit not just as a job, but as a covenant between us and the homeowner. That means we show up on time, respect your property, and treat your family like our own.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}