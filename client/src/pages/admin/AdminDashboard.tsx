import React, { useEffect, useState } from 'react';
import { FolderKanban, MapPin, Loader2 } from 'lucide-react';
import { tripApi } from '../../api/tripApi';
import { categoryApi } from '../../api/categoryApi';

export const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({ trips: 0, categories: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [trips, categories] = await Promise.all([
                    tripApi.getAll(),
                    categoryApi.getAll(),
                ]);
                setStats({ trips: trips.length, categories: categories.length });
            } catch (error) {
                console.error('Failed to fetch stats', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Categories Card */}
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center">
                            <FolderKanban className="text-purple-400" size={28} />
                        </div>
                        <div>
                            <p className="text-zinc-400 text-sm">Total Categories</p>
                            <p className="text-3xl font-bold text-white">{stats.categories}</p>
                        </div>
                    </div>
                </div>

                {/* Trips Card */}
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <MapPin className="text-blue-400" size={28} />
                        </div>
                        <div>
                            <p className="text-zinc-400 text-sm">Total Trips</p>
                            <p className="text-3xl font-bold text-white">{stats.trips}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                        href="/admin/categories"
                        className="bg-zinc-800 hover:bg-zinc-700 border border-white/5 rounded-xl p-6 transition-colors"
                    >
                        <FolderKanban className="text-purple-400 mb-3" size={24} />
                        <h3 className="font-bold text-white mb-1">Manage Categories</h3>
                        <p className="text-sm text-zinc-400">Add, edit, or delete trip categories</p>
                    </a>
                    <a
                        href="/admin/trips"
                        className="bg-zinc-800 hover:bg-zinc-700 border border-white/5 rounded-xl p-6 transition-colors"
                    >
                        <MapPin className="text-blue-400 mb-3" size={24} />
                        <h3 className="font-bold text-white mb-1">Manage Trips</h3>
                        <p className="text-sm text-zinc-400">Add, edit, or delete trip packages</p>
                    </a>
                </div>
            </div>
        </div>
    );
};
