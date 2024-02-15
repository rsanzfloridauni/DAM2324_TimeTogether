import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Slider } from "@react-native-assets/slider";
import { TextInput, Button, Divider } from "react-native-paper";
import { Avatar, IconButton,Portal, Modal } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import i18n from "i18n-js";
import ScreensContext from "./ScreenContext";
import { en, es } from "../translation/localizations";

const SingUp = ({ navigation }) => {
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

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  i18n.translations = {
    en,
    es,
  };

  i18n.locale = language;

  const handleConfirmation = () => {
    setModalVisible(false);
  };

  const updateUser = async () => {
    console.log(date.toISOString());
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
            birthday: formatDate(date),
            favourite_color: color,
            hobbies: hobbies,
            mail: mail,
            name: name,
            profile_picture: "URL de la imagen de perfil del usuario",
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
        alert("Usuario actualizado con éxito");
        console.log("Success Response:", resultText);
        updateData();
        navigation.navigate("Settings");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert(`Error en la solicitud: ${error.message}`);
    }
  };

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
          onPress={() => navigation.navigate("Settings")}
        />
        <View style={styles.form}>
          <TouchableOpacity onPress={toggleVisibility}>
            <Avatar.Image
              style={styles.logo}
              source={require("../image/logo.png")}
              onPress={() => console.log("Button Pressed")}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t("name")}
            placeholder={i18n.t("name")}
            value={name}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setName(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t("email")}
            placeholder={i18n.t("email")}
            value={mail}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setMail(txt)}
          />
          <Text style={styles.label}>{i18n.t("birthday")} : {birthday}</Text>
          <Button onPress={()=> setModalVisible(true)}>Cambiar cumpleaños</Button>

          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t("favoriteColor")}
            placeholder={i18n.t("favoriteColor")}
            value={color}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setColor(txt)}
          />
          <Divider style={styles.divider} />
          <Text style={styles.label}>{i18n.t("sizes")}</Text>
          <View style={styles.sizeSection}>
            <Text style={styles.sizeLabel}>
              {i18n.t("tShirts")}: {shirtSize.toFixed(0)}
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
              thumbTintColor="#304999"
            />
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
              thumbTintColor="#304999"
            />
          </View>
          <Divider style={styles.divider} />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t("address")}
            placeholder={i18n.t("address")}
            value={address}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setAddress(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t("allergies")}
            placeholder={i18n.t("allergies")}
            value={allergies}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setAllergies(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t("hobbies")}
            placeholder={i18n.t("hobbies")}
            value={hobbies}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setHobbies(txt)}
          />
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            theme={{ colors: { primary: "#EF9009" } }}
            onPress={() => {
              updateUser();
            }}
          >
            {i18n.t("accept")}
          </Button>
        </View>
      </ScrollView>
      <Portal>
        <Modal
          visible={modalVisible}
          contentContainerStyle={[styles.modalContainer]}
        >
          <View style={styles.modalContent}>
            <DatePickerInput
              style={{ flex: 1 }}
              locale="en"
              label={i18n.t("birthday")}
              value={date}
              onChange={(d) => setDate(d)}
              inputMode="start"
            />
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              theme={{ colors: { primary: "#EF9009" } }}
              onPress={() => handleConfirmation()}
            >
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
