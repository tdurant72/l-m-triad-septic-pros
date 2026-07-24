"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type BlockedDate = Database["public"]["Tables"]["blocked_dates"]["Row"];

export default function AdminBlockedDatesPage() {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newDate, setNewDate] = useState("");
  const [newReason, setNewReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBlockedDates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("blocked_dates")
        .select("*")
        .order("blocked_date", { ascending: true });

      if (error) throw error;
      setBlockedDates(data || []);
    } catch (error) {
      console.error("Error fetching blocked dates:", error);
      toast.error("Failed to load blocked dates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedDates();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("blocked_dates")
        .insert({
          blocked_date: newDate,
          reason: newReason || null,
        });

      if (error) {
        if (error.code === '23505') { // unique violation
            toast.error("This date is already blocked.");
        } else {
            throw error;
        }
        return;
      }
      
      toast.success("Date blocked successfully");
      setNewDate("");
      setNewReason("");
      await fetchBlockedDates();
    } catch (error) {
      console.error("Error adding blocked date:", error);
      toast.error("Failed to block date.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("blocked_dates")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      toast.success("Date unblocked");
      setBlockedDates(blockedDates.filter(d => d.id !== id));
    } catch (error) {
      console.error("Error removing blocked date:", error);
      toast.error("Failed to unblock date.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="font-['Manrope'] text-3xl font-bold text-slate-900 tracking-tight">Blocked Dates</h1>
        <p className="font-['Work_Sans'] text-slate-500 mt-1">Block off holidays or days you cannot accept bookings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-8">
            <h2 className="font-['Manrope'] text-lg font-bold text-slate-900 mb-4">Block a Date</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Date *</label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Reason (Optional)</label>
                <input
                  type="text"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="e.g. Christmas, Vacation"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !newDate}
                className="w-full bg-brand-green text-white px-4 py-3 rounded-xl font-['Work_Sans'] font-semibold hover:bg-brand-green-dark transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center mt-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Blocked Date"}
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
              </div>
            ) : blockedDates.length > 0 ? (
              <table className="w-full text-left font-['Work_Sans'] text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Reason</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {blockedDates.map((date) => {
                    // Fix timezone shift by appending time
                    const d = new Date(date.blocked_date + "T12:00:00");
                    const isPast = d < new Date(new Date().setHours(0,0,0,0));
                    return (
                      <tr key={date.id} className={`transition-colors ${isPast ? 'bg-slate-50/50' : 'hover:bg-slate-50'}`}>
                        <td className="px-6 py-4">
                          <div className={`font-bold text-[15px] ${isPast ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                            {format(d, "MMMM d, yyyy")}
                          </div>
                          <div className={`text-xs mt-0.5 ${isPast ? 'text-slate-400' : 'text-slate-500'}`}>
                            {format(d, "EEEE")}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={isPast ? 'text-slate-400' : 'text-slate-600'}>
                            {date.reason || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleRemove(date.id)}
                            className="text-red-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                            title="Remove blocked date"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                  <span className="material-symbols-outlined text-slate-300 text-[32px]">event_available</span>
                </div>
                <p className="text-slate-500 font-['Work_Sans'] font-medium text-lg">No blocked dates.</p>
                <p className="text-slate-400 font-['Work_Sans'] text-sm mt-1">Your calendar is fully open according to business hours.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
