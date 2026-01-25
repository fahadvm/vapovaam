import React from 'react';
import { Home, Compass, Heart, User } from 'lucide-react';
import { clsx } from 'clsx';
import { useNavigate, useLocation } from 'react-router-dom';

interface BottomNavProps {
  activeTab?: 'home' | 'explore' | 'saved' | 'profile';
}

export const BottomNav: React.FC<BottomNavProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/explore') return 'explore';
    if (path === '/saved') return 'saved';
    if (path === '/profile') return 'profile';
    return 'home';
  };

  const activeTab = getActiveTab();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'explore', icon: Compass, label: 'Explore', path: '/explore' },
    { id: 'saved', icon: Heart, label: 'Saved', path: '/saved' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="absolute lg:fixed bottom-0 lg:bottom-6 left-0 right-0 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:w-auto lg:rounded-full lg:border lg:border-white/10 lg:px-8 bg-black/80 backdrop-blur-md border-t lg:border-t-white/10 border-white/10 px-6 py-4 pb-6 lg:pb-4 z-50 transition-all duration-300">
      <div className="flex justify-between items-center lg:gap-12">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={clsx(
                "flex flex-col items-center gap-1 transition-colors duration-200 hover:scale-110 active:scale-95",
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
