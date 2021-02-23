import React,  {Componet} from 'react' 
import { Container, Header, Body, Right, Button, Icon, Title, Thumbnail, Text, H1,
    Content, Card, CardItem, Left, Form, Item, Input, Label, DatePicker } from 'native-base';
import { ImageBackground, View, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'; 
import AppLoading from './Loading'
import * as SQLite from 'expo-sqlite';
import Menu from './partials/Menu'
import axios from "axios";
import moment from 'moment'

const db = SQLite.openDatabase("db.comercializadora");

class Gastos extends React.Component{
    constructor(props) {
        super(props);
        this.state ={         
          fontLoaded: false,           
          color : this.backgroundColors[0],
          userLite: '',
          tipoGasto: '',
          descripcion: '',
          monto: '0',
          fecha: ''
        }
    }

   backgroundColors = ["#5CD859", "#24A6D9", "#8022D9", "#D159D8", "#D85963", "#D88559"]

   async componentDidMount () {    
     db.transaction(tx => {
       tx.executeSql(
         `select * from usuario;`,
         [],
         (_, { rows: { _array } }) => this.setState({ userLite: _array[0].usuario })
       );
     });
     this.setState({ fontLoaded: true });
   }

    btnAtras = () => {
      Actions.home()
    }

    btnGuardar = () => {
      console.log('entro');
      this.setState({ fontLoaded: false })
      var d = {
        tipoGasto: this.state.tipoGasto,
        descripcion: this.state.descripcion,
        monto: this.state.monto,
        fecha: moment(this.state.fecha).format('YYYY-MM-DD')
      }
      console.log(d, 'd<<<<<<<<<<<<<');
      if(d.tipoGasto === "" || d.tipoGasto === undefined || d.tipoGasto === null ||
        d.descripcion === "" || d.descripcion === undefined || d.descripcion === null ||
        d.fecha === "" || d.fecha === undefined || d.fecha === null){

          this.setState({ fontLoaded: true })
          Alert.alert(
            'Favor de capturar todos los campos'
           );

      }else{
        axios.post('http://174.138.125.225:3005/gastos/setGastos', d)
          .then(function (response) {
            Alert.alert(
              'La informacion se guardo correctamente'
            )
          })
          .catch(function (error) {
            console.log(error);            
            Alert.alert(
                'Hubo un error en el sistema, contacte con el administrador'
            )
          });
          this.setState({ fontLoaded: true })
      }
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

    setDate(date) {
      this.setState({ fecha: date });
    }

    onChangeText = (text, d) => {
      this.setState({ [d]: text })
    }

    render(){
      if (!this.state.fontLoaded) {
        return <AppLoading />
      }
        return(
            <Container>
              <Header style={{ backgroundColor: '#fecd8a' }} androidStatusBarColor="#8ec63f">
              <Left>
                <Button transparent onPress={this.btnAtras}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
                <Body>
                  <Title style={{ fontFamily: 'sans-serif-condensed', fontWeight: 'bold', fontStyle: 'italic', color: '#f224b6'}}>Gastos</Title>
                </Body>
                <Right>
                  <Button transparent>
                    <Icon name='menu' />
                  </Button>
                </Right>
              </Header>                
                <Content style={{flex: 1,backgroundColor: '#e074d4'}}>
                  <Text>{"\n"}</Text>
                  <Text>{"\n"}</Text>
                  <Card style={{flex: 0}}>
                    <CardItem>
                      <Left>
                        <Thumbnail large source={require('../src/images/gastos.png')} />
                        <Body>
                          <Text>{this.state.userLite}</Text>
                          <Text note>Registrar Gastos</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                    <Body>
                        <Item floatingLabel>
                          <Label>Tipo de Gasto</Label>
                          <Input onChangeText={ (text) => this.onChangeText(text, 'tipoGasto') }/>
                        </Item>
                        <Item floatingLabel>
                          <Label>Descripciòn</Label>
                          <Input onChangeText={ (text) => this.onChangeText(text, 'descripcion') }/>
                        </Item>
                        <Item floatingLabel>
                          <Label>Monto</Label>
                          <Input value={this.state.monto} onChangeText={ (text) => this.onChangeText(text, 'monto') }/>
                        </Item>
                        <Item picker>
                            <Label>Fecha:</Label>
                            <DatePicker
                                locale={"es"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Favor de seleccionar una fecha ..."
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setDate.bind(this)}
                                disabled={false}
                            />
                        </Item>

                        <Text>{"\n"}</Text>
                        <Button 
                            full warning
                            onPress={this.btnGuardar}
                        >
                            <Text>Guardar</Text>
                        </Button>
                      </Body>
                    </CardItem>
                  </Card>
                </Content>
                <Menu></Menu>
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

export default Gastos