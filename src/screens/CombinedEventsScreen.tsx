import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { upcomingEvents } from '../data/events';
import { monthlyCommerations, annualEvents } from '../data/ursEvents';
import { Header, SectionHeader, TabNavigation } from '../components/Navigation';
import { EventCard } from '../components/Cards';

type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar';

interface CombinedEventsProps {
  onNavigate?: (screen: Screen) => void;
}

export const CombinedEventsScreen: React.FC<CombinedEventsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Upcoming Events', 'Calendar'];
  const [isAdminModalVisible, setAdminModalVisible] = useState(false);

  // local copies to show admin additions immediately
  const [upcomingList, setUpcomingList] = useState(upcomingEvents);
  const [annualList, setAnnualList] = useState(annualEvents);
  const [monthlyList, setMonthlyList] = useState(monthlyCommerations);

  const [form, setForm] = useState<any>({ name:'', date:'', time:'', description:'', significance:'', title:'', islamicDate:'', gregorianDate:'', monthDay:'', icon:'' });

  return (
    <View style={styles.container}>
      <Header title="Events & Calendar" subtitle="All events and calendar in one place" />

      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Admin add button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setAdminModalVisible(true)}>
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>

      <ScrollView style={styles.content} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {activeTab === 0 ? (
          <>
            <SectionHeader title="Upcoming & Regular Events" icon="🎉" />
            {upcomingList.map((event) => (
              <EventCard
                key={event.id}
                name={event.name}
                date={event.date}
                time={event.time}
                description={event.description}
                significance={event.significance}
              />
            ))}
          </>
        ) : (
          <>
            <SectionHeader title="Annual Commemorations" icon="📅" />
            {annualList.map((event) => (
              <EventCard
                key={event.id}
                name={event.title}
                date={`${event.islamicDate} • ${event.gregorianDate}`}
                time=""
                description={event.description}
                significance={event.significance}
              />
            ))}

            <SectionHeader title="Monthly Commemorations" icon="🌙" />
            {monthlyList.map((event) => (
              <EventCard
                key={event.id}
                name={event.title}
                date={event.monthDay}
                time=""
                description={event.description}
                significance={event.significance}
              />
            ))}
          </>
        )}

        <View style={styles.spacing} />
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={() => onNavigate?.('home')}>
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>

      {/* Admin Modal */}
      <Modal visible={isAdminModalVisible} transparent animationType="slide" onRequestClose={() => setAdminModalVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalWrap}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New {activeTab === 0 ? 'Event' : 'Calendar Entry'}</Text>

            {activeTab === 0 ? (
              <>
                <TextInput placeholder="Name" value={form.name} onChangeText={(t) => setForm({...form, name: t})} style={styles.input} />
                <TextInput placeholder="Date" value={form.date} onChangeText={(t) => setForm({...form, date: t})} style={styles.input} />
                <TextInput placeholder="Time" value={form.time} onChangeText={(t) => setForm({...form, time: t})} style={styles.input} />
                <TextInput placeholder="Description" value={form.description} onChangeText={(t) => setForm({...form, description: t})} style={[styles.input, styles.inputMultiline]} multiline numberOfLines={3} />
                <TextInput placeholder="Significance" value={form.significance} onChangeText={(t) => setForm({...form, significance: t})} style={styles.input} />
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalButton} onPress={() => {
                    const newItem = { id: Date.now().toString(), name: form.name || 'Untitled', date: form.date || '', time: form.time || '', description: form.description || '', significance: form.significance || '' };
                    setUpcomingList([newItem, ...upcomingList]);
                    setForm({ ...form, name:'', date:'', time:'', description:'', significance:'' });
                    setAdminModalVisible(false);
                  }}>
                    <Text style={styles.modalButtonText}>Add Event</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButton, styles.modalCancel]} onPress={() => setAdminModalVisible(false)}>
                    <Text style={[styles.modalButtonText, styles.modalCancelText]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <TextInput placeholder="Title" value={form.title} onChangeText={(t) => setForm({...form, title: t})} style={styles.input} />
                <TextInput placeholder="Islamic Date" value={form.islamicDate} onChangeText={(t) => setForm({...form, islamicDate: t})} style={styles.input} />
                <TextInput placeholder="Gregorian Date" value={form.gregorianDate} onChangeText={(t) => setForm({...form, gregorianDate: t})} style={styles.input} />
                <TextInput placeholder="Month Day" value={form.monthDay} onChangeText={(t) => setForm({...form, monthDay: t})} style={styles.input} />
                <TextInput placeholder="Description" value={form.description} onChangeText={(t) => setForm({...form, description: t})} style={[styles.input, styles.inputMultiline]} multiline numberOfLines={3} />
                <TextInput placeholder="Significance" value={form.significance} onChangeText={(t) => setForm({...form, significance: t})} style={styles.input} />
                <TextInput placeholder="Icon" value={form.icon} onChangeText={(t) => setForm({...form, icon: t})} style={styles.input} />
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalButton} onPress={() => {
                    const newAnnual = { id: Date.now().toString(), title: form.title || 'Untitled', islamicDate: form.islamicDate || '', gregorianDate: form.gregorianDate || '', description: form.description || '', significance: form.significance || '', icon: form.icon || '📅' };
                    setAnnualList([newAnnual, ...annualList]);
                    setForm({ ...form, title:'', islamicDate:'', gregorianDate:'', monthDay:'', description:'', significance:'', icon:'' });
                    setAdminModalVisible(false);
                  }}>
                    <Text style={styles.modalButtonText}>Add Calendar Item</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButton, styles.modalCancel]} onPress={() => setAdminModalVisible(false)}>
                    <Text style={[styles.modalButtonText, styles.modalCancelText]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, paddingVertical: 8 },
  spacing: { height: 20 },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#d4af37',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: { fontSize: 14, fontWeight: '700', color: '#1b4d3e' },
  addButton: {
    position: 'absolute',
    right: 16,
    top: Platform.OS === 'android' ? 54 : 16,
    backgroundColor: '#1b4d3e',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  addButtonText: { color: '#fff', fontSize: 24, lineHeight: 26 },
  modalWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', backgroundColor: '#fff', borderRadius: 10, padding: 12, elevation: 6 },
  modalTitle: { fontWeight: '700', fontSize: 16, marginBottom: 8, color: '#1b4d3e' },
  input: { borderWidth: 1, borderColor: '#e0e0e0', padding: 8, borderRadius: 8, marginBottom: 8 },
  inputMultiline: { minHeight: 80, textAlignVertical: 'top' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  modalButton: { flex: 1, marginHorizontal: 4, backgroundColor: '#1b4d3e', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  modalButtonText: { color: '#fff', fontWeight: '700' },
  modalCancel: { backgroundColor: '#eee' },
  modalCancelText: { color: '#1b4d3e' },
});

export default CombinedEventsScreen;
