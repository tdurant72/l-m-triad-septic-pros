"use client";

import { motion } from "motion/react";
import BookingForm from "@/components/booking/BookingForm";

export default function BookingSection() {
  return (
    <section id="booking" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full mb-6 border border-brand-green/20">
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                <span className="font-['Work_Sans'] text-xs font-bold uppercase tracking-widest">Book Online</span>
              </div>
              
              <h2 className="font-['Manrope'] text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Schedule Your Service Today
              </h2>
              
              <p className="font-['Manrope'] text-slate-600 text-lg mb-8 leading-relaxed">
                Whether you need a routine inspection, emergency repair, or a complete installation, our experts are ready to help. Select a service and find a time that works for you.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 shrink-0 text-brand-green">
                    <span className="material-symbols-outlined text-[24px]">verified</span>
                  </div>
                  <div>
                    <h4 className="font-['Manrope'] font-bold text-slate-900 text-lg">Guaranteed Quality</h4>
                    <p className="font-['Work_Sans'] text-slate-500 text-sm mt-1">Every service is performed to the highest standards.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 shrink-0 text-brand-green">
                    <span className="material-symbols-outlined text-[24px]">speed</span>
                  </div>
                  <div>
                    <h4 className="font-['Manrope'] font-bold text-slate-900 text-lg">Prompt Response</h4>
                    <p className="font-['Work_Sans'] text-slate-500 text-sm mt-1">We respect your time and arrive when promised.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <BookingForm />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
