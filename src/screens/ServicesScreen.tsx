import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { services } from '../data/services';
import { Header, SectionHeader } from '../components/Navigation';
import { ServiceCard } from '../components/Cards';

type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar';

interface ServicesScreenProps {
  onNavigate?: (screen: Screen) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({ onNavigate }) => {
  // merged view: show all services, but highlight available ones
  const displayServices = services;

  return (
    <View style={styles.container}>
      <Header 
        title="Services"
        subtitle="Service to humanity is service to God. Purification of the heart is the highest form of worship."
        onBack={() => onNavigate?.('home')}
      />

      <ScrollView style={styles.content} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {displayServices.map((service) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={`${service.name}${service.timing ? '' : ''}${service.available ? ' • Available Now' : ''}`}
            description={`${service.description}${service.timing ? `\n\n🕐 ${service.timing}` : ''}`}
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
