import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../App';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Raccoon from './assets/titleRaccoon.svg';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export function HomeScreen({navigation}: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Welcome to TEC Cafe!</Text>
      <Raccoon width={120 * 7.5} height={40 * 7.5} />
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('CheckInScreen')}>
        <Text style={styles.text}>Check In</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('CheckOutScreen')}>
        <Text style={styles.text}>Check Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 60,
    gap: 40,
  },
  text: {
    fontSize: 25,
    color: '#000000',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
});
