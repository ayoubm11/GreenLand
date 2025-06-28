import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const HumidityChart = () => {
  const screenWidth = Dimensions.get("window").width;

  const [humidityData, setHumidityData] = useState([100]); // Valeur par défaut
  const [labels, setLabels] = useState(["Now"]);
  const dataRef = useRef([100]);

  const fetchHumidity = async () => {
    try {
      const response = await fetch('http://192.168.71.187/humidity');
      const json = await response.json();
      const humidity = parseFloat(json.humidity);

      if (isNaN(humidity) || !isFinite(humidity)) {
        console.warn("Valeur invalide reçue :", json.humidity);
        return;
      }

      const now = new Date();
      const timeLabel = `${now.getHours()}h${now.getMinutes().toString().padStart(2, '0')}`;

      const newData = [...dataRef.current, humidity].slice(-6);
      const newLabels = [...labels, timeLabel].slice(-6);

      dataRef.current = newData;
      setHumidityData(newData);
      setLabels(newLabels);

    } catch (error) {
      console.error("Erreur de connexion ESP32 :", error.message);
    }
  };

  useEffect(() => {
    fetchHumidity(); // première lecture
    const interval = setInterval(fetchHumidity, 5000); // lecture toutes les 5 sec
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        data: humidityData,
        strokeWidth: 2,
        color: () => "#00796b",
      },
    ],
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: "#e0f2f1",
          backgroundGradientFrom: "#b2dfdb",
          backgroundGradientTo: "#80cbc4",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 121, 107, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 12,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default HumidityChart;
