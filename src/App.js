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
import SecondNavbar from "./components/navbars/SecondNavbar/SecondNavbar";
import OrdersDetails from "./components/account/OrdersDetails";
import SpecificOrderDetails from "./components/account/SpecificOrderDetails";
import ModalFilterStateOrders from "./components/account/ModalFilterStateOrders";
import ModalTrackorder from "./components/account/ModalTrackorder";
import OpenCase from "./components/account/CasesSystem/OpenCase";
import ControlPanelXcala from "./components/XcalaInternalComponents/ControlPanelXcala/ControlPanelXcala";
import NewSupplier from "./components/XcalaInternalComponents/NewSupplier/NewSupplier";
import SupplierAccount from "./components/SupplierComponents/SupplierAccount/SupplierAccount";
import SupplierOrders from "./components/SupplierComponents/SupplierOrders/SupplierOrders";
import pruebas from "./pruebas";



function App(){

  return (
    
    <div>
    {
        (function(){
          var url=window.location.pathname
          if(url==='/my-account'||url==='/order-details'||url==='/account-details'||url==='/invoice-address'||url==='/shipping-address'||url==='/all-products'){
            return <MainNavbar/>
          }else if(url==='/all-categories'||url==='/shopping-car'||url==='/supplier-panel'||url.indexOf("order-id") > -1){
            return <SecondNavbar/>
          }else if(url==='category-id'){
            return 'otherNavbar'
          }else{
            return null
          }
        })()
    }
    <div className="container-fluid">
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/pruebas" component={pruebas}/>
      <Route exact path="/customemailhandler" component={CustomEmailHandler}/>
      <Route exact path="/my-account" component={MyAccount}/>
      <Route exact path="/order-details" component={OrdersDetails}/>
      <Route exact path="/order-id:id" component={SpecificOrderDetails}/>
      <Route exact path="/passforgot" component={PassForgot}/>
      <Route exact path="/passreset" component={PassReset}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/emailverify" component={EmailVerify}/>
      <Route exact path="/emailconfirm" component={EmailConfirm}/>
      <Route exact path="/emailVerification" component={EmailVerification}/>
      <Route exact path='/xcala-admin' component={ControlPanelXcala}/>
      <Route exact path='/xcala-new-supplier' component={NewSupplier}/>
      <Route exact path='/supplier-panel' component={SupplierAccount}/>
      <Route exact path='/supplier-orders' component={SupplierOrders}/>
    </Switch>
      {createPortal(<Spinner/>,document.getElementById('preloader'))}
      {createPortal(<ModalFilterStateOrders/>,document.getElementById('ownModal'))}
      {createPortal(<ModalTrackorder/>,document.getElementById('ownModal'))}

      {createPortal(<OpenCase/>,document.getElementById('ownModal'))}
    </div>
  </div>
  );
}

export default withRouter(App);