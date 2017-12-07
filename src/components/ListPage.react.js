//@flow
import React, { PureComponent } from 'react';
import { Modal, Text, View, StyleSheet, FlatList, TouchableHighlight} from 'react-native';
import Header from './Header.react';
import ItemRow from './ItemRow.react';
import SearchModal from './SearchModal.react';

type Props = {
  foods: Array<string>;
  updateShoppingList: Function;
};
type State = {
  items: Array<*>;
  showModal: boolean;
}
const TITLE = "Purchase List"
const ICON = 'ios-add-circle-outline'

export default class ListPage extends React.PureComponent<Props, State>
{
  props: Props
  state: State
  state = {
    items: [],
    showModal: false
  }

  _addListItem = (itemName: ?string) => {
    if (itemName && this.state.items.filter((item)=>item.key === itemName).length === 0) {
      let items = this.state.items.concat({key: itemName})
      let foods = items.map(value => value.key);
      this.setState({items: items });
      this.props.updateShoppingList(foods);
    }
  }

  _removeListItem = (itemName: string) => {
    let items = this.state.items.filter( (item) => item.key !== itemName)
    let foods = items.map(value => value.key);
    this.setState({items:items});
    this.props.updateShoppingList(foods);
  }

  _showModal = () => {
    this.setState({showModal: true})
  }
  _hideModal = () => {
    this.setState({showModal: false})
  }
  _renderModal(){
    return (
      <SearchModal
        visible={this.state.showModal}
        hideModal={this._hideModal}
        addItem={this._addListItem}
        items={this.props.foods}
      />
    );
  }
  render() {
    let modal = this._renderModal();
    let content;
    if(this.state.items.length === 0){
      content = (
        <View style={styles.big}>
          <Text> Add items to your shopping list. </Text>
        </View>
      );
    } else {
      content =(
        <FlatList
          data={this.state.items}
          style={{marginTop: 5}}
          renderItem={({item}) => <ItemRow name={item.key} onRemove={this._removeListItem}/>}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Header
          text={TITLE}
          iconName={ICON}
          onPress={this._showModal}
        />
        {content}
        {modal}
      </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#eee',
   },
   big: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
 });
