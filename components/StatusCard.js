import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const StatusCard = ({ status }) => (
  <Card style={styles.card}>
    <Card.Content>
      <Title>Statut</Title>
      <Paragraph>{status}</Paragraph>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#a5d6a7',
    marginBottom: 20,
  },
});

export default StatusCard;
