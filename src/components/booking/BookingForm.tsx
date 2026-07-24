"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import TimeSlotSelector from "./TimeSlotSelector";
import { format, addMinutes } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

type Service = Database["public"]["Tables"]["services"]["Row"];
type BusinessHour = Database["public"]["Tables"]["business_hours"]["Row"];
type BlockedDate = Database["public"]["Tables"]["blocked_dates"]["Row"];
type Appointment = Database["public"]["Tables"]["appointments"]["Row"];
type BusinessSettings = Database["public"]["Tables"]["business_settings"]["Row"];

const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data
  const [services, setServices] = useState<Service[]>([]);
  const [businessHours, setBusinessHours] = useState<BusinessHour[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);

  // Selections
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Form
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [
          { data: srv },
          { data: hrs },
          { data: blk },
          { data: appt },
          { data: set }
        ] = await Promise.all([
          supabase.from("services").select("*").eq("is_active", true),
          supabase.from("business_hours").select("*"),
          supabase.from("blocked_dates").select("*"),
          supabase.from("appointments").select("appointment_date, start_time, end_time, status"),
          supabase.from("business_settings").select("*").limit(1).maybeSingle()
        ]);

        setServices(srv || []);
        setBusinessHours(hrs || []);
        setBlockedDates(blk || []);
        setAppointments(appt as Appointment[] || []);
        setSettings(set || null);
      } catch (error) {
        console.error("Error loading booking data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleNext = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && (!selectedDate || !selectedTime)) return;
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setStep(s => Math.max(1, s - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    try {
      const startTimeParts = selectedTime.split(':').map(Number);
      const startDateTime = new Date(selectedDate);
      startDateTime.setHours(startTimeParts[0], startTimeParts[1], 0, 0);

      const endDateTime = addMinutes(startDateTime, selectedService.duration_minutes);

      // Basic sanitization function to strip HTML tags and prevent basic XSS
      const sanitize = (str: string) => str ? str.replace(/[<>]/g, '').trim() : '';

      const cleanFullName = sanitize(formData.fullName);
      const cleanEmail = sanitize(formData.email);
      const cleanPhone = sanitize(formData.phone);
      const cleanNotes = sanitize(formData.notes);

      // 1. Upsert Customer based on email (or create new if doesn't exist)
      let customerId = null;
      
      const { data: existingCustomer } = await supabase
        .from("customers")
        .select("id")
        .eq("email", cleanEmail)
        .maybeSingle();
        
      if (existingCustomer) {
        customerId = existingCustomer.id;
        // Optionally update their phone/name if needed
        await supabase.from("customers").update({
          full_name: cleanFullName,
          phone: cleanPhone
        }).eq("id", customerId);
      } else {
        const { data: newCustomer } = await supabase
          .from("customers")
          .insert({
            full_name: cleanFullName,
            email: cleanEmail,
            phone: cleanPhone
          })
          .select("id")
          .single();
          
        if (newCustomer) {
          customerId = newCustomer.id;
        }
      }

      // 2. Insert Appointment
      const { error } = await supabase
        .from("appointments")
        .insert({
          customer_id: customerId,
          full_name: cleanFullName,
          email: cleanEmail,
          phone: cleanPhone,
          service_id: selectedService.id,
          appointment_date: format(selectedDate, "yyyy-MM-dd"),
          start_time: selectedTime,
          end_time: format(endDateTime, "HH:mm:ss"),
          notes: cleanNotes || null,
        });
      // Note: Intentionally not using .select() per user instructions

      if (error) throw error;

      setStep(4); // Success step
    } catch (error) {
      console.error("Error submitting appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-[2rem] shadow-xl border border-slate-100 flex justify-center items-center h-[500px]">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 animate-spin text-brand-green mb-4" />
          <p className="font-['Work_Sans'] text-slate-500">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(15,23,42,0.06)] border border-slate-100 overflow-hidden relative min-h-[500px]">

      {/* Progress Header */}
      {step < 4 && (
        <div className="bg-slate-50 p-6 border-b border-slate-100">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-['Manrope'] font-bold text-xl text-slate-900">
              {step === 1 ? "Select a Service" : step === 2 ? "Choose a Time" : "Your Details"}
            </h3>
            <span className="font-['Work_Sans'] text-sm font-semibold text-slate-400">Step {step} of 3</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-green h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">

          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {services.length === 0 ? (
                <div className="text-center p-8 text-slate-500 font-['Work_Sans']">
                  No services available for booking at this time.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`
                        text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer 
                        ${selectedService?.id === service.id
                          ? 'border-brand-green bg-brand-green/5 ring-4 ring-brand-green/10'
                          : 'border-slate-100 hover:border-brand-green/40 hover:bg-slate-50'
                        }
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-['Manrope'] font-bold text-lg text-slate-900">{service.name}</h4>
                        <span className="font-['Work_Sans'] font-semibold text-brand-green">
                          {service.price ? `$${service.price}` : 'Quote'}
                        </span>
                      </div>
                      {service.description && (
                        <p className="font-['Work_Sans'] text-sm text-slate-500 mb-4 line-clamp-2">{service.description}</p>
                      )}
                      <div className="inline-flex items-center gap-1.5 text-xs font-['Work_Sans'] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {service.duration_minutes} mins
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 2: DATE & TIME */}
          {step === 2 && selectedService && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <TimeSlotSelector
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
                serviceDuration={selectedService.duration_minutes}
                businessHours={businessHours}
                blockedDates={blockedDates}
                existingAppointments={appointments}
                settings={settings}
              />
            </motion.div>
          )}

          {/* STEP 3: DETAILS */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h4 className="font-['Manrope'] font-bold text-slate-900">{selectedService?.name}</h4>
                  <div className="font-['Work_Sans'] text-sm text-slate-500 mt-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                    <span className="mx-1">•</span>
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    {selectedTime && (
                      (() => {
                        const d = new Date(`1970-01-01T${selectedTime}`);
                        return format(d, "h:mm a");
                      })()
                    )}
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="text-sm font-['Work_Sans'] font-semibold text-brand-green hover:underline cursor-pointer">
                  Change
                </button>
              </div>

              <form id="booking-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all shadow-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all shadow-sm"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        setFormData({ ...formData, phone: formatted });
                      }}
                      maxLength={14}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all shadow-sm"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Additional Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all min-h-[100px] shadow-sm"
                    placeholder="Is there anything specific we should know about your property or septic system?"
                  />
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-10"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-brand-green">
                <span className="material-symbols-outlined text-[40px]">check_circle</span>
              </div>
              <h2 className="font-['Manrope'] font-black text-3xl text-slate-900 mb-2">Request Received!</h2>
              <p className="font-['Work_Sans'] text-slate-600 w-full max-w-[448px] mx-auto mb-8 text-lg">
                Thank you for choosing L&M Septic Pros. We will review your request and confirm your appointment shortly.
              </p>

              <div className="bg-slate-50 w-full max-w-[448px] p-6 rounded-2xl border border-slate-100 text-left space-y-4">
                <div className="flex justify-between border-b border-slate-200 pb-4">
                  <span className="font-['Work_Sans'] text-slate-500 font-medium">Service</span>
                  <span className="font-['Manrope'] font-bold text-slate-900 text-right">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-4">
                  <span className="font-['Work_Sans'] text-slate-500 font-medium">Date</span>
                  <span className="font-['Manrope'] font-bold text-slate-900 text-right">
                    {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-4">
                  <span className="font-['Work_Sans'] text-slate-500 font-medium">Time</span>
                  <span className="font-['Manrope'] font-bold text-slate-900 text-right">
                    {selectedTime && (
                      (() => {
                        const d = new Date(`1970-01-01T${selectedTime}`);
                        return format(d, "h:mm a");
                      })()
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-['Work_Sans'] text-slate-500 font-medium">Name</span>
                  <span className="font-['Manrope'] font-bold text-slate-900 text-right">{formData.fullName}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      {step < 4 && (
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-between items-center mt-auto">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl font-['Work_Sans'] font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Back
            </button>
          ) : <div></div>}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={(step === 1 && !selectedService) || (step === 2 && (!selectedDate || !selectedTime))}
              className="bg-brand-green text-white px-8 py-3 rounded-xl font-['Work_Sans'] font-semibold hover:bg-brand-green-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(14,118,59,0.25)] ml-auto cursor-pointer"
            >
              Continue
            </button>
          ) : (
            <button
              form="booking-form"
              type="submit"
              disabled={isSubmitting}
              className="bg-brand-green text-white px-8 py-3 rounded-xl font-['Work_Sans'] font-semibold hover:bg-brand-green-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(14,118,59,0.25)] flex items-center gap-2 ml-auto cursor-pointer"
            >
              {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
