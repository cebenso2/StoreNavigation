//@flow
import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from './Header.react';
import GridSquare from './GridSquare.react'
import CountyMarket from '../stores/CountyMarket'
import StoreGraph from '../graph/StoreGraph'
type Props = {
  squareSize: number;
  storeLayout: Array<Array<number>>;
  storeFoodLocations: Map<string, Array<number>>;
  registerLocation: Array<number>;
  foods: Array<string>;
  entranceLocation: Array<number>;
  currentFoodItem: number;
  navigation: Array<Array<number>>;
};

const TITLE = "Navigation"

export default class MapDisplay extends React.PureComponent<Props>
{
  props: Props

  render() {
    let rows = []
    for (let row = 0; row < this.props.storeLayout.length; row++){
      let rowSquares = []
      for(let col = 0; col < this.props.storeLayout[row].length; col++){
        let path = this.props.navigation[row][col];
        let start = this.isStart(row, col)
        let location = this.isLocation(row,col);
        let end = this.isEnd(row,col);
        let open = this.props.storeLayout[row][col] == 0;
        rowSquares.push(
          <GridSquare
            key={row +',' + col}
            height={this.props.squareSize}
            width={this.props.squareSize}
            open={open}
            end={0}
            path={path}
            start={start}
            end={end}
            location={location}
          />
        )
      }
      rows.push(
        <View style={{flex: 0, flexDirection: 'row'}} key={row}>
          {rowSquares}
        </View>
      )
    }
    return (
      <View style={styles.big}>
        <View style = {styles.blackBorder}>
          {rows}
        </View>
      </View>
     );
   }

   isLocation(row: number, col: number){
     if (this.props.entranceLocation[0] === row && this.props.entranceLocation[1] === col){
       return true;
     }
     if (this.props.registerLocation[0] === row && this.props.registerLocation[1] === col){
       return true;
     }
     for (let food of this.props.foods){
       let location = this.props.storeFoodLocations[food];
       if (location[0] === row && location[1] === col){
         return true;
       }
     }
     return false;
   }
   isStart(row: number, col: number){
     if (this.props.currentFoodItem === -1){
       return this.props.entranceLocation[0] === row && this.props.entranceLocation[1] === col;
     }
     if (this.props.currentFoodItem === this.props.foods.length){
       return false;
     }
     let foodLocation = this.props.storeFoodLocations[this.props.foods[this.props.currentFoodItem]];
     return foodLocation[0] === row && foodLocation[1] === col;
   }
   isEnd(row: number, col: number){
     if (this.props.currentFoodItem === this.props.foods.length-1){
       return this.props.registerLocation[0] === row && this.props.registerLocation[1] === col;
     }
     if (this.props.currentFoodItem === this.props.foods.length){
       return false;
     }
     let foodLocation = this.props.storeFoodLocations[this.props.foods[this.props.currentFoodItem+1]];
     return foodLocation[0] === row && foodLocation[1] === col;
   }
 }

 const styles = StyleSheet.create({
   big: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
   container: {
     backgroundColor: "#eee",
     flex: 1,
   },
   blackBorder: {
     borderColor: "black",
     borderWidth: 2,
     backgroundColor: "#888"
   }
 });
