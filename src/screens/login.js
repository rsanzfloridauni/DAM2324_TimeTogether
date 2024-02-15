import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import React, { useState, useContext } from 'react';
import { Button, TextInput, Portal, Modal } from "react-native-paper";
import ScreensContext from './ScreenContext';
import i18n from 'i18n-js';

export default function Login(props) {
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [viewPassword, setViewPassword] = React.useState(true);
  const { userData, setUserData } = useContext(ScreensContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirmation = () => {
    setModalVisible(false);
  };

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
        if (response.status === 404) {
          setModalVisible(true);
        }
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
    <Portal.Host>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../image/logo.png")} />
        <ScrollView style={styles.scroll}>
        <View style={[{ marginBottom: 100 }]}>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Email"
              value={mail}
              theme={{ colors: { primary: "#EF9009" } }}
              onChangeText={(mail) => setMail(mail)}/>

            <TextInput
              style={styles.input}
              mode="outlined"
              secureTextEntry={viewPassword}
              label={i18n.t('password')}
              value={password}
              right={
                <TextInput.Icon
                  name={viewPassword ? "eye-off" : "eye"}
                  onPress={() => setViewPassword(!viewPassword)} />
              }
              theme={{ colors: { primary: "#EF9009" } }}
              onChangeText={setPassword} />
          </View>

          <Button
            style={styles.button}
            mode="contained"
            theme={{ colors: { primary: "#304999" } }}
            labelStyle={styles.text}
            onPress={() => handleLogIn()}>
            {i18n.t('logIn')}
          </Button>

          <Button
            style={styles.button}
            mode="contained"
            theme={{ colors: { primary: "#304999" } }}
            labelStyle={styles.text}
            onPress={() => props.navigation.navigate("SingUp")}>
            {i18n.t('createAccount')}
          </Button>
        </ScrollView>
      </View>

      <Portal>
        <Modal
          visible={modalVisible}
          contentContainerStyle={[styles.modalContainer]}>
          <View style={styles.modalContent}>
            <Text>{i18n.t('errorLogIn')}</Text>
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              theme={{ colors: { primary: "#EF9009" } }}
              onPress={() => handleConfirmation()}>
              {i18n.t('accept')}
            </Button>
          </View>
        </Modal>
      </Portal>
    </Portal.Host>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textTransform: "none",
    fontSize: 18,
  },
  input: {
    flex: 2,
    marginBottom: 10,
    width: 250,
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
