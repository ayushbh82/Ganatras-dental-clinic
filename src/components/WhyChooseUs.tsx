/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WHY_CHOOSE_US } from '../data';
import { 
  Award, 
  UserCheck, 
  Cpu, 
  Heart, 
  IndianRupee, 
  CalendarRange, 
  MapPin, 
  Smile 
} from 'lucide-react';

function getIcon(iconName: string) {
  switch (iconName) {
    case 'Award': return <Award className="w-6 h-6 text-amber-500" />;
    case 'UserCheck': return <UserCheck className="w-6 h-6 text-blue-600" />;
    case 'Cpu': return <Cpu className="w-6 h-6 text-emerald-600" />;
    case 'Heart': return <Heart className="w-6 h-6 text-rose-500" />;
    case 'IndianRupee': return <IndianRupee className="w-6 h-6 text-indigo-600" />;
    case 'CalendarRange': return <CalendarRange className="w-6 h-6 text-sky-500" />;
    case 'MapPin': return <MapPin className="w-6 h-6 text-red-500" />;
    case 'Smile': return <Smile className="w-6 h-6 text-orange-500" />;
    default: return <Smile className="w-6 h-6 text-blue-600" />;
  }
}

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-[#F4F7FA] relative overflow-hidden border-b border-gray-200/50">
      {/* Background soft lighting blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-50/50 rounded-full filter blur-3xl opacity-60 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block text-[#007BFF] font-sans font-bold text-xs uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Standards of Excellence
          </span>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A2540] tracking-tight">
            Why Bandra Vows For <span className="text-[#007BFF]">Ganatras Care</span>
          </h2>
          <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed">
            We are dedicated to maintaining a high tier of patient clinical transparency, safety protocols, and personalized dental support.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div id="features-bento" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((card) => (
            <div
              key={card.id}
              id={`why-card-${card.id}`}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 card-shadow service-card hover:scale-[1.01] transition-all duration-300 flex flex-col items-start text-left space-y-4"
            >
              {/* Icon slot */}
              <div className="bg-[#F4F7FA] rounded-xl p-3 border border-gray-100 flex items-center justify-center">
                {getIcon(card.iconName)}
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 flex-1">
                <h3 className="font-sans font-bold text-base text-[#0A2540]">
                  {card.title}
                </h3>
                <p className="font-sans text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
