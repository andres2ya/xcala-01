import React from 'react';
import Producto from './components/Producto'
import Login from './components/auth/Login/Login'
import SignUp from './components/auth/SignUp/SignUp'
import EmailVerification from './components/auth/EmailVerify/EmailVerification'
import ResetPassword from './components/auth/PassReset/ResetPassword'
import MainNavbar from './components/layout/MainNavbar/MainNavbar';
import {Route, Switch, withRouter} from "react-router-dom"
import EmailVerify from './components/auth/EmailVerify/EmailVerify';
import PassForgot from './components/auth/PassForgot/PassForgot';
import PassReset from './components/auth/PassReset/PassReset';
import EmailConfirm from './components/auth/EmailConfirm/EmailConfirm';
// import {UserIsAuthenticated,UserIsNotAuthenticated} from './helpers/auth'


function App() {
  return (
    <div >
    {
        (function(){
          var NavBar;
          switch(window.location.pathname){
            case '/login':
              NavBar=null
              break;
            case '/signup':
              NavBar=null
              break;
            case '/emailverify':
              NavBar=null
              break;
            case '/emailconfirm':
              NavBar=null
              break;
            case '/passforgot':
              NavBar=null
              break;
            case '/passreset':
              NavBar=null
              break;
            default:
              NavBar=<MainNavbar text={'In other shit'} />}
          return NavBar
        })()
    }
    <div className="container">
    <Switch>
      {/* <Route exact path="/" component={UserIsNotAuthenticated(Inicio)}/> */}
      {/* <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/> */}
      <Route exact path="/login" component={Login}/>
      <Route exact path="/producto" component={Producto}/>
      <Route exact path="/passforgot" component={PassForgot}/>
      <Route exact path="/passreset" component={PassReset}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/emailverify" component={EmailVerify}/>
      <Route exact path="/emailconfirm" component={EmailConfirm}/>
      <Route exact path="/emailVerification" component={EmailVerification}/>
      {/* <Route exact path="/productos" component={UserIsAuthenticated(Productos)}/>
      <Route exact path="/productos/producto/:id" component={UserIsAuthenticated(Producto)}/> */}
    </Switch>
    </div>
  </div>
  );
}

export default withRouter(App);
