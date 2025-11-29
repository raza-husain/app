# SECTION 3: EVENTS PORTAL - Implementation Summary

## Overview
The Events Portal serves as the official hub for all spiritual, cultural, and community events organized at the Dargah Mehfil-e-Hasani in Mulund West, Mumbai.

## Color Theme
- **Primary Dark Green**: #1b4d3e
- **Golden Accent**: #d4af37
- **Professional & Beautiful**: Maintains elegance with dark green headers and golden highlights

---

## 3.1 Urs Updates ✨

### Purpose
Real-time information hub for the annual Urs of Hazrat Sufi Syed Mansoor-ul-Hasan Shah (R.A.), held approximately 40 days after Eid-ul-Fitr.

### Screen: UrsUpdatesScreen.tsx
Located in: `src/screens/UrsUpdatesScreen.tsx`

### Features
- **Category Filtering**: Browse events by category
  - Schedule: Main event timings and ceremonies
  - Qawwali: Music performances and spiritual gatherings
  - Discourse: Educational sessions and spiritual teachings
  - Langar: Community meal arrangements
  - Procession: Festival processions and celebrations
  - Practical: Visitor guidelines and logistics

- **Event Cards**: Beautiful cards displaying:
  - Event title and category badge
  - Date and time information
  - Detailed description
  - Category-specific icons and colors

### Data Source
File: `src/data/ursEvents.ts` - ursUpdates array

### Events Covered
1. **Urs Inauguration & Opening Ceremony** - Day 1 Morning
   - Grand opening ceremony with prayers and invocations

2. **Special Zikr Gathering** - Day 1 Evening
   - Collective remembrance in presence of spiritual leaders

3. **Grand Qawwali Night** - Day 1 Night
   - Soulful performances by renowned masters

4. **Mehfil-e-Sama** - Day 2 Evening
   - Spiritual gathering with music performances

5. **Discourse on Silsila & Teachings** - Day 2 Afternoon
   - Educational lectures by senior scholars

6. **Langar Distribution** - Throughout Urs
   - Community meals served continuously

7. **Urs Procession** - Day 3 Morning
   - Magnificent procession honoring the saint

8. **Visitor Guidelines & Parking** - Pre-Urs
   - Entry procedures and safety measures

9. **Accommodation & Logistics** - Throughout Urs
   - Booking and transportation assistance

10. **Concluding Ceremony & Dua** - Final Day Evening
    - Closing ceremony with collective prayers

---

## 3.2 Urs History Archive 📚

### Purpose
Curated library preserving the heritage of previous Urs celebrations, allowing seekers to understand the evolution and significance of this blessed annual gathering.

### Screen: UrsHistoryScreen.tsx
Located in: `src/screens/UrsHistoryScreen.tsx`

### Features
- **Expandable Timeline Cards**:
  - Year badges with dark green background
  - Chronological display of celebrations
  - Expandable sections for detailed information

- **Historical Data Includes**:
  - Year and Islamic date
  - Event summary and context
  - Key highlights (5-7 per year)
  - Attendance figures
  - Major milestones

- **Visual Elements**:
  - Timeline dots connecting events
  - Golden accent colors
  - Legacy section highlighting eternal significance
  - Professional dark green theme

### Data Source
File: `src/data/ursEvents.ts` - ursHistory array

### Archive Entries
1. **2024 Urs** - 10th Zilqad 1445 AH
   - 25,000+ devotees
   - International participation
   - Grand Qawwali performances
   - Youth initiatives launched

2. **2023 Urs** - 10th Zilqad 1444 AH
   - 20,000+ devotees
   - Learning center opening
   - Interfaith participation
   - Medical camps for needy

3. **2022 Urs** - 10th Zilqad 1443 AH
   - 18,000+ devotees
   - Post-pandemic revival
   - Multiple Qawwali stages
   - Enhanced security

4. **2021 Urs** - 10th Zilqad 1442 AH
   - 8,000+ devotees
   - Pandemic-restricted gathering
   - Virtual participation (50+ countries)
   - Digital documentation

---

## 3.3 Major Events Calendar 📅

