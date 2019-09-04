import React, { Component } from "react";
import LinkWithDelay from '../../helpers/LinkWithDelay';
import {connect} from 'react-redux';
import numeral from 'numeral';

class OrdersDetails extends Component {

  state={
    orderDisplay:'allOrders'
  }

  changeOrderDisplay=(tab)=>{
    this.setState({
      orderDisplay:tab
    })
  }

  render() {
    const {userOrders}=this.props
    const {orderDisplay}=this.state
    var orders=undefined
    if(orderDisplay==='allOrders'){
      orders=userOrders
    }else if(orderDisplay==='cashOnDeliveryOrders'){
      orders=userOrders.filter(order=>(order.tipoPago==='contraEntrega'))
    }else{
      orders=userOrders.filter(order=>(order.tipoPago==='online'))
    }
    
    return (
      <div className="pcControlerScreen ">
        <div className="row">
          <p className="accountTitle">Resumen de tus pedidos</p>
        </div>
        <div className="container-fluid tab-orders">
          <div className="row">
            <div 
            onClick={()=>this.changeOrderDisplay('allOrders')}
            className={`col-4 ${orderDisplay==='allOrders'?'col-selector-active':'col-selector'} d-flex justify-content-center align-items-center`}>
              Todos
            </div>
            <div 
            onClick={()=>this.changeOrderDisplay('cashOnDeliveryOrders')}
            className={`col-4 ${orderDisplay==='cashOnDeliveryOrders'?'col-selector-active':'col-selector'}  d-flex justify-content-center align-items-center`}>
              Pago/entrega
            </div>
            <div 
            onClick={()=>this.changeOrderDisplay('onlinePayOrders')}
            className={`col-4 ${orderDisplay==='onlinePayOrders'?'col-selector-active':'col-selector'} d-flex justify-content-center align-items-center`}>
              Pago/online
            </div>
          </div>
        </div>
        
        {orders?orders.map(order=>(
          
            <div key={order.numeroPedido} className="container-fluid orderCard">
              <LinkWithDelay to={`/order-details/id=${order.id}`} delay={30}><div className="orderCardContent">
                <div className="row">
                  <div className="col-9">
                    <div className="row">
                      <div className="col-12 orderIdAndDateCard">
                        <div className={`orderIdCard ${order.estado} d-flex justify-content-center align-items-center`}>
                          <div className="overlay-orderIdCard d-flex justify-content-center align-items-center">
                            <span>Pedido #{order.numeroPedido}</span>
                          </div>
                        </div> 
                        <div className="orderDateCard centerHorizontal">
                            <span>{order.fecha}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 viewOrderButton d-flex justify-content-center align-items-center">
                    {order.tipoPago==='contraEntrega'?
                      <i className="icon-edit-pencil-10px"></i>
                      :
                      <i className="icon-edit-pencil-10px"></i>
                    }
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <span className="boldText">Costo total:</span> <strong>{numeral(order.costoTotal).format('$0,0')}</strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                  <span className="boldText">Ganancia total:</span> <strong>{numeral(order.gananciaTotal).format('$0,0')}</strong>
                  </div>
                </div>
              </div>
              </LinkWithDelay>
          </div>
        )):null}

      </div>
    );
  }
}

const mapStateToProps=(state)=>({
  userOrders:state.firebase.profile.pedidos,
  // orderStateFilter:
})

export default connect(mapStateToProps,null)(OrdersDetails);
