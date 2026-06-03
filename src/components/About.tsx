/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Shield, Cpu, Users, Eye, MapPin, Sparkles } from 'lucide-react';
import { CLINIC_INFO, IMAGES } from '../data';

export default function About() {
  const highlights = [
    {
      title: 'Trusted Bandra Legacy',
      description: 'Serving local Mumbai and global patrons since Day One with highly personalized, elite clinical care.',
      icon: <Shield className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Advanced Dental Tech',
      description: 'Incorporating ultra low-radiation digital radiography, 3D oral scanning, and CAD/CAM tooth-mills.',
      icon: <Cpu className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: 'Comfortable Ambiance',
      description: 'Carefully designed acoustics, comfortable dental chairs, and optional light sedation to treat dentist anxiety.',
      icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
    },
    {
      title: 'Cosmetic & Family Dentistry',
      description: 'Your one-stop destination for complete toddler dental milestones, invisible aligners, and geriatric implants.',
      icon: <Users className="w-5 h-5 text-purple-600" />,
    },
  ];

  const stats = [
    {
      value: '723+',
      label: 'Verified 5-Star Reviews',
      desc: 'Independent reviews on Google Business Listing',
    },
    {
      value: '15k+',
      label: 'Happy Indian Patients',
      desc: 'Beautiful healthy smiles created & guided',
    },
    {
      value: '100%',
      label: 'CAD/CAM Modern Equipment',
      desc: 'Sterilized Class-B surgical equipment',
    },
    {
      value: 'Bandra',
      label: 'Convenient Hill Rd Location',
      desc: 'Convenient ground floor access with support parking',
    },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden border-b border-gray-200/50">
      {/* Decorative background vectors */}
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-blue-50/50 rounded-full filter blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-indigo-50/50 rounded-full filter blur-3xl opacity-50 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Column 1: Image Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              {/* Main Reception Frame */}
              <div className="rounded-2xl overflow-hidden card-shadow border border-gray-100 bg-slate-200">
                <img
                  src={IMAGES.reception}
                  alt="Ganatras Dental Clinic Lobby Reception"
                  className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-101"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Float Card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl card-shadow p-5 border border-gray-100 max-w-xs hidden sm:block">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-yellow-400/10 p-1.5 rounded-xl">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <span className="font-sans font-bold text-slate-800 text-base">5.0 rated</span>
                </div>
                <p className="font-sans text-[#0A2540] text-xs font-semibold leading-relaxed">
                  "One of the best dental clinics in Mumbai. Clean facility and professional doctors."
                </p>
                <div className="mt-2 text-right">
                  <span className="font-mono text-[9px] text-zinc-400">— Google Reviews review</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Content Details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="inline-block text-[#007BFF] font-sans font-bold text-xs uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-3">
                Welcome to Ganatras Dental Care
              </span>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#0A2540] tracking-tight leading-tight">
                Creating Healthy & Confident Smiles <br />
                <span className="text-[#007BFF]">Since Day One</span>
              </h2>
            </div>

            <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed">
              For over two decades, Ganatras Dental Care has served as the gold standard of dental medicine in Bandra West, Mumbai. Our clinic merges the creative precision of top cosmetic dental artistry with premium German sterilization protocols and pain-elimination technologies.
            </p>

            {/* List details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {highlights.map((h, idx) => (
                <div key={idx} className="flex gap-3 text-left">
                  <div className="flex-shrink-0 bg-white shadow-sm rounded-xl p-3 border border-gray-200/60 h-11 w-11 flex items-center justify-center text-[#007BFF]">
                    {h.icon}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-[#0A2540] text-sm mb-1">{h.title}</h4>
                    <p className="font-sans text-gray-500 text-xs leading-relaxed">{h.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Stats Section Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-100 card-shadow hover:scale-[1.01] transition-all duration-300 text-center"
            >
              <span className="block font-sans font-bold text-3xl sm:text-4xl text-[#007BFF] mb-2">
                {st.value}
              </span>
              <h5 className="font-sans font-bold text-[#0A2540] text-sm mb-1">{st.label}</h5>
              <p className="font-sans text-gray-400 text-xs leading-snug">{st.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
