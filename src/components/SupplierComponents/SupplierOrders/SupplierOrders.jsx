import React, { Component } from "react";
import LinkWithDelay from '../../../helpers/LinkWithDelay';
import {connect} from 'react-redux';
import numeral from 'numeral';
import NavbarHeader from "./NavbarHeader/NavbarHeader";
import { MainContentNavHeaderInfoBtn } from "./NavbarHeader/MainContentNavHeader/MainContentNavHeader";


class SupplierOrders extends Component {
  render() {
    return (
      <div>
          <div className="sticky-top">
            <NavbarHeader/> 
          </div>

          <div className="row NavbarHeaderXsupplierBottom">
            <div className="d-none d-md-block MainContentNavHeader-SpacerInMD-vertical"></div>
            <MainContentNavHeaderInfoBtn link="/" text="Ver pedidos en stock" quantity="32"/>
            <MainContentNavHeaderInfoBtn link="/" text="Ver pedidos con casos" quantity="32"/>
            <MainContentNavHeaderInfoBtn link="/" text="Ver pedidos liberados" quantity="10"/>
            <MainContentNavHeaderInfoBtn link="/" text="Ver pedidos pendientes" quantity="42"/>
          </div>



          <div className="conte"></div>
      </div>
    )
  }
}


const mapStateToProps=(state)=>({
  userOrders:state.firebase.profile.pedidos
})

const mapDispatchToProps=(dispatch)=>{
  return {
    
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SupplierOrders);
