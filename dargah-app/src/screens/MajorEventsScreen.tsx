import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { monthlyCommerations, annualEvents } from '../data/ursEvents';
import { Header, SectionHeader, TabNavigation } from '../components/Navigation';

type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar';

interface MajorEventsScreenProps {
  onNavigate?: (screen: Screen) => void;
}

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  significance: string;
  icon: string;
  isMonthly?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  title, 
  date, 
  description, 
  significance, 
  icon,
  isMonthly
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDate}>{date}</Text>
        </View>
      </View>

      <Text style={styles.cardDescription}>{description}</Text>

      <View style={styles.significanceBox}>
        <Text style={styles.significanceLabel}>Significance:</Text>
        <Text style={styles.significanceText}>{significance}</Text>
      </View>
    </View>
  );
};

export const MajorEventsScreen: React.FC<MajorEventsScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Annual Events', 'Monthly Commemorations'];

  return (
    <View style={styles.container}>
      <Header 
        title="Events Calendar"
        subtitle="Islamic and spiritual celebrations"
      />
      
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 0 ? (
          <>
            <SectionHeader title="Annual Commemorations" icon="📅" />
            <View style={styles.intro}>
              <Text style={styles.introText}>
                Significant Islamic dates and spiritual celebrations observed throughout the Islamic calendar year.
              </Text>
            </View>
            {annualEvents.map((event) => (
              <EventCard
                key={event.id}
                icon={event.icon}
                title={event.title}
                date={`${event.islamicDate} • ${event.gregorianDate}`}
                description={event.description}
                significance={event.significance}
              />
            ))}
          </>
        ) : (
          <>
            <SectionHeader title="Monthly Commemorations" icon="🌙" />
            <View style={styles.intro}>
              <Text style={styles.introText}>
                Regular monthly remembrances honoring the saints and spiritual guides.
              </Text>
            </View>
            {monthlyCommerations.map((event) => (
              <EventCard
                key={event.id}
                icon={event.icon}
                title={event.title}
                date={event.monthDay}
                description={event.description}
                significance={event.significance}
                isMonthly
              />
            ))}
          </>
        )}

        <View style={styles.calendarNote}>
          <Text style={styles.noteTitle}>📌 Note on Islamic Dates</Text>
          <Text style={styles.noteText}>
            Islamic dates are based on the lunar calendar (Hijri). Gregorian dates vary each year as the lunar year is approximately 11 days shorter than the solar year. Please check with the Khanqah for confirmed dates each year.
          </Text>
        </View>

        <View style={styles.spacing} />
      </ScrollView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => onNavigate?.('home')}
      >
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#d4af37',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1b4d3e',
  },
  content: {
    flex: 1,
    paddingVertical: 8,
  },
  intro: {
    backgroundColor: '#fff',
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  introText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1b4d3e',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginVertical: 10,
  },
  significanceBox: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#d4af37',
  },
  significanceLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1b4d3e',
    marginBottom: 4,
  },
  significanceText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  calendarNote: {
    backgroundColor: '#1b4d3e',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  noteTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#d4af37',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 12,
    color: '#e0e0e0',
    lineHeight: 16,
  },
  spacing: {
    height: 20,
  },
});
