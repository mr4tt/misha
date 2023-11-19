import React, {useEffect, useState} from 'react';
import {View, Pressable} from 'react-native';

export default function Square(props) {
  function handlePress() {
    if (props.square.status !== 0 || props.square.PcId == null) {
      props.setSelectedRow(-1);
      props.setSelectedCol(-1);

      return;
    }
    props.setSelectedCol(props.square.col);
    props.setSelectedRow(props.square.row);
  }
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

  const [color, setColor] = useState(
    getColor(props.square.PcId, props.square.status),
  );
  useEffect(() => {
    // console.log('use effect', props.selectedCol, props.selectedRow);
    if (
      props.selectedCol === props.square.col &&
      props.selectedRow === props.square.row
    ) {
      console.log('chosen ones');
      setColor('yellow');
    } else {
      setColor(getColor(props.square.PcId, props.square.status));
    }

    // // console.log(temp_color);
  }, [props.selectedCol, props.selectedRow]);

  return (
    <Pressable onPress={handlePress}>
      {props.selectedCol !== null && (
        <View
          style={{
            height: 35,
            width: 35,
            borderWidth:
              props.selectedCol === props.square.col &&
              props.selectedRow == props.square.row
                ? 3
                : 1,
            backgroundColor: color,
          }}></View>
      )}
    </Pressable>
  );
}
