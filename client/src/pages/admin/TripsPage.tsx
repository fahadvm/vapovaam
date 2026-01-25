import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Plus, Trash2, Loader2 } from "lucide-react";
import { tripApi, type Trip } from '../../api/tripApi';
import { categoryApi, type Category } from '../../api/categoryApi';

export const TripsPage: React.FC = () => {
    const navigate = useNavigate();
    const [trips, setTrips] = useState<Trip[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [tripsData, categoriesData] = await Promise.all([
                tripApi.getAll(),
                categoryApi.getAll(),
            ]);
            setTrips(tripsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this trip?')) return;

        try {
            await tripApi.delete(id);
            await fetchData();
        } catch (error) {
            console.error('Failed to delete trip', error);
        }
    };

    const handleEdit = (trip: Trip) => {
        // TODO: Implement Edit Trip functionality
        console.log('Edit trip', trip);
        alert("Edit functionality to be implemented. Please use Create Trip for now.");
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Trips</h1>
                <button
                    onClick={() => navigate('/admin/create')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
                >
                    <Plus size={20} />
                    Add Trip
                </button>
            </div>

            <div className="bg-zinc-800 border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-zinc-900">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Trip</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Destination</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Price</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Category</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-zinc-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {trips.map((trip) => (
                            <tr key={trip.id} className="hover:bg-zinc-700/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={trip.image} alt={trip.title} className="w-12 h-12 rounded-lg object-cover" />
                                        <div>
                                            <p className="font-medium text-white">{trip.title}</p>
                                            <p className="text-xs text-zinc-400">{trip.code}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-zinc-300">{trip.destination}</td>
                                <td className="px-6 py-4 text-zinc-300">${trip.price}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded">
                                        {categories.find(c => c.id === trip.categoryId)?.name || trip.categoryId}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(trip)}
                                            className="w-9 h-9 rounded-lg bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(trip.id)}
                                            className="w-9 h-9 rounded-lg bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {trips.length === 0 && (
                    <div className="text-center py-12 text-zinc-500">
                        No trips found. Add your first trip!
                    </div>
                )}
            </div>
        </div>
    );
};
