import React from 'react';
import {Router, Scene} from 'react-native-router-flux'
import Login from './Views/Login'
import Home from './Views/Home'
import Proveedores from './Views/Proveedores'
import Usuarios from './Views/Usuarios'
import Productos from './Views/Productos'
import Clientes from './Views/Clientes'
import Agenda from './Views/Agenda'
import Relacion from './Views/Relacion'
import Concentrado from './Views/Concentrado'
import Gastos from './Views/Gastos' ;


var App = () => {
  return (
       <Router>
        <Scene key="root">
          <Scene key="login"
            component={Login}
            hideNavBar={true}
            initial
          />
          <Scene key="home"
            component={Home}
            hideNavBar={true}                        
          />
           <Scene key="proveedores"
            component={Proveedores}
            hideNavBar={true}                        
          />
           <Scene key="usuarios"
            component={Usuarios}
            hideNavBar={true}                        
          />
          <Scene key="productos"
            component={Productos}
            hideNavBar={true}                        
          />
           <Scene key="clientes"
            component={Clientes}
            hideNavBar={true}                        
          />
          {/* <Scene key="agenda"
            component={Agenda}
            hideNavBar={true}                        
          /> */}
          <Scene key="relacion"
            component={Relacion}
            hideNavBar={true}                        
          />
          <Scene key="agenda"
            component={Concentrado}
            hideNavBar={true}                        
          />
          <Scene key="gastos"
            component={Gastos}
            hideNavBar={true}                        
          />
        </Scene>
      </Router>
  )
}

export default App