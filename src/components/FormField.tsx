import React from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet, TextInputProps } from 'react-native';

interface FormInputProps extends TextInputProps {
  label?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, style, ...rest }) => {
  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput style={[styles.input, style]} {...rest} />
    </View>
  );
};

interface PickerButtonProps {
  label: string;
  onPress: () => void;
}

export const PickerButton: React.FC<PickerButtonProps> = ({ label, onPress }) => (
  <TouchableOpacity style={styles.pickerButton} onPress={onPress}>
    <Text style={styles.pickerButtonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrap: { marginBottom: 8 },
  label: { fontSize: 12, color: '#666', fontWeight: '600', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#e0e0e0', padding: 10, borderRadius: 8, backgroundColor: '#fff' },
  pickerButton: { borderWidth: 1, borderColor: '#d4af37', padding: 12, borderRadius: 8, marginBottom: 8, backgroundColor: '#f9f9f9' },
  pickerButtonText: { fontSize: 14, color: '#1b4d3e', fontWeight: '600' },
});

export default FormInput;
