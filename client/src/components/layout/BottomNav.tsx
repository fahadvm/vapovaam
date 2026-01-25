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
    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-white/10 px-6 py-4 pb-6 z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={clsx(
                "flex flex-col items-center gap-1 transition-colors duration-200",
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
