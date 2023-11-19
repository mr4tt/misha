import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../App';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useNfc} from './hooks/use-nfc';
import * as api from './server';

type Props = NativeStackScreenProps<RootStackParamList, 'CheckOutScreen'>;

export function CheckOutScreen({navigation}: Props) {
  const notCheckedInAlert = () =>
    Alert.alert('Not Previously Checked In', 'Maybe you meant to check in?', [
      {
        text: 'Go Home',
        onPress: () => navigation.navigate('HomeScreen'),
        style: 'default',
      },
    ]);
  const thanksAlert = () =>
    Alert.alert(
      'Thank you for visiting Tec Cafe!',
      'We hope you enjoyed your visit :)',
      [
        {
          text: 'Go Home',
          onPress: () => navigation.navigate('HomeScreen'),
          style: 'default',
        },
      ],
    );
  useNfc(
    async tag => {
      if (!(await api.check_if_user_has_active_session(tag.id))) {
        notCheckedInAlert();
      } else {
        console.log('ending session', tag.id);
        await api.end_session_by_user(tag.id);
        console.log('ended session', tag.id);
        thanksAlert();
      }
    },
    [navigation],
  );
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Please tap your Student ID to check in</Text>
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
    padding: 40,
    textAlign: 'center',
    verticalAlign: 'top',
  },
});
