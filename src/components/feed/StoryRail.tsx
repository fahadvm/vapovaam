import React from 'react';
import { packages } from '../../data/packages';

export const StoryRail: React.FC = () => {
  const storyPackages = packages.filter(p => p.isStory);

  return (
    <div className="w-[100vw] overflow-x-auto no-scrollbar py-4 pl-4">
      <div className="flex gap-4">
        {/* My Story / Add Story Placeholder */}
        <div className="flex flex-col items-center gap-2 min-w-[72px]">
          <div className="w-[72px] h-[72px] rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center relative overflow-hidden">
             <span className="text-2xl">✈️</span>
             <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-zinc-900 text-white text-xs font-bold">+</div>
          </div>
          <span className="text-xs text-zinc-400 font-medium">My Trip</span>
        </div>

        {storyPackages.map((pkg) => (
          <div key={pkg.id} className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group">
            <div className="w-[72px] h-[72px] rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600">
              <div className="w-full h-full rounded-full border-2 border-black overflow-hidden relative">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <span className="text-xs text-white font-medium truncate w-16 text-center">
              {pkg.destination.split(',')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
