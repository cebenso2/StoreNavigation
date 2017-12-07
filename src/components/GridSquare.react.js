//@flow
import React, { PureComponent } from 'react';
import {View, StyleSheet } from 'react-native';
type Props = {
  open: boolean;
  path: ?number;
  height: number;
  width: number;
  start: boolean;
  end: boolean;
  location: boolean;
};


export default class GridSquare extends React.PureComponent<Props>
{
  props: Props

  render() {
    let navigation = null;
    if (this.props.open){
      switch (this.props.path) {
        case 0:
          navigation = (
            <View
              style={[styles.borderRight, {
                width: this.props.width/2,
                height: this.props.height,
              }]}/>
          )
          break;
        case 1:
          navigation = (
            <View
              style={[styles.borderBottom, {
                width: this.props.width,
                height: this.props.height/2,
              }]}/>
          )
          break;
        case 2:
          navigation = (
            <View
              style={[styles.borderBottom, styles.borderRight, {
                width: this.props.width/2,
                height: this.props.height/2,
              }]}/>
          )
          break;
        case 3:
          navigation = (
            <View
              style={[styles.borderBottom, styles.borderLeft, {
                left: this.props.width/2 - 1,
                width: this.props.width/2,
                height: this.props.height/2,
              }]}/>
          )
            break;
        case 4:
          navigation = (
            <View
              style={[styles.borderLeft, styles.borderTop, {
                left: this.props.width/2 -1,
                top: this.props.height/2 -1,
                width: this.props.width/2,
                height: this.props.height/2,
              }]}/>
          )
          break;
        case 5:
          navigation = (
            <View
              style={[styles.borderTop, styles.borderRight, {
                top: this.props.height/2 -1,
                width: this.props.width/2,
                height: this.props.height/2,
              }]}/>
          )
          break;
        default:
          navigation = null
      }
    }
    let bgColor = this.props.open ? "#fff" : "#000";
    if (this.props.location) {
      bgColor = "blue";
    }
    if (this.props.start) {
      bgColor = "#5ff72d";
    }
    if (this.props.end) {
      bgColor = "red";
    }
    return (
        <View
          style={{
            width: this.props.width,
            height: this.props.height,
            backgroundColor: bgColor,
            borderColor: "#ddd",
            borderWidth: this.props.open ? 0.5 : 0,
          }}>
          {navigation}
        </View>
     );
   }
 }
 const COLOR = "blue"
 const WIDTH = 1
 const styles = StyleSheet.create({
   borderRight: {
     borderRightColor: COLOR,
     borderRightWidth: WIDTH,
   },
   borderBottom: {
     borderBottomColor: COLOR,
     borderBottomWidth: WIDTH,
   },
   borderTop: {
     borderTopColor: COLOR,
     borderTopWidth: WIDTH,
   },
   borderLeft: {
     borderLeftColor: COLOR,
     borderLeftWidth: WIDTH,
   }
 });
