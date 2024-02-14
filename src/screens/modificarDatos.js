import React, { useState,useContext  } from 'react';
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
import i18n from 'i18n-js';
import ScreensContext from './ScreenContext';
import { en, es } from '../translation/localizations';
import snackIcon from '../../assets/snack-icon.png';

const SingUp = ({ navigation }) => {
  const { language } = useContext(ScreensContext);
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
  i18n.translations = {
    en,
    es,
  };

  i18n.locale = language;

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
            label={i18n.t('name')}
            placeholder={i18n.t('name')}
            value={name}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setName(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('email')}
            placeholder={i18n.t('email')}
            value={mail}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setMail(txt)}
          />
          <DatePickerInput
            style={{ flex: 1 }}
            locale="en"
            label={i18n.t('birthday')}
            value={inputDate}
            onChange={(d) => setInputDate(d)}
            inputMode="start"
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('password')}
            placeholder={i18n.t('password')}
            value={pass1}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setPass1(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('repeatPassword')}
            placeholder={i18n.t('repeatPassword')}
            value={pass2}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setPass2(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('favoriteColor')}
            placeholder={i18n.t('favoriteColor')}
            value={color}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setColor(txt)}
          />
          <Divider style={styles.divider} />
          <Text style={styles.label}>{i18n.t('sizes')}</Text>
          <View style={styles.sizeSection}>
            <Text style={styles.sizeLabel}>
            {i18n.t('tShirts')}: {shirtSize.toFixed(0)}
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
            {i18n.t('pants')}: {pantsSize.toFixed(0)}
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
            <Text style={styles.sizeLabel}>{i18n.t('shoes')}: {shoeSize.toFixed(0)}</Text>
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
            label={i18n.t('address')}
            placeholder={i18n.t('address')}
            value={address}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setAddress(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('allergies')}
            placeholder={i18n.t('allergies')}
            value={allergies}
            theme={{ colors: { primary: '#EF9009' } }}
            onChangeText={(txt) => setAllergies(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('hobbies')}
            placeholder={i18n.t('hobbies')}
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
            {i18n.t('accept')}
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
