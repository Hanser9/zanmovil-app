import React,  {Componet} from 'react' 
import { Container, Header, Body, Right, Button, Icon, Title, Thumbnail, Text, H1,
    Content, Card, CardItem, Left, Form, Item, Input, Label } from 'native-base';
import { ImageBackground, View, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'; 

class Usuarios extends React.Component{
    constructor(props) {
        super(props);
        this.state ={

        }
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
                  <Title style={{ fontFamily: 'sans-serif-condensed', fontWeight: 'bold', fontStyle: 'italic', color: '#f224b6'}}>Usuarios</Title>
                </Body>
                <Right>
                  <Button transparent>
                    <Icon name='menu' />
                  </Button>
                </Right>
              </Header>                
                <Content style={{flex: 1,backgroundColor: '#b8c4dc'}}>
                  <Text>{"\n"}</Text>
                  <Text>{"\n"}</Text>
                  <Card style={{flex: 0}}>
                    <CardItem>
                      <Left>
                        <Thumbnail source={require('../src/images/users.png')} />
                        <Body>
                          <Text>AgregarUsuarioFuturo</Text>
                          <Text note>Registrar nuevo usuario</Text>
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
                          <Label>Apellido Paterno</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Label>Apellido Materno</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Label>Contraseña</Label>
                          <Input />
                        </Item>
                        <Text>{"\n"}</Text>
                        <Button 
                            full warning
                            onPress={this.EnviaLoginAdmin}
                        >
                            <Text>Crear</Text>
                        </Button>
                      </Body>
                    </CardItem>
                  </Card>
                </Content>
            </Container>
        )
    }
}

export default Usuarios 