import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { services } from '../data/services';
import { Header, SectionHeader, TabNavigation } from '../components/Navigation';
import { ServiceCard } from '../components/Cards';

type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar';

interface ServicesScreenProps {
  onNavigate?: (screen: Screen) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState(0);

  const allServices = services;
  const availableServices = services.filter(s => s.available);
  const tabs = ['All Services', 'Available Now'];
  const displayServices = activeTab === 0 ? allServices : availableServices;

  return (
    <View style={styles.container}>
      <Header 
        title="Services & Facilities"
        subtitle="Everything you need for a comfortable visit"
      />
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title={tabs[activeTab]} icon="🎯" />
        {displayServices.map((service) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={`${service.name}${service.timing ? ' ⏰' : ''}`}
            description={`${service.description}${service.timing ? `\n\n🕐 ${service.timing}` : ''}`}
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
