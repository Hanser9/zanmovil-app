import React,  {Componet} from 'react' 
import { Container, Header, Body, Right, Button, Icon, Title, Thumbnail, Text, H1,
    Content, Card, CardItem, Left, Form, Item, Input, Label, Tab, Tabs, ScrollableTab } from 'native-base';
import { ImageBackground, View, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'; 

class Agenda extends React.Component{
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
                  <Title style={{ fontFamily: 'sans-serif-condensed', fontWeight: 'bold', fontStyle: 'italic', color: '#f224b6'}}>Agenda</Title>
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
                  <Container>
                    <Tabs>

                    </Tabs>
                  </Container>
                </Content>
            </Container>
        )
    }
}

export default Agenda