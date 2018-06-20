import React, { Component } from 'react';
import HeaderComponent from './HeaderComponent';
import {styles} from './../styles/styles';

import { 
	Picker,
	AsyncStorage,
	Text,
  View,
  TouchableOpacity 
} from 'react-native';

import { 
	Container,
	Content, 
	List, 
	ListItem,
	Icon, 
	Left, 
	Body, 
	Right, 
	Switch
} from 'native-base';

export class SettingsScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dark: false,
      theme: 'light'
		};

		console.log('constructor', styles);
	}

	componentWillMount() {
    AsyncStorage.multiGet(['theme', 'large']).then((res) => {
    	this.setState({ theme: res.theme != null ? res.theme : 'light' });
    });
  }

	changeTheme = () => {
		let theme = this.state.theme == 'light' ? 'dark' : 'light';
    this.setState({theme: theme});
    AsyncStorage.setItem('theme', theme);
	}

	changeTextSize = () => {
    let large = !this.state.large;
    this.setState({large: large, test: 'large'});
    AsyncStorage.setItem('large', JSON.stringify(large));
	}

  render() {
    return (
      <Container style={styles[this.state.theme].container}>
        <HeaderComponent {...this.props} theme={this.state.theme} />
        <Content>
          <List  style={styles[this.state.theme].list}>
            <ListItem icon>
              <Left>
                <Icon name="theme-light-dark" type="MaterialCommunityIcons" />
              </Left>
              <Body>
                <Text>Enable Dark Mode</Text>
              </Body>
              <Right>
                <Switch value={this.state.theme == 'dark'} onValueChange={this.changeTheme} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="format-size" type="MaterialCommunityIcons" />
              </Left>
              <Body>
                <Text>Enable Large Text</Text>
              </Body>
              <Right>
                <Switch value={this.state.large} onValueChange={this.changeTextSize} />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}