### Purpose
Comprehensive calendar covering monthly and yearly commemorations, ensuring devotees never miss important spiritual dates.

### Screen: MajorEventsScreen.tsx
Located in: `src/screens/MajorEventsScreen.tsx`

### Features
- **Tab Navigation**:
  - Annual Events tab
  - Monthly Commemorations tab

- **Event Cards Display**:
  - Event title and icon
  - Islamic and Gregorian dates
  - Detailed descriptions
  - Spiritual significance
  - Professional styling with dark green accents

- **Calendar Notes**:
  - Explanation of lunar calendar variations
  - Reminders to check with Khanqah
  - Professional advisory information

---

### 3.3.1 Monthly Commemorations 🌙

**10th & 11th Monthly**
- **Ghaus Paak Commemoration**
  - Anniversary of Hazrat Sheikh Abdul Qadir Jilani (R.A.)
  - Founder of Qadri order
  - Special prayers and remembrance

- **Hazrat Mansoor-ul-Hasan Shah Anniversary**
  - Monthly remembrance of the saint
  - Zikr circles and Majalis
  - Honoring the Khanqah founder

**24th Monthly**
- **Hazrat Mohammad Nabi Raza Sarkar Anniversary**
  - Commemoration of spiritual guide
  - Special gatherings and discourses
  - Acknowledging spiritual contributions

---

### 3.3.2 Annual Events 🎉

**12th Rabi-ul-Awwal** (September - October)
- **Mawlid-un-Nabi** (Birth of Prophet Muhammad ﷺ)
  - Celebration of the Final Prophet
  - Special prayers and Qawwali
  - Collective remembrance

**11th Rabi-us-Sani** (November - December)
- **Urs of Ghaus-e-Azam** (Sheikh Abdul Qadir Jilani)
  - Greatest saint in Islamic tradition
  - Devotees seek his intercession
  - Grand celebration

**15th Shabaan** (February - March)
- **Shab-e-Baraat** (Night of Recompense)
  - Night of divine forgiveness
  - Prayer and spiritual elevation
  - Qawwali performances

**27th Rajab** (January - February)
- **Shab-e-Mi'raj** (Night of Ascension)
  - Prophet's miraculous journey to heaven
  - Special prayers and discourses
  - Commemoration of divine miracle

**10th Zilqad** (April - May)
- **Urs of Hazrat Syed Mansoor-ul-Hasan Shah (R.A.)**
  - **MAIN ANNUAL CELEBRATION**
  - Approximately 40 days after Eid-ul-Fitr
  - Grand gathering of thousands
  - Celebrating the saint's spiritual legacy

---

## Technical Implementation

### File Structure
```
src/
├── data/
│   ├── ursEvents.ts          # All Urs and event data
│   ├── dargahInfo.ts         # Dargah information
│   ├── services.ts           # Available services
│   ├── facilities.ts         # Facilities information
│   ├── events.ts             # Regular events
│   └── visitorGuide.ts       # Visitor guidelines
├── screens/
│   ├── UrsUpdatesScreen.tsx      # Urs events portal
│   ├── UrsHistoryScreen.tsx      # Historical archive
│   ├── MajorEventsScreen.tsx     # Calendar events
│   ├── HomeScreen.tsx            # Main home
│   ├── ServicesScreen.tsx        # Services info
│   ├── FacilitiesScreen.tsx      # Facilities info
│   ├── VisitorGuideScreen.tsx    # Visitor guidelines
│   └── EventsScreen.tsx          # Regular events
├── components/
│   ├── Cards.tsx             # Reusable card components
│   └── Navigation.tsx        # Navigation components
├── types/
│   └── index.ts             # TypeScript interfaces
└── App.tsx                  # Main app component
```

### Navigation Structure
```
Bottom Navigation (Scrollable):
├── Home 🏠
├── Services 🎯
├── Facilities 🏛️
├── Guide 📖
├── Events 🎉
├── Urs ✨              [NEW - Urs Updates]
├── History 📚          [NEW - Urs Archive]
└── Calendar 📅         [NEW - Major Events]
```

