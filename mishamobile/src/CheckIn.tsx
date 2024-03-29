import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../App';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useNfc} from './hooks/use-nfc';
import Raccoon from './assets/checkInRacoon.svg';
import * as api from './server';

type Props = NativeStackScreenProps<RootStackParamList, 'CheckInScreen'>;

export function CheckInScreen({navigation}: Props) {
  const showAlert = () =>
    Alert.alert('Already Checked In', 'Maybe you meant to check out?', [
      {
        text: 'Go Home',
        onPress: () => navigation.navigate('HomeScreen'),
        style: 'default',
      },
    ]);
  useNfc(
    async tag => {
      if (await api.check_if_user_has_active_session(tag.id)) {
        showAlert();
      } else {
        navigation.replace('ChooseScreen', {tag});
      }
    },
    [navigation],
  );
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Please tap your Student ID to check in</Text>
      <Raccoon width={120 * 7.5} height={40 * 7.5} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 100,
    gap: 125,
  },
  text: {
    fontSize: 25,
    color: '#000000',
    padding: 40,
    textAlign: 'center',
    verticalAlign: 'top',
  },
});
