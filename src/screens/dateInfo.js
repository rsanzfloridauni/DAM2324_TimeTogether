import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import ScreenContext from "./ScreenContext";
import { IconButton } from 'react-native-paper';
import Event from "../../components/event";

/**
 * DateInfo component displays information about events on a specific date.
 *
 * @component
 * @param {object} route - The route object containing parameters.
 * @param {object} navigation - The navigation object.
 * @returns {JSX.Element} - JSX element representing the DateInfo component.
 */
export default function DateInfo({ route, navigation }) {
  // Context and state variables
  const { userData, setUserData } = useContext(ScreenContext);
  const [date, setDate] = useState(new Date(route.params.day));
  const [events, setEvents] = useState([]);

  const parsedUserData = JSON.parse(userData);

  /**
   * Formats the given date into a string.
   *
   * @param {Date} date - The date to be formatted.
   * @returns {string} - Formatted date string.
   */
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /**
   * Fetches events from the server based on the user and selected date.
   */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://44.194.67.133:8080/TimeTogether/eventsByUserAndDate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: parsedUserData.id,
            date: formatDate(date),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setEvents(json.events);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    fetchEvents();
  }, [date]);


  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <IconButton
          icon="arrow-left"
          size={20}
          style={{ marginTop: 30 }}
          onPress={() => navigation.navigate("Calendar")} />
        <Text style={styles.text}>{formatDate(date)}</Text>
      </View>
      <View style={styles.panel}>

        <ScrollView>
          {events.map((event, index) => (
            <TouchableOpacity key={event.id} onPress={() => navigation.navigate("EventInfo", { eventId: event.id, color: event.groupColor })}>
              <Event
                key={index}
                name={event.name}
                color={event.groupColor}
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
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 20,

  },
  head: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  panel: {
    backgroundColor: "#C9C9C9",
    flex: 1,
    width: "100%",
    padding: 20,
    borderRadius: 15,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginLeft: 70
  },
});