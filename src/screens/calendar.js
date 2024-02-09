import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Divider, Button } from 'react-native-paper';
import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';

const Calendari = (props) => {
  const [date, setDate] = useState(dayjs());

  return (
    <View style={styles.outerContainer}>
      <View style={styles.titleContainer}>

      </View>
      <View>

        <Divider
          style={{
            height: 2,
            backgroundColor: 'gray',
            marginBottom: 1,
            marginTop: 1,
          }}
        />
      </View>
      <View style={styles.container}>
        <DateTimePicker
          mode="single"
          date={date}
          onChange={(params) => setDate(params.date)}
          calendarTextStyle={null}
          headerTextStyle={null}
          styleP={styles.date}
          accessibilityRole="button"
          selectedItemColor="#304999"
          accessibilityLabel="Set Active Theme"
          headerButtonColor={'green'}
          selectedTextStyle={{
            color: 'white',
          }}
          onChange={() => props.navigation.navigate('DateInfo')}
        />
      </View>

      <TouchableOpacity style={styles.createGroupButton} onPress={() => props.navigation.navigate('NewEvent')}>
        <Text style={styles.createGroupButtonText}>+ AFEGIR EVENT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: '#304999',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    width: 180,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    padding: 8,
    textAlign: 'center',
  },
  divider: {
    fontSize: 2,
    color: 'white',
    padding: 2,
    textAlign: 'center',
  },
  createGroupButton: {
    backgroundColor: '#304999',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    width: 200,
  },
  createGroupButtonText: {
    fontSize: 18,
    color: 'white',
  },
  container: {
    flex: 0.9,
    backgroundColor: 'white',
  },
  date: {},
});

export default Calendari;