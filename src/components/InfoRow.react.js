//@flow
import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ICON= 'ios-close-circle-outline'

type Props = {
  name: string;
};


export default class InfoRow extends React.PureComponent<Props>
{
  props: Props

  render() {

    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>
          {this.props.name}
        </Text>
      </View>
     );
   }

 }

 const styles = StyleSheet.create({
   row: {
     height: 50,
     paddingHorizontal: 10,
     marginHorizontal: 10,
     marginVertical: 2.5,
     backgroundColor: '#FFF',
     flexDirection: 'row',
     alignItems: "center",
     borderRadius: 5,
     borderWidth: 1,
     borderColor: '#ddd',
     justifyContent: 'center',
    },
    rowText: {
      fontSize: 16,
    },
    icon: {
      backgroundColor: 'transparent',
      color: '#ddd',
    },
 });
