export interface UrsEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  category: 'schedule' | 'qawwali' | 'discourse' | 'langar' | 'practical' | 'procession';
}

export interface UrsHistoryEntry {
  id: string;
  year: number;
  date: string;
  title: string;
  summary: string;
  highlights: string[];
  attendance: string;
}

export interface MonthlyCommemoration {
  id: string;
  date: string;
  monthDay: string;
  title: string;
  description: string;
  significance: string;
  icon: string;
}

export interface AnnualEvent {
  id: string;
  islamicDate: string;
  gregorianDate: string;
  title: string;
  description: string;
  significance: string;
  icon: string;
}

export const ursUpdates: UrsEvent[] = [
  {
    id: 'urs-1',
    title: 'Urs Inauguration & Opening Ceremony',
    date: 'Day 1 - Morning',
    time: '8:00 AM onwards',
    description: 'Grand opening ceremony of the annual Urs of Hazrat Sufi Syed Mansoor-ul-Hasan Shah (R.A.). Featuring special prayers, welcome addresses, and spiritual invocations.',
    category: 'schedule'
  },
  {
    id: 'urs-2',
    title: 'Special Zikr Gathering',
    date: 'Day 1 - Evening',
    time: '5:00 PM - 8:00 PM',
    description: 'Collective Zikr in the presence of Sajjada Nashin and senior disciples. Experience the spiritual energy of thousands gathered in remembrance of Allah.',
    category: 'schedule'
  },
  {
    id: 'urs-3',
    title: 'Grand Qawwali Night - Inaugural',
    date: 'Day 1 - Night',
    time: '9:00 PM - 1:00 AM',
    description: 'Soulful Qawwali performances by renowned masters. Experience divine music that elevates the spirit and deepens connection with the Almighty.',
    category: 'qawwali'
  },
  {
    id: 'urs-4',
    title: 'Mehfil-e-Sama',
    date: 'Day 2 - Evening',
    time: '6:00 PM - 10:00 PM',
    description: 'A spiritual gathering featuring Qawwali and Sufi music performances. The atmosphere is charged with devotion and divine love.',
    category: 'qawwali'
  },
  {
    id: 'urs-5',
    title: 'Discourse on Silsila & Spiritual Teachings',
    date: 'Day 2 - Afternoon',
    time: '2:00 PM - 4:00 PM',
    description: 'Lectures by senior scholars on the teachings of Hazrat Mansoor-ul-Hasan Shah and the legacy of the Hasni Silsila.',
    category: 'discourse'
  },
  {
    id: 'urs-6',
    title: 'Langar Distribution - Grand Scale',
    date: 'Throughout Urs',
    time: 'Multiple seatings',
    description: 'Community meals served continuously. Thousands of devotees share in the blessed practice of Langar, symbolizing equality and brotherhood.',
    category: 'langar'
  },
  {
    id: 'urs-7',
    title: 'Urs Procession',
    date: 'Day 3 - Morning',
    time: '9:00 AM - 12:00 PM',
    description: 'A magnificent procession honoring the saint. Devotees from across the world participate in this sacred celebration of the Urs.',
    category: 'procession'
  },
  {
    id: 'urs-8',
    title: 'Visitor Guidelines & Parking Instructions',
    date: 'Pre-Urs',
    time: 'Contact Khanqah',
    description: 'Complete information on entry procedures, parking arrangements, crowd management, and visitor safety measures.',
    category: 'practical'
  },
  {
    id: 'urs-9',
    title: 'Accommodation & Logistics Support',
    date: 'Throughout Urs',
    time: 'Contact Khanqah',
    description: 'Assistance with accommodation booking, local transportation, and logistical arrangements for visiting devotees.',
    category: 'practical'
  },
  {
    id: 'urs-10',
    title: 'Concluding Ceremony & Dua',
    date: 'Final Day - Evening',
    time: '5:00 PM - 7:00 PM',
    description: 'Closing ceremony with special prayers and collective Dua. A spiritual culmination of the blessed Urs celebrations.',
    category: 'schedule'
  }
];

