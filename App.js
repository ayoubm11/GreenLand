import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, StatusBar, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

import AppHeader from './components/AppHeader';
import WeatherWidget from './components/WeatherWidget';
import HumidityChart from './components/HumidityChart';
import MapViewWidget from './components/MapViewWidget';
import StatusCard from './components/StatusCard';
import WaterButton from './components/WaterButton';
import HumidityThresholdSlider from './components/HumidityThresholdSlider'; 

import HelpScreen from './screens/HelpScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

function MainScreen() {
  const [watering, setWatering] = useState(false);
  const [rainTomorrow, setRainTomorrow] = useState(false); //pluie prévue
  const [humidityThreshold, setHumidityThreshold] = useState(30); //seuil d'humidité

  // Simulation météo : à remplacer par une vraie API plus tard
  useEffect(() => {
    const checkRainForecast = async () => {
      const forecast = { weather: 'rain' }; // remplacer par API réelle plus tard
      setRainTomorrow(forecast.weather === 'rain');
    };
    checkRainForecast();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: StatusBar.currentHeight || 40 }} />
      <AppHeader />
      <View style={{ marginTop: 10 }} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <WeatherWidget />
        <HumidityChart />



        <Text style={styles.sectionTitle}>Localisation de Vibox GreenLand</Text>
        <MapViewWidget />


        {/* Réglage seuil d'humidité */}
        <HumidityThresholdSlider
          threshold={humidityThreshold}
          setThreshold={setHumidityThreshold}
        />

        {/* Statut d'arrosage */}
        <StatusCard
          status={
            watering
              ? "Arrosage actif"
              : rainTomorrow
              ? "Pluie prévue demain"
              : "En attente"
          }
        />


    {rainTomorrow && (
      <Text style={[styles.subText, { color: '#c62828', fontWeight: 'bold' }]}>
        Arrosage automatique désactivé : pluie prévue demain
              </Text>
    )}

    <Text style={styles.subText}>
      Cliquez sur le bouton pour démarrer l’arrosage manuel
    </Text>

    <WaterButton
      isActive={watering}
      onToggle={() => setWatering(!watering)}
      disabled={false} // ne pas désactiver le bouton
    />




        <View style={styles.footer}>
          <Text style={styles.footerText}>
            GreenLand est une application mobile intelligente de contrôle de système d’arrosage automatique. Elle fournit des données météorologiques, d’humidité, de localisation et permet l’arrosage manuel.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
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
