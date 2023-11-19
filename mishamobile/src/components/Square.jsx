import React, {useEffect, useState} from 'react';
import {View, Pressable} from 'react-native';

function getColor(pc, status) {
  if (pc) {
    if (status === 0) {
      return '#23c55e';
    } else if (status === 1) {
      return '#324154';
    } else if (status === 2) {
      return '#ee4444';
    }
  } else {
    return '#ffffff';
  }
}

export default function Square(props) {
  function handlePress() {
    if (props.square.status !== 0 || props.square.PcId == null) {
      return;
    }

  }
  return (
    <Pressable onPress={handlePress}>
      <View
        style={{
          height: 35,
          width: 35,
          borderWidth: props.square.PcId == null ? 1 : 1,
          backgroundColor: getColor(props.square.PcId, props.square.status),
        }}></View>
    </Pressable>
  );
}

// const styles = StyleSheet.create({
//   //   wrapper: {
//   //     flex: 1,
//   //     justifyContent: 'center',
//   //     alignItems: 'center',
//   //   },
//   //   text: {
//   //     fontSize: 25,
//   //     color: '#000000',
//   //   },
//   box: {
//     height: 100,
//     width: 100,
//   },
// });
