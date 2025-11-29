import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CardProps {
  title: string;
  icon: string;
  description: string;
}

export const ServiceCard: React.FC<CardProps> = ({ title, icon, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

interface InfoCardProps {
  title: string;
  content: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content }) => {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoContent}>{content}</Text>
    </View>
  );
};

interface GuideCardProps {
  title: string;
  content: string;
  icon: string;
  category: string;
}

export const GuideCard: React.FC<GuideCardProps> = ({ title, content, icon, category }) => {
  return (
    <View style={styles.guideCard}>
      <View style={styles.guidHeader}>
        <Text style={styles.guideIcon}>{icon}</Text>
        <Text style={styles.guideTitle}>{title}</Text>
      </View>
      <Text style={[styles.guideCategory, { color: getCategoryColor(category) }]}>
        {category.toUpperCase()}
      </Text>
      <Text style={styles.guideContent}>{content}</Text>
    </View>
  );
};

interface EventCardProps {
  name: string;
  date: string;
  time: string;
  description: string;
  significance: string;
}

export const EventCard: React.FC<EventCardProps> = ({ name, date, time, description, significance }) => {
  return (
    <View style={styles.eventCard}>
      <Text style={styles.eventName}>{name}</Text>
      <View style={styles.eventDetails}>
        <Text style={styles.eventLabel}>📅 {date}</Text>
        <Text style={styles.eventLabel}>🕐 {time}</Text>
      </View>
      <Text style={styles.eventDescription}>{description}</Text>
      <Text style={styles.eventSignificance}>✨ {significance}</Text>
    </View>
  );
};

interface FacilityCardProps {
  name: string;
  description: string;
  location: string;
  icon: string;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ name, description, location, icon }) => {
  return (
    <View style={styles.facilityCard}>
      <Text style={styles.facilityIcon}>{icon}</Text>
      <Text style={styles.facilityName}>{name}</Text>
      <Text style={styles.facilityDescription}>{description}</Text>
      <Text style={styles.facilityLocation}>📍 {location}</Text>
    </View>
  );
};

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'rules':
      return '#d32f2f';
    case 'tips':
      return '#1976d2';
    case 'etiquette':
      return '#f57c00';
    case 'safety':
      return '#388e3c';
    default:
      return '#666';
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  infoCard: {
    backgroundColor: '#f5f5f5',
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  infoContent: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  guideCard: {
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
  guidHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  guideIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  guideTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    flex: 1,
  },
  guideCategory: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
  },
  guideContent: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopWidth: 3,
    borderTopColor: '#d4af37',
  },
  eventName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },
  eventDetails: {
    marginBottom: 10,
  },
  eventLabel: {
    fontSize: 12,
    color: '#555',
    marginVertical: 3,
  },
  eventDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginVertical: 8,
  },
  eventSignificance: {
    fontSize: 12,
    color: '#d4af37',
    fontWeight: '600',
  },
  facilityCard: {
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
  facilityIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  facilityName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  facilityDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
  },
  facilityLocation: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '600',
  },
});
