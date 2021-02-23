import React, { Component } from 'react';
import { Container, Header, View, Button, Icon, Fab, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class MenuHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    };
  }

  cerrarSesion = () => {
    Actions.login()
  }

  render() {
    return (  
        <View style={{ flex: 1 }}>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{  marginBottom: 40 }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="share" />
            <Button onPress={ this.cerrarSesion } style={{ backgroundColor: '#DD5144' }}>
              <Icon name="log-out" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="camera" />
            </Button>
          </Fab>
        </View>
    );
  }
}