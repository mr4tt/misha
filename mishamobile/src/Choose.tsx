import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function ChooseScreen() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>we is on choose screen</Text>
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
