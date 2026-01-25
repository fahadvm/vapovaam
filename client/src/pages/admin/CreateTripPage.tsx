import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Plus, Trash2, Calendar, Hotel, Utensils } from 'lucide-react';
import { tripApi, type CreateTripData, type Trip } from '../../api/tripApi';
import { categoryApi, type Category } from '../../api/categoryApi';
import { clsx } from 'clsx';
import { ItineraryDay, StayInfo } from '../../api/tripApi';
import { ImageUpload } from '../../components/common/ImageUpload';

const steps = [
    { title: 'Overview', icon: Calendar },
    { title: 'Itinerary', icon: Calendar }, // Reused Calendar for simplicity, or could find a list icon
    { title: 'Details', icon: Hotel },
];

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

export const CreateTripPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<CreateTripData>(initialFormData);
    const [categories, setCategories] = useState<Category[]>([]);
    const [saving, setSaving] = useState(false);
    const [tagsInput, setTagsInput] = useState('');
    const [highlightsInput, setHighlightsInput] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryApi.getAll();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };
        fetchCategories();
    }, []);

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            navigate('/admin/trips');
        }
    };

    const handleSubmit = async () => {
        setSaving(true);
        const dataToSubmit = {
            ...formData,
            tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
            highlights: highlightsInput.split('\n').map(h => h.trim()).filter(Boolean),
        };

        try {
            await tripApi.create(dataToSubmit);
            navigate('/admin/trips');
        } catch (error) {
            console.error('Failed to create trip', error);
            alert('Failed to create trip. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleItineraryChange = (idx: number, field: keyof ItineraryDay, value: string | number) => {
        const newItinerary = [...(formData.itinerary || [])];
        if (newItinerary[idx]) {
            // @ts-ignore
            newItinerary[idx][field] = value;
            setFormData({ ...formData, itinerary: newItinerary });
        }
    };

    const addDay = () => {
        const newItinerary = [...(formData.itinerary || [])];
        newItinerary.push({ day: newItinerary.length + 1, title: '', description: '' });
        setFormData({ ...formData, itinerary: newItinerary });
    };

    const removeDay = (idx: number) => {
        const newItinerary = [...(formData.itinerary || [])];
        newItinerary.splice(idx, 1);
        // Re-index days
        const reindexedItinerary = newItinerary.map((day, i) => ({ ...day, day: i + 1 }));
        setFormData({ ...formData, itinerary: reindexedItinerary });
    };

    const handleStayChange = (field: keyof StayInfo, value: string) => {
        setFormData({
            ...formData,
            stay: { ...formData.stay!, [field]: value }
        });
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={handleBack} className="p-2 rounded-lg hover:bg-zinc-800 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </button>
                <h1 className="text-3xl font-bold">Create New Trip</h1>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-zinc-800 -z-10" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 -z-10 transition-all duration-300" style={{ width: `${((currentStep - 1) / 2) * 100}%` }} />

                {steps.map((step, idx) => {
                    const stepNum = idx + 1;
                    const isActive = stepNum <= currentStep;
                    const isCurrent = stepNum === currentStep;
                    return (
                        <div key={idx} className="flex flex-col items-center gap-2 bg-zinc-950 px-4">
                            <div className={clsx(
                                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors",
                                isActive ? "bg-blue-500 text-white" : "bg-zinc-800 text-zinc-500"
                            )}>
                                {stepNum}
                            </div>
                            <span className={clsx("text-sm font-medium", isCurrent ? "text-white" : "text-zinc-500")}>
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8 shadow-xl">
                {currentStep === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold mb-4">Trip Overview</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Neon Nights in Tokyo"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Destination</label>
                                <input
                                    type="text"
                                    value={formData.destination}
                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Tokyo, Japan"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
                                <select
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Duration</label>
                                <input
                                    type="text"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., 7 Days"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="1899"
                                />
                            </div>
                            <div className="col-span-2">
                                <ImageUpload
                                    label="Cover Image"
                                    value={formData.image}
                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Detailed overview of the trip..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Trip Code</label>
                                <input
                                    type="text"
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., VAP-JP-01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={tagsInput}
                                    onChange={(e) => setTagsInput(e.target.value)}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nature, Hiking, Food"
                                />
                            </div>
                            <div className="col-span-2 flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isStory"
                                    checked={formData.isStory}
                                    onChange={(e) => setFormData({ ...formData, isStory: e.target.checked })}
                                    className="w-5 h-5 rounded bg-zinc-800 border-white/10 text-blue-500 focus:ring-blue-500"
                                />
                                <label htmlFor="isStory" className="text-zinc-300">Feature this trip as a Story</label>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Trip Itinerary</h2>
                            <button
                                onClick={addDay}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                <Plus size={16} />
                                Add Day
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.itinerary?.map((day, idx) => (
                                <div key={idx} className="bg-zinc-800/50 border border-white/5 p-4 rounded-xl relative group">
                                    <button
                                        onClick={() => removeDay(idx)}
                                        className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <div className="grid gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="shrink-0 w-16 h-10 bg-zinc-700 rounded-lg flex items-center justify-center font-bold text-zinc-300">
                                                Day {day.day}
                                            </div>
                                            <input
                                                type="text"
                                                value={day.title}
                                                onChange={(e) => handleItineraryChange(idx, 'title', e.target.value)}
                                                className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Day Title"
                                            />
                                        </div>
                                        <textarea
                                            value={day.description}
                                            onChange={(e) => handleItineraryChange(idx, 'description', e.target.value)}
                                            rows={2}
                                            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                            placeholder="Description of activities..."
                                        />
                                    </div>
                                </div>
                            ))}
                            {formData.itinerary?.length === 0 && (
                                <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500">
                                    No days added to the itinerary yet.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold mb-4">Food & Accommodation</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                                    <Hotel size={20} className="text-blue-400" />
                                    Accommodation Details
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Hotel Name</label>
                                        <input
                                            type="text"
                                            value={formData.stay?.name}
                                            onChange={(e) => handleStayChange('name', e.target.value)}
                                            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., Grand Tokyo Hotel"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Rating</label>
                                        <input
                                            type="text"
                                            value={formData.stay?.rating}
                                            onChange={(e) => handleStayChange('rating', e.target.value)}
                                            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., 5 Star"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Amenities</label>
                                        <input
                                            type="text"
                                            value={formData.stay?.amenities}
                                            onChange={(e) => handleStayChange('amenities', e.target.value)}
                                            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., Pool, Spa, Breakfast"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <ImageUpload
                                            label="Hotel Image"
                                            value={formData.stay?.image || ''}
                                            onChange={(url) => handleStayChange('image', url)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 pt-6 border-t border-white/5">
                                <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                                    <Utensils size={20} className="text-green-400" />
                                    Additional Info
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Inclusions</label>
                                        <input
                                            type="text"
                                            value={formData.inclusions}
                                            onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
                                            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., Flights, Meals, Tours"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Highlights (one per line)</label>
                                        <textarea
                                            value={highlightsInput}
                                            onChange={(e) => setHighlightsInput(e.target.value)}
                                            rows={2}
                                            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                            placeholder="Key trip highlights..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
                    <button
                        onClick={handleBack}
                        className={clsx(
                            "px-6 py-3 font-medium rounded-xl transition-colors",
                            currentStep === 1
                                ? "bg-zinc-800 text-zinc-500 hover:text-white"
                                : "bg-zinc-800 text-white hover:bg-zinc-700"
                        )}
                    >
                        {currentStep === 1 ? 'Cancel' : 'Back'}
                    </button>

                    {currentStep < 3 ? (
                        <button
                            onClick={handleNext}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={saving}
                            className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                            Create Trip
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
