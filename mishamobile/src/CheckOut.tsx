import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../App';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useNfc} from './hooks/use-nfc';
//import * as api from '../../server';

type Props = NativeStackScreenProps<RootStackParamList, 'CheckOutScreen'>;

export function CheckOutScreen({navigation}: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Welcome to Tec Cafe!</Text>
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
