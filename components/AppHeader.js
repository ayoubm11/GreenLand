import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AppHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <IconButton
        icon="home"
        size={24}
        onPress={() => navigation.navigate('Main')}
        accessibilityLabel="Accueil"
      />
      <Text style={styles.title}>GreenLand</Text>
      <IconButton
        icon="help-circle"
        size={24}
        onPress={() => navigation.navigate('Help')}
        accessibilityLabel="Aide"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#E0F2F1',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default AppHeader;
