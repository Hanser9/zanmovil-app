import React,  {Component} from 'react' 
import { Content, Thumbnail, Text } from 'native-base';
import { View, TouchableOpacity, ImageBackground } from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class TabMenu1 extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.redireccionar = this.redireccionar.bind()
  }

  redireccionar = (d) => {
    (d == 1) ? Actions.proveedores() : '';
    (d == 2) ? Actions.usuarios() : '';
    (d == 3) ? Actions.productos() : '';
    (d == 4) ? Actions.clientes() : '';
    (d == 5) ? Actions.agenda() : '';
    (d == 6) ? Actions.relacion() : '';
  }

  render() {
    return (  
      <Content>
        <View style={{flex: 4, flexDirection: 'column'}}>
          <View style={{flex: 12, flexDirection: 'row'}}>
            <View style={{flex: 2}} />
            <View style={{flex: 6}}>
              <TouchableOpacity onPress={ this.redireccionar.bind(this, 1) }>
                <Thumbnail large source={require('../../src/images/provedores.jpg')} />
                <Text>Proveedores</Text>
              </TouchableOpacity>                        
            </View>
            <View style={{flex: 6}}>
              <TouchableOpacity onPress={ this.redireccionar.bind(this, 2) }>
                <Thumbnail large source={require('../../src/images/users.png')} />
                <Text>Usuarios</Text>
              </TouchableOpacity>  
            </View>
          </View>                    
        </View>
                
        <View style={{flex: 4, flexDirection: 'column'}}>
          <View style={{flex: 12, flexDirection: 'row'}}>
            <View style={{flex: 2}} />
            <View style={{flex: 6}}>
              <TouchableOpacity onPress={ this.redireccionar.bind(this, 3) }>
                <Thumbnail large source={require('../../src/images/productos.jpg')} />
                <Text>Productos</Text>
              </TouchableOpacity>  
            </View>
            <View style={{flex: 6}}>
              <TouchableOpacity onPress={ this.redireccionar.bind(this, 6) }>
                <Thumbnail large source={require('../../src/images/notas.jpg')} />
                <Text>  Relación</Text>
                <Text>  de Viaje</Text>
              </TouchableOpacity>
            </View>
          </View>                    
        </View>
                    
        <View style={{flex: 4, flexDirection: 'column'}}>
          <View style={{flex: 12, flexDirection: 'row'}}>
            <View style={{flex: 2}} />
            <View style={{flex: 6}}>
            <TouchableOpacity onPress={ this.redireccionar.bind(this, 4) }>
              <Thumbnail large source={require('../../src/images/clientes.png')} />
              <Text>Clientes</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 6}}>
              <TouchableOpacity onPress={ this.redireccionar.bind(this, 5)}>
              <Thumbnail large source={require('../../src/images/agenda.jpg')} />
              <Text>Agenda</Text>
              </TouchableOpacity>
            </View>
          </View>                    
        </View>   
      </Content>      
    );
  }
}