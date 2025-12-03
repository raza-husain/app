export type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar' | 'register' | 'admin';

export interface DargahInfo {
  id: string;
  name: string;
  description: string;
  timing: string;
  location: string;
  phone: string;
  website?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  available: boolean;
  timing?: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  location: string;
  icon: string;
}

export interface VisitorGuide {
  id: string;
  title: string;
  content: string;
  category: 'rules' | 'tips' | 'etiquette' | 'safety';
  icon: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
  significance: string;
}
