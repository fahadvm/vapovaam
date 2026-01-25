import React, { useState, useEffect } from 'react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { BottomNav } from '../components/layout/BottomNav';
import { Search, SlidersHorizontal, Mountain, Coffee, Users, Heart, Landmark, Utensils, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { tripApi } from '../api/tripApi';
import type { Trip } from '../api/tripApi';
import type { Category } from '../api/categoryApi';

import { categoryApi } from '../api/categoryApi';

// Icon mapping for dynamic categories
const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Mountain,
  Coffee,
  Users,
  Heart,
  Landmark,
  Utensils,
};

export const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [budget, setBudget] = useState(5000);

  const [trips, setTrips] = useState<Trip[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tripsData, categoriesData] = await Promise.all([
          tripApi.getAll(),
          categoryApi.getAll(),
        ]);
        setTrips(tripsData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPackages = trips.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMood = selectedMood ? pkg.categoryId === selectedMood : true;
    const matchesBudget = pkg.price <= budget;

    return matchesSearch && matchesMood && matchesBudget;
  });

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
        <BottomNav activeTab="explore" />
      </MobileLayout>
    );
  }

  if (error) {
    return (
      <MobileLayout>
        <div className="flex-1 flex items-center justify-center text-red-400">
          {error}
        </div>
        <BottomNav activeTab="explore" />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      {/* Search Header */}
      <div className="p-4 sticky top-0 bg-zinc-900/95 backdrop-blur-md z-20 border-b border-white/5">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Where to next?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-zinc-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={clsx(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              showFilters ? "bg-blue-500 text-white" : "bg-zinc-800 text-zinc-400 hover:text-white"
            )}
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Max Budget</span>
                    <span className="text-white font-bold">${budget}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 lg:pb-8 no-scrollbar p-4">
        {/* Moods Grid - Dynamic Categories */}
        {!searchQuery && !selectedMood && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-white mb-4">Discover by Mood</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {categories.map((category) => {
                const IconComponent = ICON_MAP[category.icon] || Mountain;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedMood(category.id)}
                    className="aspect-square rounded-2xl bg-zinc-800 border border-white/5 flex flex-col items-center justify-center gap-2 hover:bg-zinc-700 transition-colors group"
                  >
                    <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110", category.color)}>
                      <IconComponent size={20} />
                    </div>
                    <span className="text-xs font-medium text-zinc-300">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Mood Header */}
        {selectedMood && (
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setSelectedMood(null)}
              className="text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-white capitalize">
              {categories.find(c => c.id === selectedMood)?.name || selectedMood} Trips
            </h2>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => navigate(`/package/${pkg.id}`)}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-800 cursor-pointer group"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="text-xs font-bold text-blue-400 mb-1">{pkg.destination.split(',')[0]}</div>
                <h3 className="text-sm font-bold text-white leading-tight mb-1">{pkg.title}</h3>
                <div className="text-xs text-zinc-300">${pkg.price}</div>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            No trips found matching your criteria.
          </div>
        )}
      </div>

      <BottomNav activeTab="explore" />
    </MobileLayout>
  );
};
