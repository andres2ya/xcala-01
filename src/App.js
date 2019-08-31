import React from "react";
import {createPortal} from "react-dom";
import Login from './components/auth/Login/Login'
import SignUp from './components/auth/SignUp/SignUp'
import EmailVerification from './components/auth/EmailVerify/EmailVerification'
import {Route, Switch, withRouter} from "react-router-dom"
import EmailVerify from './components/auth/EmailVerify/EmailVerify';
import PassForgot from './components/auth/PassForgot/PassForgot';
import PassReset from './components/auth/PassReset/PassReset';
import EmailConfirm from './components/auth/EmailConfirm/EmailConfirm';
import MyAccount from './components/account/MyAccount';
import CustomEmailHandler from './components/auth/CustomEmailHandler/CustomEmailHandler';
import Spinner from './components/layout/Spinner/Spinner';
import MainNavbar from './components/navbars/MainNavbar/MainNavbar'


function App(){

  return (
    <div>
    {
        (function(){
          var NavBar;
          switch(window.location.pathname){
            case '/':
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
            case '/myaccount':
              NavBar=<MainNavbar/>
              break;
            case '/customemailhandler':
              NavBar=null
              break;
            default:
              NavBar=null}
          return NavBar
        })()
    }
    <div className="container">
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/customemailhandler" component={CustomEmailHandler}/>
      <Route exact path="/myaccount" component={MyAccount}/>
      <Route exact path="/passforgot" component={PassForgot}/>
      <Route exact path="/passreset" component={PassReset}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/emailverify" component={EmailVerify}/>
      <Route exact path="/emailconfirm" component={EmailConfirm}/>
      <Route exact path="/emailVerification" component={EmailVerification}/>
    </Switch>
      {createPortal(<Spinner/>,document.getElementById('preloader'))}
    </div>
  </div>
  );
}

export default withRouter(App);
