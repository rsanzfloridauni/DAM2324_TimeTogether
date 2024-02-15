import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import ScreenContext from "./ScreenContext";
import i18n from 'i18n-js';
import { en, es } from '../translation/localizations';

i18n.translations = { en, es };

const GroupsAll = ({ navigation }) => {
  const { userData, language  } = useContext(ScreenContext);
  const [groupsData, setGroupsData] = useState([]);

  useEffect(() => {
    const fetchGroups = () => {
      try {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData && parsedUserData.id) {
          fetch(`http://44.194.67.133:8080/TimeTogether/userGroups?userId=${parsedUserData.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => response.json())
          .then((data) => {
            setGroupsData(data.groups);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    };

    const focusListener = navigation.addListener('focus', () => {
      fetchGroups();
    });

    fetchGroups();

    return () => focusListener.remove();
  }, [navigation, userData]);

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonFriends}
          onPress={() => navigation.navigate('FriendsList')}>
          <Text style={styles.textButton} > {i18n.t('friends')} </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonGroup}
          onPress={() => navigation.navigate('Group')}>
          <Text style={styles.textButton} > {i18n.t('groups')} </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {groupsData.map((group, index) => (
            <TouchableOpacity
              style={[styles.groupWrapper, { backgroundColor: group.color }]}
              key={index}
              onPress={() => navigation.navigate('InfoGrupo', { userId: group.id })}>
              <View style={styles.groupContainer}>
                <Text style={styles.groupName}>{group.name}</Text>
              </View>
            </TouchableOpacity>
          ))}

        </ScrollView>


      </View>

      <Button
        mode="contained"
        theme={{ colors: { primary: '#304999' } }}
        style={styles.createGroupButton}
        onPress={() => navigation.navigate('NewGroup')}>
        {i18n.t('createNewGroup')}
      </Button>

    </View>
  );
};
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginTop: 50,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#C9C9C9',
    borderRadius: 20,
    margin: 20,
    marginBottom: 10,
  },
  groupWrapper: {
    backgroundColor: '#C9C9C9',
    marginBottom: 8,
    borderRadius: 10,
    padding: 16,
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupName: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
  createGroupButton: {
    margin: 20,
    marginBottom: 10,
    marginTop: 0,
    borderRadius: 20,
    alignItems: 'center',
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonFriends: {
    backgroundColor: '#000000',
    alignContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
  },
  buttonGroup: {
    backgroundColor: '#EF9009',
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

export default GroupsAll;
