import React, { Component } from 'react';
import { Image } from 'react-native';
import { 
	Container,
	Content,
	Text,
	List,
	ListItem,
	Icon,
	Body,
	Left, 
	Right, 
	Separator,
	Footer
} from 'native-base';

const routes = [
	{
		name: 'About Cryptocurrency',
		screen: 'About',
		icon: 'chevron-small-right', 
		color: 'grey'
	},
	{
		name: 'Cryptocurrency 24H Volume',
		screen: 'Prices',
		icon: 'chevron-small-right', 
		color: 'grey'
	},
	{
		name: 'Bitcoin Prices',
		screen: 'BtcPrices',
		icon: 'chevron-small-right', 
		color: 'grey'
	}
];

const settings = [
	{
		name: 'Settings',
		screen: 'Settings',
		icon: 'settings', 
		color: 'grey',
    type: 'Feather'
	}
];

export default class SideBarContent extends Component {
	render() {
		return (
			<Container>
				<Content>
					<Image
						style={{
							width: '100%',
							height: 300	
						}} 
						source={require('./../src/icons/logo.jpg')} />
					<List
						renderHeader={() => <Separator bordered><Text>Currenices</Text></Separator>}
						dataArray={routes}
						renderRow={data => {
							return (
								<Content>
									<ListItem
										icon
										button
										onPress={() => this.props.navigation.navigate(data.screen, {
											screen: data.screen,
											name: data.name
										})}>
										<Left>
											<Icon
												type='Entypo' 
												name={data.icon}
												style={{ color: data.color }} />
										</Left>
										<Body>
											<Text note>{data.name}</Text>
										</Body>
										<Right />
									</ListItem>
								</Content>
							);
						}}
					/>
				</Content>
				<Footer style={{ height: 100, backgroundColor: 'white'}}>
					<List
						itemDivider={false}
						renderHeader={() => <Separator bordered><Text>Settings</Text></Separator>}
						dataArray={settings}
						renderRow={data => {
							return (
								<ListItem
									noBorder
									style={{ marginTop: 10 }}
									icon
									button
									onPress={() => this.props.navigation.navigate(data.screen, {
										screen: data.screen,
										name: data.name
									})}>
									<Left>
										<Icon
											type={data.type} 
											name={data.icon}
											style={{ color: data.color, fontSize: 16 }} />
									</Left>
									<Body>
										<Text note>{data.name}</Text>
									</Body>
									<Right />
								</ListItem>
							);
						}}
					/>
				</Footer>
			</Container>
		);
	}
}