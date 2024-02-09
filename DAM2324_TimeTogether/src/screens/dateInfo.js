import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { useState } from 'react';

import Event from '../../components/event';

export default function DateInfo(props) {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = React.useState([
    { name: 'Cumple Pepe', group: '1ºASIR', color: '#fed48c' },
    { name: 'Partido padel', group: 'ETA', color: 'pink' },
  ]);

  // Función para formatear la fecha en "dd/mm/aaaa"
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
      <Text  style={styles.text}>{formatDate(date)}</Text>
        <ScrollView>
          {events.map((event, index) => (
            <TouchableOpacity
            onPress={() => props.navigation.navigate('EventInfo')}>
            <Event
              key={index}
              name={event.name}
              group={event.group}
              color={event.color}
            />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
    alignItems: 'center',
  },
  panel: {
    backgroundColor: '#C9C9C9',
    flex: 1,
    width: '100%',
    padding: 20,
    borderRadius: 15,
    
  },
  text:{
    fontSize:20,
    textAlign:'center'
  }
});
