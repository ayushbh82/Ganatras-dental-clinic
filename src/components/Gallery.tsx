/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { GALLERY } from '../data';
import { GalleryItem } from '../types';
import { Eye, X, Layers, Image as ImageIcon, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'clinic' | 'equipment' | 'consultation'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterTabs = [
    { label: 'All Images', value: 'all' as const },
    { label: 'Clinic Interiors', value: 'clinic' as const },
    { label: 'Modern Equipment', value: 'equipment' as const },
    { label: 'Consultations', value: 'consultation' as const },
  ];

  // Filtering images based on selected tab
  const filteredGallery = GALLERY.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleOpenLightbox = (imgSrc: string) => {
    const idx = GALLERY.findIndex(item => item.image === imgSrc);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    if (direction === 'prev') {
      setLightboxIndex(lightboxIndex === 0 ? GALLERY.length - 1 : lightboxIndex - 1);
    } else {
      setLightboxIndex(lightboxIndex === GALLERY.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block text-blue-600 font-sans font-bold text-sm uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Our Workspace
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0A2540] tracking-tight">
            Take an Inside Tour of <span className="text-blue-600">Our Clinic</span>
          </h2>
          <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
            Authentic look inside Ganatras Dental Care. Fully sterilization-vetted cabins, modern German dental machinery, and comfortable recovery layouts.
          </p>
        </div>

        {/* Gallery Filters */}
        <div id="gallery-category-filters" className="flex flex-wrap justify-center gap-2 mb-10 max-w-lg mx-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveCategory(tab.value)}
              className={`font-sans font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full transition-all cursor-pointer ${
                activeCategory === tab.value
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                  : 'bg-slate-50 text-slate-500 border border-slate-200/50 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div id="gallery-items-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item.image)}
              id={`gallery-item-${item.id}`}
              className="group relative cursor-pointer overflow-hidden rounded-3xl h-72 bg-slate-100 shadow-md border border-slate-100"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-104 filter group-hover:brightness-95"
                referrerPolicy="no-referrer"
              />
              
              {/* Grid Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <div className="flex items-center gap-2 text-white mb-1.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-blue-600 p-1.5 rounded-lg">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-blue-300 font-bold">
                    {item.category === 'equipment' ? 'Advanced Toolset' : item.category === 'clinic' ? 'Clinic Interior' : 'Clinical Consult'}
                  </span>
                </div>
                <h4 className="font-sans font-extrabold text-white text-base leading-snug transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Slideshow Popup */}
      {lightboxIndex !== null && (
        <div id="gallery-lightbox" className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            id="lightbox-close-trigger"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full cursor-pointer transition-colors"
            title="Close picture viewing"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[80vh] flex flex-col items-center">
            <img
              src={GALLERY[lightboxIndex].image}
              alt={GALLERY[lightboxIndex].title}
              className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
            
            {/* Title / Description */}
            <div className="mt-4 text-center max-w-xl text-white space-y-1">
              <h4 className="font-sans font-bold text-lg">{GALLERY[lightboxIndex].title}</h4>
              <p className="font-mono text-xs uppercase tracking-widest text-[#007BFF] font-bold">
                {GALLERY[lightboxIndex].category} collection
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 sm:px-12 pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('prev');
                }}
                className="pointer-events-auto bg-black/40 text-white hover:bg-black/60 p-3 rounded-full cursor-pointer transition-colors"
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('next');
                }}
                className="pointer-events-auto bg-black/40 text-white hover:bg-black/60 p-3 rounded-full cursor-pointer transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
