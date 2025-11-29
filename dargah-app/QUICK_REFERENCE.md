# 🎯 Events Portal - Quick Reference Guide

## Screen Navigation Map

```
APP HOME
    │
    ├─ 🏠 HOME SCREEN
    │   ├─ Dargah introduction
    │   ├─ Quick information (Location, Timing, Phone)
    │   └─ About sections (Intro, Legacy, Leadership, Activities)
    │
    ├─ 🎯 SERVICES SCREEN
    │   ├─ Weekly Zikr Gatherings
    │   ├─ Majalis (Spiritual Discourses)
    │   ├─ Langar (Community Meal)
    │   └─ 7 more services...
    │
    ├─ 🏛️ FACILITIES SCREEN
    │   ├─ Prayer Halls
    │   ├─ Ablution (Wudu) Facilities
    │   ├─ Zikr Circle Area
    │   └─ 7 more facilities...
    │
    ├─ 📖 GUIDE SCREEN
    │   ├─ Rules & Guidelines
    │   ├─ Etiquette
    │   ├─ Helpful Tips
    │   └─ Safety & Health
    │
    ├─ 🎉 EVENTS SCREEN
    │   ├─ Weekly Zikr Circle
    │   ├─ Majalis
    │   └─ Regular activities...
    │
    ├─ ✨ URS UPDATES SCREEN [NEW]
    │   ├─ Category Filters:
    │   │   ├─ All
    │   │   ├─ Schedule (Day 1-3 events)
    │   │   ├─ Qawwali (Music performances)
    │   │   ├─ Discourse (Teachings)
    │   │   ├─ Langar (Food service)
    │   │   ├─ Procession
    │   │   └─ Practical (Guidelines)
    │   └─ 10 detailed events
    │
    ├─ 📚 HISTORY SCREEN [NEW]
    │   ├─ 2024 Urs (25,000+ devotees)
    │   ├─ 2023 Urs (20,000+ devotees)
    │   ├─ 2022 Urs (18,000+ devotees)
    │   ├─ 2021 Urs (8,000+ devotees)
    │   └─ Legacy section
    │
    └─ 📅 CALENDAR SCREEN [NEW]
        ├─ Tab 1: Annual Events
        │   ├─ Mawlid-un-Nabi (12th Rabi-ul-Awwal)
        │   ├─ Urs of Ghaus-e-Azam (11th Rabi-us-Sani)
        │   ├─ Shab-e-Baraat (15th Shabaan)
        │   ├─ Shab-e-Mi'raj (27th Rajab)
        │   └─ Urs of Mansoor-ul-Hasan Shah (10th Zilqad)
        │
        └─ Tab 2: Monthly Commemorations
            ├─ Ghaus Paak (10th & 11th)
            ├─ Mansoor-ul-Hasan Shah (10th & 11th)
            └─ Mohammad Nabi Raza (24th)
```

---

## 🎨 Component Hierarchy

```
App.tsx (Main App)
│
├─ Header Component
│   ├─ Title
│   └─ Subtitle
│
├─ Content Screen (8 options)
│   ├─ TabNavigation
│   ├─ SectionHeader
│   └─ Content Cards
│       ├─ ServiceCard
│       ├─ FacilityCard
│       ├─ GuideCard
│       ├─ EventCard
│       ├─ UrsUpdateCard
│       ├─ HistoryCard
│       └─ EventCalendarCard
│
└─ Bottom Navigation
    └─ 8 Scrollable Nav Items
```

---

## 🎨 Color Constants

```typescript
// Main Colors
const DARK_GREEN = '#1b4d3e';
const GOLDEN = '#d4af37';
const WHITE = '#fff';
const LIGHT_GRAY = '#f5f5f5';
const DARK_GRAY = '#555';

// Usage
DARK_GREEN    → Headers, titles, active states
GOLDEN        → Accents, subtitles, highlights
WHITE         → Backgrounds, card backgrounds
LIGHT_GRAY    → Alternative backgrounds
DARK_GRAY     → Body text
```

---

## 📊 Data File Summary

### ursEvents.ts
```typescript
// Exports:
- ursUpdates[]           // 10 Urs events with categories
- ursHistory[]           // 4 years of history
- monthlyCommerations[]  // 3 monthly events
- annualEvents[]         // 5 annual celebrations

// Interfaces:
- UrsEvent
- UrsHistoryEntry
- MonthlyCommemoration
- AnnualEvent
```

