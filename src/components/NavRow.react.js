//@flow
import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FORWARD_ICON= 'ios-arrow-forward';
const BACKWARD_ICON= 'ios-arrow-back';


type Props = {
  name: string;
  moveForward: Function;
  moveBackward: Function;
};


export default class NavRow extends React.PureComponent<Props>
{
  props: Props

  render() {

    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={this.props.moveBackward} >
          <Ionicons name={BACKWARD_ICON} size={36} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.rowText}>
          {this.props.name}
        </Text>
        <TouchableOpacity onPress={this.props.moveForward} >
          <Ionicons name={FORWARD_ICON} size={36} style={styles.icon} />
        </TouchableOpacity>
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
     justifyContent: 'space-between',
    },
    rowText: {
      fontSize: 16,
    },
    icon: {
      backgroundColor: 'transparent',
      color: '#ddd',
    },
 });
