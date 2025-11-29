import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { ServicesScreen } from './src/screens/ServicesScreen';
import { FacilitiesScreen } from './src/screens/FacilitiesScreen';
import { VisitorGuideScreen } from './src/screens/VisitorGuideScreen';
// Replaced by combined screens: Events/Calendar -> CombinedEventsScreen, Urs/History -> CombinedUrsScreen
import CombinedEventsScreen from './src/screens/CombinedEventsScreen';
import CombinedUrsScreen from './src/screens/CombinedUrsScreen';

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
        return <CombinedEventsScreen onNavigate={setCurrentScreen} />;
      case 'urs':
        return <CombinedUrsScreen onNavigate={setCurrentScreen} />;
      case 'history':
        return <CombinedUrsScreen onNavigate={setCurrentScreen} />;
      case 'calendar':
        return <CombinedEventsScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  const androidPadding = Platform.OS === 'android' ? RNStatusBar.currentHeight || 0 : 0;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: androidPadding }]}> 
      {renderScreen()}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
