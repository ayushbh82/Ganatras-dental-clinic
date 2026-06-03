/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCTORS } from '../data';
import { Calendar, Award, GraduationCap, CheckCircle2, UserCheck, Stethoscope } from 'lucide-react';

interface DoctorsProps {
  onBookDoctor: (doctorName: string) => void;
}

export default function Doctors({ onBookDoctor }: DoctorsProps) {
  return (
    <section id="doctors" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-50/50 rounded-full filter blur-3xl opacity-65 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block text-[#007BFF] font-sans font-bold text-xs uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Our Elite Consultants
          </span>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A2540] tracking-tight">
            Meet Our Specialist <span className="text-[#007BFF]">Dental Surgeons</span>
          </h2>
          <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed">
            Leading Bandra’s dental legacy with postgraduate qualifications (MDS), international certifications, and compassionate surgical expertise.
          </p>
        </div>

        {/* Doctors Layout Cards */}
        <div id="doctors-list" className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              id={`doctor-card-${doc.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-shadow hover:scale-[1.01] transition-all duration-300 flex flex-col sm:flex-row text-left group"
            >
              {/* Doctor Portrait - STRICTLY INDIAN ONLY */}
              <div className="relative w-full sm:w-2/5 min-h-[280px] sm:min-h-full bg-slate-100 overflow-hidden">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* Qualification badge */}
                <div className="absolute top-4 left-4 bg-[#0A2540] text-white font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded font-bold shadow-md">
                  MDS Specialist
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 sm:p-8 w-full sm:w-3/5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[#007BFF]">
                    <Stethoscope className="w-4 h-4" />
                    <span className="font-sans text-xs font-semibold uppercase tracking-wider">{doc.title}</span>
                  </div>
                  
                  <h3 className="font-sans font-bold text-2xl text-[#0A2540]">
                    {doc.name}
                  </h3>
                  
                  {/* Experience Badge */}
                  <div className="flex items-center gap-1.5 text-[#007BFF] bg-blue-50 rounded-full px-3 py-1 w-max border border-blue-100/30">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-sans text-xs font-bold">{doc.experience}</span>
                  </div>

                  <p className="font-sans text-gray-500 text-xs sm:text-sm leading-relaxed pt-2">
                    {doc.about}
                  </p>
                </div>

                {/* Additional Credentials List */}
                <div className="space-y-2.5 pt-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    <GraduationCap className="w-4 h-4 text-[#0A2540] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-sans text-[9px] font-bold text-gray-400 uppercase leading-none">Education</span>
                      <span className="font-sans text-xs font-bold text-gray-700">{doc.qualification}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-sans text-[9px] font-bold text-emerald-500 uppercase leading-none">Core Specialties</span>
                      <span className="font-sans text-xs text-gray-600 leading-snug">{doc.specialization}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Patient Slot Actions */}
                <div className="pt-2">
                  <button
                    onClick={() => onBookDoctor(doc.name)}
                    className="w-full flex items-center justify-center gap-2 bg-[#0A2540] hover:bg-[#007BFF] text-white font-sans font-bold text-xs py-3 rounded-full transition-all duration-200 cursor-pointer shadow-md active:scale-98"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Request Slot with {doc.name}</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Professional Standards Banner */}
        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 text-left">
          <div className="bg-white p-3 rounded-xl shadow-md flex items-center justify-center border border-blue-100 self-start md:self-center">
            <Award className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-sans font-extrabold text-base text-[#0A2540]">Mumbai Dental Council Governance</h4>
            <p className="font-sans text-slate-600 text-sm leading-relaxed">
              All clinical consultants at Ganatras Dental Care are fully registered in active standing with the Maharashtra State Dental Council (MSDC), practicing in strict observation of Indian Dental Association (IDA) guidelines on sterilization and hygiene.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
