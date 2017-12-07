//@flow
import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Header from './Header.react';
import SearchRow from './SearchRow.react';
import Search from 'react-native-search-box';
import MapDisplay from './MapDisplay.react'
import ItemRow from './ItemRow.react';

type State = {
  searchQuery: string;
  items: Array<*>;
  showMap: boolean;
  displayFood: string;
}
type Props = {
  storeLayout: Array<Array<number>>;
  storeFoodLocations: Map<string,Array<number>>;
};

const TITLE = "Search"

export default class SearchPage extends React.PureComponent<Props, State>
{
  props: Props
  state: State

  state = {
    items: Object.keys(this.props.storeFoodLocations).map((f)=>{return {key:f}}),
    searchQuery: '',
    showMap: false,
    displayFood: '',
  }
  render() {
    let search = !this.state.showMap ? (
      <View>
        <Search
          onChangeText={this._updateSearchResults}
          onBeforeCancel={this._resetItems}
          onBeforeDelete={this._resetItems}
          backgroundColor={"blue"}/>
        <FlatList
          data = {this.state.items}
          renderItem = {this._renderSearchRow}
          keyboardShouldPersistTaps="always"/>
      </View>
    ) : null;
    let map = this.state.showMap ? ([
      <ItemRow name={this.state.displayFood} key={"info"} onRemove={this._hideMap}/>,
      <MapDisplay
        currentFoodItem ={-1}
        entranceLocation={[-1,-1]}
        foods={[this.state.displayFood]}
        navigation={Array(this.props.storeLayout.length).fill().map(() => Array(this.props.storeLayout[0].length).fill(-1))}
        registerLocation={[-1,-1]}
        squareSize={7}
        storeLayout={this.props.storeLayout}
        storeFoodLocations={this.props.storeFoodLocations}
        key={"map"}
      />
    ]) : null;
    return (
      <View style={styles.container}>
        <Header text={TITLE}
          iconName={'ios-search'}/>
        {search}
        {map}
      </View>
     );
   }
   _updateSearchResults = (text: string) => {
     let searchResults = Object.keys(this.props.storeFoodLocations).map((f)=>{return {key:f}}).filter((item) => {
       return item.key.toLowerCase().indexOf(text) !== -1;
     })
     this.setState({items: searchResults})
   }

   _renderSearchRow = ({item} : {item: {key: string}}) => {
     return (
       <SearchRow name={item.key} onPress={this._showMap}/>
     );
   }

   _resetItems = () => {
     this.setState({items: Object.keys(this.props.storeFoodLocations).map((f)=>{return {key:f}}),})
   }

   _showMap = (displayFood: string) => {
     this.setState({showMap:true, displayFood: displayFood})
   }
   _hideMap = () => {
     this.setState({showMap:false, displayFood: '', searchQuery:''})
   }
 }

 const styles = StyleSheet.create({
   main: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
   container: {
     flex: 1,
     backgroundColor: "#EEE",
   },
 });
