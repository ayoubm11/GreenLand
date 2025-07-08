import React, { useState } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapViewWidget = () => {
  const [esp32Location, setEsp32Location] = useState(null);

  const getLocationFromESP32 = async () => {
    try {
      const response = await fetch('http://192.168.11.137/location'); // ← Remplace par IP ESP32
      const data = await response.json();
      if (data.latitude && data.longitude) {
        setEsp32Location({
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        Alert.alert("Erreur", "Coordonnées GPS invalides");
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de contacter Vibox GreenLand");
      console.error(error);
    }
  };

  const defaultRegion = {
    latitude: 33.5731,
    longitude: -7.5898,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={esp32Location || defaultRegion}
      >
        {esp32Location && (
          <Marker coordinate={esp32Location} title="Vibox - Système d’arrosage" />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Localiser Vibox" onPress={getLocationFromESP32} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 350,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    elevation: 2,
  },
});

export default MapViewWidget;
