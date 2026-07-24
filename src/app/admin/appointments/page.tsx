"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';

type Appointment = Database["public"]["Tables"]["appointments"]["Row"] & {
  services: { name: string } | null;
};

export default function AdminAppointmentsPage() {
  const { isLoading: authLoading } = useAdminAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [lastFetchCount, setLastFetchCount] = useState<number | null>(null);
  const [lastFetchError, setLastFetchError] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select(`
          *,
          services ( name )
        `)
        .order("appointment_date", { ascending: false })
        .order("start_time", { ascending: false });

      if (error) {
        setLastFetchError(String(error.message || error));
        throw error;
      }
      
      setAppointments(data as any);
      setLastFetchCount((data as any)?.length ?? 0);
      setLastFetchError(null);
      console.log('fetchAppointments.data', data);
      // ensure loading is cleared as soon as we have data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      if (!lastFetchError) setLastFetchError(String((error as any)?.message || error));
      toast.error("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchAppointments();
    }
  }, [authLoading]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('debug') === '1' || params.get('debug') === 'true') {
        console.info('Appointments debug mode enabled');
      }
    }
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast.success(`Appointment marked as ${status}`);
      setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  const saveReview = async (id: string, rating: number, text: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ review_rating: rating, review_text: text })
        .eq("id", id);

      if (error) throw error;

      toast.success("Review saved successfully");
      setAppointments(appointments.map(a => a.id === id ? { ...a, review_rating: rating, review_text: text } : a));
    } catch (error) {
      console.error("Error saving review:", error);
      toast.error("Failed to save review.");
    }
  };

  const saveAddress = async (id: string, address: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ property_address: address })
        .eq("id", id);

      if (error) throw error;

      toast.success("Address saved successfully");
      setAppointments(appointments.map(a => a.id === id ? { ...a, property_address: address } : a));
      setEditingAddressId(null);
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address.");
    }
  };

  const filteredAppointments = appointments.filter((app) => {
    try {
      if (statusFilter === "all") return true;
      const appStatus = (app.status ?? "").toString().trim().toLowerCase();
      const filterStatus = statusFilter.toString().trim().toLowerCase();
      return appStatus === filterStatus;
    } catch (e) {
      return false;
    }
  });

  const renderBranch = loading ? 'loading' : filteredAppointments.length > 0 ? 'table' : 'empty';

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Manrope'] text-3xl font-bold text-slate-900 tracking-tight">Appointments</h1>
          <p className="font-['Work_Sans'] text-slate-500 mt-1">Manage your customer bookings and service schedule.</p>
          {lastFetchCount !== null && (
            <div className="text-xs text-slate-400 mt-1">Last fetch returned {lastFetchCount} rows{lastFetchError ? ` — error: ${lastFetchError}` : ''}</div>
          )}
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner border border-slate-200">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-['Work_Sans'] font-semibold capitalize transition-all ${statusFilter === status
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {loading ? (
          <div className="p-12 flex justify-center items-center">
            
            <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
          </div>
        ) : filteredAppointments.length > 0 ? (
            <div ref={gridRef} id="appointments-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              
              {filteredAppointments.map((app) => (
                <div key={app.id} className="bg-white rounded-lg shadow p-4 border border-slate-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-900 text-[15px]" style={{color: '#111'}}>{app.full_name}</div>
                      <div className="text-slate-500 text-xs mt-1" style={{color: '#475569'}}>{app.phone} • {app.email}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-900 font-medium" style={{color: '#111'}}>{format(new Date(app.appointment_date), "MMM d, yyyy")}</div>
                      <div className="text-slate-500 text-xs mt-0.5" style={{color: '#64748b'}}>{app.start_time.substring(0,5)} - {app.end_time.substring(0,5)}</div>
                    </div>
                  </div>

                    <div className="mt-3 text-sm text-slate-700" style={{color: '#0f172a'}}>
                    <div className="font-medium text-slate-800">Service</div>
                    <div className="text-slate-600 text-sm" style={{color: '#334155'}}>{app.services?.name || 'Unknown Service'}</div>
                  </div>

                  <div className="mt-3">
                    {editingAddressId === app.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          autoFocus
                          value={app.property_address || ''}
                          onChange={(e) => setAppointments(appointments.map(a => a.id === app.id ? { ...a, property_address: e.target.value } : a))}
                          onBlur={(e) => saveAddress(app.id, e.target.value)}
                          className="w-full text-sm px-2 py-1 rounded border border-brand-green"
                        />
                        <button onClick={() => setEditingAddressId(null)} className="text-xs text-slate-500">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-xs">{app.property_address || <span className="italic text-slate-400">No address</span>}</span>
                        <button onClick={() => setEditingAddressId(app.id)} className="text-xs text-slate-500 underline cursor-pointer">Edit</button>
                      </div>
                    )}
                  </div>

                  {app.notes && (
                    <div className="mt-3 text-xs bg-slate-50 p-2 rounded border border-slate-100 text-slate-600">{app.notes}</div>
                  )}

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {app.status !== 'confirmed' && (
                        <button onClick={() => updateStatus(app.id, 'confirmed')} className="px-3 py-1 rounded bg-slate-100 text-slate-700 text-sm cursor-pointer">Confirm</button>
                      )}
                      {app.status !== 'completed' && (
                        <button onClick={() => updateStatus(app.id, 'completed')} className="px-3 py-1 rounded bg-brand-green text-white text-sm cursor-pointer">Mark Completed</button>
                      )}
                      {app.status !== 'cancelled' && (
                        <button onClick={() => updateStatus(app.id, 'cancelled')} className="px-3 py-1 rounded bg-rose-100 text-rose-700 text-sm cursor-pointer">Cancel</button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={async () => {
                        if (!confirm('Delete this appointment?')) return;
                        try {
                          const { error } = await supabase.from('appointments').delete().eq('id', app.id);
                          if (error) throw error;
                          setAppointments(appointments.filter(a => a.id !== app.id));
                          toast.success('Appointment deleted');
                        } catch (err) {
                          console.error('Delete failed', err);
                          toast.error('Failed to delete appointment');
                        }
                      }} className="text-xs text-rose-600 cursor-pointer">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 font-['Work_Sans']">No appointments found.</div>
          )}
        </div>

    </div>
  );
}

  
  
