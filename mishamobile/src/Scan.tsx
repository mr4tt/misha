import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'ScanScreen'>;

// Pre-step, call this before any NFC operations
NfcManager.start();

export function ScanScreen({navigation}: Props) {
  const [scuffed, setScuffed] = useState(false);

  useEffect(() => {
    async function readNdef() {
      console.log('readNdef')
      try {
        // register for the NFC tag with NDEF in it
        await NfcManager.requestTechnology(NfcTech.Ndef);
        // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag();
        if (tag === null) {
          console.log('couldnt find tag');
          return;
        }
        console.log('Tag found', tag);

        await NfcManager.cancelTechnologyRequest();
        setScuffed((prev) => !prev);
        navigation.navigate('ChooseScreen', {tag});
        // TODO: go to next screen (save this tag along the way)
      } catch (ex) {
        // in theory this should never happen - if nfc tech isnt available or cant get tag,
        // it should just return null. but this is just in case i guess or something.
        console.log('Oops!', ex);
        NfcManager.cancelTechnologyRequest();
      }
    }
    readNdef();
  }, [navigation, scuffed]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Please scan your Student ID</Text>
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