---

## 🚀 Navigation Item List

| Icon | Label | Screen | Route |
|------|-------|--------|-------|
| 🏠 | Home | HomeScreen | 'home' |
| 🎯 | Services | ServicesScreen | 'services' |
| 🏛️ | Facilities | FacilitiesScreen | 'facilities' |
| 📖 | Guide | VisitorGuideScreen | 'guide' |
| 🎉 | Events | EventsScreen | 'events' |
| ✨ | Urs | UrsUpdatesScreen | 'urs' |
| 📚 | History | UrsHistoryScreen | 'history' |
| 📅 | Calendar | MajorEventsScreen | 'calendar' |

---

## 📝 Category Colors (Urs Updates)

| Category | Color | Icon |
|----------|-------|------|
| Schedule | #d4af37 (Gold) | 📅 |
| Qawwali | #f39c12 (Orange) | 🎵 |
| Discourse | #3498db (Blue) | 📖 |
| Langar | #e74c3c (Red) | 🍲 |
| Procession | #9b59b6 (Purple) | 👥 |
| Practical | #1abc9c (Teal) | ℹ️ |

---

## 🎯 Key Features by Screen

### UrsUpdatesScreen
✅ Category filtering  
✅ Color-coded badges  
✅ Event timing details  
✅ Expandable descriptions  
✅ Multiple events (10)  

### UrsHistoryScreen
✅ Timeline visualization  
✅ Expandable cards  
✅ Year badges  
✅ Attendance stats  
✅ Key highlights  

### MajorEventsScreen
✅ Dual-tab interface  
✅ Islamic + Gregorian dates  
✅ Significance information  
✅ Calendar notes  
✅ Spiritual context  

---

## 📱 Responsive Layouts

All screens use:
- **ScrollView** for vertical scrolling content
- **Horizontal ScrollView** for navigation
- **Flex layouts** for responsive design
- **Card-based** UI patterns
- **Safe padding** and margins

---

## 🔄 State Management

### UrsUpdatesScreen
```typescript
const [activeCategory, setActiveCategory] = useState(0);
// Filters events by category
```

### UrsHistoryScreen
```typescript
const [expandedYear, setExpandedYear] = useState<number | null>(null);
// Expands/collapses history cards
```

### MajorEventsScreen
```typescript
const [activeTab, setActiveTab] = useState(0);
// Switches between Annual & Monthly tabs
```

---

## 📦 TypeScript Interfaces

All new interfaces defined in `src/data/ursEvents.ts`:

```typescript
interface UrsEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  category: 'schedule' | 'qawwali' | 'discourse' | 'langar' | 'practical' | 'procession';
}

interface UrsHistoryEntry {
  id: string;
  year: number;
  date: string;
  title: string;
  summary: string;
  highlights: string[];
  attendance: string;
}

interface MonthlyCommemoration {
  id: string;
  date: string;
  monthDay: string;
  title: string;
  description: string;
  significance: string;
  icon: string;
}

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

## 🎯 Events Covered

### Urs Updates (10 Events)
1. Inauguration (Day 1 AM)
2. Zikr Gathering (Day 1 PM)
3. Qawwali Night (Day 1 Night)
4. Mehfil-e-Sama (Day 2 PM)
5. Discourse (Day 2 Afternoon)
6. Langar (Throughout)
7. Procession (Day 3 AM)
8. Visitor Guidelines
9. Accommodation Support
10. Closing Ceremony (Final Day)

### Monthly Events (3)
- Ghaus Paak (10th & 11th)
- Mansoor-ul-Hasan Shah (10th & 11th)
- Mohammad Nabi Raza Sarkar (24th)

### Annual Events (5)
- Mawlid-un-Nabi
- Urs of Ghaus-e-Azam
- Shab-e-Baraat
- Shab-e-Mi'raj
- Urs of Mansoor-ul-Hasan Shah (MAIN)

---

## 💡 Tips for Customization

1. **Change Colors**: Edit constants in each screen
2. **Add Events**: Extend arrays in `ursEvents.ts`
3. **Modify Timings**: Update time fields in data
4. **Add Images**: Import Image component and add to cards
5. **Add Routes**: Extend navigation with new screens

---

**Last Updated**: November 29, 2025  
**Status**: ✅ Production Ready  
**Theme**: Dark Green & Golden Professional
