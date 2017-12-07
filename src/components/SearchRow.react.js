//@flow
import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ICON= 'ios-close-circle-outline'

type Props = {
  name: string;
  onPress?: Function;
  hideModal?: Function;
};


export default class SearchRow extends React.Component<Props>
{
  props: Props

  render() {

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.row}>
          <Text style={styles.rowText}>
            {this.props.name}
          </Text>
        </View>
      </TouchableOpacity>
     );
   }

   _onPress = () => {
     if(this.props.onPress){
       this.props.onPress(this.props.name);
     }
     if(this.props.hideModal){
       this.props.hideModal();
     }
   }
 }

 const styles = StyleSheet.create({
   row: {
     height: 50,
     paddingHorizontal: 10,
     marginHorizontal: 10,
     marginTop: 5,
     backgroundColor: '#FFF',
     flexDirection: 'row',
     alignItems: "center",
     borderRadius: 5,
     borderWidth: 1,
     borderColor: '#ddd',
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'

    },
    rowText: {
      fontSize: 16,
    },
    icon: {
      backgroundColor: 'transparent',
      color: '#ddd',
    },
 });
