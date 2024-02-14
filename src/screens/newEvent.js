import React, { useState, useCallback,useContext  } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Group from "../../components/group";
import ScreensContext from './ScreenContext';
import i18n from 'i18n-js';
import { en, es } from '../translation/localizations';

export default function App(props) {
  const [visible, setVisible] = useState(false);
  const [visibleDate, setVisibleDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [info, setInfo] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(["grupos"], ["grupo2"]);
  const [formattedDate, setFormattedDate] = useState("");
  const { language } = useContext(ScreensContext);
  i18n.translations = { en, es };
  i18n.locale = language;

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const onConfirm = useCallback(({ hours, minutes }) => {
    setVisible(false);
    console.log({ hours, minutes });
  }, []);
  const onDismissDatePicker = useCallback(() => {
    setVisibleDate(false);
  }, []);

  const onConfirmDatePicker = useCallback((params) => {
    setVisibleDate(false);
    setDate(params.date);
    alert(date.getFullYear()+"-"+(date.getUTCDate()+1)+"-"+date.getDay());  
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.participantsContainer}>
          <Text style={styles.label}>{i18n.t('participantsLabel')}</Text>
          <View style={styles.panel}>
            <ScrollView>
              {selectedGroup.map((selectedGroup, index) => (
                <Group key={index} name={selectedGroup} />
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.label}>{i18n.t('selectDateLabel')}</Text>
          <TouchableOpacity
            style={styles.touchableOpacityButton}
            onPress={() => setVisibleDate(true)}
          >
            <Text style={styles.buttonText}>{i18n.t('pickDateButton')}</Text>
          </TouchableOpacity>
          <DatePickerModal
            mode="single"
            visible={visibleDate}
            onDismiss={onDismissDatePicker}
            date={date}
            onConfirm={onConfirmDatePicker}
          />
        </View>
          

        <View style={styles.timeContainer}>
          <Text style={styles.label}>{i18n.t('selectTimeLabel')}</Text>
          <TouchableOpacity
            style={styles.touchableOpacityButton}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.buttonText}>{i18n.t('pickTimeButton')}</Text>
          </TouchableOpacity>
          <TimePickerModal
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            hours={12}
            minutes={14}
          />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>{i18n.t('descriptionLabel')}</Text>
          <TextInput
            style={styles.input}
            mode="outlined"
            label={i18n.t('descriptionInputLabel')}
            placeholder={i18n.t('descriptionInputLabel')}
            value={info}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(texto) => setInfo(texto)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={() => props.navigation.navigate("Calendar")}
          >
            <Text style={{ color: "white", fontSize: 20 }}>{i18n.t('addButton')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={() => props.navigation.navigate("Calendar")}
          >
            <Text style={{ color: "white", fontSize: 20 }}>{i18n.t('cancelButton')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  touchableOpacityButton: {
    backgroundColor: "orange",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  roundedButton: {
    borderRadius: 15,
    backgroundColor: "orange",
    color: "white",
    padding: 10,
    textAlign: "center",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 80,
    padding: 20,
  },

  label: {
    color: "black",
    marginBottom: 10,
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
  },
  panel: {
    backgroundColor: "#C9C9C9",
    width: "100%",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  participantsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  dateContainer: {
    width: "100%",
    marginBottom: 20,
  },
  timeContainer: {
    width: "100%",
    marginBottom: 20,
  },
  descriptionContainer: {
    width: "100%",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  input: {
    marginBottom: 20,
    width: "100%",
  },
});
