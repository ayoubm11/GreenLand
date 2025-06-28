import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

const API_KEY = 'ae7111b18edbd8c86cdb3b44811f81ba'; // Clé OpenWeatherMap
const CITY = 'Casablanca';
const COUNTRY = 'MA';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=metric&lang=fr`
      );
      setWeather(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur météo:', error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#4caf50" />;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>Météo à {CITY}</Title>
        <View style={styles.row}>
          <Image
            source={{
              uri: weather.weather[0]?.icon
                ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                : 'https://openweathermap.org/img/wn/01d@2x.png', // icône par défaut
            }}
            style={styles.icon}
          />
          <Paragraph>
            🌡️ {weather.main.temp} °C{'\n'}
            💧 {weather.main.humidity} % humidité{'\n'}
            🌤️ {weather.weather[0].description}
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};
const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#b2dfdb',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
});

export default WeatherWidget;
