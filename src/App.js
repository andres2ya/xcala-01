import React from "react";
import {createPortal} from "react-dom";
import Login from './components/1-Auth/Login/Login'
import SignUp from './components/1-Auth/SignUp/SignUp'
import EmailVerification from './components/1-Auth/EmailVerify/EmailVerification'
import {Route, Switch, withRouter} from "react-router-dom"
import EmailVerify from './components/1-Auth/EmailVerify/EmailVerify';
import PassForgot from './components/1-Auth/PassForgot/PassForgot';
import PassReset from './components/1-Auth/PassReset/PassReset';
import EmailConfirm from './components/1-Auth/EmailConfirm/EmailConfirm';
import MyAccount from './components/2-Account/MyAccount';
import CustomEmailHandler from './components/1-Auth/CustomEmailHandler/CustomEmailHandler';
import Spinner from './components/layout/Spinner/Spinner';
import MainNavbar from './components/13-Navbars/MainNavbar/MainNavbar'
import SecondNavbar from "./components/13-Navbars/SecondNavbar/SecondNavbar";
import OrdersDetails from "./components/3-Orders/OrderDetails/OrdersDetails";
// import SpecificOrderDetails from "./components/account/SpecificOrderDetails";
// import ModalFilterStateOrders from "./components/account/ModalFilterStateOrders/ModalFilterStateOrders";
import ControlPanelXcala from "./components/XcalaInternalComponents/ControlPanelXcala/ControlPanelXcala";
import NewSupplier from "./components/XcalaInternalComponents/NewSupplier/NewSupplier";
import SupplierAccount from "./components/SupplierComponents/SupplierAccount/SupplierAccount";
import SupplierOrders from "./components/SupplierComponents/SupplierOrders/SupplierOrders";
import Pruebas from "./Pruebas";
import PruebaAddOrder from "./PruebaAddOrder";
import PruebasDespachos from "./PruebasDespachos";
import PruebasTotalPendientes from "./PruebasTotalPendientes";
import PruebasPayU from "./PruebasPayU";

import Categories from './components/5-ProductsAndCategories/Categories/Categories'
import CategoryProducts from "./components/5-ProductsAndCategories/Categories/CategoryProducts/CategoryProducts";

//NOTE: react-detect-offline, es una libreria que permite renderizar un contenido cuando se esta online y otro cuando se esta offline desde el App.js y de una manera muy sencilla
import {Offline, Online} from 'react-detect-offline'
import OfflineComponent from "./components/OfflineComponent/OfflineComponent";
import MainProductsPage from "./components/14-MainProductsPage/MainProductsPage";



function App(){
  
  return (

<div>
<Online>
  <div>
    {
        (function(){
          var url=window.location.pathname
          if(url==='/my-account'||url==='/order-details'||url==='/account-details'||url==='/invoice-address'||url==='/shipping-address'||url==='/all-products'){
            return <MainNavbar/>
          }else if(url==='/categories'||url==='/shopping-car'||url==='/supplier-panel'||url.indexOf("order-id") > -1){
            return <SecondNavbar/>
          }else if(url==='category-id'){
            return 'otherNavbar'
          }else{
            return null
          }
        })()
    }

    <div>
      <Switch>
        <Route exact path="/categories" component={Categories}/>
        <Route exact path="/categories-id=:id" component={CategoryProducts}/>
        <Route exact path="/products" component={MainProductsPage}/>
      </Switch>
    </div>
    <div className="container-fluid">
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/pruebaspayu" component={PruebasPayU}/>
      <Route exact path="/pruebas" component={Pruebas}/>
      <Route exact path="/pruebasAdd" component={PruebaAddOrder}/>
      <Route exact path="/pruebasdespacho" component={PruebasDespachos}/>
      <Route exact path="/pruebastotalpendientes" component={PruebasTotalPendientes}/>
      <Route exact path="/customemailhandler" component={CustomEmailHandler}/>
      <Route exact path="/my-account" component={MyAccount}/>
      <Route exact path="/order-details" component={OrdersDetails}/>
      {/* <Route exact path="/categories" component={Categories}/> */}
      {/* <Route exact path="/order-id:id" component={SpecificOrderDetails}/> */}
      {/* <Route exact path="/order-id" component={SpecificOrderDetails}/> */}
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
    </div>
  </div>
</Online>

<Offline>
    <OfflineComponent/>
</Offline>
</div>
  );
}

export default withRouter(App);