import React, { useState } from 'react';
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
import Participants from './participants';

const CreateGroup = (props) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [color, setColor] = useState('blue');
  const [names, setNames] = React.useState(['Pepe', 'Juan']);
  const [events, setEvents] = React.useState(['65c511317824b86e2101025c']);

  const createGroup = async () => {
    try {
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
            members: names,
            name: groupName,
            color: color
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log('Response from server:', json); // Agrega esta línea para imprimir la respuesta
      setUserData(JSON.stringify(json));
      props.navigation.navigate('Start');
    } catch (error) {
      console.error(error);
    }
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
        <Text style={styles.label}>Información del grupo</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Nombre del grupo"
          placeholder="Nombre del grupo"
          value={groupName}
          theme={{ colors: { primary: '#EF9009' } }}
          onChangeText={(txt) => setGroupName(txt)}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Descripción del grupo"
          placeholder="Descripción del grupo"
          value={groupDescription}
          theme={{ colors: { primary: '#EF9009' } }}
          onChangeText={(txt) => setGroupDescription(txt)}
        />
        <Divider style={styles.divider} />
        <Searchbar
          placeholder="Busca un nombre"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <Divider style={styles.divider} />
        <Card style={styles.card}>
          <Card.Content>
            <List.Section>
              <List.Subheader style={styles.label}>
                Integrantes del grupo
              </List.Subheader>
              <ScrollView>
                {names.map((name, index) => (
                  <Participants
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
        <Button
          mode="contained"
          onPress={() => createGroup()}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          theme={{ colors: { primary: '#EF9009' } }}>
          Crear Grupo
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
