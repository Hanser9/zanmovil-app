import React,  {Componet} from 'react' 
import axios from "axios";
import { Container, Header, Body, Button, Icon, Title, Thumbnail, Text,
    Content, Card, CardItem, Left, Item, Input, Label, DatePicker, Picker, Form } from 'native-base';
import { Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'; 
import * as Font from 'expo-font';
import AppLoading from './Loading'
import moment from 'moment'
import * as SQLite from 'expo-sqlite';
import Menu from './partials/Menu'

const db = SQLite.openDatabase("db.comercializadora");

class Proveedores extends React.Component{
    constructor(props) {
        super(props);
        this.state ={                    
            fontLoaded: false,
            proveedores: [],
            usuarios: [],
            productos: [],
            selectedProveedor: undefined,
            selectedUsuario: undefined,
            selectedTipo: undefined,
            nViaje: '',
            fecha: '',
            chofer: '',
            flete: '',
            cantidad: '',  
            userLite: '',          
        }
    }

    async componentDidMount () {
     var dataProveedores = []
     var dataUsuarios = []
      await Font.loadAsync({
          'DancingScript': require('../assets/fonts/DancingScript.ttf')
      });
      await axios.get('http://174.138.125.225:3005/relacion/proveedores')
      .then(function (response) {
            var i = response.data.res
            dataProveedores = i  
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert(
            'Hubo un error en el sistema, contacte con el administrador'
         )
      }); 
      await axios.get('http://174.138.125.225:3005/relacion/usuarios')
      .then(function (response) {
            var i = response.data.res
            dataUsuarios = i  
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert(
            'Hubo un error en el sistema, contacte con el administrador'
         )
      });
      db.transaction(tx => {
        tx.executeSql(
          `select * from usuario;`,
          [],
          (_, { rows: { _array } }) => this.setState({ userLite: _array[0].usuario })
        );
      });
      this.setState({ proveedores: dataProveedores })
      this.setState({ usuarios: dataUsuarios })
      this.setState({ fontLoaded: true });
    }

    btnAtras = () => {
      Actions.home()
    }

    async onValueChangeSelect (d, value) {
      if(d == "selectedProveedor"){
        var dataProductos = []
        await axios.post('http://174.138.125.225:3005/relacion/productos', {
          "ProvedorID": value
        })
        .then(function (response) {
              var i = response.data.res
              dataProductos = i  
        })
        .catch(function (error) {
          console.log(error);
          Alert.alert(
              'Hubo un error en el sistema, contacte con el administrador'
           )
        });
        this.setState({ productos: dataProductos })
      }      
      this.setState({ [d]: value });      
      console.log(this.state.productos);
    }

    setDate(date) {
      this.setState({ fecha: date });
    }

    onChangeText = (text, d) => {
      this.setState({ [d]: text })
    }

    btnAgregarRelacion = () => {
      var d = {
        nViaje: this.state.nViaje,
        fecha: moment(this.state.fecha).format('YYYY-MM-DD'),
        chofer: this.state.chofer,
        flete: this.state.flete,
        proveedor: this.state.selectedProveedor,
        tipo: this.state.selectedTipo,
        cantidad: this.state.cantidad,
        recibe: this.state.selectedUsuario
      }
      if(d.nViaje == "" || d.fecha == "" || d.chofer == "" || d.flete == "" || d.proveedor == undefined || d.proveedor == "" || d.tipo == undefined || d.tipo == "" || d.cantidad == "" || d.recibe == undefined || d.recibe == ""){
        Alert.alert(
          'Todos los campos son requeridos'
       )  
      }else{
        axios.post('http://174.138.125.225:3005/relacion/setRelacion', d)
        .then(function (response) {
              var i = response.data.res
              console.log(i);              
              Alert.alert(
                'La relacion de viaje se guardo correctamente'
             )
        })
        .catch(function (error) {
          console.log(error);
          Alert.alert(
              'Hubo un error en el sistema, contacte con el administrador'
           )
        });        
      }
      this.setState({ cantidad: '' })
      console.log(d, this.state.cantidad);
    }


    render(){
        if (!this.state.fontLoaded) {
            return <AppLoading />
          }

        let proveedoresItem = this.state.proveedores.map( (s, i) => {
            return <Picker.Item key={i} value={s.ProvedorID} label={s.nombre} />
        });

        let usuariosItem = this.state.usuarios.map( (s, i) => {
          return <Picker.Item key={i} value={s.UsuarioID} label={s.Nombre} />
        });
        
        let productosItem = this.state.productos.map( (s, i) => {
          return <Picker.Item key={i} value={s.ProductoID} label={s.nombre} />
        });

        return(
            <Container>
              <Header style={{ backgroundColor: '#fecd8a' }} androidStatusBarColor="#8ec63f">
              <Left>
                <Button transparent onPress={this.btnAtras}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
                <Body>
                  <Title style={{ fontFamily: 'DancingScript', fontSize: 21.1, fontWeight: "bold", color: '#f224b6' }}>Relacion de Viaje</Title>
                </Body>
              </Header>                
                <Content style={{flex: 1,backgroundColor: '#bc8f8f'}}>
                  <Text>{"\n"}</Text>
                  <Card style={{flex: 0}}>
                    <CardItem>
                      <Left>
                        <Thumbnail large source={require('../src/images/notas.jpg')} />
                        <Body>
                          <Text>{this.state.userLite}</Text>
                          <Text note>Relacion de Viaje</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                    <Body>
                        <Item floatingLabel>
                          <Label>N de Viaje:</Label>
                          <Input onChangeText={ (text) => this.onChangeText(text, 'nViaje') } />
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
                        <Item floatingLabel>
                          <Label>Chofer:</Label>
                          <Input onChangeText={ (text) => this.onChangeText(text, 'chofer') } />
                        </Item>
                        <Item floatingLabel>
                          <Label>Flete:</Label>
                          <Input onChangeText={ (text) => this.onChangeText(text, 'flete') } />
                        </Item>                
                        <Item picker>
                            <Label>Origen:</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Favor de seleccionar un origen"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selectedProveedor}
                                onValueChange={this.onValueChangeSelect.bind(this, 'selectedProveedor')}
                            >
                                {proveedoresItem}
                            </Picker>
                        </Item>                        
                        <Item picker>
                            <Label>Tipo:</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Favor de seleccionar un tipo"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selectedTipo}
                                onValueChange={this.onValueChangeSelect.bind(this, 'selectedTipo')}
                            >
                                {productosItem}
                            </Picker>
                        </Item>   
                        <Item floatingLabel>

                          {/* TODO limpiar este campo */}
                          <Label>Cantidad:</Label>
                          <Input onChangeText={ (text) => this.onChangeText(text, 'cantidad') } />
                        </Item>
                        <Item picker>
                            <Label>Persona que recibe:</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Seleccionar"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selectedUsuario}
                                onValueChange={this.onValueChangeSelect.bind(this, 'selectedUsuario')}
                            >
                                {usuariosItem}
                            </Picker>
                        </Item>  

                        <Text>{"\n"}</Text>
                        <Button 
                            full warning
                            onPress={this.btnAgregarRelacion}
                        >
                            <Text>Agregar</Text>
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

export default Proveedores 