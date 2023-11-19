import React from 'react';
import {ScanScreen} from './src/Scan';
import {ChooseScreen} from './src/Choose';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TagEvent} from 'react-native-nfc-manager';

export type RootStackParamList = {
  ScanScreen: undefined;
  ChooseScreen: {
    tag: TagEvent;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ScanScreen" component={ScanScreen} />
        <Stack.Screen name="ChooseScreen" component={ChooseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
