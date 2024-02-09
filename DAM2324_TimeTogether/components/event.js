import { View, StyleSheet, Text } from 'react-native';

export default function Event({ name, group, color }) {
  return (
    <View style={[styles.friend, { backgroundColor: color }]}>
      <Text style={styles.friendText}>{name}</Text>
      <Text >{group}</Text>
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
