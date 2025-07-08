import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const IP = '192.168.71.187';

const WaterButton = ({ isActive, onToggle }) => {
  const triggerWatering = async () => {
    try {
      onToggle();
      const response = await fetch(`http://${IP}/water`); // ✅ méthode GET
      const text = await response.text();
      console.log("Réponse ESP32 :", text);
      setTimeout(() => onToggle(), 3000);
    } catch (error) {
      console.error("Erreur arrosage manuel :", error);
      onToggle();
    }
  };

  return (
    <Button
      mode="contained"
      onPress={triggerWatering}
      style={[
        styles.button,
        { backgroundColor: isActive ? '#c62828' : '#2e7d32' }
      ]}
      labelStyle={styles.label}
    >
      {isActive ? 'Arrosage...' : 'Arroser maintenant'}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 200,
    height: 60,
    justifyContent: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 18,
  },
});

export default WaterButton;
