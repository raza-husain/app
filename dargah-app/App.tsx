import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { ServicesScreen } from './src/screens/ServicesScreen';
import { FacilitiesScreen } from './src/screens/FacilitiesScreen';
import { VisitorGuideScreen } from './src/screens/VisitorGuideScreen';
import { EventsScreen } from './src/screens/EventsScreen';
import { UrsUpdatesScreen } from './src/screens/UrsUpdatesScreen';
import { UrsHistoryScreen } from './src/screens/UrsHistoryScreen';
import { MajorEventsScreen } from './src/screens/MajorEventsScreen';

type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'services':
        return <ServicesScreen onNavigate={setCurrentScreen} />;
      case 'facilities':
        return <FacilitiesScreen onNavigate={setCurrentScreen} />;
      case 'guide':
        return <VisitorGuideScreen onNavigate={setCurrentScreen} />;
      case 'events':
        return <EventsScreen onNavigate={setCurrentScreen} />;
      case 'urs':
        return <UrsUpdatesScreen onNavigate={setCurrentScreen} />;
      case 'history':
        return <UrsHistoryScreen onNavigate={setCurrentScreen} />;
      case 'calendar':
        return <MajorEventsScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
