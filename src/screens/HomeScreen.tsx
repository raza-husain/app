import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { dargahInfo, aboutDargah } from '../data/dargahInfo';
import { Header, SectionHeader } from '../components/Navigation';
import { getRegistrations, subscribe, approveRegistration, getRegistrationsByPhone } from '../data/registrations';
import QRCode from 'react-native-qrcode-svg';
import { InfoCard } from '../components/Cards';

type Screen = 'home' | 'services' | 'facilities' | 'guide' | 'events' | 'urs' | 'history' | 'calendar';

interface HomeScreenProps {
  onNavigate?: (screen: Screen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const navItems: { id: Screen; label: string; icon: string }[] = [
    { id: 'services', label: 'Services & Facilities', icon: '🕌' },
    { id: 'events', label: 'Events & Calendar', icon: '🗓️' },
    { id: 'urs', label: 'Urs Updates & History', icon: '✨' },
  ];

  const [adminModal, setAdminModal] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [userModal, setUserModal] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRegs, setUserRegs] = useState<any[]>([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // subscribe to registrations list for admin panel
    const unsub = subscribe(() => setRequests(getRegistrations()));
    // init
    setRequests(getRegistrations());
    return unsub;
  }, []);

  useEffect(() => {
    // subscribe to registration changes for the logged in user
    if (!userPhone) return;
    const unsub = subscribe(() => setUserRegs(getRegistrationsByPhone(userPhone)));
    setUserRegs(getRegistrationsByPhone(userPhone));
    return unsub;
  }, [userPhone]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <Header 
        title={dargahInfo.name}
        subtitle="A sanctuary of love, remembrance, and spiritual guidance"
      />

      <View style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>Welcome to Dargah Sharif</Text>
          <Text style={styles.infoBoxText}>{dargahInfo.description}</Text>
        </View>

        {/* Admin and User login buttons */}
        <View style={{flexDirection:'row', justifyContent:'flex-end', paddingHorizontal:16, marginBottom:12}}>
          <TouchableOpacity style={{backgroundColor:'#1b4d3e', paddingHorizontal:12, paddingVertical:8, borderRadius:8, marginRight:8}} onPress={() => setAdminModal(true)}>
            <Text style={{color:'#fff', fontWeight:'700'}}>Admin Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'#d4af37', paddingHorizontal:12, paddingVertical:8, borderRadius:8}} onPress={() => setUserModal(true)}>
            <Text style={{color:'#1b4d3e', fontWeight:'700'}}>User Login</Text>
          </TouchableOpacity>
        </View>

        <SectionHeader title="Quick Information" icon="" />
        <View style={styles.quickInfo}>
          <InfoItem label="Location" value={dargahInfo.location} />
          <InfoItem label="Timing" value={dargahInfo.timing} />
          <InfoItem label="Phone" value={dargahInfo.phone} />
        </View>

        <SectionHeader title="Explore" icon="" />
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

        <SectionHeader title="About the Dargah" icon="" />
        {aboutDargah.map((item) => (
          <InfoCard key={item.title} title={item.title} content={item.content} />
        ))}
      
        {/* Admin Modal */}
        <Modal visible={adminModal} animationType="slide" transparent>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View style={{width:'90%', backgroundColor:'#fff', padding:16, borderRadius:10, elevation:6}}>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={{fontWeight:'700', fontSize:16}}>Admin Panel</Text>
                <TouchableOpacity onPress={() => { setAdminModal(false); setIsAdminAuth(false); setAdminPass(''); }}>
                  <Text style={{color:'#1b4d3e', fontWeight:'700'}}>Close</Text>
                </TouchableOpacity>
              </View>
              {!isAdminAuth ? (
                <>
                  <Text style={{marginTop:12, marginBottom:6}}>Enter admin password</Text>
                  <TextInput value={adminPass} onChangeText={setAdminPass} placeholder="Password" style={{borderWidth:1, borderColor:'#eee', padding:8, borderRadius:8}} secureTextEntry />
                  <View style={{flexDirection:'row', marginTop:12}}>
                    <TouchableOpacity style={{flex:1, backgroundColor:'#1b4d3e', padding:10, borderRadius:8, alignItems:'center'}} onPress={() => {
                      if (adminPass === 'admin123') {
                        setIsAdminAuth(true);
                      } else {
                        alert('Invalid password');
                      }
                    }}>
                      <Text style={{color:'#fff', fontWeight:'700'}}>Login</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View style={{marginBottom:16}}>
                    <Text style={{fontWeight:'700', fontSize:14, marginBottom:8, color:'#1b4d3e'}}>Pending Requests</Text>
                    {requests.filter(r => !r.approved).length === 0 ? (
                      <Text style={{color:'#999', fontSize:12}}>No pending requests.</Text>
                    ) : (
                      requests.filter(r => !r.approved).map((r) => (
                        <View key={r.id} style={{padding:12, borderWidth:1, borderColor:'#ffb74d', borderRadius:8, marginBottom:8, backgroundColor:'#fff8e1'}}>
                          <Text style={{fontWeight:'700'}}>{r.name}</Text>
                          <Text style={{color:'#666', fontSize:12, marginTop:4}}>📱 {r.phone}</Text>
                          {r.email && <Text style={{color:'#666', fontSize:12}}>📧 {r.email}</Text>}
                          <Text style={{color:'#1b4d3e', marginTop:4, fontWeight:'700'}}>{r.eventName}</Text>
                          <Text style={{fontSize:11, color:'#999', marginTop:6}}>{new Date(r.createdAt).toLocaleString()}</Text>
                          <TouchableOpacity style={{backgroundColor:'#1b4d3e', padding:10, borderRadius:8, marginTop:8, alignItems:'center'}} onPress={() => {
                            approveRegistration(r.id);
                          }}>
                            <Text style={{color:'#fff', fontWeight:'700'}}>Approve</Text>
                          </TouchableOpacity>
                        </View>
                      ))
                    )}
                  </View>

                  <View>
                    <Text style={{fontWeight:'700', fontSize:14, marginBottom:8, color:'#1b4d3e'}}>Approved Users</Text>
                    {requests.filter(r => r.approved).length === 0 ? (
                      <Text style={{color:'#999', fontSize:12}}>No approved users yet.</Text>
                    ) : (
                      <ScrollView style={{maxHeight:200}}>
                        {requests.filter(r => r.approved).map((r) => (
                          <View key={r.id} style={{padding:12, borderWidth:1, borderColor:'#4caf50', borderRadius:8, marginBottom:8, backgroundColor:'#f1f8f4'}}>
                            <Text style={{fontWeight:'700'}}>{r.name}</Text>
                            <Text style={{color:'#666', fontSize:12, marginTop:4}}>📱 {r.phone}</Text>
                            {r.email && <Text style={{color:'#666', fontSize:12}}>📧 {r.email}</Text>}
                            <Text style={{color:'#1b4d3e', marginTop:4, fontWeight:'700'}}>{r.eventName}</Text>
                            <View style={{backgroundColor:'#fff', padding:8, borderRadius:6, marginTop:8, borderWidth:1, borderColor:'#e0e0e0'}}>
                              <Text style={{fontWeight:'600', color:'#1b4d3e', fontSize:12}}>Registration ID</Text>
                              <Text style={{color:'#333', marginTop:4, fontFamily:'monospace', fontSize:11}}>{r.id}</Text>
                            </View>
                          </View>
                        ))}
                      </ScrollView>
                    )}
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
        {/* User Modal */}
        <Modal visible={userModal} animationType="slide" transparent>
          <View style={{flex:1, justifyContent:'flex-end', backgroundColor:'rgba(0,0,0,0.5)'}}>
            <View style={{backgroundColor:'#fff', borderTopLeftRadius:16, borderTopRightRadius:16, padding:16, paddingBottom:24}}>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
                <Text style={{fontWeight:'700', fontSize:16}}>User Login</Text>
                <TouchableOpacity onPress={() => { 
                  setUserModal(false); 
                  setUserPhone(''); 
                  setUserEmail('');
                  setUserRegs([]); 
                  setIsUserLoggedIn(false);
                }}>
                  <Text style={{color:'#1b4d3e', fontWeight:'700'}}>Close</Text>
                </TouchableOpacity>
              </View>
              {!isUserLoggedIn ? (
                <>
                  <Text style={{marginBottom:6, fontWeight:'600'}}>Mobile Number *</Text>
                  <TextInput 
                    value={userPhone} 
                    onChangeText={setUserPhone} 
                    placeholder="Enter mobile number" 
                    style={{borderWidth:1, borderColor:'#ddd', padding:10, borderRadius:8, marginBottom:12}} 
                    keyboardType="phone-pad"
                    placeholderTextColor="#999"
                  />
                  <Text style={{marginBottom:6, fontWeight:'600', color:'#666'}}>Email (optional)</Text>
                  <TextInput 
                    value={userEmail} 
                    onChangeText={setUserEmail} 
                    placeholder="Enter email" 
                    style={{borderWidth:1, borderColor:'#ddd', padding:10, borderRadius:8, marginBottom:16}} 
                    keyboardType="email-address"
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity 
                    style={{backgroundColor:'#d4af37', padding:12, borderRadius:8, alignItems:'center'}} 
                    onPress={() => {
                      if (!userPhone.trim()) { 
                        alert('Please enter your mobile number'); 
                        return; 
                      }
                      setUserRegs(getRegistrationsByPhone(userPhone));
                      setIsUserLoggedIn(true);
                    }}
                  >
                    <Text style={{color:'#1b4d3e', fontWeight:'700'}}>View My Registrations</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={{marginBottom:12, fontWeight:'600', color:'#1b4d3e'}}>Registrations for {userPhone}</Text>
                  <ScrollView style={{maxHeight:350, marginBottom:12}}>
                    {userRegs.length === 0 && <Text style={{color:'#666'}}>No registrations found.</Text>}
                    {userRegs.map((r) => (
                      <View key={r.id} style={{padding:12, borderWidth:1, borderColor:'#eee', borderRadius:8, marginBottom:8, backgroundColor:'#f9f9f9'}}>
                        <Text style={{fontWeight:'700', color:'#1b4d3e'}}>{r.name}</Text>
                        <Text style={{color:'#666', fontSize:12, marginTop:4}}>📧 {r.email || 'No email'}</Text>
                        <Text style={{color:'#666', fontSize:12, marginTop:2}}>{r.eventName}</Text>
                        <Text style={{fontSize:11, color:'#999', marginTop:6}}>{new Date(r.createdAt).toLocaleString()}</Text>
                        <View style={{marginTop:10, alignItems:'center'}}>
                          {r.approved ? (
                            <>
                              <Text style={{fontWeight:'800', color:'#1b4d3e', marginBottom:4, fontSize:15}}>{r.eventName}</Text>
                              <Text style={{fontWeight:'700', color:'#1b4d3e', marginBottom:8, fontSize:13}}>Approved</Text>
                              <View style={{padding:12, backgroundColor:'#fff', borderRadius:8, borderWidth:1, borderColor:'#e0e0e0'}}>
                                <QRCode value={r.qrData || `QR:${r.id}`} size={120} />
                              </View>
                              <View style={{marginTop:10, backgroundColor:'#f5f5f5', padding:10, borderRadius:6, width:'100%'}}>
                                <Text style={{fontWeight:'600', color:'#666', fontSize:11, marginBottom:4}}>Registration ID</Text>
                                <Text style={{color:'#333', fontFamily:'monospace', fontSize:12, fontWeight:'600'}}>{r.id}</Text>
                              </View>
                            </>
                          ) : (
                            <Text style={{color:'#ff9800', fontWeight:'600'}}>⏳ Request pending approval</Text>
                          )}
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                  <TouchableOpacity 
                    style={{backgroundColor:'#eee', padding:12, borderRadius:8, alignItems:'center'}} 
                    onPress={() => {
                      setIsUserLoggedIn(false);
                      setUserPhone('');
                      setUserEmail('');
                      setUserRegs([]);
                    }}
                  >
                    <Text style={{color:'#1b4d3e', fontWeight:'700'}}>Logout</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
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
    backgroundColor: '#1b4d3e',
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
