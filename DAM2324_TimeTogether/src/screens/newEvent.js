import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DateTimePicker } from '@hashiprobr/react-native-paper-datetimepicker';
import Group from '../../components/group';

export default function App(props) {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [info, setInfo] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(['grupos'], ['grupo2']);

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const onConfirm = useCallback(({ hours, minutes }) => {
    setVisible(false);
    console.log({ hours, minutes });
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.participantsContainer}>
          <Text style={styles.label}>Participantes del evento:</Text>
          <View style={styles.panel}>
            <ScrollView>
              {selectedGroup.map((selectedGroup, index) => (
                <Group key={index} name={selectedGroup} />
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.label}>Seleccionar la fecha del evento:</Text>
          <DateTimePicker
            type="date"
            value={date}
            onChangeDate={(newDate) => {
              if (newDate >= new Date()) {
                setDate(newDate);
              }
            }}
            minimumDate={new Date(date)} // Establecer la fecha mínima al día actual
          />
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.label}>Seleccionar la hora:</Text>
          <TouchableOpacity
            style={styles.touchableOpacityButton}
            onPress={() => setVisible(true)}>
            <Text style={styles.buttonText}>Pick time</Text>
          </TouchableOpacity>
          <TimePickerModal
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            hours={12}
            minutes={14}
          />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>Descripción:</Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Descripción de la quedada"
            placeholder="Descripción de la quedada"
            value={info}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(texto) => setInfo(texto)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={() => props.navigation.navigate('Calendar')}>
            <Text style={{ color: 'white', fontSize: 20 }}>Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={() => props.navigation.navigate('Calendar')}>
            <Text style={{ color: 'white', fontSize: 20 }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  touchableOpacityButton: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  roundedButton: {
    borderRadius: 15,
    backgroundColor: 'orange',
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },

  container: {
    backgroundColor: '#ecf0f1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 80,
    padding: 20,
  },

  label: {
    color: 'black',
    marginBottom: 10,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
  },
  panel: {
    backgroundColor: '#C9C9C9',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  participantsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  dateContainer: {
    width: '100%',
    marginBottom: 20,
  },
  timeContainer: {
    width: '100%',
    marginBottom: 20,
  },
  descriptionContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  input: {
    marginBottom: 20,
    width: '100%',
  },
});
