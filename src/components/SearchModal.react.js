//@flow
import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Modal, FlatList } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Header from './Header.react';
import SearchRow from './SearchRow.react';
import Search from 'react-native-search-box';

const TITLE= 'Add Item to List'

type State = {
  items: Array<*>;
}
type Props = {
  visible: boolean;
  hideModal: Function;
  addItem: Function;
  items: Array<string>;
};

export default class SearchModal extends React.PureComponent<Props, State>
{
  props: Props
  state: State

  state={
    items: this.props.items.map((f)=> { return {key: f}}),
  }

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={this._closeSearchModal}>
        <View style={styles.container}>
          <Header text={TITLE}
            iconName={'ios-close-circle-outline'}
            onPress={this._closeSearchModal}/>
          <Search
            onChangeText={this._updateSearchResults}
            onCancel={this._resetItems}
            onDelete={this._resetItems}
            backgroundColor={"blue"}
          />
          <FlatList
            data = {this.state.items}
            renderItem = {this._renderSearchRow}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </Modal>
     );
   }

   _updateSearchResults = (text: string) => {
     let searchResults = this.props.items.map((f)=> { return {key: f}}).filter((item) => {
       return item.key.toLowerCase().indexOf(text) !== -1;
     })
     this.setState({items: searchResults})
   }

   _renderSearchRow = ({item} : {item: {key: string}}) => {
     return (
       <SearchRow name={item.key} onPress={this.props.addItem} hideModal = {this._closeSearchModal}/>
     );
   }

   _closeSearchModal = () => {
     this.props.hideModal()
     this._resetItems()
   }

   _resetItems = () => {
     this.setState({items: this.props.items.map((f)=> { return {key: f}})})
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
