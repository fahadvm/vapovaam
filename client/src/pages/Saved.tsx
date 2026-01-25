import React from 'react';
import { MobileLayout } from '../components/layout/MobileLayout';
import { BottomNav } from '../components/layout/BottomNav';
import { packages } from '../data/packages';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const Saved: React.FC = () => {
  const navigate = useNavigate();
  // Mock saved packages (first 2)
  const savedPackages = packages.slice(0, 2);

  return (
    <MobileLayout>
      <div className="p-4 sticky top-0 bg-zinc-900/95 backdrop-blur-md z-20 border-b border-white/5 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Saved Trips</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar p-4">
        <div className="grid grid-cols-1 gap-4">
          {savedPackages.map((pkg) => (
            <div 
              key={pkg.id}
              onClick={() => navigate(`/package/${pkg.id}`)}
              className="flex gap-4 bg-zinc-800 rounded-xl overflow-hidden p-2 cursor-pointer hover:bg-zinc-700/50 transition-colors"
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-xs text-blue-400 font-bold mb-1">{pkg.destination.split(',')[0]}</div>
                <h3 className="text-base font-bold text-white leading-tight mb-1">{pkg.title}</h3>
                <div className="text-sm text-zinc-400">${pkg.price} • {pkg.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav activeTab="saved" />
    </MobileLayout>
  );
};
