import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function ChooseScreen() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        Thanks for signing in!{'\n'}Please choose your seat.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    color: '#000000',
    padding: 40,
    textAlign: 'center',
    verticalAlign: 'top',
  },
});
