import React,  {Componet} from 'react' 
import axios from "axios";
import { Container, Header, Body, Button, Icon, Title, Thumbnail, Text,
    Content, Card, CardItem, Left, Item, Input, Label,ListItem, CheckBox, DatePicker, Picker, Form, Right, Radio } from 'native-base';
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
            loading: true,
            viajes: [],
            usuarios: [],
            clientes: [],
            productos: [],
            selectedViaje: undefined,
            selectedUsuario: undefined,
            selectedCliente: undefined,
            selectedProducto: undefined,
            pagoSelected: 1,            
            fecha: '',
            userLite: '',
            existencia: '0',
            reparto: '',
            precioReparto: '',
            comentarios: ''
        }
    }

    async componentDidMount () {
     var dataViaje = []
     var dataUsuarios = []
     var dataClientes = []
      await Font.loadAsync({
          'DancingScript': require('../assets/fonts/DancingScript.ttf')
      });
      await axios.get('http://174.138.125.225:3005/concentrado/numeroViaje')
      .then(function (response) {
            var i = response.data.res
            dataViaje = i  
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
      await axios.get('http://174.138.125.225:3005/concentrado/clientes')
      .then(function (response) {
            var i = response.data.res
            dataClientes = i  
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
      this.setState({ viajes: dataViaje })
      this.setState({ usuarios: dataUsuarios })
      this.setState({ clientes: dataClientes })
      this.setState({ fontLoaded: true });
    }

    btnAtras = () => {
      Actions.home()
    }

    async onValueChangeSelect (d, value) {
      console.log(d);
      if(d == "selectedViaje"){
        var dataProductos = []
        await axios.post('http://174.138.125.225:3005/concentrado/productos', {
          "NumNota": value
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
        await this.setState({ productos: dataProductos, selectedProducto: undefined, existencia: '0' })   
      }else if(d == "selectedProducto"){
        var data = this.state.productos
        var exis
        for(var key in data){       
          if(data[key].ProductoID == value){
            exis = data[key].CantidadExis
          }
        }
        exis = exis.toString() 
        console.log(exis, '<<<<<<<<<');
        this.setState({ existencia: exis }); 
        exis = ''         
      }
        this.setState({ [d]: value });                 
    }

    setDate(date) {
      this.setState({ fecha: date });
    }

    onChangeText = (text, d) => {
      this.setState({ [d]: text })
    }

    btnAgregarConcentrado = () => {

      this.setState({ loading: false })
      var i = []
      var productos = this.state.productos    
      var clientes = this.state.clientes
      var d = {
        viaje: this.state.selectedViaje,
        usuario: this.state.selectedUsuario,
        cliente: this.state.selectedCliente,
        producto: this.state.selectedProducto,
        pago: this.state.pagoSelected,
        fecha: moment(this.state.fecha).format('YYYY-MM-DD'),
        existencia: this.state.existencia,
        reparto: this.state.reparto,
        precioReparto: this.state.precioReparto,
        comentarios: this.state.comentarios,
        notaId: 0,
        existenciaFinal: 0,
        cantidad: 0,
        nombreCliente: ''        
      }
      console.log(d, '<<<<<<<<<<< d');
      if(
        d.cliente == undefined ||
        d.fecha == "" ||        
        d.precioReparto == "" ||
        d.producto == undefined ||
        d.reparto == "" ||
        d.usuario == undefined ||
        d.viaje == undefined ||
        d.viaje == 'nel' ||
        d.producto == 'nel'
      ){
        this.setState({ loading: true })
        Alert.alert(
          'Favor de capturar todos los campos'
       )
      }else{
        for(var key in productos){
          if(productos[key].ProductoID === d.producto){
            i.push(productos[key].NotaID)
          }
        }
        d.notaId = i
        if(d.notaId.length > 1){
          this.setState({ loading: true })
          Alert.alert(
            'El numero de viaje seleccionado contiene varios productos repetidos'
         )  
        }else{

          for(var key in productos){
            if(productos[key].ProductoID === d.producto){
              d.cantidad = productos[key].Cantidad
            }
          }
          for(var key in clientes){
            if(clientes[key].ClienteID === d.cliente){
              d.nombreCliente = clientes[key].NombreCli 
            }
          }

          d.notaId = d.notaId[0]
          d.existenciaFinal = parseInt(d.existencia) - parseInt(d.reparto)
          this.setState({ existencia: d.existenciaFinal.toString() })
          console.log(d);

          axios.post('http://174.138.125.225:3005/concentrado/setConcentrado', d)
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
          this.setState({ loading: true })
        }        
      }      

    }


    render(){
        if (!this.state.fontLoaded) {
            return <AppLoading />
        }

        if (!this.state.loading) {
          return <AppLoading />
      }
          
        let exis = this.state.existencia

        let viajesItem = this.state.viajes.map( (s, i) => {
            return <Picker.Item key={i} value={s.NumNota} label={s.NumNota.toString()} />
        });

        let usuariosItem = this.state.usuarios.map( (s, i) => {
          return <Picker.Item key={i} value={s.UsuarioID} label={s.Nombre} />
        });
        
        let clientesItem = this.state.clientes.map( (s, i) => {
          return <Picker.Item key={i} value={s.ClienteID} label={s.NombreCli} />
        });

        let productosItem = this.state.productos.map( (s, i) => {
          return <Picker.Item key={i} value={ s.ProductoID } label={s.productoNombre} />
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
                  <Title style={{ fontFamily: 'DancingScript', fontSize: 21.1, fontWeight: "bold", color: '#f224b6' }}>Concentrado</Title>
                </Body>
              </Header>                
                <Content style={{flex: 1,backgroundColor: '#68ccac'}}>
                  <Text>{"\n"}</Text>
                  <Card style={{flex: 0}}>
                    <CardItem>
                      <Left>
                        <Thumbnail large source={require('../src/images/concentrado.jpg')} />
                        <Body>
                          <Text>{this.state.userLite}</Text>
                          <Text note>Cocentrado</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                    <Body>
                    <Item picker>
                            <Label>Usuario credito:</Label>
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
                        <Item picker>
                            <Label>Numero de viaje:</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Seleccionar"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selectedViaje}
                                onValueChange={this.onValueChangeSelect.bind(this, 'selectedViaje')}
                            >
                                <Picker.Item key="select" value="nel" label="Favor de seleccionar..." />
                                {viajesItem}
                            </Picker>
                        </Item>
                        <Item picker>
                            <Label>Producto:</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Seleccionar"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selectedProducto}
                                onValueChange={this.onValueChangeSelect.bind(this, 'selectedProducto')}
                            >
                                <Picker.Item key="select" value="nel" label="Favor de seleccionar..." />
                                {productosItem}
                            </Picker>
                        </Item>
                        <Item>
                            <Label>Existencia:</Label>
                            <Text>{this.state.existencia}</Text>
                            {/* <Input value={exis} onChangeText={ (text) => this.onChangeText(text, 'existencia') } disabled /> */}
                        </Item>
                        <Item floatingLabel>
                          <Label>Reparto:</Label>
                          <Input onChangeText={ (text) => this.onChangeText(text, 'reparto') } />
                        </Item>      
                        <Item floatingLabel>
                          <Label>Precio de reparto:</Label>
                          <Input onChangeText={ (text) => this.onChangeText(text, 'precioReparto') } />
                        </Item>  
                        <Item picker>
                            <Label>Clientes:</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Seleccionar"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selectedCliente}
                                onValueChange={this.onValueChangeSelect.bind(this, 'selectedCliente')}
                            >
                                {clientesItem}
                            </Picker>
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
                        <Item onPress={() => this.setState({ pagoSelected: 1 })}>
                        <Text>{'\n'}</Text>
                          <Left>
                            <Text>Efectivo</Text>
                          </Left>
                          <Right>
                            <Radio selected={this.state.pagoSelected == 1} />
                          </Right>
                        </Item>
                        <Item onPress={() => this.setState({ pagoSelected: 2 })}>
                          <Text>{'\n'}</Text>
                          <Left>
                            <Text>Credito</Text>
                          </Left>
                          <Right>
                            <Radio selected={this.state.pagoSelected == 2} />
                          </Right>
                        </Item>                            
                        <Item floatingLabel>
                          <Label>Comentarios:</Label>
                          <Input onChangeText={ (text) => this.onChangeText(text, 'comentarios') } />
                        </Item>
                        <Text>{"\n"}</Text>
                        <Button 
                            full warning
                            onPress={this.btnAgregarConcentrado}
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

//No se cuando estes leyendo esto, no se ni si quiera si lo llegues a leer,
//pero me duele el corazon porque te alejas de mi, cada dia sin parar,
//me duele mas porque hoy me perdiste, yo te extraño como no tienes idea
//pero tu no tienes la minima intension de salir conmigo, por ello
//escribo estas palabras, para decirte cuanto te quiero y te extraño,
//Si llegas a leer esto y ya no hablamos te quiero decir que fuiste la mujer mas importante para mi,
//Hubiera poder haber echo todo por ti, fui tu cochis y tu mi cochis.

//Si seguimos hablando y solucionamos las cosas espero poder volver a ver a
//esa mujer que yo tanto extraño y anhelo, que todas las noches pienso en ella.

//Te quiero por siempre, Cochis.