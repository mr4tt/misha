import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import SquareRow from './SquareRow';

export function Layout(props) {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    if (
      Object.keys(props.pcLayoutDimensions).length == 0 ||
      Object.keys(props.pcLayoutPcs).length == 0 ||
      props.activeSessions.length == 0 ||
      props.inactivePcs.length == 0
    )
      return;


    let rows = props.pcLayoutDimensions.rows;
    let cols = props.pcLayoutDimensions.cols;

    let squares_temp = [];

    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          row: i,
          col: j,
          PcId: null,
          status: 0,
        });
      }

      squares_temp.push(row);
    }

    for (let PcId of Object.keys(props.pcLayoutPcs)) {
      let c_r = props.pcLayoutPcs[PcId].r;
      let c_c = props.pcLayoutPcs[PcId].c;

      squares_temp[c_r][c_c].PcId = PcId;
    }

    for (let session of props.activeSessions) {
      let key = Object.keys(session)[0];

      let c_r = props.pcLayoutPcs[key].r;
      let c_c = props.pcLayoutPcs[key].c;

      squares_temp[c_r][c_c].status = 2;
    }

    for (let inactive of props.inactivePcs) {
      inactive = Object.keys(inactive)[0];

      let c_r = props.pcLayoutPcs[inactive].r;
      let c_c = props.pcLayoutPcs[inactive].c;

      squares_temp[c_r][c_c].status = 1;
    }

    setSquares(squares_temp);
  }, [
    props.pcLayoutDimensions,
    props.pcLayoutPcs,
    props.activeSessions,
    props.inactivePcs,
  ]);

  return (
    <View style={styles.center_rows}>
      {squares.map((row, i) => {
        return <SquareRow key={i} row={row} />;
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  center_rows: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
