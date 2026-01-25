import React, { useEffect, useState } from 'react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { BottomNav } from '../components/layout/BottomNav';
import { StoryRail } from '../components/feed/StoryRail';
import { FeedCard } from '../components/feed/FeedCard';
import { Bell, Search, Loader2 } from 'lucide-react';
import { tripApi } from '../api/tripApi';
import type { Trip } from '../api/tripApi';

export const Home: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const data = await tripApi.getAll();
        setTrips(data);
      } catch (err) {
        console.error('Failed to fetch trips:', err);
        setError('Failed to load trips. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900 text-white">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <MobileLayout>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 z-10 bg-zinc-900/90 backdrop-blur-sm sticky top-0 lg:hidden">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent" style={{ fontFamily: 'cursive' }}>
          Vapovaa
        </h1>
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-zinc-300">
            <Search size={24} />
          </button>
          <button className="text-white hover:text-zinc-300 relative">
            <Bell size={24} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-zinc-900"></span>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="w-full flex-1 overflow-y-auto pb-24 lg:pb-8 no-scrollbar">
        <StoryRail trips={trips} />

        <div className="w-full h-[1px] bg-zinc-800 my-2" />

        <div className="flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 lg:p-4">
          {trips.map((pkg) => (
            //@ts-ignore
            <FeedCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>

      <BottomNav activeTab="home" />
    </MobileLayout>
  );
};
