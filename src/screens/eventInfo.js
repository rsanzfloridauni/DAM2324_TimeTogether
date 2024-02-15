import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import {
  Card,
  Divider,
  List,
  Button,
  IconButton,
} from 'react-native-paper';
import Members from '../../components/miembros';
import i18n from 'i18n-js';
import { en, es } from '../translation/localizations';
import ScreensContext from './ScreenContext';

i18n.translations = {
  en,
  es,
};

const InfoEvento = ({ route, navigation }) => {
  const { language } = useContext(ScreensContext);
  const [eventId, setEventId] = useState(route.params.eventId);
  const [eventColor, setEventColor] = useState(route.params.color);
  const [event, setEvent] = useState("");
  const [group, setGroup] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  useEffect(() => {
    fetch(`http://44.194.67.133:8080/TimeTogether/event?id=${eventId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setDate(data.date);
        setParticipants(data.members);
        setEvent(data.name);
        setDescription(data.description);
        setPlace(data.location);
        console.log(eventColor);
      })
      .catch((error) => {
        console.error("Error fetching friend info:", error);
      });
  }, [eventId]);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <IconButton
            icon="arrow-left"
            size={20}
            onPress={() => navigation.navigate("Calendar")}
          />
          <Text style={styles.label}>{event}</Text>
          <Text style={styles.label2}>{group}</Text>

          <Divider style={styles.divider} />

          <Text style={styles.titulo}>{i18n.t('description')}</Text>
          <Text style={styles.input}>{description}</Text>

          <Divider style={styles.divider} />

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.inputLabel}>{i18n.t('date')}:</Text>
            <Text style={styles.input}>{date}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.inputLabel}>{i18n.t('place')}:</Text>
            <Text style={styles.input}>{place}</Text>
          </View>

          <Divider style={styles.divider} />

          <Card style={styles.card2}>
            <Card.Content>
              <List.Section>
                <List.Subheader style={styles.label}>
                  {i18n.t('participants')}
                </List.Subheader>
                <ScrollView>
                  {participants.map((obj, index) => (
                    <Members
                      key={index}
                      imageSource={require('../image/logo.png')}
                      name={obj.name}
                    />
                  ))}
                </ScrollView>
              </List.Section>
            </Card.Content>
          </Card>

          <Divider style={styles.divider} />

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              mode="contained"
              onPress={() => console.log('Button Pressed')}
              style={{
                ...styles.button,
                borderColor: '#304999',
                borderWidth: 2,
                marginRight: 5,
              }}
              labelStyle={{ ...styles.buttonLabel, color: '#304999' }}
              theme={{ colors: { primary: '#C9C9C9' } }}>
              {i18n.t('reject')}
            </Button>

            <Button
              mode="contained"
              onPress={() => navigation.navigate("Calendar")}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              theme={{ colors: { primary: '#304999' } }}>
              {i18n.t('accept')}
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#C9C9C9',
    marginTop: 40,
    borderRadius: 20,
  },
  card2: {
    marginVertical: 10,
    backgroundColor: '#304999',
    marginTop: 40,
    borderRadius: 20,
  },
  input: {
    marginBottom: 10,
    flex: 1,
  },
  inputLabel: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
    alignSelf: 'center',
  },
  label2: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
    alignSelf: 'center',
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
  },
  buttonLabel: {
    color: 'white',
  },
  titulo: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
  },
  divider: {
    marginVertical: 10,
  },
});

export default InfoEvento;
