import { View, StyleSheet, Text } from 'react-native';
import { IconButton, Avatar } from 'react-native-paper';

export default function Participant({ imageSource, name, onDelete }) {
  return (
    <View style={styles.friend}>
      <Avatar.Image
        size={50}
        color="white"
        source={imageSource} 
      />
      <Text style={styles.friendText}>{name}</Text> 
      <IconButton
        size={30}
        icon="delete"
        onPress={onDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  friend: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    borderRadius: 15,
    flexDirection: 'row',
    margin: 3
  },
  friendText: {
    fontSize: 20,
  },
});