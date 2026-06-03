/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CLINIC_INFO, TREATMENTS } from '../data';
import { Appointment } from '../types';
import { Calendar, Phone, MessageSquare, Check, AlertCircle, Sparkles, Clock, HeartHandshake } from 'lucide-react';

interface BookingFormProps {
  preselectedTreatment: string;
  preselectedDoctor: string;
  onClearPreselections: () => void;
}

export default function BookingForm({ preselectedTreatment, preselectedDoctor, onClearPreselections }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    date: '',
    time: '10:00 AM',
    treatment: 'Regular Consultation',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorWord, setErrorWord] = useState('');

  // Sync preselected flags from other components
  useEffect(() => {
    if (preselectedTreatment) {
      setFormData((prev) => ({ ...prev, treatment: preselectedTreatment }));
    }
  }, [preselectedTreatment]);

  useEffect(() => {
    if (preselectedDoctor) {
      setFormData((prev) => ({
        ...prev,
        message: `Requesting consultation appointment specifically with ${preselectedDoctor}. ` + prev.message
      }));
    }
  }, [preselectedDoctor]);

  // Set today's date as minimum date
  const getTodayString = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Build the WhatsApp message payload dynamically
  const getWhatsAppURL = () => {
    const message = `Hello Ganatras Dental Care, I want to book a dental appointment:
- *Name*: ${formData.name || 'Not provided'}
- *Mobile*: ${formData.mobile || 'Not provided'}
- *Email*: ${formData.email || 'Not provided'}
- *Preferred Date*: ${formData.date || 'Not selected'}
- *Preferred Time*: ${formData.time}
- *Treatment*: ${formData.treatment}
- *Notes*: ${formData.message || 'None'}`;

    return `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  const handleFormSubmit = (e: React.FormEvent, type: 'submit' | 'whatsapp') => {
    e.preventDefault();
    setErrorWord('');

    if (!formData.name) {
      setErrorWord('Patient full name is required');
      return;
    }
    if (!formData.mobile || formData.mobile.length < 10) {
      setErrorWord('Provide a valid 10-digit mobile number');
      return;
    }
    if (!formData.date) {
      setErrorWord('Please choose your preferred date');
      return;
    }

    // Capture and Save to Local Storage Database for Admin Panel view
    const newAppointment: Appointment = {
      id: `appt_${Date.now()}`,
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      treatment: formData.treatment,
      message: formData.message,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    try {
      const existingApptsString = localStorage.getItem('ganatras_appointments');
      const existingAppts: Appointment[] = existingApptsString ? JSON.parse(existingApptsString) : [];
      localStorage.setItem('ganatras_appointments', JSON.stringify([newAppointment, ...existingAppts]));
    } catch (err) {
      console.error('Error writing to local storage', err);
    }

    if (type === 'whatsapp') {
      // Open WhatsApp Link
      window.open(getWhatsAppURL(), '_blank', 'noopener,noreferrer');
    }

    setSubmitted(true);
    setFormData({
      name: '',
      mobile: '',
      email: '',
      date: '',
      time: '10:00 AM',
      treatment: 'Regular Consultation',
      message: '',
    });
    onClearPreselections();

    // Reset Submission indicator state after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  const availTimes = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:35 PM', '8:00 PM'
  ];

  return (
    <section id="book-appointment" className="py-24 bg-[#0A2540] text-white relative overflow-hidden border-b border-gray-200/50">
      {/* Background glowing rings */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Instructions */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="inline-block text-[#007BFF] font-sans font-bold text-xs uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
              Quick Registration
            </span>
            
            <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Book Your <br />
              <span className="text-[#007BFF]">Appointment Today</span>
            </h2>

            <p className="font-sans text-slate-300 text-sm leading-relaxed">
              Fill out the digital slip or click "WhatsApp Appointment" to instantly notify the clinic managers on <span className="text-white font-bold">{CLINIC_INFO.phoneDisplay}</span>.
            </p>

            {/* Quick Guarantees cards */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex gap-3">
                <div className="bg-white/5 rounded-full p-2 h-10 w-10 flex items-center justify-center border border-white/10 text-emerald-400">
                  <Check className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-sm">Flexible Rescheduling</h4>
                  <p className="font-sans text-slate-400 text-xs">Need of dynamic shifts? Re-book or shift slots easily up to 2 hours before.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-white/5 rounded-full p-2 h-10 w-10 flex items-center justify-center border border-white/10 text-[#007BFF]">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-sm">Priority Support Guarantee</h4>
                  <p className="font-sans text-slate-400 text-xs">Zero pre-registration fees. Pay at the clinic with cash, UPI or cards.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Core Interactive Booking Form Card */}
          <div className="lg:col-span-7">
            <div id="booking-form-card" className="bg-white rounded-2xl p-6 sm:p-10 card-shadow text-slate-800 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#007BFF]"></div>

              {submitted ? (
                <div className="py-12 px-4 text-center space-y-4 animate-fade-in">
                  <div className="inline-flex bg-emerald-50 text-emerald-800 p-4 rounded-full border border-emerald-100 mb-2">
                    <Check className="w-8 h-8 font-black text-emerald-700" />
                  </div>
                  <h3 className="font-sans font-bold text-2xl text-[#0A2540]">Booking Request Placed!</h3>
                  <p className="font-sans text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you! We have logged your appointment. Our clinic officer will contact you on your registered cell number to finalize and save your slot.
                  </p>
                  
                  <div className="pt-4 max-w-sm mx-auto p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1.5 text-xs text-gray-500 text-left">
                    <p className="text-center font-bold text-[#0A2540] mb-2 uppercase tracking-wide">Summary Slip</p>
                    <p><b className="text-slate-700">Service:</b> {formData.treatment || 'Consultation'}</p>
                    <p><b className="text-slate-700">Preferred time:</b> {formData.time}</p>
                    <p className="text-[10px] text-blue-600 font-semibold italic">Note: You can review or edit this slot at any time through our interactive 'Clinic Portal' at the header/footer.</p>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-[#0A2540] hover:bg-slate-800 text-white font-sans font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full cursor-pointer"
                  >
                    Register Another Slot
                  </button>
                </div>
              ) : (
                <form id="clinic-booking-form" className="space-y-4 text-left font-sans text-xs sm:text-sm">
                  
                  {errorWord && (
                    <div className="bg-rose-50 text-rose-700 p-3 rounded-xl flex items-center gap-2 border border-rose-100">
                      <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                      <span className="font-sans font-semibold text-xs leading-none">{errorWord}</span>
                    </div>
                  )}

                  {/* Name field */}
                  <div>
                    <label className="block text-slate-600 font-sans font-bold text-xs mb-1">Patient Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g., Priya Kumar"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Mobile & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 font-sans font-bold text-xs mb-1">Cell Mobile Number *</label>
                      <input
                        type="tel"
                        name="mobile"
                        required
                        placeholder="e.g., 98674 40803"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600"
                        maxLength={15}
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-sans font-bold text-xs mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g., patient@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* Preferred Date & Time Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 font-sans font-bold text-xs mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        name="date"
                        required
                        min={getTodayString()}
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-sans font-bold text-xs mb-1">Preferred Slot Timing</label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600 bg-white"
                      >
                        {availTimes.map((tm) => (
                          <option key={tm} value={tm}>{tm}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Treatment Select category */}
                  <div>
                    <label className="block text-slate-600 font-sans font-bold text-xs mb-1">Treatment Required *</label>
                    <select
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600 bg-white"
                    >
                      <option value="Regular Consultation">Regular Consultation & Checkup</option>
                      {TREATMENTS.map((tr) => (
                        <option key={tr.id} value={tr.name}>{tr.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message details */}
                  <div>
                    <label className="block text-slate-600 font-sans font-bold text-xs mb-1">Special Clinical Requests / Health Symptoms</label>
                    <textarea
                      name="message"
                      placeholder="Specify if you have pain, bleeding, previous implant failures, or medical alerts..."
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600"
                    ></textarea>
                  </div>

                  {/* Multi-Button Submission actions */}
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      id="submit-form-appt-btn"
                      type="submit"
                      onClick={(e) => handleFormSubmit(e, 'submit')}
                      className="flex items-center justify-center gap-2 bg-[#0A2540] hover:bg-[#007BFF] font-sans font-bold text-[#FFFFFF] py-3 rounded-full transition-all duration-200 shadow-md cursor-pointer text-sm"
                    >
                      <Clock className="w-4 h-4" />
                      <span>Submit Appointment</span>
                    </button>

                    <button
                      id="submit-whatsapp-appt-btn"
                      type="button"
                      onClick={(e) => handleFormSubmit(e, 'whatsapp')}
                      className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-sans font-bold text-sm border border-emerald-100 py-3 rounded-full transition-all duration-200 shadow-sm cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-emerald-500 group-hover:fill-white text-transparent shrink-0" />
                      <span>WhatsApp Appointment</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-400 text-center leading-snug">
                    By submitting, you agree to allow Ganatras Dental West specialists to call your cell to confirm routing metrics. Data remains locally secured only.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
