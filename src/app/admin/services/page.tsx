"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Service = Database["public"]["Tables"]["services"]["Row"];

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration_minutes: 60,
    price: "",
    is_active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        description: service.description || "",
        duration_minutes: service.duration_minutes,
        price: service.price !== null ? String(service.price) : "",
        is_active: service.is_active,
      });
    } else {
      setEditingService(null);
      setFormData({
        name: "",
        description: "",
        duration_minutes: 60,
        price: "",
        is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        name: formData.name,
        description: formData.description || null,
        duration_minutes: Number(formData.duration_minutes),
        price: formData.price ? Number(formData.price) : null,
        is_active: formData.is_active,
      };

      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update(payload)
          .eq("id", editingService.id);
        if (error) throw error;
        toast.success("Service updated successfully");
      } else {
        const { error } = await supabase
          .from("services")
          .insert(payload);
        if (error) throw error;
        toast.success("Service added successfully");
      }
      
      await fetchServices();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Failed to save service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("services")
        .update({ is_active: !currentStatus })
        .eq("id", id);
        
      if (error) throw error;
      
      setServices(services.map(s => s.id === id ? { ...s, is_active: !currentStatus } : s));
      toast.success(currentStatus ? "Service deactivated" : "Service activated");
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Manrope'] text-3xl font-bold text-slate-900 tracking-tight">Services</h1>
          <p className="font-['Work_Sans'] text-slate-500 mt-1">Manage the septic services you offer to customers.</p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="bg-brand-green text-white px-5 py-2.5 rounded-xl font-['Work_Sans'] font-semibold hover:bg-brand-green-dark transition-all active:scale-95 shadow-[0_4px_14px_rgba(14,118,59,0.25)] flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add New Service
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
          </div>
        ) : services.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Work_Sans'] text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-4">Service Name</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-[15px]">{service.name}</div>
                      {service.description && (
                        <div className="text-slate-500 text-xs mt-1 line-clamp-1">{service.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {service.duration_minutes} mins
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {service.price ? `$${service.price}` : 'Custom'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => toggleActive(service.id, service.is_active)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest transition-colors ${
                          service.is_active 
                            ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200' 
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title={service.is_active ? "Click to deactivate" : "Click to activate"}
                      >
                        <span className="w-2 h-2 rounded-full bg-current"></span>
                        {service.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenModal(service)}
                        className="text-slate-400 hover:text-brand-green transition-colors p-2 rounded-lg hover:bg-brand-green/10"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
              <span className="material-symbols-outlined text-slate-300 text-[32px]">home_repair_service</span>
            </div>
            <p className="text-slate-500 font-['Work_Sans'] font-medium text-lg">No services added yet.</p>
            <p className="text-slate-400 font-['Work_Sans'] text-sm mt-1">Create your first service to start accepting bookings.</p>
          </div>
        )}
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="font-['Manrope'] text-xl font-bold text-slate-900">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-700 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Service Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                  placeholder="e.g. Septic Pumping"
                />
              </div>
              
              <div className="space-y-2">
                <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all min-h-[100px] resize-y"
                  placeholder="Brief description of the service..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Duration (mins) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({...formData, duration_minutes: Number(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="font-['Work_Sans'] font-semibold text-sm text-slate-700 block">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-['Work_Sans'] text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                    placeholder="Leave blank if custom"
                  />
                </div>
              </div>
              
              <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="w-5 h-5 rounded border-slate-300 text-brand-green focus:ring-brand-green"
                />
                <div>
                  <div className="font-['Work_Sans'] font-semibold text-sm text-slate-900">Active Service</div>
                  <div className="font-['Work_Sans'] text-xs text-slate-500">Visible on public booking page</div>
                </div>
              </label>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl font-['Work_Sans'] font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-green text-white px-6 py-2.5 rounded-xl font-['Work_Sans'] font-semibold hover:bg-brand-green-dark transition-all active:scale-95 shadow-[0_4px_14px_rgba(14,118,59,0.25)] flex items-center justify-center min-w-[120px]"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
