import React, { Component } from "react";
import LinkWithDelay from '../../helpers/LinkWithDelay';
import {connect} from 'react-redux';
import numeral from 'numeral';

class OrdersDetails extends Component {

  render() {
    const {userOrders}=this.props
    return (
      <div className="pcControlerScreen">
        <div className="row">
          <p className="accountTitle">Resumen de tus pedidos</p>
        </div>
        
        {userOrders?userOrders.map(order=>(
            <div key={order.numeroPedido} className="container-fluid orderCard">
              <LinkWithDelay to={`/order-details/id=${order.id}`} delay={30}><div className="orderCardContent">
                <div className="row">
                  <div className="col-9">
                    <div className="row">
                      <div className="col-12 orderIdAndDateCard">
                        <div className={`orderIdCard ${order.estado} d-flex justify-content-center align-items-center`}><span>Pedido #{order.numeroPedido}</span></div> 
                        <div className="orderDateCard d-flex justify-content-center align-items-center"><span>{order.fecha}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 viewOrderButton d-flex justify-content-center align-items-center">
                    <i className="icon-edit-pencil-10px"></i>
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
})

export default connect(mapStateToProps,null)(OrdersDetails);
