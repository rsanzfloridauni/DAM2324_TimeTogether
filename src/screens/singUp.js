import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Slider } from '@react-native-assets/slider';
import { TextInput, Button, Divider, Checkbox, HelperText } from 'react-native-paper';
import { Avatar, Modal, Portal } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import snackIcon from "../../assets/snack-icon.png";
import i18n from 'i18n-js';
import { en, es } from '../translation/localizations';
import ScreensContext from './ScreenContext';

const SingUp = (props) => {
  const [date, setDate] = useState(new Date());
  const [shirtSize, setShirtSize] = useState(0);
  const [pantsSize, setPantsSize] = useState(38);
  const [shoeSize, setShoeSize] = useState(35);
  const [mail, setMail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [address, setAddress] = useState("");
  const [allergies, setAllergies] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [inputDate, setInputDate] = React.useState(undefined)
  const { language } = useContext(ScreensContext);
  const [checked, setChecked] = React.useState(false);
  const [privacity, setPrivacity] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [modalComprovation, setModalComprovation] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const CryptoJS = require("crypto-js");
  const [selectedImage, setSelectedImage] = useState(require('../image/FotoHombre1.png'));
  const nombresImagenes = [
    require("../image/FotoHombre1.png"),
    require("../image/FotoHombre2.png"),
    require("../image/FotoHombre3.png"),
    require("../image/FotoHombre4.png"),
    require("../image/FotoHombre5.png"),
    require("../image/FotoMujer1.png"),
    require("../image/FotoMujer2.png"),
    require("../image/FotoMujer3.png"),
    require("../image/FotoMujer4.png"),
    require("../image/FotoMujer5.png"),
  ];


  function encryptMD5(pass1) {
    return CryptoJS.MD5(pass1).toString();
  }
  i18n.translations = { en, es };
  i18n.locale = language;

  const toggleConfirmationVisibility = () => {
    setConfirmationVisible(!confirmationVisible);
  };

  const hasErrors = () => {
    return isFocused && !mail.includes('@');
  };

  const checkFieldsNotEmpty = () => {
    if (
      !name.trim() ||
      !mail.trim() ||
      !date ||
      !color.trim() ||
      !address.trim() ||
      !allergies.trim() ||
      !hobbies.trim() ||
      !mail.includes('@')
    ) {
      return false;
    }
    return true;
  };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const togglePrivacity = () => {
    setPrivacity(!privacity);
  };
  const handlePrivacity = () => {
    if (privacity == true) {
      setPrivacity(false);
    } else {
      setPrivacity(true);
    }
  }

  const handleSubmit = async () => {
    if (!checkFieldsNotEmpty()) {
      setModalComprovation(true);
    }
    else {
      if (pass1 !== pass2) {
        alert(i18n.t('notMatchPasswords'));
        return;
      }
      if (checked == false) {
        alert(i18n.t('acceptPrivacity'));
        return;
      }

      if (checked) {
        try {
          const response = await fetch(
            "http://44.194.67.133:8080/TimeTogether/newUser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                mail: mail,
                password: encryptMD5(pass1),
                name: name,
                surname: "aaa",
                additional_information: "aaa",
                addres: address,
                alergies: allergies,
                birthday: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
                favourite_color: color,
                friends: [],
                hobbies: hobbies,
                sizes: {
                  shirt: shirtSize,
                  trousers: pantsSize,
                  shoes: shoeSize,
                },
                groups: [],
                profile_picture: selectedImage.toString()
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          alert(i18n.t('codeSuccessfully'));
          console.log(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
        } catch (error) {
          console.error("Error en la petición:", error);
          alert(i18n.t('codeIncorrect'));
        }
        toggleConfirmationVisibility();
      }
      else alert(i18n.t('acceptPrivacity'));
    }
  };

  const handleConfirmation = async () => {
    const verificationData = {
      code: parseInt(confirmationCode, 10),
      email: mail,
    };

    try {
      const response = await fetch(
        "http://44.194.67.133:8080/TimeTogether/verifyCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verificationData),
        }
      );

      const isValid = await response.json();

      if (isValid) {
        alert(i18n.t('codeSuccessfully'));
        props.navigation.navigate("Login");
      } else {
        alert(i18n.t('codeIncorrect'));
      }
    } catch (error) {
      console.error(i18n.t('errorCode'), error);
      alert(i18n.t('errorProcessing'));
    }
  };

  return (
    <Portal.Host>
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <TouchableOpacity key={index} onPress={() => { setSelectedImage(ruta); toggleVisibility(); }}>
            <Avatar.Image
              style={styles.logo}
              source={selectedImage}
              onPress={() => console.log("Button Pressed")}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('name')}
            placeholder={i18n.t('name')}
            value={name}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setName(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('email')}
            placeholder={i18n.t('email')}
            value={mail}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setMail(txt)}
            onFocus={() => setIsFocused(true)} />
          <HelperText type="error" visible={hasErrors()}>
            {i18n.t('helperText')}
          </HelperText>

          <DatePickerInput
            locale="en"
            label={i18n.t('birthday')}
            value={date}
            onChange={(d) => setDate(d)}
            inputMode="start"
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('password')}
            placeholder={i18n.t('password')}
            value={pass1}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setPass1(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('repeatPassword')}
            placeholder={i18n.t('repeatPassword')}
            value={pass2}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setPass2(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('favoriteColor')}
            placeholder={i18n.t('favoriteColor')}
            value={color}
            theme={{ colors: { primary: "#EF9009" } }}
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
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setAddress(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('allergies')}
            placeholder={i18n.t('allergies')}
            value={allergies}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setAllergies(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('hobbies')}
            placeholder={i18n.t('hobbies')}
            value={hobbies}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setHobbies(txt)}
          />
          <View style={{ flexDirection: 'row' }}>
            <Checkbox status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />

            <TouchableOpacity style={{ top: 4 }}
              onPress={handlePrivacity}
            >
              <Text>{i18n.t('acceptCondicions')}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Portal>
              <Modal
                visible={privacity}
                onDismiss={togglePrivacity}
                contentContainerStyle={styles.modalContainer}
              >
                <View style={styles.modalContent}>
                  <Text>{i18n.t('privacity')}</Text>
                </View>
              </Modal>
            </Portal>

          </View>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            theme={{ colors: { primary: "#EF9009" } }}
            onPress={() => {
              handleSubmit();
            }}
          >
            {i18n.t('accept')}
          </Button>
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={toggleVisibility}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            {nombresImagenes.map((ruta, index) => (
              <TouchableOpacity onPress={() => { setSelectedImage(ruta); toggleVisibility(); }}>
                <Avatar.Image key={index} style={styles.modalLogo} source={ruta} />
              </TouchableOpacity>

            ))}
          </View>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={confirmationVisible}
          onDismiss={toggleConfirmationVisibility}
          contentContainerStyle={[styles.modalContainer]}
        >
          <View style={styles.modalContent}>
            <Text>{i18n.t('enterConfirmationCode')}:</Text>
            <TextInput
              style={styles.inputCode}
              mode="outlined"
              label={i18n.t('confirmationCode')}
              placeholder={i18n.t('enterConfirmationCode')}
              keyboardType="numeric"
              theme={{ colors: { primary: "#EF9009" } }}
              onChangeText={(text) => setConfirmationCode(text)}
            />
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              theme={{ colors: { primary: "#EF9009" } }}
              onPress={() => handleConfirmation()}
            >
              {i18n.t('send')}
            </Button>
          </View>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={modalComprovation}
          contentContainerStyle={[styles.modalContainer]}>
          <View style={styles.modalContent}>
            <Text style={{ textAlign: 'center', fontSize: 18 }}> {i18n.t("comprovation")}</Text>
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              theme={{ colors: { primary: "#EF9009" } }}
              onPress={() => setModalComprovation(false)}>
              {i18n.t("accept")}
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
    padding: 15,
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    alignSelf: "center",
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
    color: "black",
    marginBottom: 5,
    alignSelf: "center",
  },
  slider: {
    width: "100%",
    marginVertical: 10,
  },

  button: {
    marginTop: 10,
  },
  buttonLabel: {
    color: "white",
  },
  divider: {
    marginVertical: 20,
  },
  sizeSection: {
    alignItems: "center",
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
