import AsyncStorage from '@react-native-async-storage/async-storage';

type Registration = {
  id: string;
  eventId: string;
  eventName: string;
  name: string;
  email: string;
  phone?: string;
  approved?: boolean;
  qrData?: string;
  createdAt: number;
};

const STORAGE_KEY = 'dargah.registrations.v1';

const registrations: Registration[] = [];
const subscribers: Array<() => void> = [];

const notify = () => subscribers.forEach(s => s());

const saveRegistrations = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  } catch (e) {}
};

const loadRegistrations = async () => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed: Registration[] = JSON.parse(raw);
    registrations.splice(0, registrations.length, ...parsed);
  } catch (e) {}
};

loadRegistrations();

let registrationTarget: { eventId: string; eventName: string; from?: string } | null = null;

export const setRegistrationTarget = (t: { eventId: string; eventName: string; from?: string } | null) => {
  registrationTarget = t;
};

export const getRegistrationTarget = () => registrationTarget;

export const addRegistration = (r: Omit<Registration, 'id' | 'approved' | 'qrData' | 'createdAt'>) => {

  const safeName = (r.eventName || 'event').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 40);
  const countForEvent = registrations.filter(x => x.eventId === r.eventId || x.eventName === r.eventName).length + 1;
  const id = `${safeName}_${countForEvent}`;
  const item: Registration = { ...r, id, approved: false, createdAt: Date.now() } as Registration;
  registrations.push(item);
  notify();

  void saveRegistrations();
  return item;
};

export const getRegistrations = () => registrations.slice().sort((a,b)=>b.createdAt - a.createdAt);

export const getRegistrationsByEmail = (email: string) => registrations.filter(r => r.email === email);

export const getRegistrationsByPhone = (phone: string) => registrations.filter(r => r.phone === phone);

export const approveRegistration = (id: string) => {
  const idx = registrations.findIndex(r => r.id === id);
  if (idx === -1) return null;
  registrations[idx].approved = true;

  const titleLine = registrations[idx].eventName || 'Event';
  const qrText = `${titleLine}
Approved for the event
Registration ID: ${registrations[idx].id}
Name: ${registrations[idx].name}
Phone Number: ${registrations[idx].phone || 'N/A'}
Email: ${registrations[idx].email || 'N/A'}`;
  registrations[idx].qrData = qrText;
  notify();
  void saveRegistrations();
  return registrations[idx];
};

export const subscribe = (fn: () => void) => {
  subscribers.push(fn);
  return () => {
    const i = subscribers.indexOf(fn);
    if (i !== -1) subscribers.splice(i, 1);
  };
};

export type { Registration };
