import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, MapPin, ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';

const NAV_ITEMS = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/admin/categories', label: 'Categories', icon: FolderKanban },
    { path: '/admin/trips', label: 'Trips', icon: MapPin },
];

export const AdminLayout: React.FC = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Admin Panel
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.exact
                            ? location.pathname === item.path
                            : location.pathname.startsWith(item.path);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                    isActive
                                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                )}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium">Back to App</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};
