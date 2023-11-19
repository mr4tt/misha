import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../App';
import {View, Text, StyleSheet, Pressable} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export function HomeScreen({navigation}: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Welcome to Tec Cafe!</Text>
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
  },
  text: {
    fontSize: 25,
    color: '#000000',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
});
