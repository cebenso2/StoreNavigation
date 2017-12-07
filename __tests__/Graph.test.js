import React from 'react';
import NavigationPage from '../src/components/NavigationPage.react';
import CountyMarket from '../src/stores/CountyMarket'

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  /*global.fetch = () => new Promise(()=> {
    return "mock fetch"
  })*/
  const rendered = renderer.create(<NavigationPage
    numRows={20}
    numCols={11}
    squareSize={10}
    storeLayout={CountyMarket.Layout}
    storeFoodLocations={CountyMarket.FoodLocations}
  />).toJSON();
  expect(rendered).toBeTruthy();
});
