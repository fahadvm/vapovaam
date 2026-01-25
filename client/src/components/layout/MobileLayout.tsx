import React from 'react';
import { clsx } from 'clsx';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, className }) => {

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">
      {/* Desktop Sidebar - Only visible on large screens */}


      {/* Main Content - Mobile Optimized, Centered on Desktop */}
      <div className="flex-1 flex justify-center">
        <div className={clsx("w-full max-w-md lg:max-w-full bg-zinc-900 h-screen relative flex flex-col shadow-2xl overflow-hidden lg:border-x lg:border-white/5", className)}>
          {children}
        </div>
      </div>

      {/* Desktop Right Sidebar - Only visible on XL screens */}

    </div>
  );
};
