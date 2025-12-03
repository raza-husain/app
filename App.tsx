import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { ServicesScreen } from './src/screens/ServicesScreen';
import { VisitorGuideScreen } from './src/screens/VisitorGuideScreen';
import { CombinedEventsScreen } from './src/screens/CombinedEventsScreen';
import { CombinedUrsScreen } from './src/screens/CombinedUrsScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AdminScreen from './src/screens/AdminScreen';
import { Screen } from './src/types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesScreen onNavigate={handleNavigate} />;
      case 'guide':
        return <VisitorGuideScreen onNavigate={handleNavigate} />;
      case 'events':
        return <CombinedEventsScreen onNavigate={handleNavigate} />;
      case 'urs':
        return <CombinedUrsScreen onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminScreen onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterScreen onNavigate={handleNavigate} />;
      case 'history':
        return <CombinedUrsScreen onNavigate={handleNavigate} />;
      case 'calendar':
        return <CombinedEventsScreen onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
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
