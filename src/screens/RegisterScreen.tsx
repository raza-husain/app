import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Header } from '../components/Navigation';
import { addRegistration, getRegistrationTarget, getRegistrationsByPhone, subscribe, setRegistrationTarget } from '../data/registrations';
// @ts-ignore
const QRCode: any = require('react-native-qrcode-svg');
import { Screen } from '../types';

interface RegisterScreenProps {
  onNavigate?: (s: Screen) => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigate }) => {
  const target = getRegistrationTarget();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submittedPhone, setSubmittedPhone] = useState<string | null>(null);
  const [myRegs, setMyRegs] = useState<any[]>([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  useEffect(() => {
    if (!submittedPhone) return;
    const unsub = subscribe(() => {
      setMyRegs(getRegistrationsByPhone(submittedPhone));
    });
    setMyRegs(getRegistrationsByPhone(submittedPhone));
    return unsub;
  }, [submittedPhone]);

  const submit = () => {
    if (!target) return alert('No event selected');
    if (!name.trim() || !phone.trim()) return alert('Please enter name and mobile number');
    addRegistration({ eventId: target.eventId, eventName: target.eventName, name: name.trim(), email: email.trim(), phone: phone.trim() });
    setSubmittedPhone(phone.trim());
    setName(''); setEmail(''); setPhone('');
    // show small confirmation then navigate back to origin
    setConfirmationVisible(true);
    setTimeout(() => {
      setConfirmationVisible(false);
      setRegistrationTarget(null);
      const dest = (target.from as Screen) || 'events';
      onNavigate?.(dest);
    }, 1400);
  };

  const goBack = () => {
    const from = target?.from || 'events';
    setRegistrationTarget(null);
    onNavigate?.((from as Screen) || 'events');
  };

  return (
    <View style={{flex:1, backgroundColor:'#f5f5f5'}}>
      <Header title="Register" subtitle={target?.eventName || 'Select an event'} onBack={goBack} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex:1}}>
        <ScrollView contentContainerStyle={{padding:16}}>
          <Text style={{fontWeight:'700', fontSize:16, color:'#1b4d3e', marginBottom:8}}>{target?.eventName}</Text>
          <Text style={{color:'#666', marginBottom:12}}>Fill in your details to request registration for this event. Admin will approve and you'll receive a QR code once approved.</Text>

          <Text style={styles.label}>Full name *</Text>
          <TextInput value={name} onChangeText={setName} placeholder="Your full name" style={styles.input} placeholderTextColor="#999" />

          <Text style={styles.label}>Mobile number *</Text>
          <TextInput value={phone} onChangeText={setPhone} placeholder="Mobile number" style={styles.input} keyboardType="phone-pad" placeholderTextColor="#999" />

          <Text style={styles.label}>Email (optional)</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} keyboardType="email-address" placeholderTextColor="#999" />

          <TouchableOpacity style={styles.submit} onPress={submit}>
            <Text style={{color:'#fff', fontWeight:'700'}}>Submit Request</Text>
          </TouchableOpacity>

          {confirmationVisible && (
            <View style={{marginTop:12, padding:12, backgroundColor:'#e8f5e9', borderRadius:8, alignItems:'center'}}>
              <Text style={{color:'#2e7d32', fontWeight:'700'}}>Request submitted</Text>
              <Text style={{color:'#2e7d32', fontSize:12}}>You'll be notified when approved</Text>
            </View>
          )}

          {submittedPhone && myRegs.length > 0 && (
            <View style={{marginTop:16}}>
              {myRegs.map((r) => r.approved ? (
                <View key={r.id} style={{alignItems:'center', marginTop:8}}>
                  <Text style={{fontWeight:'800', color:'#1b4d3e', fontSize:16, marginBottom:8}}>{r.eventName}</Text>
                  <Text style={{fontWeight:'700', color:'#1b4d3e', fontSize:13, marginBottom:8}}>Approved</Text>
                  <View style={{padding:12, backgroundColor:'#fff', borderRadius:8, borderWidth:1, borderColor:'#e0e0e0'}}>
                    <QRCode value={r.qrData || `QR:${r.id}`} size={150} />
                  </View>
                  <View style={{marginTop:10, backgroundColor:'#f5f5f5', padding:10, borderRadius:6, width:'90%'}}>
                    <Text style={{fontWeight:'600', color:'#666', fontSize:11, marginBottom:4}}>Registration ID</Text>
                    <Text style={{color:'#333', fontFamily:'monospace', fontSize:12, fontWeight:'600'}}>{r.id}</Text>
                  </View>
                </View>
              ) : (
                <Text key={r.id} style={{fontSize:12, color:'#666', marginTop:6}}>• Request for {r.eventName} is pending approval</Text>
              ))}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 12, fontWeight: '600', marginBottom:6, color:'#333' },
  input: { borderWidth:1, borderColor:'#e0e0e0', padding:10, borderRadius:8, marginBottom:12, backgroundColor:'#fff' },
  submit: { backgroundColor:'#1b4d3e', padding:14, borderRadius:8, alignItems:'center' },
});

export default RegisterScreen;
