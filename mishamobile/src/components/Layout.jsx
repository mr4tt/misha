import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable, Alert} from 'react-native';
import * as api from '../server/api.js';

import SquareRow from './SquareRow';

export function Layout(props) {
  const [squares, setSquares] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [selectedCol, setSelectedCol] = useState(-1);

  const onConfirm = () => {
    // api.register_session(
    //   props.tag,
    //   props.pcLayoutPcs[selectedRow][selectedCol],
    // );
    let name = '';

    const showAlert = () =>
      Alert.alert('Check in confirmed!', '', [
        {
          text: 'Go Home',
          onPress: () => {
            props.navigation.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}],
            });
          },
          style: 'default',
        },
      ]);

    for (let Pc of Object.keys(props.pcLayoutPcs)) {
      // console.log(Pc, props.pcLayoutPcs[Pc].r, props.pcLayoutPcs[Pc].c);
      if (
        props.pcLayoutPcs[Pc].r == selectedRow &&
        props.pcLayoutPcs[Pc].c == selectedCol
      ) {
        name = Pc;
        break;
      }
    }
    showAlert();
    // console.log(Object.keys(props));
    api.register_session(props.tag, name);
  };

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
      <Text
        style={{
          backgroundColor: '#00629b',
          height: 25,
          width: props.pcLayoutDimensions.cols
            ? 40 * props.pcLayoutDimensions.cols
            : 0,
          textAlign: 'center', // <-- the magic
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}>
        Cafe
      </Text>
      {squares.map((row, i) => {
        return (
          <SquareRow
            key={i}
            row={row}
            selectedRow={selectedRow}
            selectedCol={selectedCol}
            setSelectedCol={setSelectedCol}
            setSelectedRow={setSelectedRow}
          />
        );
      })}
      <Text
        style={{
          backgroundColor: '#00629b',
          height: 25,
          width: props.pcLayoutDimensions.cols
            ? 40 * props.pcLayoutDimensions.cols
            : 0,
          textAlign: 'center', // <-- the magic
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}>
        Garage
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: 25,
          marginBottom: 5,
          paddingTop: 20,
        }}>
        Legend
      </Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 50,
          marginBottom: -5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'left',
              alignItems: 'center',
              width: 150,
            }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: '#23c55e',
                borderWidth: 1,
              }}></View>
            <Text style={{marginLeft: 5, color: 'black', fontSize: 20}}>
              Available
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'left',
              alignItems: 'center',
              width: 150,
            }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: '#ee4444',
                borderWidth: 1,
              }}></View>
            <Text style={{color: 'black', marginLeft: 0, fontSize: 20}}>
              {" "}Occupied
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'left',
              alignItems: 'center',
              width: 150,
            }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: '#324154',
                borderWidth: 1,
              }}></View>
            <Text style={{marginLeft: 5, color: 'black', fontSize: 20}}>
              Unavailable
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'left',
              alignItems: 'center',
              width: 150,
            }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: 'yellow',
                borderWidth: 1,
              }}></View>
            <Text style={{marginLeft: 5, color: 'black', fontSize: 20}}>
              Selected
            </Text>
          </View>
        </View>
      </View>
      {selectedCol !== -1 && (
        <Pressable
          onPress={onConfirm}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 40,
            marginHorizontal: 10,
            marginVertical: 20,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 40,

          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
            }}>
            Confirm
          </Text>
        </Pressable>
      )}
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
