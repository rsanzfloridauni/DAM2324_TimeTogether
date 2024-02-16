import React, { useState, useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Alert } from 'react-native';
import {
  TextInput,
  Button,
  Divider,
  List,
  Searchbar,
  IconButton,
  Card,
} from 'react-native-paper';
import i18n from 'i18n-js';
import { en, es } from '../translation/localizations';
import ScreensContext from './ScreenContext';
import Participantes from '../../components/participantes.js';

const CreateGroup = (props) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [colors, setColors] = useState(['lightblue', '#EC7063', '#82E0AA', '#F7DC6F', '#F8C471', 'lightpink', '#C39BD3', '#45B39D']);
  const [names, setNames] = useState([]);
  const [ids, setIds] = useState([]);
  const [events, setEvents] = useState([]);
  const [searching, setSearching] = useState(false);
  const { language } = useContext(ScreensContext);

  i18n.translations = { en, es };
  i18n.locale = language;

  const buscarAmigo = async () => {
    try {
      const response = await fetch(`http://44.194.67.133:8080/TimeTogether/userIdByEmail?email=${searchQuery}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIds([...ids, data.id]);
      setNames([...names, data.name]);

      clearSearch();
    } catch (error) {
      console.error("Error fetching friend info:", error);
      Alert.alert('Error', i18n.t('errorLookingFriends'));
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const createGroup = async () => {
    const randomNumber = Math.floor(Math.random() * 8);
    try {
      if (!groupName || !groupDescription || names.length === 0) {
        Alert.alert('Error', i18n.t('errorCreatingGroup'));
        return;
      }

      const response = await fetch(
        'http://44.194.67.133:8080/TimeTogether/newGroup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: groupDescription,
            events: events,
            members: ids,
            name: groupName,
            color: colors[randomNumber],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.status === 204) {
        console.log(i18n.t('groupSuccessFullyCreated'));
        Alert.alert(i18n.t('success'), i18n.t('groupSuccessFullyCreated'), [
          { text: 'OK', onPress: () => props.navigation.navigate('Group') },
        ]);
      } else {
        const json = await response.json();
        console.log('Response from server:', json);
        Alert.alert('Error', i18n.t('groupWrongCreated'));
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', i18n.t('groupWrongCreated'));
    }
  };


  const handleDeleteParticipant = (participantName) => {
    Alert.alert(
      i18n.t('confirmDeletion'),
      `${i18n.t('askConfirm1')} ${participantName} ${i18n.t('askConfirm2')}`,
      [
        { text: i18n.t('cancelButton'), style: 'cancel' },
        {
          text: i18n.t('delete'),
          onPress: () => {
            const updatedNames = names.filter((name) => name !== participantName);
            const updatedIds = ids.filter((_, index) => names[index] !== participantName);

            setNames(updatedNames);
            setIds(updatedIds);
          },
        },
      ]
    );
    
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon="arrow-left"
            size={20}
            style={{ marginTop: 30 }}
            onPress={() => props.navigation.navigate("Group")}
          />
          <Image style={styles.logo} source={require('../image/logo.png')} />
        </View>
        <Text style={styles.label}>{i18n.t('groupInformation')}</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          label={i18n.t('groupName')}
          placeholder={i18n.t('groupName')}
          value={groupName}
          theme={{ colors: { primary: '#EF9009' } }}
          onChangeText={(txt) => setGroupName(txt)}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label={i18n.t('groupDescription')}
          placeholder={i18n.t('groupDescription')}
          value={groupDescription}
          theme={{ colors: { primary: '#EF9009' } }}
          onChangeText={(txt) => setGroupDescription(txt)}
        />
        <Divider style={styles.divider} />
        <Searchbar
          placeholder={i18n.t('searchEmail')}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={buscarAmigo}
        />
        <Divider style={styles.divider} />
        <Card style={styles.card}>
          <Card.Content>
            <List.Section>
              <List.Subheader style={styles.label}>
                {i18n.t('membersGroup')}
              </List.Subheader>
              <ScrollView>
                {names.map((name, index) => (
                  <Participantes
                    key={index}
                    imageSource={require('../image/logo.png')}
                    name={name}
                    onDelete={() => handleDeleteParticipant(name)}
                  />
                ))}
              </ScrollView>
            </List.Section>
          </Card.Content>
        </Card>
        <Divider style={styles.divider} />
        <Button
          mode="contained"
          onPress={() => createGroup()}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          theme={{ colors: { primary: '#EF9009' } }}>
          {i18n.t('createGroup')}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  logo: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginBottom: 20,
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#C9C9C9',
    marginTop: 40,
    borderRadius: 20,
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
    alignSelf: 'center',
  },
  button: {
    marginTop: 10,
  },
  buttonLabel: {
    color: 'white',
  },
  divider: {
    marginVertical: 20,
  },
});

export default CreateGroup;
