import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from "react-native";
import { Button, TextInput, Modal, Portal } from 'react-native-paper';
import Friend from "../../components/friend";
import ScreenContext from "./ScreenContext";
import i18n from 'i18n-js';
import { en, es } from '../translation/localizations';
i18n.translations = { en, es };

export default function Friends({ navigation }) {
  const { userData, setUserData, language } = useContext(ScreenContext);
  const [mail, setMail] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const parsedUserData = JSON.parse(userData);

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  const toggleConfirmationVisibility = () => {
    setConfirmationVisible(!confirmationVisible);
  };

  useEffect(() => {
    try {
      if (parsedUserData && parsedUserData.id) {
        fetch(`http://44.194.67.133:8080/TimeTogether/friends?id=${parsedUserData.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setFriendList(data.friends);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } catch (error) {
      console.error("Error parsing userData:", error);
    }
  }, [userData, confirmationVisible]);

  const addFriend = async () => {

    try {
      const response = await fetch('http://44.194.67.133:8080/TimeTogether/addFriend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: parsedUserData.id,
          friendMail: mail,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${ response.status }`);
      }

      const text = await response.text();
      if (text) {
        const json = JSON.parse(text);
      } else {
        toggleConfirmationVisibility();
      }
    } catch (error) {
      alert(i18n.t('userNotFound'))
    }
  };

  const removeFriend = async (param) => {

    try {
      const response = await fetch('http://44.194.67.133:8080/TimeTogether/removeFriend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: parsedUserData.id,
          friendId: param,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${ response.status }`);
      }

      const text = await response.text();
      if (text) {
        const json = JSON.parse(text);
      } else {
        alert(i18n.t('userDeleted'))
        setConfirmationVisible(true);
        setConfirmationVisible(false);      
      }
    } catch (error) {
      alert(i18n.t('userNotFound'))
    }
  };

  return (
    <Portal.Host>
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.buttonFriends}
            onPress={() => navigation.navigate('Friends')}>
            <Text style={styles.textButton} > {i18n.t('friends')} </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonGroup}
            onPress={() => navigation.navigate('Group')}>
            <Text style={styles.textButton} > {i18n.t('groups')} </Text>
          </TouchableOpacity>
        </View>


        <View style={styles.panel}>
          <ScrollView>
            {friendList.map((friend, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('FriendsInfo', { userId: friend.id })}>
                <Friend
                  imageSource={friend.profile_picture}
                  name={friend.name}
                  onDelete={() => removeFriend(friend.id)}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Button
          mode="contained"
          theme={{ colors: { primary: "#304999" } }}
          style={styles.button}
          onPress={toggleConfirmationVisibility}>
          {i18n.t('addFriend')}
        </Button>
      </View>

      <Portal>
        <Modal
          visible={confirmationVisible}
          onDismiss={toggleConfirmationVisibility}
          contentContainerStyle={[styles.modalContainer]}>
          <View style={styles.modalContent}>
            <Text>{i18n.t('enterEmail')}</Text>
            <TextInput
              style={styles.input}
              mode="outlined"
              label={i18n.t('email')}
              placeholder={i18n.t('email')}
              theme={{ colors: { primary: '#EF9009' } }}
              onChangeText={(txt) => setMail(txt)}
            />
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              theme={{ colors: { primary: '#304999' } }}
              onPress={() => addFriend(mail)}>
              {i18n.t('send')}
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
    marginTop: 50,
  },
  button: {
    margin: 20,
    marginBottom: 10,
    marginTop: 0,
    borderRadius: 20,
    alignItems: 'center',
  },
  panel: {
    flex: 1,
    padding: 16,
    backgroundColor: '#C9C9C9',
    borderRadius: 20,
    margin: 20,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  input: {
    width: 300,
    height: 50,
    marginBottom: 10
  },
  buttonFriends: {
    backgroundColor: '#EF9009',
    alignContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
  },
  buttonGroup: {
    backgroundColor: '#5C6361',
    alignContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
  },
  textButton: {
    textAlign: 'center',
    margin: 10,
    color: 'white'
  }
});
