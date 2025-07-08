import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HelpScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>À propos de GreenLand</Text>
      <Text style={styles.content}>
        GreenLand est une application mobile qui permet de contrôler un système d’arrosage automatique de manière intelligente.
        Elle fournit des données météorologiques en temps réel, affiche l'humidité de l’air sous forme de graphique, 
        localise la position du dispositif Vibox GreenLand sur une carte, et permet aussi un arrosage manuel via un bouton dédié.
      </Text>

      <Text style={styles.subtitle}>Fonctionnalités principales :</Text>
      <Text style={styles.list}>
        - Consultation de la météo locale 🌤️{'\n'}
        - Graphique de l’humidité en temps réel 📊{'\n'}
        - Carte de localisation 🗺️{'\n'}
        - Arrosage manuel 🚿{'\n'}
        - Interface intuitive et responsive 📱
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E0F2F1',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#388e3c',
  },
  content: {
    fontSize: 16,
    color: '#444',
    textAlign: 'justify',
  },
  list: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    lineHeight: 26,
  },
});

export default HelpScreen;
