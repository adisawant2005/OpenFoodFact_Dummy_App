import React, { useState } from 'react';
import { View, Text, Button, Platform, ActivityIndicator, ScrollView, StyleSheet, Alert, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const HomeScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [barcode, setBarcode] = useState<string>('');

  const callEndpoint = async (path: string, label: string) => {
    setLoading(true);
    setLastError(null);
    try {
      const res = await fetch(`${BASE_URL}${path}`);
      const text = await res.text();
      let data: unknown = text;
      try {
        data = JSON.parse(text);
      } catch (e) {
        // keep raw text if not JSON
      }
      navigation.navigate('Details', { endpoint: label, response: data });
    } catch (err: any) {
      setLastError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Product Lookup</Text>

      <Text style={{ marginBottom: 8 }}>Enter barcode to lookup:</Text>
      <TextInput
        placeholder="e.g. 7622201428501"
        style={styles.input}
        value={barcode}
        onChangeText={setBarcode}
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={styles.spacer} />

      <Button
        title="Lookup product by barcode"
        onPress={() => {
          if (!barcode || barcode.trim().length === 0) {
            Alert.alert('Missing barcode', 'Please enter a barcode to lookup.');
            return;
          }
          callEndpoint(`/api/product/${encodeURIComponent(barcode.trim())}`, `Product ${barcode.trim()}`);
        }}
      />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
      {lastError && <Text style={styles.error}>Error: {lastError}</Text>}

      <View style={{ height: 60 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 16 },
  spacer: { height: 12 },
  error: { color: 'red', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
});

export default HomeScreen;