import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import {
  Card,
  Divider,
  List,
  Switch,
  Button,
  IconButton,
} from 'react-native-paper';
import Participantes from '../../components/participantes';
import i18n from 'i18n-js';
import { en, es } from '../translation/localizations';
import ScreensContext from './ScreenContext';

i18n.translations = {
  en,
  es,
};

const InfoEvento = ({navigation}) => {
  const { language } = useContext(ScreensContext);
  const [event, setEvent] = useState('Aniversario Eva');
  const [group, setGroup] = useState('1º TSMR');
  const [description, setDescription] = useState(
    'Hem pensat en celebrar el aniversari de Eva en el cine i despres anirem a sopar al McDonalds tots junts. \nHabiem pensat en regalarlo entre tots una sudadera.'
  );
  const [date, setDate] = useState('16/05/24');
  const [place, setPlace] = useState('Kinepolis');
  const [participantes, setParticipantes] = useState(['pepe', 'Eva', 'Luis']);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [names, setNames] = React.useState(['Pepe', 'Juan','Carlos','Hugo']);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <IconButton
            icon="arrow-left"
            size={20}
           onPress={() => navigation.navigate("DateInfo")}
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
                  {names.map((name, index) => (
                    <Participantes
                      key={index}
                      imageSource={require('../image/logo.png')}
                      name={name}
                    />
                  ))}
                </ScrollView>
              </List.Section>
            </Card.Content>
          </Card>

          <Divider style={styles.divider} />

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ marginTop: 5, marginRight: 5 }}>{i18n.t('notify')}</Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </View>

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
