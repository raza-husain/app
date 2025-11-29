import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated, TouchableOpacity } from 'react-native';
import { ursHistory } from '../data/ursEvents';
import { Header, SectionHeader } from '../components/Navigation';

type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar';

interface UrsHistoryScreenProps {
  onNavigate?: (screen: Screen) => void;
}

interface HistoryCardProps {
  year: number;
  date: string;
  title: string;
  summary: string;
  highlights: string[];
  attendance: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  year,
  date,
  title,
  summary,
  highlights,
  attendance,
  isExpanded,
  onToggle
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader} onTouchEnd={onToggle}>
        <View style={styles.yearBadge}>
          <Text style={styles.yearText}>{year}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDate}>📅 {date}</Text>
        </View>
        <Text style={styles.toggleIcon}>{isExpanded ? '▼' : '▶'}</Text>
      </View>

      {isExpanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.summaryText}>{summary}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🌟 Key Highlights</Text>
            {highlights.map((highlight, idx) => (
              <View key={idx} style={styles.highlightItem}>
                <Text style={styles.highlightBullet}>•</Text>
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>

          <View style={styles.attendanceBox}>
            <Text style={styles.attendanceLabel}>Attendance</Text>
            <Text style={styles.attendanceNumber}>{attendance}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export const UrsHistoryScreen: React.FC<UrsHistoryScreenProps> = ({ onNavigate }) => {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <Header 
        title="Urs History Archive"
        subtitle="Legacy of sacred celebrations"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Previous Urs Celebrations" icon="📚" />
        
        <View style={styles.timeline}>
          {ursHistory.map((entry) => (
            <View key={entry.id} style={styles.timelineItem}>
              {expandedYear !== entry.year && (
                <View style={styles.timelineDot} />
              )}
              <HistoryCard
                year={entry.year}
                date={entry.date}
                title={entry.title}
                summary={entry.summary}
                highlights={entry.highlights}
                attendance={entry.attendance}
                isExpanded={expandedYear === entry.year}
                onToggle={() => setExpandedYear(expandedYear === entry.year ? null : entry.year)}
              />
            </View>
          ))}
        </View>

        <View style={styles.legacySection}>
          <Text style={styles.legacyTitle}>✨ The Eternal Legacy</Text>
          <Text style={styles.legacyText}>
            The Urs celebrations of Hazrat Sufi Syed Mansoor-ul-Hasan Shah (R.A.) stand as a testament to the spiritual heritage and profound impact of the saint's teachings. Each year, thousands of devotees from across the world gather to honor his memory, seek his intercession, and continue the mission of spiritual purification and service.
          </Text>
          <Text style={styles.legacyText}>
            These sacred gatherings embody the principles of unity, compassion, and devotion that defined the saint's life and continue to guide the Hasni Silsila.
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
  timeline: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  timelineItem: {
    marginVertical: 8,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: -24,
    top: 30,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#d4af37',
    zIndex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#1b4d3e',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  yearBadge: {
    backgroundColor: '#1b4d3e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 12,
  },
  yearText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d4af37',
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
  },
  toggleIcon: {
    fontSize: 16,
    color: '#d4af37',
    fontWeight: '700',
  },
  expandedContent: {
    padding: 16,
    backgroundColor: '#fff',
  },
  summaryText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  section: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1b4d3e',
    marginBottom: 10,
  },
  highlightItem: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'flex-start',
  },
  highlightBullet: {
    color: '#d4af37',
    fontWeight: '700',
    marginRight: 8,
    marginTop: 2,
  },
  highlightText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    lineHeight: 16,
  },
  attendanceBox: {
    backgroundColor: '#1b4d3e',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  attendanceLabel: {
    fontSize: 11,
    color: '#d4af37',
    fontWeight: '600',
  },
  attendanceNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginTop: 4,
  },
  legacySection: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  legacyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1b4d3e',
    marginBottom: 12,
  },
  legacyText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginBottom: 10,
  },
  spacing: {
    height: 20,
  },
});
