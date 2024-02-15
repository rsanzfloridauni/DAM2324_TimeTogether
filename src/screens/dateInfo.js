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

import Event from "../../components/event";

export default function DateInfo({ route, navigation }) {
  const { userData, setUserData } = useContext(ScreenContext);
  const [date, setDate] = useState(new Date(route.params.day));
  const [events, setEvents] = useState([]);

  const parsedUserData = JSON.parse(userData);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
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
      <View style={styles.panel}>
        <Text style={styles.text}>{formatDate(date)}</Text>
        <ScrollView>
          {events.map((event, index) => (
            <TouchableOpacity key={event.id} onPress={() => navigation.navigate("EventInfo", {eventId : event.id, color: event.groupColor})}>
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
    alignItems: "center",
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
  },
});