/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Star, Phone, MessageSquare, Calendar, ShieldCheck, Clock } from 'lucide-react';
import { CLINIC_INFO, IMAGES } from '../data';
import { motion } from 'motion/react';

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  // Compute active status
  const getClinicStatus = () => {
    const now = new Date(); // local server time is fine, let's use current hour
    const hour = now.getHours();
    const min = now.getMinutes();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday

    // Convert current hour to decimal for easier range check
    const timeVal = hour + min / 60;

    if (day === 0) {
      return { open: false, msg: 'Closed Today • Reopens Monday 10:00 AM' };
    }

    if (day === 6) { // Saturday
      if (timeVal >= 10 && timeVal <= 14) {
        return { open: true, msg: 'Open Now • Closes at 2:00 PM' };
      }
      return { open: false, msg: 'Closed Now • Opens Monday 10:00 AM' };
    }

    // Weekdays
    const morningShift = timeVal >= 10 && timeVal <= 13.5;
    const eveningShift = timeVal >= 17 && timeVal <= 20.5;

    if (morningShift) {
      return { open: true, msg: 'Open Now • Closes at 1:30 PM today' };
    }
    if (eveningShift) {
      return { open: true, msg: 'Open Now • Closes at 8:30 PM today' };
    }
    if (timeVal < 10) {
      return { open: false, msg: 'Closed Now • Opens at 10:00 AM' };
    }
    if (timeVal > 13.5 && timeVal < 17) {
      return { open: false, msg: 'Break Hours • Opens at 5:00 PM' };
    }
    return { open: false, msg: 'Closed Now • Opens tomorrow at 10:00 AM' };
  };

  const status = getClinicStatus();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0A2540]"
    >
      {/* Background Image with advanced darkening overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Ganatras Dental Care - Bandra Mumbai Clinic"
          className="w-full h-full object-cover object-center scale-102 transform filter brightness-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2530] via-transparent to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Live Status Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 sm:gap-3">
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-sans font-bold">
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${status.open ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`}></span>
                {status.open ? 'OPEN' : 'CLOSED'}
              </span>
              <span className="w-px h-3.5 bg-white/15"></span>
              <div className="flex items-center gap-1 text-xs text-white font-sans font-semibold">
                <Clock className="w-3.5 h-3.5 text-blue-300" />
                <span>{status.msg}</span>
              </div>
            </div>

            {/* Title / Headline */}
            <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
              Creating Healthy & <br className="hidden sm:inline" />
              <span className="text-[#007BFF]">
                Confident Smiles
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
              World-class dental care with advanced technology and personalized treatment plans in the heart of Mumbai.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                <div className="bg-yellow-400/20 p-2 rounded-xl">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
                <div>
                  <span className="block font-sans font-bold text-white text-sm leading-none">5.0 Star</span>
                  <span className="font-sans text-slate-400 text-[10px] uppercase font-bold mt-1 block">723+ Reviews</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                <div className="bg-blue-500/20 p-2 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="block font-sans font-bold text-white text-sm leading-none">22+ Years</span>
                  <span className="font-sans text-slate-400 text-[10px] uppercase font-bold mt-1 block">Dr. Ganatra MDS</span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                <div className="bg-emerald-500/20 p-2 rounded-xl">
                  <Flame className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="block font-sans font-bold text-white text-sm leading-none">Painless</span>
                  <span className="font-sans text-slate-400 text-[10px] uppercase font-bold mt-1 block">Laser Tech</span>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                id="hero-book-appt-btn"
                onClick={onBookClick}
                className="flex-[2] sm:flex-initial flex items-center justify-center gap-2 bg-[#007BFF] hover:bg-blue-600 text-white font-sans font-bold text-sm tracking-wide px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/20 cursor-pointer transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <a
                id="hero-whatsapp-btn"
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hi,%20I%20would%20like%20to%20book%20a%20dental%20appointment%20at%20Ganatras%20Dental%20Care.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-sans font-bold text-sm tracking-wide transition-all duration-200 hover:bg-white/25"
              >
                <MessageSquare className="w-4 h-4 fill-white text-transparent" />
                <span>WhatsApp Now</span>
              </a>

              <a
                id="hero-call-btn"
                href={`tel:${CLINIC_INFO.phone}`}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-sans font-bold text-sm tracking-wide border border-white/20 backdrop-blur-sm transition-all duration-200"
              >
                <Phone className="w-4 h-4 fill-white/10" />
                <span>Call Clinic</span>
              </a>
            </div>

          </div>

          <div className="lg:col-span-5 hidden lg:block relative">
            {/* Visual aesthetic element or card preview */}
            <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 text-left text-white">
              <div className="absolute top-0 right-0 p-3 bg-blue-500 text-xs font-sans font-bold rounded-bl-2xl">
                Bandra Clinic
              </div>
              <span className="block text-blue-400 font-mono text-xs tracking-wider uppercase mb-1">Today's Highlight</span>
              <h4 className="font-sans font-bold text-xl leading-tight mb-2">Modern Painless Diagnostics</h4>
              <p className="font-sans font-medium text-xs text-slate-300 leading-relaxed mb-4">
                We utilize German CAD/CAM 3D scanning technology to outline dental structures instantly without physical mastic impressions.
              </p>
              
              <div className="bg-white/10 rounded-xl p-3 space-y-2 border border-white/5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Dental Implants Success</span>
                  <span className="text-emerald-400 font-bold">99.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Hygiene autoclave cycle</span>
                  <span className="text-blue-400 font-bold">Class B Sterile</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Patient Consultation time</span>
                  <span className="text-slate-200">Personalized</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
