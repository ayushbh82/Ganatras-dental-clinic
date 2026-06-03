/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data';

export default function FloatingActions() {
  const handleScrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#book-appointment');
    if (element) {
      const headerOffset = 88;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      id="floating-clinic-actions"
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 group animate-bounce-subtle items-end text-left"
    >
      {/* 1. WhatsApp Action (Green) */}
      <a
        id="float-whatsapp"
        href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hi,%20I%20would%20like%20to%20book%20a%20dental%20appointment%20with%20Dr.%20Ganatra%20at%20Bandra.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 group/btn relative bg-emerald-500 hover:bg-emerald-600 shadow-xl p-3.5 sm:p-4 rounded-full text-white transition-all cursor-pointer hover:scale-105 active:scale-95 duration-200"
        title="WhatsApp Clinic"
      >
        <span className="max-w-0 overflow-hidden group-hover/btn:max-w-xs transition-all duration-300 ease-out font-sans font-bold text-xs shrink-0 block tracking-wide select-none whitespace-nowrap">
          WhatsApp Chat
        </span>
        <MessageSquare className="w-5.5 h-5.5 fill-white text-transparent shrink-0" />
      </a>

      {/* 2. Call Now Action (Blue) */}
      <a
        id="float-call"
        href={`tel:${CLINIC_INFO.phone}`}
        className="flex items-center gap-2 group/btn relative bg-blue-600 hover:bg-blue-700 shadow-xl p-3.5 sm:p-4 rounded-full text-white transition-all cursor-pointer hover:scale-105 active:scale-95 duration-200"
        title="Call Clinic Now"
      >
        <span className="max-w-0 overflow-hidden group-hover/btn:max-w-xs transition-all duration-300 ease-out font-sans font-bold text-xs shrink-0 block tracking-wide select-none whitespace-nowrap">
          Call Now
        </span>
        <Phone className="w-5.5 h-5.5 shrink-0" />
      </a>

      {/* 3. Book Appointment Action (Dark Navy) */}
      <button
        id="float-book"
        onClick={handleScrollToBooking}
        className="flex items-center gap-2 group/btn relative bg-[#0A2540] hover:bg-blue-600 border border-white/10 shadow-xl p-3.5 sm:p-4 rounded-full text-white transition-all cursor-pointer hover:scale-105 active:scale-95 duration-200"
        title="Book Appointment"
      >
        <span className="max-w-0 overflow-hidden group-hover/btn:max-w-xs transition-all duration-300 ease-out font-sans font-bold text-xs shrink-0 block tracking-wide select-none whitespace-nowrap">
          Book Slot
        </span>
        <Calendar className="w-5.5 h-5.5 shrink-0" />
      </button>

    </div>
  );
}
