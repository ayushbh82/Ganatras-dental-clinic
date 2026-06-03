/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Treatment {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  iconName: string; // Dynamic icon reference from lucide-react
  image: string; // Image URL
  features: string[]; // Key advantages of this treatment
  duration: string; // Average duration
  recovery: string; // Recovery period details
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  qualification: string;
  experience: string;
  specialization: string;
  about: string;
  image: string;
  timing: string;
  days: string[];
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  avatarInitials: string;
  avatarBg: string;
  treatmentUsed?: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'clinic' | 'equipment' | 'results' | 'consultation';
  image: string;
}

export interface WhyChooseUsCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Appointment {
  id: string;
  name: string;
  mobile: string;
  email: string;
  date: string;
  time: string;
  treatment: string;
  message: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt: string;
}
