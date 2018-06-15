import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import HeaderComponent from './HeaderComponent';
import { 
	Container,
	Content, 
	List, 
	ListItem, 
	Text, 
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
      large: false
		};
	}

	componentWillMount() {
    AsyncStorage.multiGet(['dark', 'large']).then((res) => {
      console.log(res);
    });
  }

	changeTheme = () => {
		let dark = !this.state.dark;
    this.setState({dark: dark});
    AsyncStorage.setItem('dark', JSON.stringify(dark));
	}

	changeTextSize = () => {
    let large = !this.state.large;
    this.setState({large: large, test: 'large'});
    AsyncStorage.setItem('large', JSON.stringify(large));
	}

  render() {
    return (
      <Container>
        <HeaderComponent {...this.props} />
        <Content>
          <List>
            <ListItem icon>
              <Left>
                <Icon name="theme-light-dark" type="MaterialCommunityIcons" />
              </Left>
              <Body>
                <Text>Enable Dark Mode</Text>
              </Body>
              <Right>
                <Switch value={this.state.dark} onValueChange={this.changeTheme} />
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