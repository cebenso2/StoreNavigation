//@flow
import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from './Header.react';
import InfoRow from './InfoRow.react';
import NavRow from './NavRow.react';

import GridSquare from './GridSquare.react'
import StoreGraph from '../graph/StoreGraph'
import MapDisplay from './MapDisplay.react'

type Props = {
  storeLayout: Array<Array<number>>;
  storeFoodLocations: Map<string, Array<number>>;
  storeRegisters: Array<Array<number>>;
  storeEntrances: Array<Array<number>>;
  foods: Array<string>;
  show: boolean;
};

type State = {
  loading: boolean;
  navigation: Array<Array<number>>;
  registerLocation: Array<number>;
  entranceLocation: Array<number>;
  foodOrder: Array<string>;
  currentFoodItem: number;
}

const TITLE = "Navigation"

export default class NavigationPage extends React.Component<Props, State>
{
  props: Props
  state: State
  state = {
    loading: true,
    navigation: Array(this.props.storeLayout.length).fill().map(() => Array(this.props.storeLayout[0].length).fill(-1)),
    registerLocation: [],
    entranceLocation: [],
    foodOrder: [],
    currentFoodItem: -1,
  }

  async loadNavigation(){
    let start = this.state.entranceLocation;
    if (start.length != 2){
      start = this.props.storeEntrances[0];
    }
    console.log("tsp");
    let store = new StoreGraph(this.props.storeLayout, this.props.storeFoodLocations, this.props.storeRegisters);
    console.log(this.state.entranceLocation);
    let [navigation, foodOrder, register] = store.getNavigation(start, this.props.foods);
    this.setState({
      navigation: navigation,
      registerLocation: register,
      foodOrder: foodOrder,
      loading: false,
      entranceLocation: this.props.storeEntrances[0],
    });
  }
  async componentWillMount(){
    //if (this.state.loading){
      //console.log("loading");
      console.log("mount");
      //this.loadNavigation()
      //this.setState({loading: false})
    //}
    //else {
    //  console.log("not loading");
    //}
  }

  render() {
    /*if(this.state.loading){
      return (
        <View style={styles.container}>
          <Text> Loading </Text>
        </View>
      );
    }*/
    let content = null;
    if(!this.props.show){
      content= null
    }
    else if(this.props.foods.length === 0){
      content =  (
        <View style={styles.big}>
          <Text> Add Items to your Shopping List </Text>
        </View>
      );
    } else {
      let store = new StoreGraph(this.props.storeLayout, this.props.storeFoodLocations, this.props.storeRegisters);
      let [navigation, foodOrder, register] = store.getNavigation(this.props.storeEntrances[0], this.props.foods);
      let text="";
      if(this.state.currentFoodItem === this.props.foods.length-1){
        text = "Register";
      } else if(this.state.currentFoodItem === this.props.foods.length){
        text = "Navigation Complete";
      } else {
        text = foodOrder[this.state.currentFoodItem+1]+"";
      }
      content = ([
          <InfoRow
            name={"Next Navigation Stop"}
            key={"info"}
          />,
          <NavRow
            name={text}
            moveForward={this._moveToNextItem}
            moveBackward={this._moveToPreviousItem}
            key="nav"
          />,
          <MapDisplay
            currentFoodItem ={this.state.currentFoodItem}
            entranceLocation={this.props.storeEntrances[0]}
            updateFoods={this.props.foods}
            foods={foodOrder}
            navigation={navigation}
            registerLocation={register}
            squareSize={7}
            storeLayout={this.props.storeLayout}
            storeFoodLocations={this.props.storeFoodLocations}
            key={"map"}
          />]
      );
    }
    return (
      <View style={styles.container}>
        <Header text={TITLE}/>
        {content}
      </View>
    );
  }

  _moveToNextItem = () => {
    if(this.state.currentFoodItem < this.props.foods.length){
      this.setState({currentFoodItem: this.state.currentFoodItem+1});
    }
  }
  _moveToPreviousItem = () => {
    if(this.state.currentFoodItem > -1){
      this.setState({currentFoodItem: this.state.currentFoodItem-1});
    }
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
