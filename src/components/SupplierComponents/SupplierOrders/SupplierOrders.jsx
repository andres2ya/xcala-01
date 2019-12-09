import React, { Component } from "react";
import './SupplierOrders.css'
<<<<<<< HEAD
=======
import LinkWithDelay from '../../../helpers/LinkWithDelay';
>>>>>>> 7097e6d0444c4c8cd182c5c0d1e94df2c95b2e0c
import {connect} from 'react-redux';
import numeral from 'numeral';
import NavbarHeader from "./NavbarHeader/NavbarHeader";
import { MainContentNavHeaderInfoBtn } from "./NavbarHeader/MainContentNavHeader/MainContentNavHeader";
import DateSelector from "./DateSelector/DateSelector";
import TabsSelector from "./TabsSelector/TabsSelector";
import DayCard from "./DayCard/DayCard";
<<<<<<< HEAD
=======
import DespachoCard from "./DespachoCard/DespachoCard";
import IndividualOrderCard from "./IndividualOrderCard/IndividualOrderCard";
import ReferenceForTickets from "./ReferenceForTickets/ReferenceForTickets";
>>>>>>> 7097e6d0444c4c8cd182c5c0d1e94df2c95b2e0c


class SupplierOrders extends Component {
  state={
        activeTab:'Sin atender',
        namesTabs:['Sin atender','Incompletos','Completos']
    }

  changeActiveTab=(e)=>{
        console.log(e.target.id)
        this.setState({
            activeTab:e.target.id
        })
    }

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

<<<<<<< HEAD
          <div className="row DataSelectorRow">
            <DateSelector/>
          </div>

          <div className="row TabsSelectorRow">
=======
          <div className="row">
            <DateSelector/>
          </div>

          <div className="row">
>>>>>>> 7097e6d0444c4c8cd182c5c0d1e94df2c95b2e0c
            <TabsSelector onClick={this.changeActiveTab} activeTab={this.state.activeTab} namesTabs={this.state.namesTabs}/>
          </div>

          <div className="row centerDisplay">
            <DayCard/>
            <DayCard/>
          </div>
<<<<<<< HEAD
=======

          <div className="row centerDisplay">
            <DespachoCard/>
            <DespachoCard/>
            <DespachoCard/>
          </div>

          <div className="centerDisplayHalf">
            <IndividualOrderCard/>
            <IndividualOrderCard/>
            <IndividualOrderCard/>
            <IndividualOrderCard/>
          </div>

          <div className="centerDisplayHalf">
            <ReferenceForTickets/>
            <ReferenceForTickets/>
            <ReferenceForTickets/>
            <ReferenceForTickets/>
            <ReferenceForTickets/>
            <ReferenceForTickets/>
            <ReferenceForTickets/>
            <ReferenceForTickets/>
          </div>
>>>>>>> 7097e6d0444c4c8cd182c5c0d1e94df2c95b2e0c
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
