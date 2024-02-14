import { View, StyleSheet, Text } from 'react-native';

export default function Event({ name, color }) {
  return (
    <View style={[styles.friend, { backgroundColor: color }]}>
      <Text
        style={{
          padding: 8,
          borderRadius: 15,
          margin: 3,
          backgroundColor: color,
        }}
      >{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  friend: {
    padding: 8,
    borderRadius: 15,
    margin: 3
  },
  friendText: {
    fontSize: 17,
  },
});
