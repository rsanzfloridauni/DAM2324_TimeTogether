import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Friend from "../../components/friend";
import ScreenContext from "./ScreenContext"; // Ajusta la ruta según la ubicación real de ScreenContext


export default function Friends({ navigation }) {
  const { userData, setUserData } = useContext(ScreenContext);
  const [addFriend, setAddFriend] = useState(true);
  const [mail, setMail] = useState("");
  const [friendList, setFriendList] = useState([]);


  const handleAddPress = () => {
    setAddFriend(!addFriend);
  };


  useEffect(() => {
    try {
      // Intenta parsear userData como JSON
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData && parsedUserData.id) {
        fetch(`http://44.194.67.133:8080/TimeTogether/friends?id=${parsedUserData.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setFriendList(data.friends); // Actualiza el estado con los amigos recibidos.
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } catch (error) {
      // Maneja el error si el parseo falla
      console.error("Error parsing userData:", error);
    }
  }, [userData]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Button
          style={styles.titles}
          mode="contained"
          color="#304999"
          labelStyle={styles.text}
        >
          {" "}
          Amics
        </Button>
        <Button
          style={styles.titles}
          mode="contained"
          color="#304999"
          onPress={() => navigation.navigate("Group")}
          labelStyle={styles.text}
        >
          {" "}
          Grups
        </Button>
      </View>
      {addFriend ? (
        <View style={styles.panel}>
          <ScrollView>
            {friendList.map((friend, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('FriendsInfo', { userId: friend.id })}>
                <Friend
                  imageSource={{ uri: friend.profile_picture }}
                  name={friend.name}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.panel2}>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Email"
            value={mail}
            theme={{ colors: { primary: "#EF9009" } }}
            onChangeText={(mail) => setMail(mail)}
          />

          <Button
            style={styles.button2}
            mode="contained"
            color="#304999"
            labelStyle={styles.text}
          >
            Aceptar
          </Button>
        </View>
      )}

      <Button mode="contained" style={styles.button} onPress={handleAddPress}>
        {addFriend ? "Agregar amigo" : "Cerrar panel"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#304999",
    borderRadius: 15,
    margin: 5,
  },
  panel: {
    backgroundColor: "#C9C9C9",
    flex: 1,
    width: "100%",
    padding: 20,
    borderRadius: 15,
  },
  panel2: {
    backgroundColor: "#C9C9C9",
    flex: 1,
    width: "100%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  text: {
    textTransform: "none",
    fontSize: 18,
  },
  input: {
    flex: 2,
    marginBottom: "30%",
    marginTop: "80%",
    width: "80%",
    backgroundColor: "#C9C9C9",
  },
  button2: {
    backgroundColor: "#304999",
    borderRadius: 15,
    margin: 5,
    marginBottom: 300,
  },
  titles: {
    backgroundColor: "#304999",
    borderRadius: 15,
    margin: 5,
  },
  titleContainer: {
    flex: 0.1,
    backgroundColor: "#ecf0f1",
    flexDirection: "row",
  },
});
