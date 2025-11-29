import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { dargahInfo, aboutDargah } from '../data/dargahInfo';
import { Header, SectionHeader } from '../components/Navigation';
import { InfoCard } from '../components/Cards';

type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar';

interface HomeScreenProps {
  onNavigate?: (screen: Screen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const navItems: { id: Screen; label: string; icon: string }[] = [
    { id: 'services', label: 'Services', icon: '🎯' },
    { id: 'facilities', label: 'Facilities', icon: '🏛️' },
    { id: 'guide', label: 'Visitor Guide', icon: '📖' },
    { id: 'events', label: 'Events', icon: '🎉' },
    { id: 'urs', label: 'Urs Updates', icon: '✨' },
    { id: 'history', label: 'History', icon: '📚' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header 
        title={dargahInfo.name}
        subtitle="A Sacred Journey"
      />

      <View style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>Welcome to Dargah Sharif</Text>
          <Text style={styles.infoBoxText}>{dargahInfo.description}</Text>
        </View>

        <SectionHeader title="Quick Information" icon="ℹ️" />
        <View style={styles.quickInfo}>
          <InfoItem label="📍 Location" value={dargahInfo.location} />
          <InfoItem label="⏰ Timing" value={dargahInfo.timing} />
          <InfoItem label="📞 Phone" value={dargahInfo.phone} />
          <InfoItem label="🌐 Website" value={dargahInfo.website || 'Coming Soon'} />
        </View>

        <SectionHeader title="Explore" icon="🗺️" />
        <View style={styles.navGrid}>
          {navItems.map((item) => (
            <View key={item.id} style={styles.navCard}>
              <TouchableOpacity
                style={styles.navCardContent}
                onPress={() => onNavigate?.(item.id)}
              >
                <Text style={styles.navCardIcon}>{item.icon}</Text>
                <Text style={styles.navCardLabel}>{item.label}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <SectionHeader title="About the Dargah" icon="📖" />
        {aboutDargah.map((item) => (
          <InfoCard key={item.title} title={item.title} content={item.content} />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🙏 May your visit be blessed with peace and spiritual enrichment
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoItemLabel}>{label}</Text>
    <Text style={styles.infoItemValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingVertical: 8,
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 8,
  },
  infoBoxTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  infoBoxText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  quickInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoItemLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  infoItemValue: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
  },
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  navCard: {
    width: '33.333%',
    padding: 8,
    alignItems: 'center',
  },
  navCardContent: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  navCardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  navCardLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1b4d3e',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#2c3e50',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
