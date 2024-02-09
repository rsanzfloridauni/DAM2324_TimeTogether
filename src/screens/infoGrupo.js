import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import {
  TextInput,
  Button,
  Divider,
  List,
  Searchbar,
  IconButton,
  Card,
} from 'react-native-paper';
import Participantes from './participants';

const InfoGroup = ({navigation}) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeople, setSelectedPeople] = useState(['ejemplo']);
  const [names, setNames] = React.useState(['Pepe', 'Juan']);
  const [color, setColor] = React.useState("#C9C9C9");


  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon="arrow-left"
            size={20}
            style={{ marginTop: "10%" }}
             onPress={() => navigation.navigate("Group")}
          />
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
          disabled
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Descripción del grupo"
          placeholder="Descripción del grupo"
          value={groupDescription}
          theme={{ colors: { primary: '#EF9009' } }}
          onChangeText={(txt) => setGroupDescription(txt)}
          disabled
        />
        <Divider style={styles.divider} />
        <Card style={{...styles.card, backgroundColor: color}}>
          <Card.Content>
            <List.Section>
              <List.Subheader style={styles.label}>
                Integrantes del grupo
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
    marginBottom: "5%",
    marginRight: "50%"
  },
  card: {
    marginVertical: 10,
    borderRadius: 20
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

export default InfoGroup;
