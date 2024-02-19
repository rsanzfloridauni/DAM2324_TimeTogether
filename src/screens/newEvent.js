import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import dayjs from 'dayjs';
import i18n from 'i18n-js';
import DateTimePicker from 'react-native-ui-datepicker';
import Group from "../../components/group";
import ScreenContext from "./ScreenContext"; // Adjust the path based on the actual location of ScreenContext


/**
 * React component for creating a new event.
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} JSX Element representing the new event creation screen.
 */
export default function App(props) {
  // State variables
  const [info, setInfo] = useState("");
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [ids, setIds] = useState([]);
  const { userData, language } = useContext(ScreenContext);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [formattedDate, setFormattedDate] = useState('');


  // Fetch user groups on component mount
  useEffect(() => {
    const fetchGroups = () => {
      try {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData && parsedUserData.id) {
          fetch(`http://44.194.67.133:8080/TimeTogether/userGroups?userId=${parsedUserData.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setIds(data.groups);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    };
    fetchGroups();
  }, []);

  /**
   * Handle the onPress event for selecting a date.
   * @param {Object} params - Date parameters.
   */
  const handleOnPress = (params) => {
    const selectedDate = new Date(params.date);
    const selectedDate = new Date(params.date);
    setDate(selectedDate);
    const formatted = formatDate(selectedDate);
    setInfo(formatted);
  };

  /**
   * Format the selected date to a string.
   * @returns {string} - Formatted date string.
   */
  const formatDate = () => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /**
   * Create a new event and send a POST request to the server.
   */
  const createEvent = async () => {
    // Validation check for required fields
    if (!name || !description || !location || !formattedDate || !selectedGroup) {
      Alert.alert('Falta rellenar algunos datos');
      return;
    }

    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 8);

    try {
      const response = await fetch(
        'http://44.194.67.133:8080/TimeTogether/newEvent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: description,
            groupId: selectedGroup,
            location: location,
            name: name,
            date: formattedDate
          }),
        }
      );

      // Handle server response
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.status === 204) {
        console.log(i18n.t('groupSuccessFullyCreated'));
        alert(i18n.t('success'), i18n.t('groupSuccessFullyCreated'), [
          { text: 'OK', onPress: () => props.navigation.navigate('Group') },
        ]);
        props.navigation.navigate("Calendar");
      } else {
        const json = await response.json();
        console.log('Response from server:', json);
        alert('Error', i18n.t('groupWrongCreated'));
      }
    } catch (error) {
      console.error(error);
      alert('Error',  i18n.t('groupWrongCreated'));
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>{i18n.t('eventName')}</Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('eventName')}
            value={name}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(texto) => setName(texto)} />
          <Text style={styles.label}>{i18n.t('description')}</Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('eventDescription')}
            value={description}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(texto) => setDescription(texto)} />
          <Text style={styles.label}>{i18n.t('localEvent')}</Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('localEvent')}
            value={location}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(texto) => setLocation(texto)} />
        </View>
        <View style={styles.participantsContainer}>
          <Text style={styles.label}>{i18n.t('eventParticipants')}</Text>
          <View style={styles.panel}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {ids.map((group, index) => (
                <TouchableOpacity
                  style={[
                    styles.groupWrapper,
                    {
                      backgroundColor: group.id === selectedGroup ? "#304999" : group.color,
                    },
                  ]}
                  onPress={() => setSelectedGroup(group.id)}
                  key={index} >
                  <View style={styles.groupContainer}>
                    <Text style={styles.groupName}>{group.name}</Text>
                  </View>
                </TouchableOpacity>
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
            value={info}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(texto) => setInfo(texto)} />

          <DateTimePicker
            mode="single"
            date={date}
            onChange={(date) => {
              handleOnPress(date);
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={() => createEvent()}>
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
  groupWrapper: {
    backgroundColor: '#C9C9C9',
    marginBottom: 8,
    borderRadius: 10,
    padding: 16,
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupName: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingBottom: 10,
  },

  buttonGroup: {
    backgroundColor: '#EF9009',
    alignContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
  },
});
