import React, { useState, useEffect, useContext } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Slider } from "@react-native-assets/slider";
import {
  TextInput,
  Divider,
  IconButton,
  Avatar,
} from "react-native-paper";
import { DatePickerInput } from 'react-native-paper-dates';
import i18n from 'i18n-js';
import { en, es } from '../translation/localizations';
import ScreensContext from './ScreenContext';

/**
 * InfoAmigo component displays detailed information about a friend.
 *
 * @component
 * @param {object} route - The route object containing navigation parameters.
 * @param {object} navigation - The navigation object.
 * @returns {JSX.Element} - JSX element representing the InfoAmigo component.
 */
const InfoAmigo = ({ route, navigation }) => {
  // Extracting userId from route parameters
  const userId = route.params.userId;

  // Accessing language from context
  const { language } = useContext(ScreensContext);

  // State variables to store friend information
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [favouriteColor, setFavouriteColor] = useState("");
  const [address, setAddress] = useState("");
  const [shirtSize, setShirtSize] = useState(0);
  const [pantsSize, setPantsSize] = useState(0);
  const [shoeSize, setShoeSize] = useState(0);
  const [hobbies, setHobbies] = useState("");
  const [allergies, setAllergies] = useState("");
  const [birthday, setBirthday] = useState("");
  const [imgPerfil, setImgPerfil] = useState();

  // Arrays for clothing sizes and hobbies
  const tallas = ["XS", "S", "M", "L", "XL", "XXL"];

  // Set the translations for i18n
  i18n.translations = { en, es };

  // Fetch friend information from the server
  useEffect(() => {
    i18n.locale = language;

    fetch(`http://44.194.67.133:8080/TimeTogether/friendInfo?id=${userId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setMail(data.mail);
        setFavouriteColor(data.favourite_color);
        setAddress(data.addres);
        setImgPerfil(data.profile_picture);
        setBirthday(data.birthday);
        setShirtSize(parseInt(data.sizes.shirt, 10));
        setPantsSize(parseInt(data.sizes.trousers, 10));
        setShoeSize(parseInt(data.sizes.shoes, 10));
        setHobbies(data.hobbies);
        setAllergies(data.alergies);
      })
      .catch((error) => {
        console.error("Error fetching friend info:", error);
      });
  }, [userId, language]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="arrow-left"
            size={20}
            style={{ marginTop: 30 }}
            onPress={() => navigation.navigate("FriendsList")}
          />
        </View>
        <Avatar.Image
          style={styles.logo}
          source={imgPerfil}
          onPress={() => console.log("Button Pressed")}
        />
        <TextInput
          disabled="true"
          style={styles.input}
          mode="outlined"
          label={i18n.t('name')}
          placeholder={i18n.t('name')}
          value={name}
          theme={{ colors: { primary: "#EF9009" } }}
        />
        <TextInput
          disabled="true"
          style={styles.input}
          mode="outlined"
          label={i18n.t('email')}
          placeholder={i18n.t('email')}
          value={mail}
          theme={{ colors: { primary: "#EF9009" } }}
        />
        <Divider style={styles.divider} />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            disabled={true}
            style={{ flex: 1, marginRight: 5, ...styles.input }}
            mode="outlined"
            label={i18n.t('favoriteColor')}
            placeholder={i18n.t('favoriteColor')}
            value={favouriteColor}
            theme={{ colors: { primary: "#EF9009" } }}
          />
          <TextInput
            disabled={true}
            style={{ flex: 1, marginRight: 5, ...styles.input }}
            mode="outlined"
            label={i18n.t('birthday')}
            placeholder={i18n.t('birthday')}
            value={birthday}
            theme={{ colors: { primary: "#EF9009" } }}
          />
        </View>
        <TextInput
          disabled
          style={styles.input}
          mode="outlined"
          label={i18n.t('address')}
          placeholder={i18n.t('address')}
          value={address}
          theme={{ colors: { primary: "#EF9009" } }}
        />
        <Divider style={styles.divider} />
        <Text style={styles.label}>{i18n.t('sizes')}</Text>
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
              enabled={false}
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
            value={pantsSize}
            minimumTrackTintColor="#EF9009"
            maximumTrackTintColor="#000000"
            thumbTintColor="#304999"
            enabled={false}
          />
        </View>

        <View style={styles.sizeSection}>
          <Text style={styles.sizeLabel}>{i18n.t('shoes')}: {shoeSize.toFixed(0)}</Text>
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
        <Text style={styles.label}>{i18n.t('hobbies')}</Text>
        <Text style={styles.text}>{hobbies}</Text>
        <Text style={styles.label}>{i18n.t('allergies')}</Text>
        <Text style={styles.text}>{allergies}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
});

export default InfoAmigo;
