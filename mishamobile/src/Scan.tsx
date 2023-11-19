import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'ScanScreen'>;

export function ScanScreen({navigation}: Props) {
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    async function readNdef() {
      // Pre-step, call this before any NFC operations
      NfcManager.start();
      try {
        const SECONDS: number = 20;
        interval = setInterval(async () => {
          // register for the NFC tag with NDEF in it
          const reqTag = await NfcManager.requestTechnology(NfcTech.Ndef);
          if (reqTag) {
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();
            if (tag === null) {
              console.warn('couldnt find tag');
              return;
            }
            console.warn('Tag found', tag);
            clearInterval(interval);

            NfcManager.cancelTechnologyRequest();
            navigation.navigate('ChooseScreen', {tag});
            // TODO: go to next screen (save this tag along the way)
          }
        }, SECONDS * 1000);
      } catch (ex) {
        // in theory this should never happen - if nfc tech isnt available or cant get tag,
        // it should just return null. but this is just in case i guess or something.
        console.warn('Oops!', ex);
        NfcManager.cancelTechnologyRequest();
      }
    }
    readNdef();

    return () => {
      clearInterval(interval);
    };
  }, [navigation]);

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
    color: '#FFFFFF',
  },
});
