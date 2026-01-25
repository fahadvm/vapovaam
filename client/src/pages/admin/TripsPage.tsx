import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Save, ChevronDown } from 'lucide-react';
import { tripApi, Trip, CreateTripData } from '../../api/tripApi';
import { categoryApi, Category } from '../../api/categoryApi';
import { clsx } from 'clsx';

const initialFormData: CreateTripData = {
    title: '',
    destination: '',
    duration: '',
    price: 0,
    image: '',
    images: [],
    rating: 4.5,
    description: '',
    code: '',
    isStory: false,
    tags: [],
    categoryId: '',
    highlights: [],
    bestTime: '',
    inclusions: '',
    itinerary: [],
    stay: { name: '', image: '', rating: '', amenities: '' },
};

export const TripsPage: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
    const [formData, setFormData] = useState<CreateTripData>(initialFormData);
    const [saving, setSaving] = useState(false);
    const [tagsInput, setTagsInput] = useState('');
    const [highlightsInput, setHighlightsInput] = useState('');

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

    const openModal = (trip?: Trip) => {
        if (trip) {
            setEditingTrip(trip);
            setFormData({
                title: trip.title,
                destination: trip.destination,
                duration: trip.duration,
                price: trip.price,
                image: trip.image,
                images: trip.images,
                rating: trip.rating,
                description: trip.description,
                code: trip.code,
                isStory: trip.isStory,
                tags: trip.tags,
                categoryId: trip.categoryId,
                highlights: trip.highlights,
                bestTime: trip.bestTime,
                inclusions: trip.inclusions,
                itinerary: trip.itinerary,
                stay: trip.stay,
            });
            setTagsInput(trip.tags.join(', '));
            setHighlightsInput(trip.highlights.join('\n'));
        } else {
            setEditingTrip(null);
            setFormData(initialFormData);
            setTagsInput('');
            setHighlightsInput('');
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingTrip(null);
        setFormData(initialFormData);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const dataToSubmit = {
            ...formData,
            tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
            highlights: highlightsInput.split('\n').map(h => h.trim()).filter(Boolean),
        };

        try {
            if (editingTrip) {
                await tripApi.update(editingTrip.id, dataToSubmit);
            } else {
                await tripApi.create(dataToSubmit);
            }
            await fetchData();
            closeModal();
        } catch (error) {
            console.error('Failed to save trip', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this trip?')) return;

        try {
            await tripApi.delete(id);
            await fetchData();
        } catch (error) {
            console.error('Failed to delete trip', error);
        }
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
                    onClick={() => openModal()}
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
                                            onClick={() => openModal(trip)}
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl my-8">
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h2 className="text-xl font-bold">
                                {editingTrip ? 'Edit Trip' : 'Add Trip'}
                            </h2>
                            <button onClick={closeModal} className="text-zinc-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Trip title"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">Destination</label>
                                    <input
                                        type="text"
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                        className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="City, Country"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">Duration</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g. 7 Days"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">Price ($)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="1499"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">Code</label>
                                    <input
                                        type="text"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                        className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="VAP-XXX-001"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Category</label>
                                <div className="relative">
                                    <select
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={20} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Image URL</label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Trip description..."
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">Best Time</label>
                                    <input
                                        type="text"
                                        value={formData.bestTime}
                                        onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                                        className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g. Oct - Mar"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">Inclusions</label>
                                    <input
                                        type="text"
                                        value={formData.inclusions}
                                        onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
                                        className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g. Flight + Hotel"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={tagsInput}
                                    onChange={(e) => setTagsInput(e.target.value)}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="City, Culture, Food"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Highlights (one per line)</label>
                                <textarea
                                    value={highlightsInput}
                                    onChange={(e) => setHighlightsInput(e.target.value)}
                                    rows={3}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Visit ancient temples&#10;Experience local cuisine&#10;..."
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isStory"
                                    checked={formData.isStory}
                                    onChange={(e) => setFormData({ ...formData, isStory: e.target.checked })}
                                    className="w-5 h-5 rounded bg-zinc-800 border-white/10 text-blue-500 focus:ring-blue-500"
                                />
                                <label htmlFor="isStory" className="text-zinc-300">Show in Stories</label>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-white/5">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
