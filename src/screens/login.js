import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import React, { useState, useContext,useEffect } from 'react';
import { Button, TextInput, IconButton } from "react-native-paper";
import i18n from 'i18n-js';
import { en, es } from '../translation/localizations';
import ScreensContext from './ScreenContext';

export default function Login(props) {
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [viewPassword, setViewPassword] = React.useState(true);
  const { userData, setUserData } = useContext(ScreensContext); 
  const { language } = useContext(ScreensContext);

  i18n.translations = { en, es };
  i18n.locale = language;


  const handleLogIn = async () => {
    try {
      const response = await fetch(
        'http://44.194.67.133:8080/TimeTogether/user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mail: mail,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setUserData(JSON.stringify(json));
      props.navigation.navigate('Start');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../image/logo.png")} />
      <ScrollView style={styles.scroll}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label={i18n.t('email')}
          value={mail}
          theme={{ colors: { primary: "#EF9009" } }}
          onChangeText={(mail) => setMail(mail)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          secureTextEntry={viewPassword}
          label={i18n.t('password')}
          value={password}
          right={
            <TextInput.Icon
              name={viewPassword ? "eye-off" : "eye"}
              onPress={() => setViewPassword(!viewPassword)}
            />
          }
          theme={{ colors: { primary: "#EF9009" } }}
          onChangeText={setPassword}
        />

        <Button
          style={styles.button}
          mode="contained"
          theme={{ colors: { primary: "#304999" } }}
          labelStyle={styles.text}
          onPress={() => handleLogIn()}
        >
          {i18n.t('logIn')}
        </Button>

        <Button
          style={styles.button}
          mode="contained"
          theme={{ colors: { primary: "#304999" } }}
          labelStyle={styles.text}
          onPress={() => props.navigation.navigate("SingUp")}
        >
          {i18n.t('createAccount')}
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    alignItems: "center",
    textAlign: "center",
  },
  scroll: {
    textAlign: "center",
  },
  logo: {
    height: 300,
    width: 300,
  },

  button: {
    margin: 10,
    height: 50,
    width: 250,
    borderRadius: 15,
  },

  text: {
    textTransform: "none",
    fontSize: 18,
  },

  textForgot: {
    color: "blue",
    fontSize: 12,
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    flex: 2,
    marginBottom: 10,
    width: 250,
  },
});
