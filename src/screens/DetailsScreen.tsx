import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = ({ route }: Props) => {
  const { endpoint, response } = route.params ?? {};

  // If the server returned an error object, show a friendly message
  if (response && typeof response === 'object' && 'error' in (response as any)) {
    const err = response as any;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Product Details</Text>
        <Text style={styles.error}>Error: {err.message || err.error || 'Product not found'}</Text>
      </ScrollView>
    );
  }

  // Prefer showing the `product` field when present (server returns { product, raw_status })
  const productData = response && typeof response === 'object' && 'product' in (response as any) ? (response as any).product : response;
  const pretty = typeof productData === 'string' ? productData : JSON.stringify(productData, null, 2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Product Details</Text>
      <Text style={styles.monospaced}>{pretty}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 12 },
  monospaced: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: '#f7f7f7',
    padding: 12,
    borderRadius: 6,
    minHeight: 200,
  },
  spacer: { height: 12 },
  error: { color: 'red', marginTop: 12 },
});

export default DetailsScreen;