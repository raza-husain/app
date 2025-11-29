import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { upcomingEvents } from '../data/events';
import { Header, SectionHeader } from '../components/Navigation';
import { EventCard } from '../components/Cards';

type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar';

interface EventsScreenProps {
  onNavigate?: (screen: Screen) => void;
}

export const EventsScreen: React.FC<EventsScreenProps> = ({ onNavigate }) => {
  return (
    <View style={styles.container}>
      <Header 
        title="Events & Programs"
        subtitle="Celebrate with us"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Upcoming & Regular Events" icon="🎉" />
        {upcomingEvents.map((event) => (
          <EventCard
            key={event.id}
            name={event.name}
            date={event.date}
            time={event.time}
            description={event.description}
            significance={event.significance}
          />
        ))}
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
    backgroundColor: '#fff',
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
  spacing: {
    height: 20,
  },
});
