import React, { Component } from 'react';
import { Text, View } from "react-native";
import { 
	Header,
	Left,
	Icon,
	Right,
	Button,
	Body,
} from "native-base";

class HeaderComponent extends Component {
	constructor(props) {
		super(props);
		if(typeof this.props.navigation.state.params == 'undefined') {
			this.props.navigation.state.params = {
				name: 'About Cryptocurrency',
				screen: 'About'
			};
		}
	}

	render() {
		return (
			<View>
				<Header style={{ paddingTop: 20, paddingBottom: 10 }}>
	        <Left>
	          <Button
	            transparent
	            onPress={() => this.props.navigation.toggleDrawer()}>
	            <Icon name="menu" />
	          </Button>
	        </Left>
	        <Body>
	          <Text style={{ color: 'white' }}>{ this.props.navigation.state.params.name }</Text>
	        </Body>
	        <Right />
	      </Header>
	    </View>
		);
	}
}

export default HeaderComponent;