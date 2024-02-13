import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Slider } from '@react-native-assets/slider';
import { TextInput, Button, Divider } from 'react-native-paper';
import { Avatar, Modal, Portal } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import snackIcon from "../../assets/snack-icon.png";

const SingUp = (props) => {
  const [date, setDate] = useState(new Date());
  const [shirtSize, setShirtSize] = useState(0);
  const [pantsSize, setPantsSize] = useState(38);
  const [shoeSize, setShoeSize] = useState(35);
  const [mail, setMail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [address, setAddress] = useState("");
  const [allergies, setAllergies] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [inputDate, setInputDate] = React.useState(undefined)

  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const toggleConfirmationVisibility = () => {
    setConfirmationVisible(!confirmationVisible);
  };

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async () => {
    if (pass1 !== pass2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(
        "http://44.194.67.133:8080/TimeTogether/newUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mail: mail, // Usar el estado 'mail' para el correo electrónico
            password: pass1, // Usar el estado 'pass1' para la contraseña
            name: name, // Usar el estado 'name' para el nombre
            surname: "aaa", // Debes agregar un campo en tu UI para recoger este dato, o ajustar el modelo de datos según tus necesidades
            additional_information: "aaa", // Agrega un campo en tu UI o establece un valor predeterminado
            addres: address, // Usar el estado 'address' para la dirección
            alergies: allergies, // Usar el estado 'allergies' para las alergias
            birthday: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(), // Formatear el estado 'date' para la fecha de nacimiento
            favourite_color: color, // Usar el estado 'color' para el color favorito
            friends: [], // Ajustar para recoger este dato de tu UI o establecer valores predeterminados
            hobbies: hobbies, // Usar el estado 'hobbies' para las aficiones
            sizes: {
              // Usar los estados para las tallas
              shirt: shirtSize,
              trousers: pantsSize,
              shoes: shoeSize,
            },
            groups: [], // Ajustar para recoger este dato de tu UI o establecer valores predeterminados
            profile_picture: "aaa"
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Usuario creado con éxito");
      console.log(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
    } catch (error) {
      //date.toISOString().split("T")[0]
      console.error("Error en la petición:", error);
      alert("Error al enviar los datos al servidor");
    }
    toggleConfirmationVisibility();
  };

  const handleConfirmation = async () => {
    const verificationData = {
      code: parseInt(confirmationCode, 10), // Asegúrate de enviar un entero
      email: mail, // Asumiendo que 'mail' es el estado donde guardaste el correo electrónico del usuario
    };

    try {
      const response = await fetch(
        "http://44.194.67.133:8080/TimeTogether/verifyCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verificationData),
        }
      );

      const isValid = await response.json(); // Suponiendo que la respuesta es un booleano directamente

      if (isValid) {
        // Manejar la verificación exitosa
        alert("Código verificado con éxito");
        props.navigation.navigate("Login");
        // Aquí podrías, por ejemplo, redirigir al usuario a la pantalla de inicio de sesión o principal
        // props.navigation.navigate('Login'); o cualquier otra pantalla
      } else {
        // Manejar el fallo en la verificación
        alert("El código de verificación es incorrecto o ha ocurrido un error");
      }
    } catch (error) {
      console.error("Error al verificar el código:", error);
      alert("Error al procesar la verificación");
    }
  };

  return (
    <Portal.Host>
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <TouchableOpacity onPress={toggleVisibility}>
            <Avatar.Image
              style={styles.logo}
              source={require("../image/logo.png")}
              onPress={() => console.log("Button Pressed")}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            mode="outlined"
            label="Nombre"
            placeholder="Nombre"
            value={name}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setName(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Email"
            placeholder="Email"
            value={mail}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setMail(txt)}
          />
          <DatePickerInput
            //visible={visible}
            locale="en"
            label="Cumpleaños"
            value={inputDate}
            onChange={(d) => setInputDate(d)}
            inputMode="start"
            //onDismiss={onDismiss}
            //onConfirm={onConfirm}
            //hours={12}
            //minutes={14}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Contraseña"
            placeholder="Contraseña"
            value={pass1}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setPass1(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Repite Contraseña"
            placeholder="Repite Contraseña"
            value={pass2}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setPass2(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Color Favorito"
            placeholder="Color Favorito"
            value={color}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setColor(txt)}
          />
          <Divider style={styles.divider} />
          <Text style={styles.label}>Tallas</Text>
          <View style={styles.sizeSection}>
            <Text style={styles.sizeLabel}>
              Camisetas: {shirtSize.toFixed(0)}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={5}
              step={1}
              onValueChange={(value) => setShirtSize(value)}
              value={shirtSize}
              minimumTrackTintColor="#EF9009"
              maximumTrackTintColor="#000000"
              thumbTintColor="#304999"
            />
          </View>

          <View style={styles.sizeSection}>
            <Text style={styles.sizeLabel}>
              Pantalones: {pantsSize.toFixed(0)}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={30}
              maximumValue={50}
              step={1}
              onValueChange={(value) => setPantsSize(value)}
              value={pantsSize}
              minimumTrackTintColor="#EF9009"
              maximumTrackTintColor="#000000"
              thumbTintColor="#304999"
            />
          </View>

          <View style={styles.sizeSection}>
            <Text style={styles.sizeLabel}>Calzado: {shoeSize.toFixed(0)}</Text>
            <Slider
              style={styles.slider}
              minimumValue={30}
              maximumValue={50}
              step={1}
              onValueChange={(value) => setShoeSize(value)}
              value={shoeSize}
              minimumTrackTintColor="#EF9009"
              maximumTrackTintColor="#000000"
              thumbTintColor="#304999"
            />
          </View>
          <Divider style={styles.divider} />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Dirección"
            placeholder="Dirección"
            value={address}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setAddress(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Alergias"
            placeholder="Alergias"
            value={allergies}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setAllergies(txt)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Aficiones"
            placeholder="Aficiones"
            value={hobbies}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(txt) => setHobbies(txt)}
          />
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            theme={{ colors: { primary: "#EF9009" } }}
            onPress={() => {
              handleSubmit();
            }}
          >
            Aceptar
          </Button>
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={toggleVisibility}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Avatar.Image style={styles.modalLogo} source={snackIcon} />
            <Avatar.Image style={styles.modalLogo} source={snackIcon} />
            <Avatar.Image style={styles.modalLogo} source={snackIcon} />
            <Avatar.Image style={styles.modalLogo} source={snackIcon} />
          </View>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={confirmationVisible}
          onDismiss={toggleConfirmationVisibility}
          contentContainerStyle={[styles.modalContainer]}
        >
          <View style={styles.modalContent}>
            <Text>Ingrese el código de confirmación:</Text>
            <TextInput
              style={styles.inputCode}
              mode="outlined"
              label="Código de confirmación"
              placeholder="Ingrese el código de confirmación"
              keyboardType="numeric"
              theme={{ colors: { primary: "#EF9009" } }}
              onChangeText={(text) => setConfirmationCode(text)}
            />
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              theme={{ colors: { primary: "#EF9009" } }}
              onPress={() => handleConfirmation()}
            >
              Enviar
            </Button>
          </View>
        </Modal>
      </Portal>
    </Portal.Host>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
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

  logo: {
    alignSelf: "center",
    marginBottom: 20,
    size: 80,
  },
  form: {
    padding: 20,
  },
  input: {
    flex: 1,
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

  button: {
    marginTop: 10,
  },
  buttonLabel: {
    color: "white",
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
  inputCode: {
    width: 300,
    height: 50,
  },
});

export default SingUp;
