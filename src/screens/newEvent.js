import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import dayjs from 'dayjs';
import i18n from 'i18n-js';
import DateTimePicker from 'react-native-ui-datepicker';
import Group from "../../components/group";

export default function App(props) {
  const [info, setInfo] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(["grupos"], ["grupo2"]);

  const [date, setDate] = useState(dayjs());
  const handleOnPress = (params) => {
    console.log(params.date)
    const selectedDate = params.date;
    setDate(selectedDate);
    setFormattedDate(selectedDate.format("DD/MM/YYYY")); 
    console.log(selectedDate);
  }

  const [formattedDate, setFormattedDate] = useState(dayjs().format("DD/MM/YYYY"));

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.participantsContainer}>
          <Text style={styles.label}>{i18n.t('eventParticipants')}</Text>
          <View style={styles.panel}>
            <ScrollView>
              {selectedGroup.map((selectedGroup, index) => (
                <Group key={index} name={selectedGroup} />
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.label}>{i18n.t('selectTheDateOfTheEvent')}</Text>

            <TextInput
              style={styles.input}
              mode="outlined"
              label={i18n.t('eventDay')}
              disabled={true}
              value={formattedDate}
              theme={{ colors: { primary: "#EF9009" } }}
              onChangeText={(texto) => setInfo(texto)} />

          <DateTimePicker
            mode="single"
            date={date}
            onChange={(params) => {
              handleOnPress(params);
            }}
            calendarTextStyle={null}
            headerTextStyle={null}
            styleP={styles.date}
            accessibilityRole="button"
            selectedItemColor="#304999"
            accessibilityLabel="Set Active Theme"
            headerButtonColor={'green'}
            selectedTextStyle={{ color: 'white' }} />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>{i18n.t('description')}</Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('eventDescription')}
            value={info}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(texto) => setInfo(texto)} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={() => props.navigation.navigate("Calendar")}>
            <Text style={{ color: "white", fontSize: 20 }}>{i18n.t('addButton')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={() => props.navigation.navigate("Calendar")}>
            <Text style={{ color: "white", fontSize: 20 }}>{i18n.t('cancelButton')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    padding: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  roundedButton: {
    borderRadius: 15,
    backgroundColor: "#304999",
    color: "white",
    padding: 10,
    alignItems: "center",
    width: 100
  },
  label: {
    color: "black",
    marginBottom: 10,
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
  },
  panel: {
    backgroundColor: "#C9C9C9",
    width: "100%",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  participantsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  dateContainer: {
    width: "100%",
    marginBottom: 20,
  },
  timeContainer: {
    width: "100%",
    marginBottom: 20,
  },
  descriptionContainer: {
    width: "100%",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  input: {
    marginBottom: 20,
    width: "100%",
  },
});
