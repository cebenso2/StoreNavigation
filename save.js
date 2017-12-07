//@flow
/*import React from 'react';
import { Platform, DrawerLayoutAndroid, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import Grid from './src/components/Grid.react';
import ActionBar from 'react-native-action-bar';
//import Tabs from 'react-native-tabs';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
const DRAWER_WIDTH = 200

type State = {
  selected: string
}

export default class App extends React.Component<any , State> {

  state: State

  state = {
    selected: "nav"
  }
  render() {
    let mainView = (
      <View style ={styles.big}>
        <Grid
          numRows={20}
          numCols={10}
          squareSize={20}
        />
      </View>
     );

     let tabs = (
       <BottomNavigation
        labelColor="white"
        rippleColor="white"
        activeLabelColor="#00bfff"
        style={{ height: 58, elevation: 100, alignItems:'flex-end'}}
        onTabChange={(newTabIndex) => {}}
      >
        <Tab
          barBackgroundColor="#37474F"
          label="Shoppping List"
          icon={<Icon size={24} color="white" name="list" />}
          activeIcon={<Icon size={24} color="#00bfff" name="list" />}
        />
        <Tab
          barBackgroundColor="#37474F"
          label="Navigation"
          icon={<Icon size={24} color="white" name="arrow-circle-o-up" />}
          activeIcon={<Icon size={24} color="#00bfff" name="arrow-circle-o-up" />}

        />

      </BottomNavigation>
    );


     return (
       <View style={styles.main}>
         {mainView}
         {tabs}
       </View> );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#00bfff',
  },
  big: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
