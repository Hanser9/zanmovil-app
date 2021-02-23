import React,  {Componet} from 'react' 
import { ImageBackground, View, Alert } from 'react-native'
import CryptoJS from 'react-native-crypto-js';
import axios from "axios";
import { Content, Container, Text, Card, CardItem, Body, Form, Item, Label, Input, H1, H2, Button, Thumbnail } from 'native-base'
import { Actions } from 'react-native-router-flux'; 
import * as Font from 'expo-font';
import AppLoading from './Loading'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.comercializadora");


class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = { 
            User: "",
            Pass: "",
            fontLoaded: false,         
        }
        this.EnviaLoginAdmin = this.EnviaLoginAdmin.bind()
        this.EnviaLoginUser = this.EnviaLoginUser.bind()

        db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS usuario (id INTEGER PRIMARY KEY, usuario TEXT)'
            )
          })

          db.transaction(tx => {
            tx.executeSql(
              'DELETE FROM usuario WHERE id = 1'
            )
          })
          

    }

    
    onChangeText = (text, d) => {
        this.setState({ [d]: text })
    }

    EnviaLoginAdmin = () => {
        var d = {
            usuario: this.state.User,
            password: this.state.Pass,
            tipo: 2
        }
        if(d.usuario === null || d.usuario === "" || d.password === null || d.password === ""){
            Alert.alert(
                'El usuario y contraseña son requeridos'
             )
        }else{
            d.password = CryptoJS.AES.encrypt(d.password, 'cochis').toString();
            axios.post('http://174.138.125.225:3005/login/validateUser', {
                usuario: d.usuario,
                password: d.password,
                tipoUsuario: d.tipo
              })
              .then(function (response) {
                    var i = response.data.res                  
                    if(i.err){
                        Alert.alert(
                            'Usuario y/o contraseña son incorrectos'
                         )          
                    }else{
                        //TODO guardar en sqlite el token que llego de la peticion
                        db.transaction(tx => {
                            tx.executeSql('INSERT INTO usuario (id, usuario) values (1, ?)', [i.nombre])
                          })
                        Actions.home()
                    }                    
              })
              .catch(function (error) {
                console.log(error);
                Alert.alert(
                    'Hubo un error en el sistema, contacte con el administrador'
                 )
              });               
        }
    }

    EnviaLoginUser = () => {
        var d = {
            usuario: this.state.User,
            password: this.state.Pass,
            tipo: 1
        }
        if(d.usuario === null || d.usuario === "" || d.password === null || d.password === ""){
            Alert.alert(
                'El usuario y contraseña son requeridos'
             )
        }else {
            d.password = CryptoJS.AES.encrypt(d.password, 'cochis').toString();
            axios.post('http://174.138.125.225:3005/login/validateUser', {
                usuario: d.usuario,
                password: d.password,
                tipoUsuario: d.tipo
              })
              .then(function (response) {
                    var i = response.data.res    
                    console.log(i)              
                    if(i.err){
                        Alert.alert(
                            'Usuario y/o contraseña son incorrectos'
                         )          
                    }else{

                        //TODO guardar en sqlite el token que llego de la peticion
                        db.transaction(tx => {
                            tx.executeSql('INSERT INTO usuario (id, usuario) values (1, ?)', [i.nombre])
                          })
                        Actions.home()
                    }                    
              })
              .catch(function (error) {
                console.log(error);
                Alert.alert(
                    'Hubo un error en el sistema, contacte con el administrador'
                 )
              });  
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Lobster': require('../assets/fonts/Lobster.ttf')
        });
    
        this.setState({ fontLoaded: true });
    }



    render() {

        if (!this.state.fontLoaded) {
            return <AppLoading />
          }
          
        return (
            <Container>
                <ImageBackground source={require('../src/images/fondo.jpg')} style={{width: '100%', height: '100%'}}>           
                    {/* <View style={{flex: 2, flexDirection: 'column'}}></View>   */}
                    <View style={{flex: 12, flexDirection: 'column', padding: 30}}>
                        <View style={{alignItems: 'center',justifyContent:'center'}}>
                            <Thumbnail square large source={require('../src/images/users.png')} style={{width: 150, height: 150}}/>
                        </View>
                        <H1 style={{color: '#e0590f', textAlign: 'center', fontWeight: 'bold'}}>{"\n"}Bodega P146</H1>
                        <H2 style={{color: '#f224b6', textAlign: 'center', fontFamily: 'Lobster', fontSize: 30, fontWeight: "bold"}}>{"\n"}Comercializadora de productos vegetales</H2>
                        <Card>
                            <Form>
                                <Item floatingLabel>
                                    <Label>Usuario</Label>
                                    <Input 
                                        onChangeText={ (text) => this.onChangeText(text, 'User') } 
                                    />
                                </Item>                                                         
                                <Item floatingLabel last>
                                    <Label>Contraseña</Label>
                                    <Input 
                                        secureTextEntry={true} 
                                        onChangeText={ (text) => this.onChangeText(text, 'Pass') } 
                                    />
                                </Item>                                
                            </Form>                            
                            <CardItem>
                                <Body>
                                    <Text>{"\n"}</Text>
                                    <Button 
                                        full warning
                                        onPress={this.EnviaLoginUser}
                                    >
                                        <Text>Usuario</Text>
                                    </Button>
                                    <Text>{"\n"}</Text>
                                    <Button 
                                        full warning
                                        onPress={this.EnviaLoginAdmin}
                                    >
                                        <Text>Administrador</Text>
                                    </Button>
                                    <Text>{"\n"}</Text>
                                    
                                </Body>
                            </CardItem>                            
                        </Card>                                                           
                    </View>
                </ImageBackground>
            </Container>
        )
    }        
}

export default  Login