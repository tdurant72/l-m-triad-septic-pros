import AdminAuthProvider from '@/components/admin/AdminAuthProvider';
import Link from 'next/link';

export const metadata = {
	title: 'Admin — L&M Septic',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<AdminAuthProvider>
			<div className="min-h-screen bg-slate-50">
				<div className="max-w-7xl mx-auto py-8 px-4">
					<div className="flex gap-8">
						<aside className="w-64 bg-white rounded-2xl border border-slate-200 p-4 h-[calc(100vh-64px)] sticky top-8">
							<div className="mb-6">
								<h2 className="font-['Manrope'] text-lg font-bold">Admin Panel</h2>
								<p className="text-slate-500 text-sm">Manage site content and settings</p>
							</div>
							<nav className="space-y-1">
								<Link href="/admin" className="block px-3 py-2 rounded-md hover:bg-slate-50">Overview</Link>
								<Link href="/admin/appointments" className="block px-3 py-2 rounded-md hover:bg-slate-50">Appointments</Link>
								<Link href="/admin/services" className="block px-3 py-2 rounded-md hover:bg-slate-50">Services</Link>
								<Link href="/admin/customers" className="block px-3 py-2 rounded-md hover:bg-slate-50">Customers</Link>
								<Link href="/admin/blocked-dates" className="block px-3 py-2 rounded-md hover:bg-slate-50">Blocked Dates</Link>
								<Link href="/admin/business-hours" className="block px-3 py-2 rounded-md hover:bg-slate-50">Business Hours</Link>
								<Link href="/admin/settings" className="block px-3 py-2 rounded-md hover:bg-slate-50">Settings</Link>
							</nav>
						</aside>

						<main className="flex-1" style={{position: 'relative', zIndex: 10, background: 'transparent', minHeight: '200px'}}>{children}</main>
					</div>
				</div>
			</div>
		</AdminAuthProvider>
	);
}

