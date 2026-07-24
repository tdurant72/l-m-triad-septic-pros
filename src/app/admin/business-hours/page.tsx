"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type BusinessHour = Database["public"]["Tables"]["business_hours"]["Row"];

const WEEKDAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

export default function AdminBusinessHoursPage() {
  const [hours, setHours] = useState<BusinessHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);

  const fetchHours = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("business_hours")
        .select("*")
        .order("weekday", { ascending: true });

      if (error) throw error;
      
      // Ensure all days exist locally even if DB is missing some
      const completeHours = WEEKDAYS.map((_, index) => {
        const existing = data?.find(h => h.weekday === index);
        if (existing) return existing;
        return {
          id: `new-${index}`,
          weekday: index,
          is_open: false,
          start_time: '08:00:00',
          end_time: '17:00:00'
        } as BusinessHour;
      });
      
      setHours(completeHours);
    } catch (error) {
      console.error("Error fetching business hours:", error);
      toast.error("Failed to load business hours.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHours();
  }, []);

  const handleUpdate = async (weekday: number, updates: Partial<BusinessHour>) => {
    setSaving(weekday);
    try {
      const hourRecord = hours.find(h => h.weekday === weekday);
      if (!hourRecord) return;
      
      const updatedRecord = { ...hourRecord, ...updates };
      
      // Optimistic UI update
      setHours(hours.map(h => h.weekday === weekday ? updatedRecord : h));
      
      if (hourRecord.id.startsWith('new-')) {
        // Insert
        const { error } = await supabase.from('business_hours').insert({
          weekday: updatedRecord.weekday,
          is_open: updatedRecord.is_open,
          start_time: updatedRecord.start_time,
          end_time: updatedRecord.end_time
        });
        if (error) throw error;
      } else {
        // Update
        const { error } = await supabase
          .from('business_hours')
          .update({
            is_open: updatedRecord.is_open,
            start_time: updatedRecord.start_time,
            end_time: updatedRecord.end_time
          })
          .eq('id', hourRecord.id);
        if (error) throw error;
      }
      
      toast.success(`${WEEKDAYS[weekday]} hours updated`);
    } catch (error) {
      console.error("Error updating hours:", error);
      toast.error(`Failed to update ${WEEKDAYS[weekday]}`);
      // Revert on error
      await fetchHours();
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="font-['Manrope'] text-3xl font-bold text-slate-900 tracking-tight">Business Hours</h1>
        <p className="font-['Work_Sans'] text-slate-500 mt-1">Set your weekly availability for appointments.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        {loading ? (
          <div className="py-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
          </div>
        ) : (
          <div className="space-y-6">
            {hours.map((hour) => (
              <div 
                key={hour.weekday} 
                className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl transition-colors ${
                  hour.is_open ? 'bg-slate-50 border border-slate-200' : 'bg-slate-50/50 border border-slate-100 opacity-75'
                }`}
              >
                <div className="flex-1 flex items-center gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={hour.is_open}
                      onChange={(e) => handleUpdate(hour.weekday, { is_open: e.target.checked })}
                      disabled={saving === hour.weekday}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                  </label>
                  <span className={`font-['Work_Sans'] font-semibold w-24 ${hour.is_open ? 'text-slate-900' : 'text-slate-500'}`}>
                    {WEEKDAYS[hour.weekday]}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="time"
                    value={hour.start_time?.substring(0, 5) || ""}
                    onChange={(e) => handleUpdate(hour.weekday, { start_time: e.target.value + ":00" })}
                    disabled={!hour.is_open || saving === hour.weekday}
                    className="px-3 py-2 rounded-lg border border-slate-200 bg-white font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all disabled:bg-slate-100 disabled:text-slate-400"
                  />
                  <span className="text-slate-400 font-medium">to</span>
                  <input
                    type="time"
                    value={hour.end_time?.substring(0, 5) || ""}
                    onChange={(e) => handleUpdate(hour.weekday, { end_time: e.target.value + ":00" })}
                    disabled={!hour.is_open || saving === hour.weekday}
                    className="px-3 py-2 rounded-lg border border-slate-200 bg-white font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>
                
                <div className="w-6 flex justify-end">
                    {saving === hour.weekday && <Loader2 className="w-4 h-4 animate-spin text-brand-green" />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
