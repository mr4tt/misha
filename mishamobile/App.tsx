import React from 'react';
import {ChooseScreen} from './src/Choose';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TagEvent} from 'react-native-nfc-manager';
import {HomeScreen} from './src/Home';
import {CheckInScreen} from './src/CheckIn';
import {CheckOutScreen} from './src/CheckOut';

export type RootStackParamList = {
  HomeScreen: undefined;
  CheckInScreen: undefined;
  CheckOutScreen: undefined;
  ChooseScreen: {
    tag: TagEvent;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#CAF7FE',
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ChooseScreen" component={ChooseScreen} />
          <Stack.Screen name="CheckInScreen" component={CheckInScreen} />
          <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
