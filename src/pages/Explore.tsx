import React, { useState } from 'react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { BottomNav } from '../components/layout/BottomNav';
import { Search, SlidersHorizontal, Mountain, Coffee, Users, Heart, Landmark, Utensils, X } from 'lucide-react';
import { packages } from '../data/packages';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const MOODS = [
  { id: 'adventure', label: 'Adventure', icon: Mountain, color: 'bg-orange-500' },
  { id: 'relax', label: 'Relax', icon: Coffee, color: 'bg-blue-500' },
  { id: 'family', label: 'Family', icon: Users, color: 'bg-green-500' },
  { id: 'honeymoon', label: 'Honeymoon', icon: Heart, color: 'bg-pink-500' },
  { id: 'culture', label: 'Culture', icon: Landmark, color: 'bg-purple-500' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'bg-yellow-500' },
];

export const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [budget, setBudget] = useState(2000);

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMood = selectedMood ? pkg.tags.some(tag => tag.toLowerCase() === selectedMood.toLowerCase()) || true : true; // Mock mood matching for now
    const matchesBudget = pkg.price <= budget;
    
    return matchesSearch && matchesMood && matchesBudget;
  });

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

      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar p-4">
        {/* Moods Grid */}
        {!searchQuery && !selectedMood && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-white mb-4">Discover by Mood</h2>
            <div className="grid grid-cols-3 gap-3">
              {MOODS.map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className="aspect-square rounded-2xl bg-zinc-800 border border-white/5 flex flex-col items-center justify-center gap-2 hover:bg-zinc-700 transition-colors group"
                  >
                    <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110", mood.color)}>
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-medium text-zinc-300">{mood.label}</span>
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
            <h2 className="text-xl font-bold text-white capitalize">{selectedMood} Trips</h2>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-4">
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
