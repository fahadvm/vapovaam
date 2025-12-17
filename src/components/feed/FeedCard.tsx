import React, { useState } from 'react';
import { Heart, Share2, Bookmark, Clock, Star } from 'lucide-react';
import type  { Package } from '../../types/package';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

interface FeedCardProps {
  pkg: Package;
}

export const FeedCard: React.FC<FeedCardProps> = ({ pkg }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = pkg.images || [pkg.image];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setCurrentImageIndex(index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="w-full mb-8 relative group"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
            <img src={pkg.image} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white leading-none">{pkg.destination.split(',')[0]}</span>
            <span className="text-xs text-zinc-400">Sponsored • Travel Deals</span>
          </div>
        </div>
        <button className="text-zinc-400 hover:text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>

      {/* Main Visual Carousel */}
      <div className="relative w-full aspect-[4/5] bg-zinc-800 overflow-hidden">
        <div 
          className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
          onScroll={handleScroll}
        >
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="w-full h-full flex-shrink-0 snap-center relative cursor-pointer"
              onClick={() => navigate(`/package/${pkg.id}`)}
            >
              <img 
                src={img} 
                alt={`${pkg.title} ${idx + 1}`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <div 
                key={idx}
                className={clsx(
                  "w-1.5 h-1.5 rounded-full transition-colors shadow-sm",
                  currentImageIndex === idx ? "bg-white" : "bg-white/40"
                )}
              />
            ))}
          </div>
        )}

        {/* Price Tag Badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1 z-10">
          <span className="text-xs font-medium text-zinc-300">from</span>
          <span className="text-sm font-bold text-white">${pkg.price}</span>
        </div>

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
           <h2 className="text-2xl font-bold text-white mb-1">{pkg.title}</h2>
           <div className="flex items-center gap-4 text-sm text-zinc-200 mb-3">
             <div className="flex items-center gap-1">
               <Clock size={14} />
               <span>{pkg.duration}</span>
             </div>
             <div className="flex items-center gap-1">
               <Star size={14} className="fill-yellow-400 text-yellow-400" />
               <span>{pkg.rating}</span>
             </div>
           </div>
           
           {/* Mini CTA */}
           <button 
             onClick={(e) => {
               e.stopPropagation();
               navigate(`/package/${pkg.id}`);
             }}
             className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors active:scale-[0.98] pointer-events-auto"
           >
             View Trip Details
           </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="group flex items-center gap-1.5">
            <Heart size={24} className="text-white group-hover:text-red-500 transition-colors" />
          </button>
          <button className="group flex items-center gap-1.5">
            <div className="rotate-[-25deg] -mt-1">
                <Share2 size={24} className="text-white group-hover:text-blue-400 transition-colors" />
            </div>
          </button>
        </div>
        <button>
          <Bookmark size={24} className="text-white hover:text-yellow-400 transition-colors" />
        </button>
      </div>

      {/* Description & Tags */}
      <div className="px-4 pb-2">
        <p className="text-sm text-zinc-300 line-clamp-2">
          <span className="font-bold text-white mr-2">{pkg.destination.split(',')[0]}</span>
          {pkg.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {pkg.tags.map(tag => (
            <span key={tag} className="text-xs text-blue-400">#{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
