import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { TextInput, Divider, List, IconButton, Card } from 'react-native-paper';
import Members from '../../components/miembros.js';
import i18n from 'i18n-js';
import { en, es } from '../translation/localizations';
import ScreensContext from './ScreenContext';

/**
 * InfoGroup component displays information about a group.
 *
 * @param {object} route - The route object containing parameters.
 * @param {object} navigation - The navigation object.
 * @returns {JSX.Element} - JSX element representing the InfoGroup component.
 */
const InfoGroup = ({ route, navigation }) => {
  // Extracting userId from route parameters
  const userId = route.params.userId;

  // State variables for group information
  const [groupName, setGroupName] = useState();
  const [groupDescription, setGroupDescription] = useState();
  const [names, setNames] = useState([]);
  const [color, setColor] = useState();
  const { language } = useContext(ScreensContext);

  // Setting up localization with i18n
  i18n.translations = { en, es };
  i18n.locale = language;

  /**
   * Fetch group information from the server.
   *
   * @param {string} userId - The user ID for the group.
   */
  useEffect(() => {
    fetch(`http://44.194.67.133:8080/TimeTogether/group?id=${userId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update state with fetched data
        setGroupName(data.name);
        setGroupDescription(data.description);
        setNames(data.members);
        setColor(data.color);
      })
      .catch((error) => {
        console.error("Error fetching group info:", error);
      });
  }, [userId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon="arrow-left"
            size={20}
            style={{ marginTop: "10%" }}
             onPress={() => navigation.navigate("Group")}
          />
        </View>
        <Text style={styles.label}>{i18n.t('groupInformation')}</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          label={i18n.t('groupName')}
          placeholder={i18n.t('groupName')}
          value={groupName}
          theme={{ colors: { primary: '#EF9009' } }}
          onChangeText={(txt) => setGroupName(txt)}
          disabled
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label={i18n.t('groupDescription')}
          placeholder={i18n.t('groupDescription')}
          value={groupDescription}
          theme={{ colors: { primary: '#EF9009' } }}
          onChangeText={(txt) => setGroupDescription(txt)}
          disabled
        />
        <Divider style={styles.divider} />
        <Card style={{...styles.card, backgroundColor: color}}>
          <Card.Content>
            <List.Section>
              <List.Subheader style={styles.label}>
              {i18n.t('membersGroup')}
              </List.Subheader>
              <ScrollView>
                {names.map((obj, index) => (
                  <Members
                    key={index}
                    name={obj.name}
                    imageSource={''}
                  />
                ))}
              </ScrollView>
            </List.Section>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  logo: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginBottom: "5%",
    marginRight: "50%"
  },
  card: {
    marginVertical: 10,
    borderRadius: 20
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
    alignSelf: 'center',
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
});

export default InfoGroup;
