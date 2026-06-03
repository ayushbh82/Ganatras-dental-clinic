/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { REVIEWS } from '../data';
import { Review } from '../types';
import { Star, Check, Sparkles, MessageSquare, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Review Form state
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    rating: 5,
    text: '',
    treatment: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviewsList.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviewsList.length - 1 : prev - 1));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    // Build initials and randomized color
    const initials = newReview.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'P';
    const bgColors = ['bg-indigo-650', 'bg-emerald-650', 'bg-indigo-600', 'bg-teal-600', 'bg-purple-600', 'bg-blue-600'];
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

    const created: Review = {
      id: `custom_${Date.now()}`,
      name: newReview.name,
      location: newReview.location || 'Bandra, Mumbai',
      rating: newReview.rating,
      date: 'Today',
      text: newReview.text,
      avatarInitials: initials,
      avatarBg: randomBg,
      treatmentUsed: newReview.treatment || 'Consultation',
      verified: true
    };

    setReviewsList([created, ...reviewsList]);
    setSubmitSuccess(true);
    setNewReview({ name: '', location: '', rating: 5, text: '', treatment: '' });
    
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowForm(false);
      setCurrentIndex(0); // View the newly posted review
    }, 2500);
  };

  return (
    <section id="reviews" className="py-24 bg-white relative border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 text-left space-y-4">
            <span className="inline-block text-[#007BFF] font-sans font-bold text-xs uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              Testimonials
            </span>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A2540] tracking-tight">
              Loved By Bandra. <br className="hidden sm:inline" />
              <span className="text-[#007BFF]">723+ Verified 5-Star Reviews.</span>
            </h2>
            <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed">
              We understand dental treatments can design anxiety. Here are real patient statements from working professionals, celebrities, and families located in Bandra West, Khar, and Santacruz.
            </p>
          </div>

          {/* Rating Breakdown card */}
          <div className="lg:col-span-5 bg-[#F4F7FA] border border-gray-200/50 rounded-2xl card-shadow p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left space-y-1">
              <span className="font-sans font-black text-6xl text-[#0A2540]">5.0</span>
              <div className="flex justify-center sm:justify-start gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="block font-sans text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                723+ Google Business Reviews
              </span>
            </div>

            {/* Linear breakdown indicators */}
            <div className="w-full sm:w-1/2 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-8 text-gray-400 text-right font-medium">5 Star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: '99%' }}></div>
                </div>
                <span className="w-8 text-right font-bold text-[#0A2540]">99%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 text-gray-400 text-right font-medium">4 Star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: '1%' }}></div>
                </div>
                <span className="w-8 text-right font-bold text-[#0A2540]">1%</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <span className="w-8 text-gray-400 text-right font-medium">3 Star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <span className="w-8 text-right font-semibold text-gray-500">0%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Testimonials */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="overflow-hidden rounded-2xl min-h-[300px] flex items-center bg-white border border-gray-100 card-shadow p-6 sm:p-12 text-left relative">
            
            {/* Active Card Details */}
            <div className="space-y-6 w-full">
              {/* Stars badge */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: reviewsList[currentIndex].rating }).map((_, starIdx) => (
                    <Star key={starIdx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="font-sans text-xs text-gray-400 font-bold tracking-wider">
                  {reviewsList[currentIndex].date}
                </span>
              </div>

              {/* Patient review body text */}
              <p className="font-sans italic text-[#0A2540] text-sm sm:text-base lg:text-lg leading-relaxed">
                "{reviewsList[currentIndex].text}"
              </p>

              {/* Reviewer signature block */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <div className="flex items-center gap-4">
                  <div className={`h-11 w-11 rounded-full ${reviewsList[currentIndex].avatarBg || 'bg-blue-600'} flex items-center justify-center text-white font-sans font-bold text-sm shadow-inner`}>
                    {reviewsList[currentIndex].avatarInitials}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-[#0A2540] text-sm sm:text-base leading-none mb-1">
                      {reviewsList[currentIndex].name}
                    </h4>
                    <span className="font-sans text-xs text-gray-400 font-medium">{reviewsList[currentIndex].location}</span>
                  </div>
                </div>

                {reviewsList[currentIndex].treatmentUsed && (
                  <span className="hidden sm:inline bg-blue-50 text-[#007BFF] font-sans font-bold text-xs px-3 py-1.5 rounded-full border border-blue-100/50">
                    {reviewsList[currentIndex].treatmentUsed}
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Simple Navigation Buttons under core card */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 font-sans font-bold text-[#0A2540] hover:text-[#007BFF] text-xs sm:text-sm border border-gray-200/70 px-5 py-2.5 rounded-full transition-all hover:bg-gray-50 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#007BFF] font-bold" />
              <span>Leave a Review</span>
            </button>
            
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="bg--200 hover:bg-gray-100 text-gray-600 border border-gray-200 hover:text-gray-900 p-3 rounded-full transition-all cursor-pointer shadow-sm"
                title="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="bg-[#0A2540] hover:bg-[#007BFF] text-white p-3 rounded-full transition-all cursor-pointer shadow-md"
                title="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Patient Review Form Drawer */}
        {showForm && (
          <div id="patient-review-drawer" className="max-w-xl mx-auto border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-xl bg-slate-50 text-left animate-slide-down">
            <h3 className="font-sans font-black text-xl text-[#0A2540] mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>Leave Your Patient Review</span>
            </h3>
            <p className="font-sans text-slate-400 text-xs mb-6">
              Share your personal dental experience. Your feedback directly guides our patient improvement programs!
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans font-bold text-slate-600 text-xs mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Harish Kumar"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-sans font-bold text-slate-600 text-xs mb-1">Your Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Bandra West, Mumbai"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans font-bold text-slate-600 text-xs mb-1">Star Assessment *</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600 bg-white"
                  >
                    {[5, 4, 3, 2, 1].map((val) => (
                      <option key={val} value={val}>{val} Stars</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-sans font-bold text-slate-600 text-xs mb-1">Treatment Received</label>
                  <input
                    type="text"
                    placeholder="e.g., Dental Crowns"
                    value={newReview.treatment}
                    onChange={(e) => setNewReview({ ...newReview, treatment: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans font-bold text-slate-600 text-xs mb-1">Review Feedback *</label>
                <textarea
                  required
                  placeholder="Tell us about the clinic experience, the dentists, and results..."
                  value={newReview.text}
                  rows={3}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600 bg-white"
                ></textarea>
              </div>

              {submitSuccess ? (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600 font-bold shrink-0" />
                  <span className="font-sans text-xs font-bold">Successfully posted your review! Thank you for trusting Ganatras.</span>
                </div>
              ) : (
                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold py-3 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    Post Review Info
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-sans font-semibold py-3 px-5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

      </div>
    </section>
  );
}
