import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FormInput from '../components/FormField';
import { Header } from '../components/Navigation';
import { getRegistrations, subscribe, approveRegistration } from '../data/registrations';
import { Screen } from '../types';

interface AdminScreenProps {
  onNavigate?: (s: Screen) => void;
}

const AdminScreen: React.FC<AdminScreenProps> = ({ onNavigate }) => {
  const [adminPass, setAdminPass] = useState('');
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const unsub = subscribe(() => setRequests(getRegistrations()));
    setRequests(getRegistrations());
    return unsub;
  }, []);

  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <Header title="Admin Panel" subtitle="Manage registrations" onBack={() => onNavigate?.('home')} />
      <ScrollView contentContainerStyle={{padding:16}}>
        {!isAdminAuth ? (
            <View style={{marginTop:20}}>
            <Text style={{marginBottom:12}}>Enter admin password</Text>
            <FormInput value={adminPass} onChangeText={setAdminPass} placeholder="Password" secureTextEntry />
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
          </View>
        ) : (
          <>
            <View style={{marginBottom:16}}>
              <Text style={{fontWeight:'700', fontSize:14, marginBottom:8, color:'#1b4d3e'}}>Pending Requests</Text>
              {requests.length === 0 ? (
                <Text style={{color:'#999', fontSize:12}}>No registrations yet.</Text>
              ) : (
                <>
                  {requests.filter(r => !r.approved).map((r) => (
                    <View key={r.id} style={{padding:12, borderWidth:1, borderColor:'#ffb74d', borderRadius:8, marginBottom:8, backgroundColor:'#fff8e1'}}>
                      <Text style={{fontWeight:'700'}}>{r.name}</Text>
                      <Text style={{color:'#666', fontSize:12, marginTop:4}}>📱 {r.phone}</Text>
                      {r.email && <Text style={{color:'#666', fontSize:12}}>📧 {r.email}</Text>}
                      <Text style={{color:'#1b4d3e', marginTop:4, fontWeight:'700'}}>{r.eventName}</Text>
                      <Text style={{fontSize:11, color:'#999', marginTop:6}}>{new Date(r.createdAt).toLocaleString()}</Text>
                      <TouchableOpacity style={{backgroundColor:'#1b4d3e', padding:10, borderRadius:8, marginTop:8, alignItems:'center'}} onPress={() => approveRegistration(r.id)}>
                        <Text style={{color:'#fff', fontWeight:'700'}}>Approve</Text>
                      </TouchableOpacity>
                    </View>
                  ))}

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
                </>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AdminScreen;
