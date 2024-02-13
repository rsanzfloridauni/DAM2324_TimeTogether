import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Slider } from '@react-native-assets/slider';
import { TextInput, Button, Divider } from 'react-native-paper';
import { Avatar, IconButton } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';

import snackIcon from '../../assets/snack-icon.png';

const SingUp = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [shirtSize, setShirtSize] = useState(0);
  const [pantsSize, setPantsSize] = useState(38);
  const [shoeSize, setShoeSize] = useState(35);
  const [mail, setMail] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [address, setAddress] = useState('');
  const [allergies, setAllergies] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [inputDate, setInputDate] = React.useState(undefined)

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
      <ScrollView style={styles.container}>
        <IconButton
          icon="arrow-left"
          size={20}
          onPress={() => navigation.navigate('Settings')}
        />
        <View style={styles.form}>
          <TouchableOpacity onPress={toggleVisibility}>
            <Avatar.Image
              style={styles.logo}
              source={require('../image/logo.png')}
              onPress={() => console.log('Button Pressed')}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            mode="outlined"
            label="Nombre"
            placeholder="Nombre"
            value={name}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setName(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Email"
            placeholder="Email"
            value={mail}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setMail(txt)}
          />
          <DatePickerInput
            style={{ flex: 1 }}
            locale="en"
            label="Cumpleaños"
            value={inputDate}
            onChange={(d) => setInputDate(d)}
            inputMode="start"
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Contraseña"
            placeholder="Contraseña"
            value={pass1}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setPass1(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Repite Contraseña"
            placeholder="Repite Contraseña"
            value={pass2}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setPass2(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Color Favorito"
            placeholder="Color Favorito"
            value={color}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setColor(txt)}
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
              onValueChange={(value) => setShirtSize(value)}
              value={shirtSize}
              minimumTrackTintColor="#EF9009"
              maximumTrackTintColor="#000000"
              thumbTintColor="#304999"
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
              onValueChange={(value) => setPantsSize(value)}
              value={pantsSize}
              minimumTrackTintColor="#EF9009"
              maximumTrackTintColor="#000000"
              thumbTintColor="#304999"
            />
          </View>

          <View style={styles.sizeSection}>
            <Text style={styles.sizeLabel}>Calzado: {shoeSize.toFixed(0)}</Text>
            <Slider
              style={styles.slider}
              minimumValue={30}
              maximumValue={50}
              step={1}
              onValueChange={(value) => setShoeSize(value)}
              value={shoeSize}
              minimumTrackTintColor="#EF9009"
              maximumTrackTintColor="#000000"
              thumbTintColor="#304999"
            />
          </View>
          <Divider style={styles.divider} />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Dirección"
            placeholder="Dirección"
            value={address}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setAddress(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Alergias"
            placeholder="Alergias"
            value={allergies}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setAllergies(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Aficiones"
            placeholder="Aficiones"
            value={hobbies}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setHobbies(txt)}
          />
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            theme={{ colors: { primary: '#EF9009' } }}
            onPress={() => navigation.navigate('Settings')}>
            Aceptar
          </Button>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
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

  button: {
    marginTop: 10,
  },
  buttonLabel: {
    color: 'white',
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

export default SingUp;
