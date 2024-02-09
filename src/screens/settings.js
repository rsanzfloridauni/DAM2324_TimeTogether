import { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const Settings = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={[styles.sectionContainer, styles.containerBackground]}>
        <Text style={styles.sectionTitle}>Modify user data</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => props.navigation.navigate('ModificarDatos')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.sectionContainer, styles.containerBackground]}>
        <Text style={styles.sectionTitle}>Screen</Text>

        <View style={styles.switchContainer}>
          <TouchableOpacity onPress={() => setDarkMode(true)}>
            <Image
              style={[
                styles.imageScreen,
                darkMode ? styles.selectedScreen : null,
              ]}
              source={require('../image/luna.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDarkMode(false)}>
            <Image
              style={[
                styles.imageScreen,
                !darkMode ? styles.selectedScreen : null,
              ]}
              source={require('../image/sol.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.sectionContainer, styles.containerBackground]}>
        <Text style={styles.sectionTitle}>Language</Text>

        <View style={styles.switchContainer}>
          <TouchableOpacity onPress={() => setLanguage(false)}>
            <Image
              style={[
                styles.imageLanguage,
                !language ? styles.selectedLanguage : null,
              ]}
              source={require('../image/espanyol.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setLanguage(true)}>
            <Image
              style={[
                styles.imageLanguage,
                language ? styles.selectedLanguage : null,
              ]}
              source={require('../image/ingles.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  containerBackground: {
    backgroundColor: '#C9C9C9',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
  },
  buttonContainer: {
    position: 'absolute',
    right: 10,
    top: 8,
    backgroundColor: 'gray',
    borderRadius: 20,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    lineHeight: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 20,
    fontSize: 30,
  },
  imageLanguage: {
    height: 80,
    width: 80,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',

    marginTop: 13,
  },
  imageScreen: {
    height: 80,
    width: 80,
    marginTop: 13,
  },
  selectedScreen: {
    height: 110,
    width: 110,
  },
    selectedLanguage: {
    height: 100,
    width: 100,
     borderWidth: 4,
    //borderColor: 'orange',
  },
});

export default Settings;
