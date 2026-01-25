import React from 'react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { BottomNav } from '../components/layout/BottomNav';
import { Settings, CreditCard, HelpCircle, LogOut, ChevronRight, MapPin } from 'lucide-react';

export const Profile: React.FC = () => {
  return (
    <MobileLayout>
      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {/* Header */}
        <div className="bg-zinc-800 p-6 pb-10 rounded-b-[2rem] relative">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-white">Profile</h1>
            <button className="text-zinc-400 hover:text-white">
              <Settings size={24} />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-zinc-900 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Alex Johnson</h2>
              <div className="text-sm text-zinc-400 flex items-center gap-1">
                <MapPin size={14} />
                San Francisco, CA
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="absolute -bottom-8 left-6 right-6 bg-zinc-700 rounded-xl p-4 flex justify-between shadow-lg">
            <div className="text-center flex-1 border-r border-white/10">
              <div className="text-lg font-bold text-white">12</div>
              <div className="text-xs text-zinc-400">Trips</div>
            </div>
            <div className="text-center flex-1 border-r border-white/10">
              <div className="text-lg font-bold text-white">48</div>
              <div className="text-xs text-zinc-400">Photos</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-lg font-bold text-white">5</div>
              <div className="text-xs text-zinc-400">Countries</div>
            </div>
          </div>
        </div>

        <div className="mt-12 px-4 space-y-2">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">Account</h3>
          
          <button className="w-full bg-zinc-800 p-4 rounded-xl flex items-center justify-between group hover:bg-zinc-700 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <CreditCard size={20} />
              </div>
              <span className="font-medium text-white">Payment Methods</span>
            </div>
            <ChevronRight size={20} className="text-zinc-500 group-hover:text-white" />
          </button>

          <button className="w-full bg-zinc-800 p-4 rounded-xl flex items-center justify-between group hover:bg-zinc-700 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <HelpCircle size={20} />
              </div>
              <span className="font-medium text-white">Help & Support</span>
            </div>
            <ChevronRight size={20} className="text-zinc-500 group-hover:text-white" />
          </button>

          <button className="w-full bg-zinc-800 p-4 rounded-xl flex items-center justify-between group hover:bg-zinc-700 transition-colors mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <LogOut size={20} />
              </div>
              <span className="font-medium text-white">Log Out</span>
            </div>
          </button>
        </div>
      </div>

      <BottomNav activeTab="profile" />
    </MobileLayout>
  );
};
