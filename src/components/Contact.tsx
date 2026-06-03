/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CLINIC_INFO } from '../data';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  ExternalLink,
  Navigation,
  Compass
} from 'lucide-react';

export default function Contact() {
  // Direct link for Google Maps navigation
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=Ganatras+Dental+Care+Ocean+View+CHS+19+Hill+Rd+near+Mehboob+Studio+Ranwar+Bandra+West+Mumbai+400050`;

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block text-blue-600 font-sans font-bold text-sm uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Get in Touch
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0A2540] tracking-tight">
            Contact Ganatras <span className="text-blue-600">Dental Care</span>
          </h2>
          <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
            Have an open dental consultation or dental emergency? Reach out directly. We are located near Mehboob Studio on Hill Road, Bandra West.
          </p>
        </div>

        {/* Contact layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Column 1: Contact list & detail slots */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between text-left">
            <div className="space-y-6">
              
              {/* Card - Phone */}
              <a
                id="contact-call-card"
                href={`tel:${CLINIC_INFO.phone}`}
                className="flex gap-4 p-5 rounded-2xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all group cursor-pointer"
              >
                <div className="bg-blue-50 text-blue-700 p-4 rounded-xl flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                  <Phone className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="block font-sans text-xs text-slate-400 font-bold uppercase tracking-wider">Phone / Call Clinic</span>
                  <span className="font-sans font-black text-slate-800 text-base sm:text-lg group-hover:text-blue-600 transition-colors">
                    {CLINIC_INFO.phoneDisplay}
                  </span>
                  <p className="font-sans text-xs text-slate-400 mt-1">Tap to dial instantly. Open for emergencies.</p>
                </div>
              </a>

              {/* Card - WhatsApp */}
              <a
                id="contact-whatsapp-card"
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Ganatras%20Dental,%20I%20have%20a%20dental%20query.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 p-5 rounded-2xl hover:bg-emerald-50/40 border border-slate-100 hover:border-emerald-200/50 transition-all group cursor-pointer"
              >
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm">
                  <MessageSquare className="w-6 h-6 fill-emerald-600/20 text-emerald-600" />
                </div>
                <div>
                  <span className="block font-sans text-xs text-slate-400 font-bold uppercase tracking-wider">WhatsApp Support</span>
                  <span className="font-sans font-black text-emerald-700 text-base sm:text-lg group-hover:text-emerald-800 transition-colors">
                    {CLINIC_INFO.phoneDisplay}
                  </span>
                  <p className="font-sans text-xs text-slate-400 mt-1">Chat directly. Receive quick prescriptions/advice.</p>
                </div>
              </a>

              {/* Card - Address */}
              <div
                className="flex gap-4 p-5 rounded-2xl border border-slate-100 text-left"
              >
                <div className="bg-indigo-50 text-indigo-700 p-4 rounded-xl flex items-center justify-center shrink-0 border border-indigo-100 shadow-sm self-start">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="block font-sans text-xs text-slate-400 font-bold uppercase tracking-wider">Clinic Address</span>
                  <span className="block font-sans font-extrabold text-slate-800 text-sm mt-0.5 leading-relaxed">
                    Ocean View CHS, 19, Hill Rd,
                  </span>
                  <span className="block font-sans font-medium text-slate-600 text-sm">
                    near Mehboob Studio, Ranwar, Bandra West, Mumbai, 400050
                  </span>
                  
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 font-sans font-black text-xs text-blue-600 hover:text-blue-800"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get GPS Directions Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Card - Email */}
              <a
                href={`mailto:${CLINIC_INFO.email}`}
                className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-all group text-left"
              >
                <div className="bg-slate-50 text-slate-600 p-3 rounded-lg flex items-center justify-center shrink-0 border border-slate-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-sans text-[10px] text-slate-400 font-bold uppercase tracking-wider">Clinic Mailbox</span>
                  <span className="font-sans text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                    {CLINIC_INFO.email}
                  </span>
                </div>
              </a>

            </div>

            {/* Operating Hours Block */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3 leading-snug">
              <span className="font-sans font-extrabold text-xs text-[#0A2540] uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Operating Timings</span>
              </span>
              <div className="space-y-1.5 text-xs text-slate-505 font-sans">
                <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                  <span className="text-slate-500 font-bold">Weekdays (Mon - Fri)</span>
                  <span className="text-[#0A2540] font-black">10:00 AM - 1:30 PM, 5:00 PM - 8:30 PM</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                  <span className="text-slate-500 font-bold">Saturday</span>
                  <span className="text-[#0A2540] font-black">10:00 AM - 2:00 PM (First half only)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rose-500 font-bold">Sunday</span>
                  <span className="text-rose-600 font-black">Closed (Emergency Only)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Advanced map embed with direction button */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Embedded Google Maps iFrame Map */}
            <div className="flex-1 rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 h-96 sm:h-auto min-h-[350px]">
              <iframe
                title="Ganatras Dental Care Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.2120365774305!2d72.8247959!3d19.0434237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c943aa2f0365%3A0xc6cb556fb70df7b0!2sGanatras%20Dental%20Care!5e0!3m2!1sen!2sin!4v1780497000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Embed bottom support metadata directions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="block font-sans text-xs font-extrabold text-[#0A2540]">Ocean View CHS Landmark</span>
                  <span className="font-sans text-[11px] text-slate-500">Opposite Mehboob Studio road, Bandra. Ground Floor lane.</span>
                </div>
              </div>

              <a
                id="contact-directions-btn"
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-sans font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md shrink-0 cursor-pointer text-center"
              >
                <Compass className="w-4 h-4 fill-white/10" />
                <span>Get Driving Directions</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
