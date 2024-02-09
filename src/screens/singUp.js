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
import { DateTimePicker } from '@hashiprobr/react-native-paper-datetimepicker';
import { Avatar, Modal, Portal } from 'react-native-paper';

import snackIcon from '../../assets/snack-icon.png';

const SingUp = (props) => {
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

  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const toggleConfirmationVisibility = () => {
    setConfirmationVisible(!confirmationVisible);
  };

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Portal.Host>
      <ScrollView style={styles.container}>
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
          <DateTimePicker
            style={styles.input}
            type="date"
            mode="outlined"
            value={date}
            onChangeDate={setDate}
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
            onPress={() => {
              toggleConfirmationVisibility();
            }}>
            Aceptar
          </Button>
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={toggleVisibility}
          contentContainerStyle={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Avatar.Image style={styles.modalLogo} source={snackIcon} />
            <Avatar.Image style={styles.modalLogo} source={snackIcon} />
            <Avatar.Image style={styles.modalLogo} source={snackIcon} />
            <Avatar.Image style={styles.modalLogo} source={snackIcon} />
          </View>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={confirmationVisible}
          onDismiss={toggleConfirmationVisibility}
          contentContainerStyle={[
            styles.modalContainer
          ]}>
          <View style={styles.modalContent}>
            <Text>Ingrese el código de confirmación:</Text>
            <TextInput
              style={styles.inputCode}
              mode="outlined"
              label="Código de confirmación"
              placeholder="Ingrese el código de confirmación"
              theme={{ colors: { primary: '#EF9009' } }}
            />
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              theme={{ colors: { primary: '#EF9009' } }}
              onPress={() => props.navigation.navigate('Login')}>
              Enviar
            </Button>
          </View>
        </Modal>
      </Portal>
    </Portal.Host>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
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
    inputCode: {
width: 300, 
height: 50,
  },
});

export default SingUp;
