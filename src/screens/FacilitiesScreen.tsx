import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
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
        onBack={() => onNavigate?.('home')}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingVertical: 8,
  },
  spacing: {
    height: 20,
  },
});
