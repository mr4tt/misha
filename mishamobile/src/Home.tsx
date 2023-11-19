import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../App';
import {View, Text, StyleSheet, Button} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export function HomeScreen({navigation}: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Welcome to Tec Cafe!</Text>
      <Button
        onPress={() => navigation.navigate('CheckInScreen')}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Nav to CheckIn Screen"
      />
      <Button
        onPress={() => navigation.navigate('CheckOutScreen')}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Nav to CheckOut Screen"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#000000',
  },
});
