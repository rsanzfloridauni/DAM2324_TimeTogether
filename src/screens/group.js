import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import ScreenContext from "./ScreenContext"; // Adjust the path based on the actual location of ScreenContext

const GroupsAll = ({ navigation }) => {
  const { userData } = useContext(ScreenContext);
  const [groupsData, setGroupsData] = useState([]);

  useEffect(() => {
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
  }, [userData]);

  const handleGroupClick = (id) => {
    const updatedGroups = groupsData.map((group) => {
      if (group.id === id) {
        return { ...group, selected: !group.selected };
      }
      return group;
    });
    setGroupsData(updatedGroups);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.titleContainer}>
        <Button
          style={styles.titles}
          mode="contained"
          color="#304999"
          onPress={() => navigation.navigate('Friends')}
          labelStyle={styles.text}>
          Amics
        </Button>
        <Button
          style={styles.titles}
          mode="contained"
          color="#304999"
          labelStyle={styles.text}>
          Grups
        </Button>
      </View>

      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <TouchableOpacity>
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {groupsData.map((group, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('InfoGrupo', { userId: group.id })}>
              <View style={styles.groupContainer}>
                <Text style={styles.groupName}>{group.name}</Text>
              </View>
            </TouchableOpacity>
          ))}

        </ScrollView>

        <TouchableOpacity
          style={styles.createGroupButton}
          onPress={() => navigation.navigate('NewGroup')}>
          <Text style={styles.createGroupButtonText}>+ CREATE NEW GROUP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E2E1EC',
    borderRadius: 20,
    margin: 20,
  },
  titleContainer: {
    backgroundColor: '#304999',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    width: 160,
    alignSelf: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
    marginTop: 8,
  },
  filterText: {
    fontSize: 22,
    padding: 8,
    fontWeight: 'bold',
  },
  selectedFilter: {
    color: '#304999',
  },
  groupWrapper: {
    backgroundColor: '#CBCADC',
    marginBottom: 16,
    borderRadius: 20,
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
    backgroundColor: '#EF9009',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  createGroupButtonText: {
    fontSize: 18,
    color: 'white',
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  titles: {
    backgroundColor: '#304999',
    borderRadius: 15,
    margin: 5,
  },
  titleContainer: {
    flex: 0.1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'row',
  },
  text: {
    textTransform: 'none',
    fontSize: 18,
  },
});

export default GroupsAll;
