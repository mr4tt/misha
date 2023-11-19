import {useCallback} from 'react';
import NfcManager, {NfcTech, TagEvent} from 'react-native-nfc-manager';
import {useFocusEffect} from '@react-navigation/native';

// Pre-step, call this before any NFC operations
NfcManager.start();

export function useNfc(
  callback: (tag: TagEvent) => void | Promise<void>,
  deps: React.DependencyList,
) {
  useFocusEffect(
    useCallback(() => {
      async function readNdef() {
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
          await callback(tag);
        } catch (ex) {
          // in theory this should never happen - if nfc tech isnt available or cant get tag,
          // it should just return null. but this is just in case i guess or something.
          console.log('Oops!', ex);
          NfcManager.cancelTechnologyRequest();
        }
      }
      readNdef();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps),
  );
}