### Color Scheme
- **Header Background**: #1b4d3e (Dark Green)
- **Header Text**: White (#fff)
- **Subtitle/Accents**: #d4af37 (Golden)
- **Card Headers**: #1b4d3e (Dark Green)
- **Active Navigation**: #d4af37 (Golden border)
- **Section Titles**: #1b4d3e (Dark Green)
- **Text**: #555 - #666 (Professional Gray)
- **Backgrounds**: White with light gray (#f5f5f5, #f9f9f9)

---

## Data Types (src/types/index.ts Extensions)

### UrsEvent
```typescript
interface UrsEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  category: 'schedule' | 'qawwali' | 'discourse' | 'langar' | 'practical' | 'procession';
}
```

### UrsHistoryEntry
```typescript
interface UrsHistoryEntry {
  id: string;
  year: number;
  date: string;
  title: string;
  summary: string;
  highlights: string[];
  attendance: string;
}
```

### MonthlyCommemoration
```typescript
interface MonthlyCommemoration {
  id: string;
  date: string;
  monthDay: string;
  title: string;
  description: string;
  significance: string;
  icon: string;
}
```

### AnnualEvent
```typescript
interface AnnualEvent {
  id: string;
  islamicDate: string;
  gregorianDate: string;
  title: string;
  description: string;
  significance: string;
  icon: string;
}
```

---

## Key Features

### 1. Urs Updates Screen
- ✅ Real-time event information
- ✅ Category-based filtering
- ✅ Color-coded event categories
- ✅ Complete schedule details
- ✅ Timing and logistics information

### 2. Urs History Screen
- ✅ Timeline view of past celebrations
- ✅ Expandable event details
- ✅ Historical highlights and attendance
- ✅ Legacy preservation
- ✅ Year-based organization

### 3. Major Events Calendar
- ✅ Dual-tab interface (Annual & Monthly)
- ✅ Islamic and Gregorian dates
- ✅ Comprehensive event descriptions
- ✅ Spiritual significance notes
- ✅ Calendar information and guidance

### 4. Professional Design
- ✅ Dark green (#1b4d3e) and golden (#d4af37) theme
- ✅ Consistent card-based layouts
- ✅ Intuitive navigation
- ✅ Clear typography and spacing
- ✅ Icon-enhanced visual communication

---

## How to Use

### Access Urs Updates
1. Open the app
2. Navigate to bottom menu
3. Tap on "Urs ✨" button
4. Filter events by category or view all
5. Tap individual event cards for details

### Access Historical Records
1. Navigate to "History 📚" button
2. View timeline of past Urs celebrations
3. Tap year badge to expand details
4. Read highlights, attendance, and legacy information

### Access Event Calendar
1. Navigate to "Calendar 📅" button
2. Switch between "Annual Events" and "Monthly Commemorations" tabs
3. View event dates (both Islamic and Gregorian)
4. Read descriptions and spiritual significance
5. Note about lunar calendar variations

---

## Future Enhancement Possibilities

1. **Real-time Notifications**: Push notifications for upcoming events
2. **Event Registration**: Online registration for Urs and major events
3. **Live Streaming**: Links to live streams of events
4. **Prayer Times**: Integration with accurate prayer time calculations
5. **Share Features**: Share events on social media
6. **Reminders**: Set personal reminders for important dates
7. **Multilingual Support**: Arabic, English, Urdu translations
8. **Image Gallery**: Photo galleries from past Urs celebrations
9. **Accommodation Portal**: Integrated booking system
10. **Community Feedback**: User reviews and testimonials

---

## Installation & Running

```bash
# Install dependencies
npm install

# Run the app
npm start

# For specific platforms
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
```

---

## Conclusion

The Events Portal provides comprehensive, beautifully designed access to all spiritual and cultural events at the Dargah Mehfil-e-Hasani. With professional dark green and golden theming, the interface serves devotees locally and internationally, keeping them informed about the sacred celebrations and preserving the rich heritage of the Hasni Silsila.

---

**Last Updated**: November 29, 2025
**Theme**: Dark Green (#1b4d3e) & Golden (#d4af37)
**Professional Status**: ✅ Complete
