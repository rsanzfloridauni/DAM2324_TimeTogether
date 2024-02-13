import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import React, { useState, useContext } from 'react';
import { Button, TextInput, IconButton } from "react-native-paper";
import ScreensContext from './ScreenContext';

export default function Login(props) {
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [viewPassword, setViewPassword] = React.useState(true);
  const { userData, setUserData } = useContext(ScreensContext); 
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
          label="Email"
          value={mail}
          theme={{ colors: { primary: "#EF9009" } }}
          onChangeText={(mail) => setMail(mail)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          secureTextEntry={viewPassword}
          label="Password"
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
          Iniciar Sesion
        </Button>

        <Button
          style={styles.button}
          mode="contained"
          theme={{ colors: { primary: "#304999" } }}
          labelStyle={styles.text}
          onPress={() => props.navigation.navigate("SingUp")}
        >
          Crear cuenta
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
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
