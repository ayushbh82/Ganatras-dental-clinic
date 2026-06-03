/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { 
  X, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Calendar, 
  Users, 
  Activity, 
  Database,
  Lock,
  Unlock,
  RefreshCw,
  Plus
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState('');
  
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Confirmed' | 'Cancelled'>('All');

  // Load appointments from localStorage
  const loadAppointments = () => {
    try {
      const stored = localStorage.getItem('ganatras_appointments');
      if (stored) {
        setAppointmentsList(JSON.parse(stored));
      } else {
        // High quality seed data for first view so dashboard looks full of metrics
        const seedData: Appointment[] = [
          {
            id: 'seed_1',
            name: 'Priya Sharma',
            mobile: '+91 98331 43321',
            email: 'priya.sharma@example.com',
            date: '2026-06-05',
            time: '11:00 AM',
            treatment: 'Smile Makeovers',
            message: 'Looking for a pre-wedding smile correction checkup.',
            status: 'Confirmed',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'seed_2',
            name: 'Vikram Grover',
            mobile: '+91 98224 88701',
            email: 'vikram.grover@example.com',
            date: '2026-06-06',
            time: '5:30 PM',
            treatment: 'Dental Implants',
            message: 'Need standard single tooth implant options explained.',
            status: 'Pending',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'seed_3',
            name: 'Aanya Deshmukh',
            mobile: '+91 98192 40050',
            email: 'aanya@example.com',
            date: '2026-06-08',
            time: '10:30 AM',
            treatment: 'Kids Dentistry',
            message: 'First dental diagnostic checkup for 5 yr old daughter.',
            status: 'Pending',
            createdAt: new Date().toISOString(),
          }
        ];
        localStorage.setItem('ganatras_appointments', JSON.stringify(seedData));
        setAppointmentsList(seedData);
      }
    } catch (err) {
      console.error('Error fetching admin slots list', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAppointments();
    }
  }, [isOpen]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use bandra west pincode or basic password
    if (pinCode === '400050' || pinCode.toLowerCase() === 'admin' || pinCode.toLowerCase() === 'bandrawest') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid PIN. Use Bandra Pincode, e.g., 400050, or type admin');
    }
  };

  const updateStatus = (id: string, newStatus: 'Confirmed' | 'Cancelled') => {
    const updated = appointmentsList.map(appt => {
      if (appt.id === id) {
        return { ...appt, status: newStatus };
      }
      return appt;
    });
    setAppointmentsList(updated);
    localStorage.setItem('ganatras_appointments', JSON.stringify(updated));
  };

  const deleteAppointment = (id: string) => {
    if (window.confirm('Are you sure you want to remove this requested appointment?')) {
      const filtered = appointmentsList.filter(appt => appt.id !== id);
      setAppointmentsList(filtered);
      localStorage.setItem('ganatras_appointments', JSON.stringify(filtered));
    }
  };

  const handleResetData = () => {
    if (window.confirm('Do you want to restore original default clinical slots metrics? This resets bookings.')) {
      localStorage.removeItem('ganatras_appointments');
      loadAppointments();
    }
  };

  // Calculations for KPI Cards
  const totalBookings = appointmentsList.length;
  const confirmedCount = appointmentsList.filter(a => a.status === 'Confirmed').length;
  const pendingCount = appointmentsList.filter(a => a.status === 'Pending').length;

  const filteredList = appointmentsList.filter(appt => {
    const matchesSearch = 
      appt.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      appt.mobile.includes(searchTerm) ||
      appt.treatment.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'All') return matchesSearch;
    return matchesSearch && appptStatus(appt.status);
  });

  function appptStatus(status: string) {
    return status === statusFilter;
  }

  if (!isOpen) return null;

  return (
    <div id="admin-panel shadow" className="fixed inset-0 z-50 bg-[#0A2540]/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl relative border border-slate-200/80 p-0 flex flex-col text-left">
        
        {/* Header bar */}
        <div className="bg-[#0A2540] text-white px-6 py-4 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-xl text-blue-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-extrabold text-lg leading-tight">Clinic Operation Portal</h3>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider">GANATRAS DENTAL SYSTEM v2.6.4</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentication Wall */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6 flex-1 flex flex-col justify-center">
            <div className="inline-flex bg-blue-50 text-blue-700 p-4 rounded-full border border-blue-100 mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h4 className="font-sans font-black text-2xl text-[#0A2540]">Access Restricted</h4>
              <p className="font-sans text-slate-500 text-sm leading-relaxed">
                Enter your security PIN or the clinic postal pincode to consult submitted bookings.
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter pin (Hint: 400050 or admin)"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full text-center border-2 border-slate-200 focus:border-blue-600 rounded-2xl px-4 py-3 bg-slate-50 font-sans font-black text-lg focus:outline-none tracking-widest [&::placeholder]:tracking-normal"
                />
                
                {pinError && (
                  <p className="text-xs text-rose-600 font-bold mt-2">{pinError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#0A2540] hover:bg-blue-600 text-white font-sans font-bold text-sm tracking-wide py-3.5 rounded-2xl shadow-md transition-all cursor-pointer"
              >
                Unlock Database
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Panel */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50">
            
            {/* Sidebar with Stats KPI */}
            <div className="w-full md:w-1/4 bg-white border-r border-slate-200 p-6 space-y-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <span className="font-sans font-extrabold text-xs text-slate-400 uppercase tracking-widest">KPI Overview</span>
                <button
                  onClick={loadAppointments}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded-lg hover:bg-slate-50"
                  title="Reload items list"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Stats values */}
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
                  <div className="bg-[#0A2540] text-white p-2.5 rounded-xl shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-xl font-bold text-[#0A2540] leading-none mb-1">{totalBookings}</span>
                    <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Enquiries</span>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-center gap-3">
                  <div className="bg-emerald-600 text-white p-2.5 rounded-xl shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-xl font-bold text-emerald-700 leading-none mb-1">{confirmedCount}</span>
                    <span className="text-[10px] text-emerald-500 font-bold tracking-wider uppercase">Confirmed</span>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex items-center gap-3">
                  <div className="bg-amber-600 text-white p-2.5 rounded-xl shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-xl font-bold text-amber-700 leading-none mb-1">{pendingCount}</span>
                    <span className="text-[10px] text-amber-500 font-bold tracking-wider uppercase">Pending</span>
                  </div>
                </div>
              </div>

              {/* Clear trigger info block */}
              <div className="pt-6 border-t border-slate-100 space-y-4 text-xs font-sans text-slate-500">
                <p>Manage dental inquiries instantly. Confirming a slot alerts the local operator scheduler team.</p>
                <button
                  onClick={handleResetData}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-4 rounded-xl cursor-pointer text-center text-xs transition-colors"
                >
                  Reset Clinic Data
                </button>
              </div>
            </div>

            {/* Main appointments list and filters */}
            <div className="flex-1 flex flex-col overflow-hidden p-6">
              
              {/* Filter inputs header */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
                
                {/* Search bar */}
                <div id="admin-search" className="relative w-full sm:max-w-md">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by patient name, treatment, cell..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-blue-600 font-sans"
                  />
                </div>

                {/* Status Tab buttons */}
                <div id="admin-filter-status" className="flex bg-slate-200/60 rounded-xl p-1 shrink-0">
                  {(['All', 'Pending', 'Confirmed', 'Cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`font-sans font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                        statusFilter === st
                          ? 'bg-white text-[#0A2540] shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

              </div>

              {/* Table / Cards List container */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {filteredList.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200/50">
                    <Users className="w-12 h-12 mx-auto text-slate-200 mb-2" />
                    <p className="font-sans text-sm font-bold">No clinic records matching filters found</p>
                    <p className="font-sans text-xs text-slate-400">Try clear filtering inputs or type standard search query.</p>
                  </div>
                ) : (
                  filteredList.map((appt) => (
                    <div
                      key={appt.id}
                      id={`admin-appt-${appt.id}`}
                      className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans text-xs sm:text-sm text-left relative"
                    >
                      {/* Left info */}
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-sans font-black text-[#0A2540] text-base leading-none mb-0.5">{appt.name}</h4>
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            appt.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : appt.status === 'Cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {appt.status}
                          </span>
                        </div>

                        {/* Cell and Email info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-500">
                          <p><b>Cell:</b> {appt.mobile}</p>
                          {appt.email && <p><b>Email:</b> {appt.email}</p>}
                        </div>

                        {/* Appointment detail slot */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-500">
                          <p><b>Slot:</b> {appt.date} • <span className="text-blue-600 font-bold">{appt.time}</span></p>
                          <p><b>Treatment:</b> <span className="text-slate-800 font-bold">{appt.treatment}</span></p>
                        </div>

                        {appt.message && (
                          <div className="mt-1 p-2.5 bg-slate-50 border border-slate-100 rounded-xl leading-relaxed text-slate-500 text-xs text-left max-w-lg italic">
                            "{appt.message}"
                          </div>
                        )}
                      </div>

                      {/* Right direct clinical actions */}
                      <div className="flex sm:flex-col gap-2 shrink-0 self-start sm:self-center items-stretch sm:items-end">
                        {appt.status === 'Pending' && (
                          <div className="flex gap-1.5 w-full">
                            <button
                              onClick={() => updateStatus(appt.id, 'Confirmed')}
                              className="flex items-center gap-1.2 font-sans font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Confirm</span>
                            </button>
                            <button
                              onClick={() => updateStatus(appt.id, 'Cancelled')}
                              className="flex items-center gap-1.2 font-sans font-bold text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 rounded-xl cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>
                        )}

                        <button
                          onClick={() => deleteAppointment(appt.id)}
                          className="bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-400 p-2 rounded-xl transition-colors shrink-0 cursor-pointer self-start sm:self-auto border border-slate-150"
                          title="Remove Entry log"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
