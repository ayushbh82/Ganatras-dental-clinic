/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Treatments from './components/Treatments';
import Doctors from './components/Doctors';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import BookingForm from './components/BookingForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import AdminPanel from './components/AdminPanel';
import { FAQS } from './data';
import { HelpCircle, ChevronDown, Clock, Smile, Sparkles } from 'lucide-react';

export default function App() {
  // Appointment registration sync parameters
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  
  // Admin panel open state
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // FAQ collapsible indexing state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const handleBookWithTreatment = (treatmentName: string) => {
    setSelectedTreatment(treatmentName);
    scrollToBooking();
  };

  const handleBookWithDoctor = (drName: string) => {
    setSelectedDoctor(drName);
    scrollToBooking();
  };

  const scrollToBooking = () => {
    const section = document.querySelector('#book-appointment');
    if (section) {
      const headerOffset = 88;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleClearPreselections = () => {
    setSelectedTreatment('');
    setSelectedDoctor('');
  };

  return (
    <div id="clinic-applet-root" className="min-h-screen bg-slate-50 overflow-x-hidden select-text text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Header
        onBookClick={scrollToBooking}
        onAdminClick={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* Homepage Hero Section */}
        <Hero onBookClick={scrollToBooking} />

        {/* Welcome & About Section */}
        <About />

        {/* Dynamic Treatments Grid Section */}
        <Treatments onBookTreatment={handleBookWithTreatment} />

        {/* Expert Doctors Section */}
        <Doctors onBookDoctor={handleBookWithDoctor} />

        {/* Why Choose Us Feature Cards */}
        <WhyChooseUs />

        {/* Testimonials from Indian Patients */}
        <Reviews />

        {/* Interactive Clinic Gallery */}
        <Gallery />

        {/* Collaborative FAQs section to expand patient context */}
        <section id="faqs" className="py-24 bg-slate-50 relative overflow-hidden text-left border-y border-slate-200/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <span className="inline-block text-blue-600 font-sans font-bold text-sm uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                Common Inquiries
              </span>
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
                Frequently Asked <span className="text-blue-600">Patient Questions</span>
              </h2>
              <p className="font-sans text-slate-500 text-sm leading-relaxed">
                Review core questions concerning operating routines, parking, painless root canals, and invisible aligners consultation services.
              </p>
            </div>

            {/* Collapsible Accordion Grid */}
            <div id="faqs-accordion" className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  id={`faq-card-${idx}`}
                  className="bg-white rounded-2xl border border-slate-150 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-sans font-bold text-[#0A2540] text-sm sm:text-base hover:text-blue-600 cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${openFaqIdx === idx ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>

                  {openFaqIdx === idx && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-50 animate-slide-down">
                      <p className="bg-slate-50 rounded-xl p-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Slots Appointment Booking Room */}
        <BookingForm
          preselectedTreatment={selectedTreatment}
          preselectedDoctor={selectedDoctor}
          onClearPreselections={handleClearPreselections}
        />

        {/* Direct Maps Embed and Support Coordinates */}
        <Contact />
      </main>

      {/* Structured Footer with coordinates, quick routes & schema */}
      <Footer
        onAdminClick={() => setIsAdminOpen(true)}
        onBookClick={scrollToBooking}
      />

      {/* Standard Floating actions overlay on Right Margins */}
      <FloatingActions />

      {/* Locked DB Clinic operator records list */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}