export const ursHistory: UrsHistoryEntry[] = [
  {
    id: 'urs-hist-1',
    year: 2024,
    date: '10th Zilqad 1445 AH',
    title: 'Urs Celebration 2024',
    summary: 'A glorious celebration marked by unprecedented devotion and spiritual fervor. Thousands gathered from across the globe to honor the saint.',
    highlights: [
      'Record-breaking attendance from international devotees',
      'Special discourses on the life and teachings of the saint',
      'Grand Qawwali performances by legendary musicians',
      'Langar served to over 10,000 devotees daily',
      'Youth participation initiatives launched'
    ],
    attendance: '25,000+ devotees'
  },
  {
    id: 'urs-hist-2',
    year: 2023,
    date: '10th Zilqad 1444 AH',
    title: 'Urs Celebration 2023',
    summary: 'A testament to the eternal legacy of Hazrat Mansoor-ul-Hasan Shah. The celebration witnessed remarkable spiritual demonstrations.',
    highlights: [
      'Opening of new learning center',
      'Interfaith participation and harmony',
      'Live streaming of events for global reach',
      'Medical camps for the needy',
      'Community welfare initiatives'
    ],
    attendance: '20,000+ devotees'
  },
  {
    id: 'urs-hist-3',
    year: 2022,
    date: '10th Zilqad 1443 AH',
    title: 'Urs Celebration 2022',
    summary: 'Post-pandemic revival of full-scale celebrations. A jubilant gathering celebrating the return to traditional festivities.',
    highlights: [
      'Grand three-day celebration',
      'Multiple Qawwali stages and performances',
      'Scholar gatherings and Majalis',
      'Expanded Langar arrangements',
      'Enhanced security and crowd management'
    ],
    attendance: '18,000+ devotees'
  },
  {
    id: 'urs-hist-4',
    year: 2021,
    date: '10th Zilqad 1442 AH',
    title: 'Urs Celebration 2021',
    summary: 'A smaller but deeply spiritual gathering during pandemic restrictions. Online participation extended the reach globally.',
    highlights: [
      'Virtual participation from 50+ countries',
      'Limited physical gathering with safety protocols',
      'Digital documentation of spiritual practices',
      'Increased charitable relief efforts',
      'Mentorship programs for youth'
    ],
    attendance: '8,000+ devotees (physical & virtual combined)'
  }
];

export const monthlyCommerations: MonthlyCommemoration[] = [
  {
    id: 'monthly-1',
    date: '10th & 11th of Islamic month',
    monthDay: '10th & 11th Monthly',
    title: 'Ghaus Paak Commemoration',
    description: 'Anniversary of Hazrat Sheikh Abdul Qadir Jilani (R.A.), the founder of the Qadri order. A revered saint whose spiritual legacy continues to guide millions.',
    significance: 'Founder of Qadri Silsila',
    icon: '🕋'
  },
  {
    id: 'monthly-2',
    date: '10th & 11th of Islamic month',
    monthDay: '10th & 11th Monthly',
    title: 'Hazrat Mansoor-ul-Hasan Shah Anniversary',
    description: 'Monthly remembrance of Hazrat Sufi Syed Mansoor-ul-Hasan Shah (R.A.). A day for special Zikr and Majalis to honor the saint\'s legacy.',
    significance: 'Founder of the Khanqah',
    icon: '🧿'
  },
  {
    id: 'monthly-3',
    date: '24th of Islamic month',
    monthDay: '24th Monthly',
    title: 'Hazrat Mohammad Nabi Raza Sarkar Anniversary',
    description: 'Commemoration of Hazrat Mohammad Nabi Raza Sarkar. Special gatherings and Majalis dedicated to his spiritual contributions.',
    significance: 'Spiritual guide and scholar',
    icon: '📚'
  }
];

export const annualEvents: AnnualEvent[] = [
  {
    id: 'annual-1',
    islamicDate: '12th Rabi-ul-Awwal',
    gregorianDate: 'September - October (varies)',
    title: 'Mawlid-un-Nabi (Birth of Prophet Muhammad ﷺ)',
    description: 'Celebration of the birth of Prophet Muhammad ﷺ. A day of immense spiritual significance with special prayers, Qawwali performances, and collective remembrance.',
    significance: 'Birth of the Final Prophet',
    icon: '🌙'
  },
  {
    id: 'annual-2',
    islamicDate: '11th Rabi-us-Sani',
    gregorianDate: 'November - December (varies)',
    title: 'Urs of Ghaus-e-Azam (Sheikh Abdul Qadir Jilani)',
    description: 'Annual commemoration of the great saint and founder of the Qadri order. Devotees gather to honor his immense spiritual contributions and seek his intercession.',
    significance: 'Urs of greatest saint (Ghaus)',
    icon: '🕋'
  },
  {
    id: 'annual-3',
    islamicDate: '15th Shabaan',
    gregorianDate: 'February - March (varies)',
    title: 'Shab-e-Baraat (Night of Recompense)',
    description: 'The night when Allah forgives His servants. A night of prayer, Qawwali, and spiritual elevation. Seekers spend the night in devotion and remembrance.',
    significance: 'Night of forgiveness and mercy',
    icon: '⭐'
  },
  {
    id: 'annual-4',
    islamicDate: '27th Rajab',
    gregorianDate: 'January - February (varies)',
    title: 'Shab-e-Mi\'raj (Night of Ascension)',
    description: 'Commemoration of Prophet Muhammad\'s miraculous journey to heaven (Isra and Mi\'raj). Special prayers and spiritual discourses mark this blessed night.',
    significance: 'Prophet\'s ascension to heaven',
    icon: '✨'
  },
  {
    id: 'annual-5',
    islamicDate: '10th Zilqad',
    gregorianDate: 'April - May (varies)',
    title: 'Urs of Hazrat Syed Mansoor-ul-Hasan Shah (R.A.)',
    description: 'The grand annual celebration honoring the saint approximately 40 days after Eid-ul-Fitr. A magnificent gathering celebrating the spiritual legacy and teachings of the great saint.',
    significance: 'Main Urs celebration',
    icon: '🧿'
  }
];
