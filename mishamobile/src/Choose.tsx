import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// import { listen_to_active_sessions, listen_to_inactive_pcs, listen_to_pc_layout_dimensions, listen_to_pc_layout_pcs, listen_to_pcs, listen_to_users } from '../../server/api.js';
import * as api from './server/api.js';
import {Layout} from './components/Layout.jsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App.js';

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseScreen'>;

export function ChooseScreen({route, navigation}: Props) {
  const [pcs, setPcs] = useState([]);
  const [inactivePcs, setInactivePcs] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [pcLayoutDimensions, setPcLayoutDimensions] = useState({});
  const [pcLayoutPcs, setPcLayoutPcs] = useState({});

  useEffect(() => {
    api.listen_to_pcs(changedPcs => {
      let l: any = [];
      for (let pc of Object.keys(changedPcs)) {
        l.push({
          pc: changedPcs[pc],
        });
      }

      setPcs(l);
    });

    api.listen_to_inactive_pcs(changedInactivePcs => {
      let l: any = [];
      for (let pc of Object.keys(changedInactivePcs)) {
        let temp_d: any = {};
        temp_d[pc] = changedInactivePcs[pc];
        l.push(temp_d);
      }

      setInactivePcs(l);
    });

    api.listen_to_users(changedUsers => {
      let l: any = [];
      for (let user of Object.keys(changedUsers)) {
        l.push({
          user: changedUsers[user],
        });
      }

      setUsers(l);
    });

    api.listen_to_active_sessions(changedActiveSessions => {
      let l: any = [];

      for (let activeSession of Object.keys(changedActiveSessions)) {
        let temp_d: any = {};
        temp_d[activeSession] = changedActiveSessions[activeSession];
        l.push(temp_d);
      }

      setActiveSessions(l);
    });

    api.listen_to_pc_layout_dimensions(changedPcLayoutDimensions => {
      setPcLayoutDimensions(changedPcLayoutDimensions);
    });

    api.listen_to_pc_layout_pcs(changedPcLayoutPcs => {
      setPcLayoutPcs(changedPcLayoutPcs);
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Thanks for signing in!{'\n'}</Text>

      <Text
        style={{
          fontSize: 20,
          color: '#000000',
          textAlign: 'center',
          verticalAlign: 'top',
          marginTop: -40,
          marginBottom: 30,
          paddingBottom: 10,
        }}>
        Please choose your seat.
      </Text>
      <Layout
        pcs={pcs}
        inactivePcs={inactivePcs}
        users={users}
        activeSessions={activeSessions}
        pcLayoutDimensions={pcLayoutDimensions}
        pcLayoutPcs={pcLayoutPcs}
        tag={route.params.tag.id}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    color: '#000000',
    paddingTop: 40,
    paddingBottom: 10,
    textAlign: 'center',
    verticalAlign: 'top',
  },
});
