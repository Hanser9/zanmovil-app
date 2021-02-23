import React,  {Componet} from 'react' 
import { Container, Header, Body, Right, Button, Icon, Title, Thumbnail, Text, H1,
    Content, Card, CardItem, Left, Form, Item, Input, Label, Picker } from 'native-base';
import { ImageBackground, View, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'; 

class Productos extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
          selected: undefined
      };
    }

    onValueChange(value) {
      this.setState({
        selected: value
      }); 
    }

    btnRegresar = () => {
      Actions.home()
    }

    render(){
        return(
            <Container>
              <Header style={{ backgroundColor: '#fecd8a' }} androidStatusBarColor="#8ec63f">
              <Left>
                <Button transparent onPress={this.btnRegresar}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
                <Body>
                  <Title style={{ fontFamily: 'sans-serif-condensed', fontWeight: 'bold', fontStyle: 'italic', color: '#f224b6'}}>Productos</Title>
                </Body>
                <Right>
                  <Button transparent>
                    <Icon name='menu' />
                  </Button>
                </Right>
              </Header>                
                <Content style={{flex: 1,backgroundColor: '#08fc9c'}}>
                  <Text>{"\n"}</Text>
                  <Text>{"\n"}</Text>
                  <Card style={{flex: 0}}>
                    <CardItem>
                      <Left>
                        <Thumbnail large source={require('../src/images/productos.jpg')} />
                        <Body>
                          <Text>AgregarUsuarioFuturo</Text>
                          <Text note>Registrar nuevo producto</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                    <Body>
                        <Label>Origen</Label>              
                        <Picker
                          note
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          placeholder="Selecciona proveedor"
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          style={{ width: 300 }}
                          selectedValue={this.state.selected}
                          onValueChange={this.onValueChange.bind(this)}
                        >
                          <Picker.Item label="San juan" value="key0" />
                          <Picker.Item label="Pollos" value="key1" />
                          <Picker.Item label="Del valle" value="key2" />
                          <Picker.Item label="Grupo Agrovale" value="key3" />
                        </Picker>                        
                        <Item floatingLabel>
                          <Label>Tipo de Producto</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                        <Text>{"\n"}</Text>
                          <Label>Descripciòn</Label>
                          <Input />
                        </Item>
                        <Text>{"\n"}</Text>
                        <Button 
                            full warning
                            onPress={this.EnviaLoginAdmin}>
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

export default Productos