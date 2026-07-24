"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { toast } from "sonner";

type Customer = Database["public"]["Tables"]["customers"]["Row"];
type Appointment = Database["public"]["Tables"]["appointments"]["Row"];
type AppointmentWithService = Appointment & { services?: { name: string } | null };
type Service = Database["public"]["Tables"]["services"]["Row"];

export default function CustomerDetails({
  customer,
  onClose,
  onSaved,
}: {
  customer: Customer;
  onClose: () => void;
  onSaved?: () => void;
}) {
  const [form, setForm] = useState({
    full_name: customer.full_name || "",
    email: customer.email || "",
    phone: customer.phone || "",
    address: customer.address || "",
    internal_notes: customer.internal_notes || "",
  });

  const [history, setHistory] = useState<AppointmentWithService[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const [newEntry, setNewEntry] = useState({ service_id: "", appointment_date: today, start_time: "09:00", end_time: "10:00", review_rating: 0 as number, review_text: "" });

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select(`*, services(name)`)
        .eq("customer_id", customer.id)
        .order("appointment_date", { ascending: false });
      if (error) throw error;
      setHistory(data as any);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load service history.");
    }
  };

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase.from("services").select("*").order("name");
      if (error) throw error;
      setServices(data as any);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
    fetchServices();
  }, []);

  const saveCustomer = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("customers").update(form).eq("id", customer.id);
      if (error) throw error;
      toast.success("Customer saved");
      onSaved?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save customer.");
    } finally {
      setLoading(false);
    }
  };

  const addServiceRecord = async () => {
    if (!newEntry.service_id || !newEntry.appointment_date) {
      toast.error("Choose a service and date.");
      return;
    }
    setLoading(true);
    try {
      const insert = {
        customer_id: customer.id,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        service_id: newEntry.service_id,
        appointment_date: newEntry.appointment_date,
        start_time: newEntry.start_time,
        end_time: newEntry.end_time,
        review_rating: newEntry.review_rating || null,
        review_text: newEntry.review_text || null,
        status: "completed",
      };
      const { data: inserted, error } = await supabase.from("appointments").insert(insert).select().single();
      if (error) throw error;
      toast.success("Service record added");
      setAdding(false);
      setNewEntry({ service_id: "", appointment_date: today, start_time: "09:00", end_time: "10:00", review_rating: 0, review_text: "" });
      // refresh history; prefer refetch to include joined service name
      fetchHistory();
      onSaved?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add service record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Customer Details</h3>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded bg-slate-100" onClick={onClose}>Close</button>
            <button className="px-3 py-1 rounded bg-brand-green text-white" onClick={saveCustomer} disabled={loading}>Save</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <input className="p-2 border rounded" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} placeholder="Full name" />
          <input className="p-2 border rounded" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
          <input className="p-2 border rounded" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
          <input className="p-2 border rounded" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" />
          <textarea className="col-span-1 sm:col-span-2 p-2 border rounded" rows={3} value={form.internal_notes || ""} onChange={(e) => setForm({ ...form, internal_notes: e.target.value })} placeholder="Internal notes" />
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Service History</h4>
            <div>
              <button className="px-3 py-1 rounded bg-blue-50 text-blue-700" onClick={() => setAdding(!adding)}>{adding ? 'Cancel' : 'Add Service'}</button>
            </div>
          </div>

          {adding && (
            <div className="p-3 border rounded mb-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select value={newEntry.service_id} onChange={(e) => setNewEntry({ ...newEntry, service_id: e.target.value })} className="p-2 border rounded">
                  <option value="">Select service</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <input type="date" value={newEntry.appointment_date} onChange={(e) => setNewEntry({ ...newEntry, appointment_date: e.target.value })} className="p-2 border rounded" />
                <input type="time" value={newEntry.start_time} onChange={(e) => setNewEntry({ ...newEntry, start_time: e.target.value })} className="p-2 border rounded" />
                <input type="time" value={newEntry.end_time} onChange={(e) => setNewEntry({ ...newEntry, end_time: e.target.value })} className="p-2 border rounded" />
                <select value={String(newEntry.review_rating)} onChange={(e) => setNewEntry({ ...newEntry, review_rating: Number(e.target.value) })} className="p-2 border rounded">
                  <option value="0">No review</option>
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} star</option>)}
                </select>
                <input placeholder="Review text" value={newEntry.review_text} onChange={(e) => setNewEntry({ ...newEntry, review_text: e.target.value })} className="p-2 border rounded" />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  className="px-3 py-1 rounded bg-brand-green text-white disabled:opacity-50"
                  onClick={addServiceRecord}
                  disabled={loading || !newEntry.service_id || !newEntry.appointment_date}
                >
                  {loading ? 'Adding…' : 'Add'}
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2 max-h-64 overflow-auto">
            {history.length ? history.map(h => (
              <div key={h.id} className="p-2 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{h.services?.name || 'Service'}</div>
                    <div className="text-xs text-slate-500">{h.appointment_date} • {h.start_time.substring(0,5)} - {h.end_time.substring(0,5)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{h.review_rating ? `${h.review_rating}★` : ''}</div>
                    <div className="text-xs text-slate-500">{h.review_text}</div>
                  </div>
                </div>
              </div>
            )) : <div className="text-sm text-slate-500">No service records.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
