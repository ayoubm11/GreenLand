import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppHeader from './components/AppHeader';
import WeatherWidget from './components/WeatherWidget';
import HumidityChart from './components/HumidityChart';
import MapViewWidget from './components/MapViewWidget';
import StatusCard from './components/StatusCard';
import WaterButton from './components/WaterButton';
import HelpScreen from './screens/HelpScreen'; // nouvelle page aide

const Stack = createNativeStackNavigator();

function MainScreen() {
  const [watering, setWatering] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* ESPACE HAUT POUR STATUS BAR */}
      <View style={{ marginTop: StatusBar.currentHeight || 40 }} />

      {/* ENTÊTE */}
      <AppHeader />

      {/* ESPACE POUR NE PAS CHEVAUCHER LES BOUTONS */}
      <View style={{ marginTop: 10 }} />

      {/* CONTENU */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <WeatherWidget />
        <HumidityChart />

        <Text style={styles.sectionTitle}>Localisation de Vibox GreenLant</Text>
        <MapViewWidget />

        <StatusCard status={watering ? "Arrosage actif" : "En attente"} />
        <Text style={styles.subText}>
          Cliquez sur le bouton pour démarrer l’arrosage manuel
        </Text>
        <WaterButton
          isActive={watering}
          onToggle={() => setWatering(!watering)}
        />

        {/* PIED DE PAGE */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            GreenLant est une application mobile intelligente de contrôle de système d’arrosage automatique. Elle fournit des données météorologiques, d’humidité, de localisation et permet l’arrosage manuel.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2f1',
  },
  scroll: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 60,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2e7d32',
  },
  subText: {
    fontSize: 14,
    marginVertical: 10,
    color: '#333',
    textAlign: 'center',
  },
  footer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#d0ebe8',
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 40,
  },
  footerText: {
    textAlign: 'center',
    color: '#444',
    fontSize: 13,
  },
});
