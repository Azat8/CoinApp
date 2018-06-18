import React, { Component } from 'react';
import SubscribeCurrencies from './../services/SubscribeCurrencies';
import HeaderComponent from './HeaderComponent';

import {
	FlatList,
	View,
	ActivityIndicator,
	ScrollView,
	NetInfo,
	ToastAndroid
} from 'react-native';

import {
	ListItem
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

export class PricesScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			currencies: [],
			limit: 15,
			tsym: 'USD',
			hasData: true
		};

		this.service = new SubscribeCurrencies();
		this.imageUrl = this.service.imageUrl;
	}

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(
      (isConnected) => { 
      	this.setState({ status: isConnected }); 
      	if(isConnected) {
      		this.getData();
      	} else {
      		this.netWorkError();
      		this.setState({ isLoading: false });
      	}
      }
    );
	}

	componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
	}

  netWorkError = () => {
  	ToastAndroid.show('Please check your Internet connection!', ToastAndroid.SHORT);
  }

	handleConnectionChange = (isConnected) => {
    this.setState({ status: isConnected });
    if(!isConnected) {
    	this.netWorkError();
    } else {
    	this.getData();
    	this.setState({
        isLoading: true
      });
    }
	}

	onEndReached = ({ distanceFromEnd }) => {
		if(this.state.hasData) {
			this.setState(state => ({ limit: state.limit + 15, isLoading: true }), () => this.getData());
		}
	};

	getData = () => {
		if(this.state.status) {
			let options = {
				path: 'top/totalvol?limit='  + this.state.limit + '&tsym=' + this.state.tsym
			};

			this.service.getCoins(options).then((data) => {
				if(data.Data.length > this.state.currencies.length) {
					this.setState({
						currencies: data.Data,
						isLoading: false
					});
				} else {
					this.setState({
						hasData: false,
						isLoading: false
					});
				}
			});
		} else {
			this.netWorkError();
		}
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

	renderSeparator = () => {
		return (
		  <View
				style={{
				  height: 1,
				  width: "82%",
				  backgroundColor: "#CED0CE",
				  marginLeft: "18%"
				}}
		  />
		);
	};

	render() {
		return (
			<Container>
				<HeaderComponent {...this.props} />
				<Content padder>
					<Card>
						<CardItem header bordered>
							<Body>
								<Text>Cryptocurrency 24H Volume</Text>
						  </Body>
						</CardItem>
						<CardItem>
								<FlatList
									ref="flatList"
									ListFooterComponent={this.renderFooter}
									onEndReachedThreshold={0.5}
									onEndReached={this.onEndReached.bind(this)}
									keyExtractor={(item, index) => item.ConversionInfo.TotalVolume24H.toString()}
									data={this.state.currencies}
									ItemSeparatorComponent={this.renderSeparator}
									renderItem={ ({ item }) =>
										<ListItem
											roundAvatar
											hideChevron
											containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
											rightTitleStyle={{ color: '#000' }}
											rightTitle={'$' + item.ConversionInfo.TotalVolume24H.toFixed(2)}
											subtitle={item.CoinInfo.FullName}
											avatar={{ uri: this.imageUrl + item.CoinInfo.ImageUrl }} 
											title={item.CoinInfo.Name} />
									} 
								/>
						</CardItem>
					</Card>
				</Content>
			</Container>
		);
	}
}