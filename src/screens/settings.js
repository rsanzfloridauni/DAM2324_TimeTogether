import { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import i18n from 'i18n-js';
import { en, es } from '../translation/localizations';
import ScreensContext from './ScreenContext';

i18n.translations = {
  en,
  es,
};

const Settings = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const { language, setLanguage } = useContext(ScreensContext);

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  const toggleLanguage = (lang) => {
    if (language !== lang) {
      setLanguage((prevLanguage) => {
        i18n.locale = lang;
        return lang;
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('settings')}</Text>

      <View style={[styles.sectionContainer, styles.containerBackground]}>
        <Text style={styles.sectionTitle}>{i18n.t('modifyUserData')}</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => props.navigation.navigate('ModificarDatos')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.sectionContainer, styles.containerBackground]}>
        <Text style={styles.sectionTitle}>{i18n.t('screen')}</Text>

        <View style={styles.switchContainer}>
          <TouchableOpacity onPress={() => setDarkMode(true)}>
            <Image
              style={[
                styles.imageScreen,
                darkMode ? styles.selectedScreen : null,
              ]}
              source={require('../image/luna.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDarkMode(false)}>
            <Image
              style={[
                styles.imageScreen,
                !darkMode ? styles.selectedScreen : null,
              ]}
              source={require('../image/sol.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.sectionContainer, styles.containerBackground]}>
        <Text style={styles.sectionTitle}>{i18n.t('language')}</Text>

        <View style={styles.switchContainer}>
          <TouchableOpacity onPress={() => toggleLanguage('es')}>
            <Image
              style={[
                styles.imageLanguage,
                language === 'es' ? styles.selectedLanguage : null,
              ]}
              source={require('../image/espanyol.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleLanguage('en')}>
            <Image
              style={[
                styles.imageLanguage,
                language === 'en' ? styles.selectedLanguage : null,
              ]}
              source={require('../image/ingles.png')} />
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
  },
});

export default Settings;
