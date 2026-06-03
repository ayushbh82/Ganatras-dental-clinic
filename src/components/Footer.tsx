/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CLINIC_INFO, TREATMENTS } from '../data';
import { 
  Smile, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  ShieldCheck, 
  ArrowUp,
  Database
} from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
  onBookClick: () => void;
}

export default function Footer({ onAdminClick, onBookClick }: FooterProps) {
  const scrollUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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

  // Pre-calculate treatments list to display first 5 for neat layouts
  const displayTreatments = TREATMENTS.slice(0, 5);

  return (
    <footer className="bg-[#0A2540] text-slate-300 pt-16 pb-12 relative overflow-hidden border-t border-white/5">
      
      {/* Local Business JSON-LD Schema Markup Injection for SEO optimization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          "name": "Ganatras Dental Care",
          "image": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
          "@id": "https://ganatrasdentalcare.com/#dentist",
          "url": "https://ganatrasdentalcare.com",
          "telephone": "+919867440803",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ocean View CHS, 19, Hill Rd, near Mehboob Studio, Ranwar, Bandra West",
            "addressLocality": "Mumbai",
            "addressRegion": "MH",
            "postalCode": "400050",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 19.0434237,
            "longitude": 72.8247959
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "10:00",
              "closes": "20:30"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Saturday",
              "opens": "10:00",
              "closes": "14:00"
            }
          ],
          "sameAs": [
            "https://www.facebook.com/ganatrasdentalcare",
            "https://www.instagram.com/ganatrasdentalcare"
          ]
        })}
      </script>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/5 pb-12 text-left">
          
          {/* Col 1: Brand details */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="flex items-center gap-2.5 w-max"
            >
              <div className="bg-[#007BFF] p-2 rounded-full text-white">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-sans font-bold text-white text-lg tracking-tight leading-none">
                  Ganatras
                </span>
                <span className="block font-sans font-bold text-[9px] tracking-widest uppercase mt-0.5 text-blue-300">
                  Dental Care
                </span>
              </div>
            </a>

            <p className="font-sans text-xs sm:text-xs text-slate-400 leading-relaxed max-w-sm">
              Creating Healthy & Confident Smiles Since Day One. Providing premium cosmetic surgery, full mouth dental implants, clear braces, and painless child dentistry in Bandra.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white p-2.5 rounded-full transition-colors border border-white/5">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-pink-600 text-slate-300 hover:text-white p-2.5 rounded-full transition-colors border border-white/5">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-sky-500 text-slate-300 hover:text-white p-2.5 rounded-full transition-colors border border-white/5">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans font-black text-[#007BFF] text-xs uppercase tracking-widest">Clinic Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-white transition-colors">About Practice</a>
              </li>
              <li>
                <a href="#treatments" onClick={(e) => handleLinkClick(e, '#treatments')} className="hover:text-white transition-colors">All Treatments</a>
              </li>
              <li>
                <a href="#doctors" onClick={(e) => handleLinkClick(e, '#doctors')} className="hover:text-white transition-colors">Specialist Dentists</a>
              </li>
              <li>
                <a href="#why-choose-us" onClick={(e) => handleLinkClick(e, '#why-choose-us')} className="hover:text-white transition-colors">Our Standard</a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => handleLinkClick(e, '#reviews')} className="hover:text-white transition-colors">Verified Reviews</a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleLinkClick(e, '#gallery')} className="hover:text-white transition-colors">Clinic Gallery</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Treatments */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans font-black text-[#007BFF] text-xs uppercase tracking-widest">Key Services</h4>
            <ul className="space-y-2.5 text-xs">
              {displayTreatments.map((tr) => (
                <li key={tr.id}>
                  <a href="#treatments" onClick={(e) => handleLinkClick(e, '#treatments')} className="hover:text-white transition-colors">
                    {tr.name} Treatment
                  </a>
                </li>
              ))}
              <li>
                <a href="#treatments" onClick={(e) => handleLinkClick(e, '#treatments')} className="text-blue-400 hover:text-blue-300 font-bold">
                  View All 10 Services →
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Support details */}
          <div className="lg:col-span-3 space-y-4 text-xs font-sans">
            <h4 className="font-sans font-black text-[#007BFF] text-xs uppercase tracking-widest">Contact Desk</h4>
            <ul className="space-y-3 font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-[11px] leading-relaxed">
                  Ocean View CHS, 19, Hill Rd, near Mehboob Studio, Ranwar, Bandra West, Mumbai 400050
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-white font-bold">
                  {CLINIC_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white">
                  {CLINIC_INFO.email}
                </a>
              </li>
              
              <li className="pt-2">
                <button
                  onClick={onBookClick}
                  className="w-full bg-[#007BFF] hover:bg-blue-600 text-white font-sans font-bold py-2 rounded-full transition-all h-9 flex items-center justify-center cursor-pointer shadow-md text-xs uppercase tracking-wider"
                >
                  Book Appointment Now
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom metadata rows */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 text-center sm:text-left">
          <div>
            <p>© 2026 Ganatras Dental Care. All Rights Reserved.</p>
            <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1.5 justify-center sm:justify-start">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500/80" />
              <span>Certified SSL Protected Portal • Bandra West, Mumbai</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onAdminClick}
              className="hover:text-white flex items-center gap-1 text-[11px] bg-white/5 border border-white/5 hover:border-white/10 px-3 py-1.5 rounded-lg transition-all"
            >
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>Clinic System Log</span>
            </button>
            
            <button
              onClick={scrollUp}
              className="bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 p-2.5 rounded-xl cursor-pointer hover:border-blue-500 transition-all"
              title="Return to topmost page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
