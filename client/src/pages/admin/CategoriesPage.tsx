import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Save } from 'lucide-react';
import { categoryApi, Category, CreateCategoryData } from '../../api/categoryApi';
import { clsx } from 'clsx';

const ICON_OPTIONS = ['Mountain', 'Coffee', 'Users', 'Heart', 'Landmark', 'Utensils'];
const COLOR_OPTIONS = [
    'bg-orange-500', 'bg-blue-500', 'bg-green-500',
    'bg-pink-500', 'bg-purple-500', 'bg-yellow-500',
    'bg-red-500', 'bg-teal-500', 'bg-indigo-500'
];

export const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState<CreateCategoryData>({ name: '', icon: 'Mountain', color: 'bg-blue-500' });
    const [saving, setSaving] = useState(false);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await categoryApi.getAll();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const openModal = (category?: Category) => {
        if (category) {
            setEditingCategory(category);
            setFormData({ name: category.name, icon: category.icon, color: category.color });
        } else {
            setEditingCategory(null);
            setFormData({ name: '', icon: 'Mountain', color: 'bg-blue-500' });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCategory(null);
        setFormData({ name: '', icon: 'Mountain', color: 'bg-blue-500' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (editingCategory) {
                await categoryApi.update(editingCategory.id, formData);
            } else {
                await categoryApi.create(formData);
            }
            await fetchCategories();
            closeModal();
        } catch (error) {
            console.error('Failed to save category', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            await categoryApi.delete(id);
            await fetchCategories();
        } catch (error) {
            console.error('Failed to delete category', error);
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
                <h1 className="text-3xl font-bold">Categories</h1>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
                >
                    <Plus size={20} />
                    Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-zinc-800 border border-white/5 rounded-xl p-6 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center text-white", category.color)}>
                                <span className="text-lg font-bold">{category.name.charAt(0)}</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white">{category.name}</h3>
                                <p className="text-sm text-zinc-400">Icon: {category.icon}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => openModal(category)}
                                className="w-9 h-9 rounded-lg bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                            >
                                <Pencil size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(category.id)}
                                className="w-9 h-9 rounded-lg bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-12 text-zinc-500">
                    No categories found. Add your first category!
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-md">
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h2 className="text-xl font-bold">
                                {editingCategory ? 'Edit Category' : 'Add Category'}
                            </h2>
                            <button onClick={closeModal} className="text-zinc-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Category name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Icon</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {ICON_OPTIONS.map((icon) => (
                                        <button
                                            key={icon}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, icon })}
                                            className={clsx(
                                                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                                formData.icon === icon
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                            )}
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Color</label>
                                <div className="flex flex-wrap gap-2">
                                    {COLOR_OPTIONS.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, color })}
                                            className={clsx(
                                                "w-10 h-10 rounded-lg transition-transform",
                                                color,
                                                formData.color === color && "ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
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
