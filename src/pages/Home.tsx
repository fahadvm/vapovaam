import React from 'react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { BottomNav } from '../components/layout/BottomNav';
import { StoryRail } from '../components/feed/StoryRail';
import { FeedCard } from '../components/feed/FeedCard';
import { packages } from '../data/packages';
import { Bell, Search } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <MobileLayout>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 z-10 bg-zinc-900/90 backdrop-blur-sm sticky top-0">
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
      <div className="w-full flex-1 overflow-y-auto pb-24 no-scrollbar">
        <StoryRail />
        
        <div className="w-full h-[1px] bg-zinc-800 my-2" />
        
        <div className="flex flex-col">
          {packages.map((pkg) => (
            <FeedCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>

      <BottomNav activeTab="home" />
    </MobileLayout>
  );
};
