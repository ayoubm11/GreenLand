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

import HelpScreen from './screens/HelpScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

function MainScreen() {
  const [watering, setWatering] = useState(false);

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
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true); // <- état d'initialisation

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
