import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { facilities } from '../data/facilities';
import { Header, SectionHeader } from '../components/Navigation';
import { FacilityCard } from '../components/Cards';

type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar';

interface FacilitiesScreenProps {
  onNavigate?: (screen: Screen) => void;
}

export const FacilitiesScreen: React.FC<FacilitiesScreenProps> = ({ onNavigate }) => {
  return (
    <View style={styles.container}>
      <Header 
        title="Facilities"
        subtitle="What we provide for visitors"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Available Facilities" icon="🏛️" />
        {facilities.map((facility) => (
          <FacilityCard
            key={facility.id}
            icon={facility.icon}
            name={facility.name}
            description={facility.description}
            location={facility.location}
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
