import React from 'react';
import { clsx } from 'clsx';
import { packages } from '../../data/packages';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, Heart, User } from 'lucide-react';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, className }) => {
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
    <div className="min-h-screen bg-black text-white flex overflow-hidden">
      {/* Desktop Sidebar - Only visible on large screens */}
      <div className="hidden lg:flex flex-col w-80 xl:w-96 bg-zinc-950 border-r border-white/5 h-screen sticky top-0 shrink-0">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent" style={{ fontFamily: 'cursive' }}>
            Vapovaa
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Discover your next adventure</p>
        </div>

        {/* Desktop Navigation */}
        <nav className="p-4 border-b border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={clsx(
                  "w-full flex items-center gap-4 p-3 rounded-xl mb-1 transition-colors",
                  isActive ? "bg-zinc-800 text-white" : "text-zinc-500 hover:bg-zinc-800/50 hover:text-white"
                )}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="flex-1 overflow-y-auto no-scrollbar p-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Trending Destinations</h3>
          <div className="space-y-3">
            {packages.slice(0, 4).map((pkg) => (
              <div 
                key={pkg.id}
                onClick={() => navigate(`/package/${pkg.id}`)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/50 cursor-pointer transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">{pkg.title}</div>
                  <div className="text-xs text-zinc-500">${pkg.price} • {pkg.duration}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-800/50 p-4 rounded-xl border border-white/5 text-center">
                <div className="text-2xl font-bold text-white">6</div>
                <div className="text-xs text-zinc-500">Packages</div>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-xl border border-white/5 text-center">
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-xs text-zinc-500">Countries</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="p-4 border-t border-white/5">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl text-center">
            <div className="text-white font-bold mb-1">Need Help Booking?</div>
            <div className="text-xs text-white/80 mb-3">Chat with us on WhatsApp</div>
            <button className="w-full bg-white text-black font-bold py-2 rounded-lg text-sm hover:bg-zinc-200 transition-colors">
              Contact Support
            </button>
          </div>
        </div> */}
      </div>
      
      {/* Main Content - Mobile Optimized, Centered on Desktop */}
      <div className="flex-1 flex justify-center">
        <div className={clsx("w-full max-w-md lg:max-w-lg xl:max-w-xl bg-zinc-900 h-screen relative flex flex-col shadow-2xl overflow-hidden lg:border-x lg:border-white/5", className)}>
          {children}
        </div>
      </div>

      {/* Desktop Right Sidebar - Only visible on XL screens */}
      <div className="hidden  flex-col w-80 bg-zinc-950 border-l border-white/5 h-screen sticky top-0 shrink-0">
        <div className="p-6">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">For You</h3>
          
          <div className="space-y-4">
            {packages.slice(2, 5).map((pkg) => (
              <div 
                key={pkg.id}
                onClick={() => navigate(`/package/${pkg.id}`)}
                className="rounded-xl overflow-hidden bg-zinc-800/50 cursor-pointer group hover:bg-zinc-800 transition-colors"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="p-3">
                  <div className="text-sm font-bold text-white mb-1 line-clamp-1">{pkg.title}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-500">{pkg.destination.split(',')[0]}</span>
                    <span className="text-xs font-bold text-blue-400">${pkg.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4">
          <div className="text-xs text-zinc-600 text-center">
            © 2025 Vapovaa • Travel with Style
          </div>
        </div>
      </div>
    </div>
  );
};
