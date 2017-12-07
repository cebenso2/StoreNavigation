/* @flow */

import React, { PureComponent } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import type { NavigationState } from 'react-native-tab-view/types';

import ListPage from './src/components/ListPage.react';
import NavigationPage from './src/components/NavigationPage.react';
import SearchPage from './src/components/SearchPage.react';
import CountyMarket from './src/stores/CountyMarket'

type Route = {
  key: string,
  title: string,
  icon: string,
};

type State = {
  navState: NavigationState<Route>;
  foods: Array<string>;
}

export default class App extends PureComponent<void, State> {
  static appbarElevation = 4;

  state: State = {
    navState: {
      index: 0,
      routes: [
        { key: '1', title: 'List', icon: 'ios-list-box-outline' },
        { key: '2', title: 'Navigate', icon: 'ios-navigate' },
        { key: '3', title: 'Search', icon: 'ios-search' },
      ],
    },
    foods: [],

  };

  _handleIndexChange = (index: number) => {
    if(index === 1){
      console.log("reload");
    }
    this.setState({
      navState: {
        index: index,
        routes: this.state.navState.routes
      }
    });
  };

  _renderIndicator = (props: Object) => {
    const { width, position } = props;

    const translateX = Animated.multiply(position, width);

    return (
      <Animated.View
        style={[styles.container, { width, transform: [{ translateX }] }]}
      >
        <View style={styles.indicator} />
      </Animated.View>
    );
  };

  _renderIcon = ({route} : {route: Route}) => {
    return <Ionicons name={route.icon} size={24} style={styles.icon} />;
  };

  _renderBadge = ({route} : {route: Route}) => {
    if (route.key === '1') {
      return (
        <View style={styles.badge}>
          <Text style={styles.count}>+</Text>
        </View>
      );
    }
    return null;
  };

  _renderFooter = (props: Object) => {
    return (
      <TabBar
        {...props}
        renderIcon={this._renderIcon}
        renderBadge={this._renderBadge}
        renderIndicator={this._renderIndicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
      />
    );
  };

  _updateShoppingList = (foods: Array<string>) => {
    this.setState({
      foods: foods
    });
  }
  _renderScene = ({route} : {route: Route} ) => {
    /*if (Math.abs(this.state.navState.index - this.state.navState.routes.indexOf(route)) > 0) {
      return null;
    }*/
    switch (route.key) {
      case '1':
        return (
          <ListPage
            updateShoppingList={this._updateShoppingList}
            foods = {Object.keys(CountyMarket.FoodLocations)}
          />
        );
      case '2':
        return (
            <NavigationPage
              storeLayout={CountyMarket.Layout}
              storeFoodLocations={CountyMarket.FoodLocations}
              storeRegisters={CountyMarket.Registers}
              foods={this.state.foods}
              storeEntrances={CountyMarket.Entrances}
              show={this.state.navState.index === 1}
            />
        );
      case '3':
        return (
          <SearchPage
            storeLayout={CountyMarket.Layout}
            storeFoodLocations={CountyMarket.FoodLocations}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={[styles.container]}
        navigationState={this.state.navState}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onIndexChange={this._handleIndexChange}
        animationEnabled={false}
        swipeEnabled={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#222',
  },
  tab: {
    padding: 0,
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  indicator: {
    flex: 1,
    backgroundColor: '#0084ff',
    margin: 2,
    borderRadius: 5,
  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: 'blue',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
});
