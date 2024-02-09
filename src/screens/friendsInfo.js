import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { Slider } from '@react-native-assets/slider';
import {
  TextInput,
  Divider,
  List,
  IconButton,
  Avatar,
} from 'react-native-paper';
import { DateTimePicker } from '@hashiprobr/react-native-paper-datetimepicker';

const InfoAmigo = (props) => {
  const [shirtSize, setShirtSize] = useState(0);
  const [pantsSize, setPantsSize] = useState(38);
  const [shoeSize, setShoeSize] = useState(35);
  const [mail, setMail] = useState('');
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [address, setAddress] = useState('');
  const [allergies, setAllergies] = useState(['Ácaros']);
  const [hobbies, setHobbies] = useState(['Padel']);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon="arrow-left"
            size={20}
            style={{ marginTop: 30 }}
            onPress={() => props.navigation.navigate('Friends')}
          />
        </View>
        <Avatar.Image
          style={styles.logo}
          source={require('../image/logo.png')}
          onPress={() => console.log('Button Pressed')}
        />
        <TextInput
          disabled="true"
          style={styles.input}
          mode="outlined"
          label="Nombre"
          placeholder="Nombre"
          value={name}
          theme={{ colors: { primary: '#EF9009' } }}
        />
        <TextInput
          disabled="true"
          style={styles.input}
          mode="outlined"
          label="Email"
          placeholder="Email"
          value={mail}
          theme={{ colors: { primary: '#EF9009' } }}
        />
        <Divider style={styles.divider} />
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            disabled={true}
            style={{ flex: 1, marginRight: 5, ...styles.input }}
            mode="outlined"
            label="Color Favorito"
            placeholder="Color Favorito"
            value={color}
            theme={{ colors: { primary: '#EF9009' } }}
          />
          <DateTimePicker
            style={{ flex: 1, marginLeft: 5, ...styles.input }}
            type="date"
            value={date}
            disabled={true}
          />
        </View>
        <TextInput
          disabled
          style={styles.input}
          mode="outlined"
          label="Dirección"
          placeholder="Dirección"
          value={address}
          theme={{ colors: { primary: '#EF9009' } }}
        />
        <Divider style={styles.divider} />
        <Text style={styles.label}>Tallas</Text>
        <View style={styles.sizeSection}>
          <Text style={styles.sizeLabel}>
            Camisetas: {shirtSize.toFixed(0)}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            value={shirtSize}
            minimumTrackTintColor="#EF9009"
            maximumTrackTintColor="#000000"
            thumbTintColor="#304999"
            enabled={false}
          />
        </View>

        <View style={styles.sizeSection}>
          <Text style={styles.sizeLabel}>
            Pantalones: {pantsSize.toFixed(0)}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={30}
            maximumValue={50}
            step={1}
            value={pantsSize}
            minimumTrackTintColor="#EF9009"
            maximumTrackTintColor="#000000"
            thumbTintColor="#304999"
            enabled={false}
          />
        </View>

        <View style={styles.sizeSection}>
          <Text style={styles.sizeLabel}>Calzado: {shoeSize.toFixed(0)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={30}
            maximumValue={50}
            step={1}
            value={shoeSize}
            minimumTrackTintColor="#EF9009"
            maximumTrackTintColor="#000000"
            thumbTintColor="#304999"
            enabled={false}
          />
        </View>
        <Divider style={styles.divider} />
        <Text style={styles.label}>Aficiones</Text>
        {allergies.map((hobbie) => (
          <List.Item
            description={hobbie.description}
            left={(props) => <List.Icon {...props} icon="account" />}
          />
        ))}
        <Divider style={styles.divider} />
        <Text style={styles.label}>Alergias</Text>
        {hobbies.map((alergia) => (
          <List.Item
            description={alergia.description}
            left={(props) => <List.Icon {...props} icon="account" />}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
    size: 80,
  },
  form: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
    alignSelf: 'center',
  },
  slider: {
    width: '100%',
    marginVertical: 10,
  },
  divider: {
    marginVertical: 20,
  },
  sizeSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sizeLabel: {
    fontSize: 16,
  },
});

export default InfoAmigo;
