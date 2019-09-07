import React, { Component } from "react";
import LinkWithDelay from '../../helpers/LinkWithDelay';
import {connect} from 'react-redux';
import numeral from 'numeral';
import {applyStateFilterToOrders} from '../../ducks/accountDuck/applyFilterToOrdersDuck';

class OrdersDetails extends Component {

  state={
    orderDisplay:'allOrders',
    ordersReverse:undefined
  }

  componentWillUnmount=()=>{
    document.getElementById('ownModal').removeAttribute('class')
    document.body.removeAttribute('class')
    document.body.className='myAccountStyle'
    this.props.applyStateFilterToOrders(false,this.props.orderStateFilter)
  }

  changeOrderDisplay=(tab)=>{
    this.setState({
      orderDisplay:tab
    })
  }

  applyFilterByState=(e)=>{
    e.preventDefault()
    window.scrollTo(0, 0)//Seteando el scroll en las posiciones iniciales para no afectar el modal
    this.props.applyStateFilterToOrders(true)
  }

  render() {
    const {userOrders,orderStateFilter}=this.props
    const {orderDisplay}=this.state
    var orders=undefined

    if(userOrders){
      switch (orderDisplay) {
        case 'allOrders':
          orders=[...userOrders]
          break;
        case 'cashOnDeliveryOrders':
          orders=userOrders.filter(order=>(order.tipoPago==='contraEntrega'))
          break;
        case 'onlinePayOrders':
          orders=userOrders.filter(order=>(order.tipoPago==='online'))
          break;
        default:
          break;
      }
    }

    if(orderStateFilter){
      switch (orderStateFilter) {
        case 'enviadoAlProveedor':
          orders=orders.filter(order=>(order.estado==='enviadoAlProveedor'))
          break;
        case 'enProduccion':
          orders=orders.filter(order=>(order.estado==='enProduccion'))
          break;
        case 'listoParaDespacho':
          orders=orders.filter(order=>(order.estado==='listoParaDespacho'))
          break;
        case 'despachado':
          orders=orders.filter(order=>(order.estado==='despachado'))
          break;
        case 'finalizado':
          orders=orders.filter(order=>(order.estado==='finalizado'))
          break;
        case 'cancelado':
          orders=orders.filter(order=>(order.estado==='cancelado'))
          break;
        case 'allOrders':
          orders=[...orders]
          break;
        default:
          break;
      }
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
        <div className="container-fluid filtersContainer">
          <div className="row">
            <div className="col-5">
              {/* Espacio para otro filtro */}
            </div>
            <div className="col-7 col-stateFilter d-flex justify-content-end align-items-center">
              <div
              onClick={this.applyFilterByState}
              className="filterBox d-flex justify-content-end align-items-center">
                Filtrar por estado <i className="icon-filterBox icon-filter centerVerticalAndHorizontal"/>
              </div>
            </div>
          </div>
        </div>
        
        {orders?orders.reverse().map(order=>(
          
            <div key={order.numeroPedido} className="container-fluid orderCard">
              <LinkWithDelay to={`/order-id${order.id}`} delay={30}>
                <div className="orderCardContent">
                <div className="row">
                  <div className="col-9">
                    <div className="row">
                      <div className="col-12 orderIdAndDateCard">
                        <div className={`orderIdCard ${order.estado} d-flex justify-content-center align-items-center`}>
                          <div className="overlay-orderIdCard d-flex justify-content-center align-items-center">
                            <span>Pedido #{order.numeroPedido}</span>
                          </div>
                        </div> 
                        <div className="orderStateCard centerHorizontal d-flex justify-content-center align-items-center">
                            <div className={`stateCircle ${order.estado}`}/>
                            <span>{order.estado}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 viewOrderButton d-flex justify-content-center align-items-center">
                      <i className="icon-details"></i>                    
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <span>{order.fecha}</span>
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
  orderStateFilter:state.showOrHideApplyStateFilterReducer.orderStateFilter
})

const mapDispatchToProps=(dispatch)=>{
  return {
    applyStateFilterToOrders:(option)=>dispatch(applyStateFilterToOrders(option))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(OrdersDetails);
