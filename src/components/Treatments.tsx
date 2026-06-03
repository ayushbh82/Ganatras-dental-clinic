/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TREATMENTS } from '../data';
import { Treatment } from '../types';
import { 
  Shield, 
  Activity, 
  Sparkles, 
  Crown, 
  Layers, 
  EyeOff, 
  Grid, 
  Smile, 
  Scissors, 
  Heart,
  X,
  Clock,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

interface TreatmentsProps {
  onBookTreatment: (treatmentName: string) => void;
}

// Map treatment IDs to premium Lucide icons
function getIconForId(id: string) {
  switch (id) {
    case 'implants': return <Shield className="w-6 h-6 text-blue-600" />;
    case 'rootcanal': return <Activity className="w-6 h-6 text-emerald-600" />;
    case 'whitening': return <Sparkles className="w-6 h-6 text-indigo-600" />;
    case 'makeover': return <Crown className="w-6 h-6 text-amber-600" />;
    case 'veneers': return <Layers className="w-6 h-6 text-pink-600" />;
    case 'aligners': return <EyeOff className="w-6 h-6 text-sky-600" />;
    case 'braces': return <Grid className="w-6 h-6 text-violet-600" />;
    case 'kids': return <Smile className="w-6 h-6 text-amber-500" />;
    case 'extraction': return <Scissors className="w-6 h-6 text-rose-600" />;
    case 'crowns': return <Heart className="w-6 h-6 text-teal-600" />;
    default: return <Sparkles className="w-6 h-6 text-blue-600" />;
  }
}

export default function Treatments({ onBookTreatment }: TreatmentsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Cosmetic' | 'Restorative' | 'Family'>('All');
  const [activeModalTreatment, setActiveModalTreatment] = useState<Treatment | null>(null);

  // Categorize treatments on current fly to support professional bento feel
  const getCategory = (id: string): 'Cosmetic' | 'Restorative' | 'Family' => {
    if (['whitening', 'makeover', 'veneers', 'aligners'].includes(id)) return 'Cosmetic';
    if (['implants', 'rootcanal', 'extraction', 'crowns'].includes(id)) return 'Restorative';
    return 'Family'; // braces, kids
  };

  const filteredTreatments = TREATMENTS.filter(t => {
    if (selectedCategory === 'All') return true;
    return getCategory(t.id) === selectedCategory;
  });

  const handleBookNow = (treatmentName: string) => {
    setActiveModalTreatment(null);
    onBookTreatment(treatmentName);
  };

  return (
    <section id="treatments" className="py-24 bg-[#F4F7FA] relative border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block text-[#007BFF] font-sans font-bold text-xs uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Our Dental Treatments
          </span>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A2540] tracking-tight">
            Specialized Dental Services <span className="text-[#007BFF]">Designed for You</span>
          </h2>
          <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed">
            At Ganatras Dental Care, we combine visual artistry with strict surgical metrics so that every restoration, aligner, and crown feels and looks totally natural.
          </p>
        </div>

        {/* Filter Tabs */}
        <div id="treatments-filters" className="flex flex-wrap justify-center gap-2 mb-12">
          {(['All', 'Cosmetic', 'Restorative', 'Family'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-sans font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0A2540] text-white shadow-md shadow-slate-900/10 scale-102'
                  : 'bg-white text-gray-600 border border-gray-200/65 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {cat === 'All' && 'All Services (10)'}
              {cat === 'Cosmetic' && 'Cosmetic Aesthetics'}
              {cat === 'Restorative' && 'Restorative & Implants'}
              {cat === 'Family' && 'Family & Orthodontics'}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <div id="treatments-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              id={`treatment-card-${treatment.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-shadow service-card hover:scale-[1.01] transition-all duration-300 flex flex-col group"
            >
              {/* Treatment Image overlay */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Icon badge */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-2xl shadow-md border border-gray-100 flex items-center justify-center">
                  {getIconForId(treatment.id)}
                </div>
              </div>

              {/* Service description content */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left space-y-4">
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#0A2540] group-hover:text-[#007BFF] transition-colors">
                    {treatment.name}
                  </h3>
                  <p className="font-sans text-gray-500 text-xs sm:text-sm leading-relaxed mt-2 line-clamp-3">
                    {treatment.description}
                  </p>
                </div>

                <div className="pt-2 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveModalTreatment(treatment)}
                    className="flex items-center justify-center gap-1.5 font-sans font-bold text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200/60 py-2 rounded-full transition-colors cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleBookNow(treatment.name)}
                    className="flex items-center justify-center gap-1.5 font-sans font-bold text-xs bg-blue-50 text-[#007BFF] hover:bg-[#007BFF] hover:text-white py-2 rounded-full transition-all duration-200 cursor-pointer border border-[#007BFF]/10"
                  >
                    <span>Book Slot</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Learn More Interactive Modal Popup */}
      {activeModalTreatment && (
        <div id="treatment-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2540]/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-100 p-0 text-left">
            
            {/* Header image in modal */}
            <div className="relative h-56 bg-slate-100">
              <img
                src={activeModalTreatment.image}
                alt={activeModalTreatment.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button
                id="modal-close-trigger"
                onClick={() => setActiveModalTreatment(null)}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/75 transition-colors cursor-pointer"
                title="Close information"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-4 left-6 text-white flex items-center gap-3">
                <div className="bg-white p-2.5 rounded-xl shadow-lg flex items-center justify-center">
                  {getIconForId(activeModalTreatment.id)}
                </div>
                <div>
                  <h3 className="font-sans font-black text-2xl tracking-normal">{activeModalTreatment.name}</h3>
                  <span className="text-xs bg-blue-500/80 text-white font-mono px-2 py-0.5 rounded uppercase font-bold">
                    {getCategory(activeModalTreatment.id)} Treatment
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Detailed description */}
              <div>
                <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-slate-400 mb-2">Overview</h4>
                <p className="font-sans text-slate-700 text-sm leading-relaxed">
                  {activeModalTreatment.longDescription}
                </p>
              </div>

              {/* Treatment specifications */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div>
                  <span className="block font-sans text-xs font-semibold text-slate-400">Average Duration</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-sans text-sm font-bold text-[#0A2540]">{activeModalTreatment.duration}</span>
                  </div>
                </div>
                <div>
                  <span className="block font-sans text-xs font-semibold text-slate-400">Post-Care Recovery</span>
                  <span className="block font-sans text-sm font-bold text-slate-700 mt-1">{activeModalTreatment.recovery}</span>
                </div>
              </div>

              {/* Patient Features / Advantages Checklist */}
              <div>
                <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-slate-400 mb-3">Key Features & Value</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModalTreatment.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="font-sans text-[#0A2540] text-xs font-semibold leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action Bar inside Modal */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  id="modal-direct-book"
                  onClick={() => handleBookNow(activeModalTreatment.name)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-sans font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-98 cursor-pointer transition-transform"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment for {activeModalTreatment.name}</span>
                </button>
                <a
                  href={`https://wa.me/919867440803?text=Hi,%20I%20would%20like%20to%20know%20more%20about%20${encodeURIComponent(activeModalTreatment.name)}%20treatment%20at%20Ganatras.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-sans font-bold text-xs px-5 py-3.5 rounded-xl"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Query</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
