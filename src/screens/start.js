import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const SplashScreen = ({navigation}) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('ScreenTab');
    }, 350);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../image/logo.png')} />
      <ActivityIndicator animating={true} color={'#EF9009'} size={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    alignItems: 'center',
  },

  logo: {
    height: 300,
    width: 300,
  },
});

export default SplashScreen;