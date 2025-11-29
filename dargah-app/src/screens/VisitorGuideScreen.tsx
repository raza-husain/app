import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { visitorGuides } from '../data/visitorGuide';
import { Header, SectionHeader } from '../components/Navigation';
import { GuideCard } from '../components/Cards';

type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar';

interface VisitorGuideScreenProps {
  onNavigate?: (screen: Screen) => void;
}

export const VisitorGuideScreen: React.FC<VisitorGuideScreenProps> = ({ onNavigate }) => {
  const rulesGuides = visitorGuides.filter(g => g.category === 'rules');
  const tipsGuides = visitorGuides.filter(g => g.category === 'tips');
  const etiquetteGuides = visitorGuides.filter(g => g.category === 'etiquette');
  const safetyGuides = visitorGuides.filter(g => g.category === 'safety');

  return (
    <View style={styles.container}>
      <Header 
        title="Visitor Guide"
        subtitle="Tips for a respectful visit"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <SectionHeader title="Rules & Guidelines" icon="📋" />
          {rulesGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              icon={guide.icon}
              title={guide.title}
              content={guide.content}
              category={guide.category}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="Etiquette" icon="🙏" />
          {etiquetteGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              icon={guide.icon}
              title={guide.title}
              content={guide.content}
              category={guide.category}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="Helpful Tips" icon="💡" />
          {tipsGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              icon={guide.icon}
              title={guide.title}
              content={guide.content}
              category={guide.category}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="Safety & Health" icon="🏥" />
          {safetyGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              icon={guide.icon}
              title={guide.title}
              content={guide.content}
              category={guide.category}
            />
          ))}
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
  section: {
    marginVertical: 4,
  },
  spacing: {
    height: 20,
  },
});
