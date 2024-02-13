import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Divider, Button } from 'react-native-paper';
import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';

const Calendari = (props) => {
  const [date, setDate] = useState(dayjs());

  return (
    <View style={styles.outerContainer}>
      <View style={styles.titleContainer}></View>
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
          selectedTextStyle={{color: 'white'}}
          onChange={() => props.navigation.navigate('DateInfo')}/>
      </View>

      <Button
        style={styles.button}
        mode="contained"
        theme={{ colors: { primary: '#304999' } }}
        onPress={() => props.navigation.navigate('NewEvent')}>
        Añadir nuevo evento
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    width: 180,
    alignSelf: 'center',
  },
  button: {
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  date: {},
  container: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Calendari;
