import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton, Avatar } from 'react-native-paper';

export default function Group({ name }) {
  return (
    <View style={styles.friend}>
      <Text style={styles.friendText}>{name}</Text> 
      <IconButton
        icon="close"
        iconColor={'orange'}
        size={30}
        onPress={() => console.log('Pressed')}
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
