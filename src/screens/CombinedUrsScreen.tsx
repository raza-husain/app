import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { ursUpdates, ursHistory } from '../data/ursEvents';
import { Header, SectionHeader, TabNavigation } from '../components/Navigation';

type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar';

interface CombinedUrsProps {
  onNavigate?: (screen: Screen) => void;
}

const UrsUpdateCard: React.FC<any> = ({ title, date, time, description, category }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={styles.cardMetaRow}>
        <View style={styles.metaPill}><Text style={styles.metaText}>📅 {date}</Text></View>
        <View style={styles.metaPill}><Text style={styles.metaText}>🕐 {time}</Text></View>
      </View>
      <Text style={styles.cardDescription} numberOfLines={expanded ? 0 : 3}>{description}</Text>
      <Text onPress={() => setExpanded(!expanded)} style={styles.readMore}>{expanded ? 'Show less' : 'Read more'}</Text>
    </View>
  );
};

const HistoryCard: React.FC<any> = ({ year, date, title, summary, highlights, attendance }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title} • {year}</Text>
    </View>
    <Text style={styles.cardDescription}>{summary}</Text>
  </View>
);

export const CombinedUrsScreen: React.FC<CombinedUrsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Updates', 'History'];
  const [isAdminFormOpen, setAdminFormOpen] = useState(false);

  // keep local copies so admin additions appear immediately without mutating imports
  const [ursUpdatesList, setUrsUpdatesList] = useState(ursUpdates);
  const [ursHistoryList, setUrsHistoryList] = useState(ursHistory);

  // form state
  const [form, setForm] = useState<any>({
    updTitle: '', updDate: '', updTime: '', updDescription: '', updCategory: '',
    histYear: '', histDate: '', histTitle: '', histSummary: '', histHighlights: '', histAttendance: ''
  });

  return (
    <View style={styles.container}>
      <Header title="Urs — Updates & History" subtitle="Latest updates and historical archive" />
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Admin add button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setAdminFormOpen(true)}>
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>

      <ScrollView style={styles.content} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {activeTab === 0 ? (
          <>
            <SectionHeader title="Latest Updates" icon="✨" />
            {ursUpdatesList.map((u) => (
              <UrsUpdateCard key={u.id} title={u.title} date={u.date} time={u.time} description={u.description} category={u.category} />
            ))}
          </>
        ) : (
          <>
            <SectionHeader title="Historical Archive" icon="📚" />
            {ursHistoryList.map((h) => (
              <HistoryCard key={h.id} year={h.year} date={h.date} title={h.title} summary={h.summary} highlights={h.highlights} attendance={h.attendance} />
            ))}
          </>
        )}

        <View style={styles.spacing} />
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={() => onNavigate?.('home')}>
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>

      {/* Admin Form Page (full screen) */}
      {isAdminFormOpen && (
        <View style={styles.formPage}>
          <View style={styles.formHeader}>
            <TouchableOpacity onPress={() => setAdminFormOpen(false)} style={styles.formBack}>
              <Text style={{fontSize:18}}>←</Text>
            </TouchableOpacity>
            <Text style={styles.formHeaderTitle}>Add New {activeTab === 0 ? 'Update' : 'History'}</Text>
          </View>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex:1}}>
            <ScrollView contentContainerStyle={{padding:12}}>
              {activeTab === 0 ? (
                <>
                  <TextInput placeholder="Title" value={form.updTitle} onChangeText={(t) => setForm({...form, updTitle: t})} style={styles.input} />
                  <TextInput placeholder="Date" value={form.updDate} onChangeText={(t) => setForm({...form, updDate: t})} style={styles.input} />
                  <TextInput placeholder="Time" value={form.updTime} onChangeText={(t) => setForm({...form, updTime: t})} style={styles.input} />
                  <TextInput placeholder="Category" value={form.updCategory} onChangeText={(t) => setForm({...form, updCategory: t})} style={styles.input} />
                  <TextInput placeholder="Description" value={form.updDescription} onChangeText={(t) => setForm({...form, updDescription: t})} style={[styles.input, styles.inputMultiline]} multiline numberOfLines={3} />
                  <View style={styles.modalButtons}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => {
                      const newItem = { id: Date.now().toString(), title: form.updTitle || 'Untitled', date: form.updDate || '', time: form.updTime || '', description: form.updDescription || '', category: form.updCategory || '' };
                      setUrsUpdatesList([newItem, ...ursUpdatesList]);
                      setForm({ ...form, updTitle:'', updDate:'', updTime:'', updDescription:'', updCategory:'' });
                      setAdminFormOpen(false);
                    }}>
                      <Text style={styles.modalButtonText}>Add Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalButton, styles.modalCancel]} onPress={() => setAdminFormOpen(false)}>
                      <Text style={[styles.modalButtonText, styles.modalCancelText]}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <TextInput placeholder="Year" value={form.histYear} onChangeText={(t) => setForm({...form, histYear: t})} style={styles.input} />
                  <TextInput placeholder="Date" value={form.histDate} onChangeText={(t) => setForm({...form, histDate: t})} style={styles.input} />
                  <TextInput placeholder="Title" value={form.histTitle} onChangeText={(t) => setForm({...form, histTitle: t})} style={styles.input} />
                  <TextInput placeholder="Summary" value={form.histSummary} onChangeText={(t) => setForm({...form, histSummary: t})} style={[styles.input, styles.inputMultiline]} multiline numberOfLines={3} />
                  <TextInput placeholder="Highlights" value={form.histHighlights} onChangeText={(t) => setForm({...form, histHighlights: t})} style={styles.input} />
                  <TextInput placeholder="Attendance" value={form.histAttendance} onChangeText={(t) => setForm({...form, histAttendance: t})} style={styles.input} />
                  <View style={styles.modalButtons}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => {
                      const newItem = { id: Date.now().toString(), year: form.histYear || '', date: form.histDate || '', title: form.histTitle || '', summary: form.histSummary || '', highlights: form.histHighlights || '', attendance: form.histAttendance || '' };
                      setUrsHistoryList([newItem, ...ursHistoryList]);
                      setForm({ ...form, histYear:'', histDate:'', histTitle:'', histSummary:'', histHighlights:'', histAttendance:'' });
                      setAdminFormOpen(false);
                    }}>
                      <Text style={styles.modalButtonText}>Add History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalButton, styles.modalCancel]} onPress={() => setAdminFormOpen(false)}>
                      <Text style={[styles.modalButtonText, styles.modalCancelText]}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
  },
  cardHeader: { marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1b4d3e' },
  cardMetaRow: { flexDirection: 'row', marginTop: 8 },
  metaPill: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 12, marginRight: 8 },
  metaText: { fontSize: 11, color: '#555', fontWeight: '600' },
  cardDescription: { fontSize: 13, color: '#666', lineHeight: 18 },
  readMore: { paddingHorizontal: 16, paddingVertical: 8, color: '#1b4d3e', fontWeight: '700', marginTop: 6 },
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
  formPage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#fff', zIndex: 20 },
  formHeader: { height: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  formBack: { padding: 8, marginRight: 8 },
  formHeaderTitle: { fontSize: 16, fontWeight: '700', color: '#1b4d3e' },
});

export default CombinedUrsScreen;
