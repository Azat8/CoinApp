import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import SideBarContent from './components/SideBarContent';

import { AboutScreen } from './components/AboutScreen';
import { PricesScreen } from './components/PricesScreen';
import { BtcPricesScreen } from './components/BtcPricesScreen';
import { SettingsScreen } from './components/SettingsScreen';

const Routes = createDrawerNavigator(
  {
    About: AboutScreen,
    Prices: PricesScreen,
    BtcPrices: BtcPricesScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: 'About',
    headerMode: 'screen',
    contentComponent:  props => <SideBarContent {...props} />
  }
);

export default class App extends Component {
	constructor(props) {
		super(props);
	}

  render() {
    return (<Routes {...this.state} />);
  }
}