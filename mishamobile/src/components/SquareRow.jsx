import React, {useEffect, useState} from 'react';
import Square from './Square';
import {View, StyleSheet} from 'react-native';

export default function SquareRow(props) {
  return (
    <View style={styles.center_rows}>
      {props.row.map((square, i) => {
        return (
          <Square
            key={i}
            square={square}
            selectedRow={props.selectedRow}
            selectedCol={props.selectedCol}
            setSelectedRow={props.setSelectedRow}
            setSelectedCol={props.setSelectedCol}
          />
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  center_rows: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
