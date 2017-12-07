//@flow
import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  text :string;
  iconName?: string;
  onPress?: Function;
};


export default class Header extends React.PureComponent<Props>
{
  props: Props

  render() {
    let iconButton = null
    if (this.props.iconName) {
      iconButton = (
        <TouchableOpacity onPress={this.props.onPress} disabled={!this.props.onPress}>
          <Ionicons name={this.props.iconName} size={36} style={styles.icon} />
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {this.props.text}
        </Text>
        {iconButton}
      </View>
     );
   }
 }

 const styles = StyleSheet.create({
   header: {
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'blue',
        flexDirection: 'row',
        paddingTop: 25,
        paddingHorizontal: 20,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    icon: {
      backgroundColor: 'transparent',
      color: 'white',
    },
 });
