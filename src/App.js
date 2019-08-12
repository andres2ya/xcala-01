import React from 'react';
// import Producto from './components/Producto'
import Login from './components/auth/Login'
import {Route, Switch, withRouter} from "react-router-dom"
// import {UserIsAuthenticated,UserIsNotAuthenticated} from './helpers/auth'


function App() {
  return (
    <div>
    {window.location.pathname==="/" ? '<Navbar/>' : '<NavbarDos/>'}
    <div className="container">
    <Switch>
      {/* <Route exact path="/" component={UserIsNotAuthenticated(Inicio)}/> */}
      {/* <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/> */}
      <Route exact path="/login" component={Login}/>
      {/* <Route exact path="/productos" component={UserIsAuthenticated(Productos)}/>
      <Route exact path="/productos/producto/:id" component={UserIsAuthenticated(Producto)}/> */}
    </Switch>
    </div>
  </div>
  );
}

export default withRouter(App);
