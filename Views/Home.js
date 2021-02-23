import React,  {Component} from 'react' 
import { Container, Header, Body, Title, Tab, Tabs, ScrollableTab, Thumbnail, Text } from 'native-base';
import { View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux';
import * as Font from 'expo-font';
import AppLoading from './Loading'
import MenuHome from './partials/MenuHome'

class  Home extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
          fontLoaded: false,
        }        
        this.redireccionar = this.redireccionar.bind()
    }

    async componentDidMount() {
      await Font.loadAsync({
          'DancingScript': require('../assets/fonts/DancingScript.ttf')
      });
  
      this.setState({ fontLoaded: true });
  }

  redireccionar = (d) => {
    (d == 1) ? Actions.proveedores() : '';
    (d == 2) ? Actions.usuarios() : '';
    (d == 3) ? Actions.productos() : '';
    (d == 4) ? Actions.clientes() : '';
    (d == 5) ? Actions.agenda() : '';
    (d == 6) ? Actions.relacion() : '';
    (d == 7) ? Actions.gastos() : '';
  }
    

    render(){

      if (!this.state.fontLoaded) {
        return <AppLoading />
      }

        return(            
            <Container>              
              <Header style={{ backgroundColor: '#fecd8a' }} androidStatusBarColor="#8ec63f">
                <Body>
                  <Title style={{ fontFamily: 'DancingScript', fontSize: 25, fontWeight: "bold", color: '#f224b6' }}>Catalogo</Title>
                </Body>
              </Header>              

              <ImageBackground source={require('../src/images/fondo.jpg')} style={{width: '100%', height: '100%'}}>        
                <ScrollView>
                    <Text>{"\n"}</Text>
                    <View style={{flex: 4, flexDirection: 'column'}}>
                      <View style={{flex: 12, flexDirection: 'row'}}>
                        <View style={{flex: 2}} />
                        <View style={{flex: 6}}>
                          <TouchableOpacity onPress={ this.redireccionar.bind(this, 1) }>
                            <Thumbnail large source={require('../src/images/provedores.jpg')} />
                            <Text>Proveedores</Text>
                          </TouchableOpacity>                        
                        </View>
                        <View style={{flex: 6}}>
                          <TouchableOpacity onPress={ this.redireccionar.bind(this, 2) }>
                            <Thumbnail large source={require('../src/images/users.png')} />
                            <Text>Usuarios</Text>
                          </TouchableOpacity>  
                        </View>
                      </View>                    
                    </View>
                    <Text>{"\n"}</Text>
                            
                    <View style={{flex: 4, flexDirection: 'column'}}>
                      <View style={{flex: 12, flexDirection: 'row'}}>
                        <View style={{flex: 2}} />
                        <View style={{flex: 6}}>
                          <TouchableOpacity onPress={ this.redireccionar.bind(this, 3) }>
                            <Thumbnail large source={require('../src/images/productos.jpg')} />
                            <Text>Productos</Text>
                          </TouchableOpacity>  
                        </View>
                        <View style={{flex: 6}}>
                          <TouchableOpacity onPress={ this.redireccionar.bind(this, 3) }>
                            <Thumbnail large source={require('../src/images/permisos.png')} />
                            <Text>Permisos</Text>
                          </TouchableOpacity>  
                        </View>                        
                      </View>                    
                    </View>
                    <Text>{"\n"}</Text>
                                
                    <View style={{flex: 4, flexDirection: 'column'}}>
                      <View style={{flex: 12, flexDirection: 'row'}}>
                        <View style={{flex: 2}} />
                        <View style={{flex: 6}}>
                          <TouchableOpacity onPress={ this.redireccionar.bind(this, 6) }>
                            <Thumbnail large source={require('../src/images/notas.jpg')} />
                            <Text>  Relación</Text>
                            <Text>  de Viaje</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{flex: 6}}>
                          <TouchableOpacity onPress={ this.redireccionar.bind(this, 4) }>
                            <Thumbnail large source={require('../src/images/clientes.png')} />
                            <Text>Clientes</Text>
                          </TouchableOpacity>
                        </View>                        
                      </View>                    
                    </View>

                    <Text>{"\n"}</Text>

                    <View style={{flex: 4, flexDirection: 'column'}}>
                      <View style={{flex: 12, flexDirection: 'row'}}>
                        <View style={{flex: 2}} />
                        <View style={{flex: 6}}>
                          <TouchableOpacity onPress={ this.redireccionar.bind(this, 5)}>
                          <Thumbnail large source={require('../src/images/concentrado.jpg')} />
                          <Text>Concentrado</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{flex: 6}}>
                          <TouchableOpacity onPress={ this.redireccionar.bind(this, 7) }>
                            <Thumbnail large source={require('../src/images/gastos.png')} />
                            <Text>Gastos</Text>
                          </TouchableOpacity>
                        </View>
                      </View>                    
                    </View> 
                    <Text>{"\n"}</Text>


                    <View style={{flex: 4, flexDirection: 'column'}}>
                      <View style={{flex: 12, flexDirection: 'row'}}>
                        <View style={{flex: 2}} />
                        <View style={{flex: 6}}>
                          <TouchableOpacity onPress={ this.redireccionar.bind(this, 5)}>
                          <Thumbnail large source={require('../src/images/cc.jpg')} />
                          <Text>Credito y</Text>
                          <Text>cobranza</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{flex: 6}}>
                          <TouchableOpacity onPress={ this.redireccionar.bind(this, 5)}>
                          <Thumbnail large source={require('../src/images/corte.png')} />
                          <Text>Corte</Text>
                          </TouchableOpacity>
                        </View>
                      </View>                    
                    </View> 
                    <Text>{"\n"}</Text>
                    <Text>{"\n"}</Text>
                      
                                             
                </ScrollView>
                <MenuHome></MenuHome> 
              </ImageBackground>

            </Container>
        )
    }
}

export default Home 