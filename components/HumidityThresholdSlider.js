import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export default function HumidityThresholdSlider({ threshold, setThreshold }) {
  const updateThresholdToESP32 = async (value) => {
    setThreshold(value);
    try {
      const response = await fetch(`http://192.168.71.187/set-threshold?value=${value}`);
      const text = await response.text();
      console.log('ESP32 dit :', text);
    } catch (error) {
      console.error("Erreur lors de l'envoi du seuil à l’ESP32 :", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Seuil d'humidité : {threshold}%</Text>
      <Slider
        style={{ width: 250, height: 40 }}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={threshold}
        onValueChange={updateThresholdToESP32}
        minimumTrackTintColor="#2e7d32"
        maximumTrackTintColor="#ccc"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20, alignItems: 'center' },
  label: { fontSize: 16, marginBottom: 10, color: '#2e7d32' },
});
