import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from '../components/layout/MobileLayout';
import { ArrowLeft, Share2, Heart, MapPin, Calendar, CheckCircle2, MessageCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { tripApi, Trip } from '../api/tripApi';

const TABS = ['Overview', 'Itinerary', 'Stay'];

export const PackageDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [pkg, setPkg] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrip = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const tripData = await tripApi.getById(id);
        setPkg(tripData);
      } catch (err) {
        setError('Failed to load trip details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex-1 flex items-center justify-center bg-zinc-900">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </MobileLayout>
    );
  }

  if (error || !pkg) {
    return (
      <MobileLayout>
        <div className="flex-1 flex flex-col items-center justify-center bg-zinc-900 text-white p-4">
          <p className="text-red-400 mb-4">{error || 'Package not found'}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </MobileLayout>
    );
  }

  const images = pkg.images || [pkg.image];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setCurrentImageIndex(index);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '1234567890';
    const message = `Hi Vapovaa, I'm interested in ${pkg.title} (Code: ${pkg.code}). Can you help me with booking?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <MobileLayout>
      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar relative bg-zinc-900">
        {/* Hero Image Carousel */}
        <div className="relative h-[50vh] w-full">
          <div
            className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
            onScroll={handleScroll}
          >
            {images.map((img, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative">
                <img src={img} alt={`${pkg.title} ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-zinc-900" />
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
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

          {/* Top Nav */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                <Share2 size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                <Heart size={20} />
              </button>
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-blue-500/80 backdrop-blur-sm rounded-md text-[10px] font-bold uppercase tracking-wider text-white">
                {pkg.duration}
              </span>
              <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                <span>★</span> {pkg.rating}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-1 leading-tight">{pkg.title}</h1>
            <div className="flex items-center gap-1 text-zinc-300 text-sm">
              <MapPin size={14} />
              {pkg.destination}
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="sticky top-0 z-20 bg-zinc-900/95 backdrop-blur-md border-b border-white/5">
          <div className="flex px-4">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "flex-1 py-4 text-sm font-medium relative transition-colors",
                  activeTab === tab ? "text-white" : "text-zinc-500"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Overview' && (
                <div className="space-y-6">
                  <p className="text-zinc-300 leading-relaxed">{pkg.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-800/50 p-4 rounded-xl border border-white/5">
                      <Calendar className="text-blue-400 mb-2" size={20} />
                      <div className="text-xs text-zinc-500">Best Time</div>
                      <div className="font-medium text-white">{pkg.bestTime}</div>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-xl border border-white/5">
                      <CheckCircle2 className="text-green-400 mb-2" size={20} />
                      <div className="text-xs text-zinc-500">Inclusions</div>
                      <div className="font-medium text-white">{pkg.inclusions}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-bold mb-3">Highlights</h3>
                    <ul className="space-y-2">
                      {pkg.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'Itinerary' && (
                <div className="space-y-6 relative pl-4 border-l border-zinc-800 ml-2">
                  {pkg.itinerary.map((item) => (
                    <div key={item.day} className="relative pl-6">
                      <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-zinc-700 border-2 border-zinc-900" />
                      <div className="text-xs font-bold text-blue-400 mb-1">Day {item.day}</div>
                      <h4 className="text-white font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-zinc-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Stay' && (
                <div className="space-y-4">
                  <div className="aspect-video rounded-xl bg-zinc-800 overflow-hidden relative">
                    <img src={pkg.stay.image} alt="Hotel" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="text-white font-bold">{pkg.stay.name}</div>
                      <div className="text-xs text-zinc-300">{pkg.stay.rating} • {pkg.stay.amenities}</div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400">Enjoy a comfortable stay at our handpicked premium hotels with world-class amenities.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-zinc-900 border-t border-white/10 z-30">
        <div className="flex gap-3">
          <button
            onClick={handleWhatsAppClick}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
          >
            <MessageCircle size={20} />
            WhatsApp
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};
