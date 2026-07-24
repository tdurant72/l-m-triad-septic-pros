"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { Loader2 } from "lucide-react";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { toast } from "sonner";
import CustomerDetails from '@/components/admin/CustomerDetails';

type Customer = Database["public"]["Tables"]["customers"]["Row"];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchCustomers = async (p = page, size = pageSize, q = query) => {
    setLoading(true);
    try {
      const from = (p - 1) * size;
      const to = from + size - 1;
      let builder = supabase.from("customers").select("*", { count: 'exact' });
      if (q && q.trim()) {
        const like = `%${q.trim()}%`;
        builder = builder.or(`full_name.ilike.${like},email.ilike.${like},phone.ilike.${like}`);
      }
      const { data, error, count } = await builder.order("created_at", { ascending: false }).range(from, to);
      if (error) throw error;
      setCustomers((data as any) || []);
      setTotal(count ?? 0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  };

  // Debounce search and refetch when page/pageSize/query change
  useEffect(() => {
    const id = setTimeout(() => fetchCustomers(page, pageSize, query), 250);
    return () => clearTimeout(id);
  }, [page, pageSize, query]);

  const deleteCustomer = async (id: string) => {
    if (!confirm("Delete this customer?")) return;
    try {
      const { error } = await supabase.from("customers").delete().eq("id", id);
      if (error) throw error;
      setCustomers(customers.filter((c) => c.id !== id));
      toast.success("Customer deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete customer.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Manrope'] text-3xl font-bold text-slate-900 tracking-tight">Customers</h1>
          <p className="font-['Work_Sans'] text-slate-500 mt-1">List of customers in your Supabase project.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <input
              placeholder="Search customers..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              className="px-3 py-2 border rounded w-64"
            />
            <div className="text-sm text-slate-500">{total} results</div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-500">Per page</label>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="p-1 border rounded">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div className="p-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
          </div>
        ) : customers.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Work_Sans'] text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-[15px]">{c.full_name || '—'}</div>
                      <div className="text-slate-500 text-xs mt-1">{c.created_at ? new Date(c.created_at).toLocaleString() : ''}</div>
                    </td>
                    <td className="px-6 py-4">{c.email}</td>
                    <td className="px-6 py-4">{c.phone || '—'}</td>
                    <td className="px-6 py-4">{c.address || '—'}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelected(c)}
                          title="Edit"
                          aria-label="Edit customer"
                          className="p-2 rounded bg-slate-100 text-slate-700 hover:bg-slate-200"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          onClick={() => deleteCustomer(c.id)}
                          title="Delete"
                          aria-label="Delete customer"
                          className="p-2 rounded bg-rose-100 text-rose-700 hover:bg-rose-200"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 font-['Work_Sans']">No customers found.</div>
        )}
        <div className="p-3 border-t flex items-center justify-between">
          <div className="text-sm text-slate-500">Page {page} of {Math.max(1, Math.ceil(total / pageSize))}</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded border" onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1}>Prev</button>
            <button className="px-3 py-1 rounded border" onClick={() => setPage(Math.min(Math.max(1, Math.ceil(total / pageSize)), page + 1))} disabled={page >= Math.ceil(total / pageSize)}>Next</button>
          </div>
        </div>
      </div>
      {selected && (
        <CustomerDetails customer={selected} onClose={() => setSelected(null)} onSaved={() => { setSelected(null); fetchCustomers(); }} />
      )}
    </div>
  );
}
