import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-paper';

const GroupsAll = ({ navigation }) => {
  const [favoriteTots, setFavoriteTots] = useState(false);
  const [groupsData, setGroupsData] = useState([]);

  const normalGroupsData = [
    { id: 1, name: 'Example 1', favorite: false, selected: false },
    { id: 2, name: 'Example 2', favorite: false, selected: false },
    { id: 3, name: 'Example 3', favorite: false, selected: false },
    { id: 4, name: 'Example 4', favorite: false, selected: false },
    { id: 5, name: 'Example 5', favorite: false, selected: false },
    { id: 6, name: 'Example 6', favorite: false, selected: false },
    { id: 7, name: 'Example 7', favorite: false, selected: false },
    { id: 8, name: 'Example 8', favorite: false, selected: false },
  ];

  const favoriteGroupsData = [
    { id: 9, name: 'Favorite Group 1', favorite: true, selected: false },
    { id: 10, name: 'Favorite Group 2', favorite: true, selected: false },
  ];

  const loadGroupsData = () => {
    setGroupsData(favoriteTots ? favoriteGroupsData : normalGroupsData);
  };

  const handleToggleFavorite = (id) => {
    const updatedGroups = groupsData.map((group) => {
      if (group.id === id) {
        return { ...group, favorite: !group.favorite };
      }
      return group;
    });
    setGroupsData(updatedGroups);
  };

  const handleGroupClick = (id) => {
    const updatedGroups = groupsData.map((group) => {
      if (group.id === id) {
        return { ...group, selected: !group.selected };
      }
      return group;
    });
    setGroupsData(updatedGroups);
  };

  useEffect(() => {
    loadGroupsData();
  }, [favoriteTots]);

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
          <TouchableOpacity onPress={() => setFavoriteTots(false)}>
            <Text
              style={[
                styles.filterText,
                !favoriteTots && styles.selectedFilter,
              ]}>
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFavoriteTots(true)}>
            <Text
              style={[
                styles.filterText,
                favoriteTots && styles.selectedFilter,
              ]}>
              Favourites
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {groupsData.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={styles.groupWrapper}
              onPress={() => navigation.navigate("InfoGrupo")}>
              <View style={styles.groupContainer}>
                <Text style={styles.groupName}>{group.name}</Text>
                <TouchableOpacity
                  style={styles.starContainer}
                  onPress={() => handleToggleFavorite(group.id)}>
                  <Image
                    source={
                      group.favorite
                        ? require('../image/starFav.png')
                        : require('../image/starTots.png')
                    }
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {!favoriteTots && (
          <TouchableOpacity
            style={styles.createGroupButton}
            onPress={() => navigation.navigate('NewGroup')}>
            <Text style={styles.createGroupButtonText}>+ CREATE NEW GROUP</Text>
          </TouchableOpacity>
        )}
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
  title: {
    fontSize: 24,
    color: 'white',
    padding: 8,
    textAlign: 'center',
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
  starContainer: {
    marginLeft: 'auto',
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
  starIcon: {
    width: 30,
    height: 30,
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
