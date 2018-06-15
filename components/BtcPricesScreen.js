import React, { Component } from 'react';
import SubscribeCurrencies from './../services/SubscribeCurrencies';
import HeaderComponent from './HeaderComponent';
import currencyToSymbolMap from 'currency-symbol-map/map';
import {
  FlatList,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

import {
  ListItem,
  Tile
} from 'react-native-elements';

import {
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  Icon,
  Spinner,
  Content,
  Container,
  Card,
  CardItem
} from 'native-base';

export class BtcPricesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      currencies: [],
      limit: 20,
      offset: 0,
      tsyms: 'USD,JPY,EUR',
      fsym: 'BTC'
    };

    this.service = new SubscribeCurrencies();

    this.state.avatars = {
    	USD: require('./../src/icons/currencies/USD.png'),    	
    	EUR: require('./../src/icons/currencies/EUR.png'),    	
    	JPY: require('./../src/icons/currencies/JPY.png')
    }
  }

  componentDidMount() {
  	this.isMounted = true;
    this.getData()
  }

  componentWillUnmount() {
  	this.isMounted = false;
  }

  getData() {
    let options = {
      path: 'price?fsym=' + this.state.fsym + '&tsyms=' + this.state.tsyms
    };

    this.service.getCoins(options).then((data) => {
      console.log(data);
      this.setState({
        currencies: data,
        isLoading: false
      });
    });
  }

  renderFooter = () => {
		if (!this.state.isLoading) return null;

		return (
			<View
				style={{
  				paddingVertical: 20,
  				borderTopWidth: 1,
  				borderColor: "#CED0CE"
				}}>

				<ActivityIndicator animating size="large" />
			</View>
		);
	};

  renderSeparator = () => {    return (
      <View
        style={{
          height: 1,
          width: "81%",
          backgroundColor: "#CED0CE",
          marginLeft: "19%"
        }}
      />
    );
	};

  render() {
    return (
			<Container>
      	<HeaderComponent { ...this.props } />				
				<Content padder>
          <Card>
            <CardItem header bordered>
            	<Body>
                <Text>Cryptocurency Exchanges</Text>
              </Body>
            </CardItem>
            <CardItem>
            	<FlatList
								ListFooterComponent={this.renderFooter}
			          keyExtractor={(item) => item[0].toString()} 
			          data={Object.entries(this.state.currencies)}
			          ItemSeparatorComponent={this.renderSeparator}
			          renderItem={ ({ item }) => {
			          	let avatar = this.state.avatars[item[0]];
			            return (
			            	<ListItem
            					containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
											roundAvatar
				            	hideChevron
				            	avatar={avatar}
				            	title={ item[1] } />
				            );
			          	}
		        	}/>
            </CardItem>
          </Card>
        </Content>
			</Container>
  	);
	}
}