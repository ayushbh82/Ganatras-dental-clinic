/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar, Menu, X, Smile, Star } from 'lucide-react';
import { CLINIC_INFO } from '../data';

interface HeaderProps {
  onBookClick: () => void;
  onAdminClick: () => void;
}

export default function Header({ onBookClick, onAdminClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Treatments', href: '#treatments' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
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
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-blue-50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo / Title */}
          <a
            id="header-logo-container"
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group transition-transform hover:scale-102"
          >
            <div className="w-10 h-10 bg-[#0A2540] rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md border border-white/10 shrink-0">
              G
            </div>
            <div>
              <span className={`block font-sans font-extrabold text-lg tracking-tight leading-none ${isScrolled ? 'text-[#0A2540]' : 'text-white'}`}>
                Ganatras <span className="text-[#007BFF]">Dental Care</span>
              </span>
              <span className={`block font-sans font-bold text-[9px] tracking-widest uppercase mt-0.5 ${isScrolled ? 'text-gray-500' : 'text-blue-200'}`}>
                Since Day One
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-sans font-semibold text-sm tracking-wide transition-colors duration-250 hover:text-[#007BFF] ${
                  isScrolled ? 'text-gray-600' : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Header Actions */}
          <div id="header-desktop-actions" className="hidden lg:flex items-center gap-4">
            <button
              id="header-admin-btn"
              onClick={onAdminClick}
              className={`font-sans font-bold text-xs tracking-wider uppercase px-3 py-1.5 rounded-full border transition-colors ${
                isScrolled
                  ? 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  : 'border-white/20 text-white/80 hover:bg-white/10'
              }`}
            >
              Clinic Portal
            </button>
            
            <a
              id="header-call-btn"
              href={`tel:${CLINIC_INFO.phone}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans font-bold text-sm tracking-wide shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${
                isScrolled
                  ? 'bg-blue-50 text-[#007BFF] hover:bg-blue-100'
                  : 'bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Clinic</span>
            </a>

            <button
              id="header-book-btn"
              onClick={onBookClick}
              className="bg-[#007BFF] hover:bg-blue-600 text-white font-sans font-bold text-sm tracking-wide px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-250 cursor-pointer active:scale-98"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={onAdminClick}
              className={`p-2 rounded-lg font-bold text-xs ${isScrolled ? 'text-slate-500 hover:bg-slate-100' : 'text-white/80 hover:bg-white/10'}`}
              title="Clinic Admin Portal"
            >
              Portal
            </button>
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors ${
                isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Slide Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 animate-slide-down">
          <div className="px-4 py-6 space-y-3 bg-gradient-to-b from-white to-slate-50">
            {menuItems.map((item) => (
              <a
                key={item.label}
                id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-4 py-3 rounded-xl font-sans font-bold text-base text-[#0A2540] hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
              <a
                id="mobile-drawer-call"
                href={`tel:${CLINIC_INFO.phone}`}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 text-[#0A2540] font-sans font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Clinic</span>
              </a>
              <a
                id="mobile-drawer-whatsapp"
                href={`https://wa.me/${CLINIC_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-sans font-bold text-sm hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              id="mobile-drawer-book-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-sans font-bold text-base py-3.5 rounded-xl shadow-lg shadow-blue-500/10 cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
