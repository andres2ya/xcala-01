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
import OrdersDetails from "./components/account/OrdersDetails";
import SpecificOrder from "./components/account/SpecificOrder";


function App(){

  return (
    
    <div>
    {
        (function(){
          var url=window.location.pathname
          if(url==='/my-account'||url==='/order-details'||url==='/account-details'||url==='/invoice-address'||url==='/shipping-address'||url==='/all-products'){
            return <MainNavbar/>
          }else if(url==='/all-categories'||url==='/shopping-car'||url.indexOf("id") > -1){
            return 'otherNavbar'
          }else if(url==='category-id'){
            return 'otherNavbar'
          }else{
            return null
          }
        })()
    }
    <div className="container">
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/customemailhandler" component={CustomEmailHandler}/>
      <Route exact path="/my-account" component={MyAccount}/>
      <Route exact path="/order-details" component={OrdersDetails}/>
      <Route exact path="/order-details/id=:id" component={SpecificOrder}/>
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
