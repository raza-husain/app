import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { ursUpdates } from '../data/ursEvents';
import { Header, SectionHeader, TabNavigation } from '../components/Navigation';

type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar';

interface UrsUpdatesScreenProps {
  onNavigate?: (screen: Screen) => void;
}

interface UrsUpdateCardProps {
  title: string;
  date: string;
  time: string;
  description: string;
  category: string;
  icon: string;
}

const UrsUpdateCard: React.FC<UrsUpdateCardProps> = ({ title, date, time, description, category, icon }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'schedule':
        return '#d4af37';
      case 'qawwali':
        return '#f39c12';
      case 'discourse':
        return '#3498db';
      case 'langar':
        return '#e74c3c';
      case 'procession':
        return '#9b59b6';
      case 'practical':
        return '#1abc9c';
      default:
        return '#d4af37';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'schedule':
        return '📅';
      case 'qawwali':
        return '🎵';
      case 'discourse':
        return '📖';
      case 'langar':
        return '🍲';
      case 'procession':
        return '👥';
      case 'practical':
        return 'ℹ️';
      default:
        return '✨';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{getCategoryIcon(category)}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={[styles.categoryTag, { backgroundColor: getCategoryColor(category) }]}>
            {category.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.detailText}>📅 {date}</Text>
        <Text style={styles.detailText}>🕐 {time}</Text>
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

export const UrsUpdatesScreen: React.FC<UrsUpdatesScreenProps> = ({ onNavigate }) => {
  const categories = ['All', 'Schedule', 'Qawwali', 'Discourse', 'Langar', 'Procession', 'Practical'];
  const [activeCategory, setActiveCategory] = useState(0);

  const filteredUpdates = activeCategory === 0 
    ? ursUpdates 
    : ursUpdates.filter(u => u.category === categories[activeCategory].toLowerCase());

  return (
    <View style={styles.container}>
      <Header 
        title="Urs Updates 2024"
        subtitle="Annual celebration of Hazrat Mansoor-ul-Hasan Shah (R.A.)"
      />
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map((cat, idx) => (
          <View
            key={idx}
            style={[
              styles.categoryButton,
              activeCategory === idx && styles.categoryButtonActive
            ]}
            onTouchEnd={() => setActiveCategory(idx)}
          >
            <Text style={[
              styles.categoryButtonText,
              activeCategory === idx && styles.categoryButtonTextActive
            ]}>
              {cat}
            </Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title={`${filteredUpdates.length} Events Found`} icon="🎉" />
        {filteredUpdates.map((update) => (
          <UrsUpdateCard
            key={update.id}
            title={update.title}
            date={update.date}
            time={update.time}
            description={update.description}
            category={update.category}
            icon="✨"
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
  categoryScroll: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonActive: {
    backgroundColor: '#1b4d3e',
    borderColor: '#d4af37',
    borderWidth: 2,
  },
  categoryButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#d4af37',
  },
  content: {
    flex: 1,
    paddingVertical: 8,
  },
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
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1b4d3e',
    marginBottom: 6,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  cardDetails: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  detailText: {
    fontSize: 12,
    color: '#555',
    marginVertical: 2,
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  spacing: {
    height: 20,
  },
});
