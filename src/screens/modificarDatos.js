import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Slider } from "@react-native-assets/slider";
import { TextInput, Button, Divider, HelperText } from "react-native-paper";
import { Avatar, IconButton, Portal, Modal } from "react-native-paper";
import DateTimePicker from 'react-native-ui-datepicker';
import i18n from "i18n-js";
import ScreensContext from "./ScreenContext";
import { en, es } from "../translation/localizations";

/**
 * React component for user sign-up and profile update.
 * @param {Object} props - Component properties.
 * @param {Object} navigation - React Navigation object for navigating between screens.
 * @returns {JSX.Element} JSX Element representing the user sign-up and profile update screen.
 */
const SingUp = ({ navigation }) => {
  // State variables for user data
  const { userData, setUserData, language } = useContext(ScreensContext);
  const parsedUserData = JSON.parse(userData);
  const [date, setDate] = useState(new Date());
  const [birthday, setBirthday] = useState(parsedUserData.birthday);
  const [shirtSize, setShirtSize] = useState(parsedUserData.sizes.shirt);
  const [pantsSize, setPantsSize] = useState(parsedUserData.sizes.trousers);
  const [shoeSize, setShoeSize] = useState(parsedUserData.sizes.shoes);
  const [mail, setMail] = useState(parsedUserData.mail);
  const [name, setName] = useState(parsedUserData.name);
  const [color, setColor] = useState(parsedUserData.favourite_color);
  const [address, setAddress] = useState(parsedUserData.addres);
  const [allergies, setAllergies] = useState(parsedUserData.alergies);
  const [hobbies, setHobbies] = useState(parsedUserData.hobbies);
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [modalComprovation, setModalComprovation] = useState(false);
  const [selectedImage, setSelectedImage] = useState(parsedUserData.profile_picture);
  const tallas = ["XS", "S", "M", "L", "XL", "XXL"];

  // Array of image paths for profile pictures
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

  /**
   * Checks if the email has errors.
   * @returns {boolean} - True if there are errors, false otherwise.
   */
  const hasErrors = () => {
    return !mail.includes('@');
  };

  /**
   * Checks if all required fields are not empty.
   * @returns {boolean} - True if all fields are not empty, false otherwise.
   */
  const checkFieldsNotEmpty = () => {
    if (
      !name.trim() ||
      !mail.trim() ||
      !birthday.trim() ||
      !color.trim() ||
      !address.trim() ||
      !allergies.trim() ||
      !hobbies.trim()
    ) {
      return false;
    }
    return true;
  };

  /**
   * Formats the selected date to a string.
   * @returns {string} - Formatted date string.
   */
  const formatDate = () => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /**
   * Handles the onPress event for selecting a date.
   * @param {Object} params - Date parameters.
   */
  const handleOnPress = (params) => {
    const selectedDate = new Date(params.date);
    setDate(selectedDate);
  };

  /**
   * Toggles the visibility of the profile picture selection modal.
   */
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Set language translations and locale for internationalization
  i18n.translations = {
    en,
    es,
  };
  i18n.locale = language;

  /**
   * Handles the confirmation of the selected date in the modal.
   */
  const handleConfirmation = () => {
    setModalVisible(false);
    setBirthday(formatDate());
  };

  /**
   * Updates the user profile on the server.
   */
  const updateUser = async () => {
    if (hasErrors() || !checkFieldsNotEmpty()) {
      setModalComprovation(true);
    } else {
      try {
        const response = await fetch(
          `http://44.194.67.133:8080/TimeTogether/updateUser/${parsedUserData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              additional_information: "",
              addres: address,
              alergies: allergies,
              birthday: birthday,
              favourite_color: color,
              hobbies: hobbies,
              mail: mail,
              name: name,
              profile_picture: selectedImage.toString(),
              sizes: {
                shirt: shirtSize,
                trousers: pantsSize,
                shoes: shoeSize,
              },
              surname: "",
            }),
          }
        );

        const resultText = await response.text();

        if (!response.ok) {
          alert(`Error al actualizar el usuario: ${resultText}`);
        } else {
          alert(i18n.t("updateUser"));
          updateData();
          navigation.navigate("Settings");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert(`Error en la solicitud: ${error.message}`);
      }
    }
  };

  /**
   * Updates the user data after profile update.
   */
  const updateData = async () => {
    try {
      const response = await fetch(
        "http://44.194.67.133:8080/TimeTogether/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mail: mail,
            password: parsedUserData.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setUserData(JSON.stringify(json));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Portal.Host>
      <ScrollView style={styles.container}>
        <IconButton
          icon="arrow-left"
          size={20}
          onPress={() => navigation.navigate("Settings")} />
        <View style={styles.form}>
          <TouchableOpacity onPress={() => { toggleVisibility(); }}>
            <Avatar.Image
              style={styles.logo}
              source={selectedImage}
              onPress={() => console.log("Button Pressed")} />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t("name")}
            placeholder={i18n.t("name")}
            value={name}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setName(txt)} />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t("email")}
            placeholder={i18n.t("email")}
            value={mail}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setMail(txt)}
            onFocus={() => setIsFocused(true)} />
          <HelperText type="error" visible={hasErrors()}>
            {i18n.t('helperText')}
          </HelperText>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.label}>{i18n.t("birthday")} : {birthday}</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t("favoriteColor")}
            placeholder={i18n.t("favoriteColor")}
            value={color}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setColor(txt)} />
          <Divider style={styles.divider} />
          <Text style={styles.label}>{i18n.t("sizes")}</Text>
          <View style={styles.sizeSection}>
            <Text style={styles.sizeLabel}>
              {i18n.t('tShirts')}: {tallas[shirtSize]}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={tallas.length - 1}
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
              {i18n.t("pants")}: {pantsSize.toFixed(0)}
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
              thumbTintColor="#304999" />
          </View>

          <View style={styles.sizeSection}>
            <Text style={styles.sizeLabel}>
              {i18n.t("shoes")}: {shoeSize.toFixed(0)}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={30}
              maximumValue={50}
              step={1}
              onValueChange={(value) => setShoeSize(value)}
              value={shoeSize}
              minimumTrackTintColor="#EF9009"
              maximumTrackTintColor="#000000"
              thumbTintColor="#304999" />
          </View>
          <Divider style={styles.divider} />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t("address")}
            placeholder={i18n.t("address")}
            value={address}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setAddress(txt)} />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t("allergies")}
            placeholder={i18n.t("allergies")}
            value={allergies}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setAllergies(txt)} />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t("hobbies")}
            placeholder={i18n.t("hobbies")}
            value={hobbies}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setHobbies(txt)} />
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            theme={{ colors: { primary: "#EF9009" } }}
            onPress={() => {
              updateUser();
            }}>
            {i18n.t("accept")}
          </Button>

        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={modalVisible}
          contentContainerStyle={[styles.modalContainer]}>
          <View style={styles.modalContent}>
            <DateTimePicker
              style={{ flex: 1 }}
              locale="en"
              date={date}
              onChange={(date) => {
                handleOnPress(date);
              }}
              accessibilityRole="button"
              selectedItemColor="#304999" />
            <View style={{ flexDirection: 'row' }}>
              <Button
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttonLabel}
                theme={{ colors: { primary: "#EF9009" } }}
                onPress={() => handleConfirmation()}>
                {i18n.t("accept")}
              </Button>

              <Button
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttonLabel}
                theme={{ colors: { primary: "#EF9009" } }}
                onPress={() => setModalVisible(false)}>
                {i18n.t("reject")}
              </Button>
            </View>
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
    </Portal.Host>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
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
});

export default SingUp;
