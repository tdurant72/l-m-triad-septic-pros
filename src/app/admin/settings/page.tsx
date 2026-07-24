"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

type BusinessSettings = Database["public"]["Tables"]["business_settings"]["Row"];

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  
  const { register, handleSubmit, reset } = useForm<Partial<BusinessSettings>>();

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("business_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setSettingsId(data.id);
        reset(data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [reset]);

  const onSubmit = async (data: Partial<BusinessSettings>) => {
    setSaving(true);
    try {
      const payload = {
        business_name: data.business_name || 'L&M Septic Pros',
        business_email: data.business_email || null,
        business_phone: data.business_phone || null,
        business_address: data.business_address || null,
        slot_interval_minutes: Number(data.slot_interval_minutes) || 30,
        booking_notice_hours: Number(data.booking_notice_hours) || 24,
      };

      if (settingsId) {
        const { error } = await supabase
          .from("business_settings")
          .update(payload)
          .eq("id", settingsId);
        if (error) throw error;
      } else {
        const { data: newRow, error } = await supabase
          .from("business_settings")
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        if (newRow) setSettingsId(newRow.id);
      }
      
      toast.success("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div>
        <h1 className="font-['Manrope'] text-3xl font-bold text-slate-900 tracking-tight">Business Settings</h1>
        <p className="font-['Work_Sans'] text-slate-500 mt-1">Manage your company information and booking rules.</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-['Manrope'] text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-green">storefront</span>
                Company Information
              </h2>
              <p className="font-['Work_Sans'] text-slate-500 text-sm mt-1">This information may be displayed on the public website.</p>
            </div>
            
            <div className="p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Company Name</label>
                <input
                  type="text"
                  {...register("business_name")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Company Email</label>
                  <input
                    type="email"
                    {...register("business_email")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Company Phone</label>
                  <input
                    type="text"
                    {...register("business_phone")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Company Address</label>
                <textarea
                  {...register("business_address")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all min-h-[80px]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-['Manrope'] text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-green">tune</span>
                Booking Rules
              </h2>
              <p className="font-['Work_Sans'] text-slate-500 text-sm mt-1">Configure how the calendar generates available time slots.</p>
            </div>
            
            <div className="p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Slot Interval (minutes)</label>
                  <select
                    {...register("slot_interval_minutes", { valueAsNumber: true })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes (1 hour)</option>
                  </select>
                  <p className="text-xs text-slate-500 font-['Work_Sans']">How frequently a new slot starts (e.g. 9:00, 9:30, 10:00).</p>
                </div>
                
                <div className="space-y-2">
                  <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Booking Notice (hours)</label>
                  <input
                    type="number"
                    min="0"
                    {...register("booking_notice_hours", { valueAsNumber: true })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                  />
                  <p className="text-xs text-slate-500 font-['Work_Sans']">Minimum time required before an appointment.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-brand-green text-white px-8 py-3.5 rounded-xl font-['Work_Sans'] font-bold hover:bg-brand-green-dark transition-all active:scale-95 shadow-[0_4px_14px_rgba(14,118,59,0.25)] flex items-center justify-center min-w-[150px]"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
