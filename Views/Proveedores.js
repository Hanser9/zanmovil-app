import React,  {Componet} from 'react' 
import { Container, Header, Body, Right, Button, Icon, Title, Thumbnail, Text, H1,
    Content, Card, CardItem, Left, Form, Item, Input, Label } from 'native-base';
import { ImageBackground, View, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'; 

class Proveedores extends React.Component{
    constructor(props) {
        super(props);
        this.state ={                    
          color : this.backgroundColors[0]
        }
    }

   backgroundColors = ["#5CD859", "#24A6D9", "#8022D9", "#D159D8", "#D85963", "#D88559"]

    btnAtras = () => {
      Actions.home()
    }

    renderColors () {
      return this.backgroundColors.map(color => {
        return (
          <View>
            <TouchableOpacity 
              key={color}
              style={[styles.coloSelect, {backgroundColor: color}]}
              onPress={() => this.setState({color})}
            />
          </View>
        )
      })
    }

    render(){
        return(
            <Container>
              <Header style={{ backgroundColor: '#fecd8a' }} androidStatusBarColor="#8ec63f">
              <Left>
                <Button transparent onPress={this.btnAtras}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
                <Body>
                  <Title style={{ fontFamily: 'sans-serif-condensed', fontWeight: 'bold', fontStyle: 'italic', color: '#f224b6'}}>Proveedores</Title>
                </Body>
                <Right>
                  <Button transparent>
                    <Icon name='menu' />
                  </Button>
                </Right>
              </Header>                
                <Content style={{flex: 1,backgroundColor: '#40b474'}}>
                  <Text>{"\n"}</Text>
                  <Text>{"\n"}</Text>
                  <Card style={{flex: 0}}>
                    <CardItem>
                      <Left>
                        <Thumbnail large source={require('../src/images/provedores.jpg')} />
                        <Body>
                          <Text>AgregarUsuarioFuturo</Text>
                          <Text note>Registrar nuevo proveedor</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                    <Body>
                        <Item floatingLabel>
                          <Label>Nombre</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Label>Apellidos</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Label>Direccion</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Label>Telefono</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Label>Correo</Label>
                          <Input />
                        </Item>

                          <Label>Color</Label>
                          <View style={{flex: 1, flexDirection: "row", justifyContent:'space-between'}}>{this.renderColors()}</View>

                          <Label>Relleno</Label>
                          <View style={{flex: 1, flexDirection: "row", justifyContent:'space-between'}}>{this.renderColors()}</View>

                        <Text>{"\n"}</Text>
                        <Button 
                            full warning
                            onPress={this.EnviaLoginAdmin}
                        >
                            <Text>Guardar</Text>
                        </Button>
                      </Body>
                    </CardItem>
                  </Card>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
  coloSelect: {
    width: 30,
    height: 30, 
    borderRadius: 4
  }
})

export default Proveedores 