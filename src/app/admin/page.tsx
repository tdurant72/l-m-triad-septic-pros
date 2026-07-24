"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { format, isToday, isFuture } from "date-fns";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    upcoming: 0,
    pending: 0,
    completed: 0,
    activeServices: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchOverview() {
      try {
        const { data: services } = await supabase
          .from("services")
          .select("id")
          .eq("is_active", true);

        const { data: appointments } = await supabase
          .from("appointments")
          .select("*")
          .order("appointment_date", { ascending: true })
          .order("start_time", { ascending: true });

        if (appointments) {
          const now = new Date();
          let upcoming = 0;
          let pending = 0;
          let completed = 0;

          appointments.forEach(app => {
            if (app.status === "completed") completed++;
            if (app.status === "pending") pending++;
            
            const appDate = new Date(app.appointment_date + "T" + app.start_time);
            if ((isFuture(appDate) || isToday(appDate)) && app.status !== 'cancelled' && app.status !== 'completed') {
              upcoming++;
            }
          });

          setStats({
            upcoming,
            pending,
            completed,
            activeServices: services?.length || 0,
          });

          // Get next 5 upcoming appointments
          const upcomingList = appointments
            .filter(app => {
              const appDate = new Date(app.appointment_date + "T" + app.start_time);
              return (isFuture(appDate) || isToday(appDate)) && app.status !== 'cancelled' && app.status !== 'completed';
            })
            .slice(0, 5);
          
          setRecentAppointments(upcomingList);
        }
      } catch (error) {
        console.error("Error fetching overview data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOverview();
  }, []);

  const statCards = [
    { label: "Upcoming Appointments", value: stats.upcoming, icon: "event_upcoming", color: "bg-blue-50 text-blue-600 border-blue-100" },
    { label: "Pending Requests", value: stats.pending, icon: "pending_actions", color: "bg-amber-50 text-amber-600 border-amber-100" },
    { label: "Completed Jobs", value: stats.completed, icon: "task_alt", color: "bg-green-50 text-brand-green border-green-100" },
    { label: "Active Services", value: stats.activeServices, icon: "home_repair_service", color: "bg-purple-50 text-purple-600 border-purple-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Manrope'] text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="font-['Work_Sans'] text-slate-500 mt-1">Welcome back. Here's what's happening with your business.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 h-32 animate-pulse flex flex-col justify-between">
              <div className="w-10 h-10 bg-slate-100 rounded-full"></div>
              <div className="h-6 bg-slate-100 rounded w-16 mt-2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${stat.color}`}>
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
              </div>
              <p className="font-['Work_Sans'] text-slate-500 font-medium text-sm">{stat.label}</p>
              <h3 className="font-['Manrope'] text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-['Manrope'] text-xl font-bold text-slate-900">Upcoming Schedule</h2>
        </div>
        <div className="p-0">
          {loading ? (
            <div className="p-8 text-center text-slate-500 font-['Work_Sans']">Loading schedule...</div>
          ) : recentAppointments.length > 0 ? (
            <table className="w-full text-left font-['Work_Sans'] text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAppointments.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{app.full_name}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{app.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900 font-medium">{format(new Date(app.appointment_date), "MMM d, yyyy")}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{app.start_time.substring(0, 5)} - {app.end_time.substring(0, 5)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        app.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        app.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                <span className="material-symbols-outlined text-slate-300 text-[32px]">event_busy</span>
              </div>
              <p className="text-slate-500 font-['Work_Sans'] font-medium">No upcoming appointments found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
