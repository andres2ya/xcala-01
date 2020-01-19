import React, { Component } from "react";
import LinkWithDelay from '../../helpers/LinkWithDelay';
import {connect} from 'react-redux';
// import numeral from 'numeral';
import {applyStateFilterToOrders} from '../../ducks/accountDuck/applyFilterToOrdersDuck';
import TabsSelector from "../SupplierComponents/SupplierOrders/TabsSelector/TabsSelector";
import OrderCard from "./OrderCardComponent/OrderCard"

class OrdersDetails extends Component {
  
  state={
    activeFilterByPay:false,
    selectedPay:'Todos',

    activeFilterByCustomer:false,
    selectedCustomer:undefined,

    //NOTE: Estas opciones mejor se estan trrayendo de las props debido a que este filtro se aplica mediante un modal, por lo cual estas opciones se guardan en el estado global del app
    // activeFilterByOrderState:false,
    // selectedOrderState:undefined
  }

  componentWillUnmount=()=>{
    document.getElementById('ownModal').removeAttribute('class')
    document.body.removeAttribute('class')
    document.body.className='myAccountStyle'
    this.props.applyStateFilterToOrders(false,this.props.orderStateFilter)
  }

  
  //NOTE: ANTERIOR FORMA DE FILTRAR...
  // changeOrderDisplay=(tab)=>{
  //   this.setState({
  //     orderDisplay:tab
  //   })
  // }

  // applyFilterByState=(e)=>{
  //   e.preventDefault()
  //   window.scrollTo(0, 0)//Seteando el scroll en las posiciones iniciales para no afectar el modal
  //   this.props.applyStateFilterToOrders(true)
  // }

  // applyFilterByConstumer=(e)=>{
  //   e.preventDefault()
  //   if(e.target.value!=='MostrarTodos'){
  //     this.setState({
  //       filterByConstumer:true,
  //       selectConstumer:e.target.value
  //     })
  //   }else{
  //     this.setState({
  //       filterByConstumer:false
  //     })
  //   }
  // }

  applyFilterByPay=(e)=>{
    this.setState({selectedPay:e.target.id})
  }

  applyFilterByCustomer=(e)=>{
    this.setState({selectedCustomer:e.target.value})
  }

  applyFilterByState=(e)=>{
    window.scrollTo(0, 0)//Seteando el scroll en las posiciones iniciales para no afectar el modal
    this.props.applyStateFilterToOrders(true)
  }

 

  render() {
    console.log(this.props.selectedOrderState)
    console.log(this.props.activeFilterByOrderState)
    var orders=undefined
    var stopRenderCaseIndicator=false

    const vectorPedidos=[
      {idPedido:'0001',ultimoEstado:'enviadoAlProveedor',fecha:'01/01/2020',proveedor:'AFY SAS',image:'https://www.zapatos.es/media/catalog/product/cache/image/650x650/0/0/0000200860916_01_ts.jpg',costo:'50000',ganancia:'20000',precioDeVenta:'70000',cliente:'Pepito',direccionEnvio:'Carrera 68D #24B-48'},
      {idPedido:'0001',ultimoEstado:'enviadoAlProveedor',fecha:'01/01/2020',proveedor:'AFY SAS',image:'https://www.zapatos.es/media/catalog/product/cache/image/650x650/0/0/0000200860916_01_ts.jpg',costo:'50000',ganancia:'20000',precioDeVenta:'70000',cliente:'Pepito',direccionEnvio:'Carrera 68D #24B-48'},
      {idPedido:'0001',ultimoEstado:'enviadoAlProveedor',fecha:'01/01/2020',proveedor:'AFY SAS',image:'https://www.zapatos.es/media/catalog/product/cache/image/650x650/0/0/0000200860916_01_ts.jpg',costo:'50000',ganancia:'20000',precioDeVenta:'70000',cliente:'Pepito',direccionEnvio:'Carrera 68D #24B-48'},
      {idPedido:'0001',ultimoEstado:'enviadoAlProveedor',fecha:'01/01/2020',proveedor:'AFY SAS',image:'https://www.zapatos.es/media/catalog/product/cache/image/650x650/0/0/0000200860916_01_ts.jpg',costo:'50000',ganancia:'20000',precioDeVenta:'70000',cliente:'Pepito',direccionEnvio:'Carrera 68D #24B-48'}
    ]

    {//NOTE: ANTERIOR FORMA DE FILTRAR
    // if(userOrders){
    //   switch (orderDisplay) {
    //     case 'allOrders':
    //       orders=[...userOrders]
    //       break;
    //     case 'cashOnDeliveryOrders':
    //       orders=userOrders.filter(order=>(order.tipoPago==='contraEntrega'))
    //       break;
    //     case 'onlinePayOrders':
    //       orders=userOrders.filter(order=>(order.tipoPago==='online'))
    //       break;
    //     default:
    //       orders=[...userOrders]
    //       break;
    //   }
    // }

    // if(orders!==undefined && orderStateFilter!==undefined){
    //   switch (orderStateFilter) {
    //     case 'enviadoAlProveedor':
    //       // Para leer directamente desde el arreglo de estado de cada pedido utilizar:
    //       // orders=orders.filter(order.estados[order.estados.slice().reverse().findIndex(estado=>estado.activo===true)].estado==='enviadoAlProveedor')
    //       orders=orders.filter(order=>(order.estado==='enviadoAlProveedor'))
    //       break;
    //     case 'enProduccion':
    //       orders=orders.filter(order=>(order.estado==='enProduccion'))
    //       break;
    //     case 'listoParaDespacho':
    //       orders=orders.filter(order=>(order.estado==='listoParaDespacho'))
    //       break;
    //     case 'despachado':
    //       orders=orders.filter(order=>(order.estado==='despachado'))
    //       break;
    //     case 'finalizado':
    //       orders=orders.filter(order=>(order.estado==='finalizado'))
    //       break;
    //     case 'cancelado':
    //       orders=orders.filter(order=>(order.estado==='cancelado'))
    //       break;
    //     case 'allOrders':
    //       orders=[...orders]
    //       break;
    //     default:
    //       orders=[...orders]
    //       break;
    //   }
    // }

    // const {selectConstumer,filterByConstumer}=this.state
    // Funcion para filtrar un arreglo de acuerdo con el resultado de filtro de una arreglo interno del primero: Es decir, 
    // filtrar aquellas ordenes (primera arreglo) cuyo arreglo interno (items) contiene dentro de si el parametro (clienteNombre) que coincide con el valor buscado (selectConstumer)
    // if(orders!==undefined && filterByConstumer===true ){

    //     orders=orders.filter(function(order){
    //       if(order.items.filter((item)=>item.clienteNombre===selectConstumer)[0]!==undefined 
    //       && order.items.filter((item)=>item.clienteNombre===selectConstumer)[0].clienteNombre===selectConstumer){
    //           return(order.items.filter((item)=>item.clienteNombre===selectConstumer)[0].clienteNombre)            
    //         }else{
    //       return null}
    //     })
    // }
    }

    return (
      <div className="pcControlerScreen ">
        <div className="row">
          <p className="accountTitle">Resumen de tus pedidos</p>
        </div>
        {/* <div className="container-fluid tab-orders">
          <div className="row">
            <div 
            onClick={()=>this.changeOrderDisplay('allOrders')}
            className={`col-4 ${orderDisplay==='allOrders'?'col-selector-active':'col-selector'} d-flex justify-content-center align-items-center`}>
              Todos
            </div>
            <div 
            onClick={()=>this.changeOrderDisplay('cashOnDeliveryOrders')}
            className={`col-4 ${orderDisplay==='cashOnDeliveryOrders'?'col-selector-active':'col-selector'}  d-flex justify-content-center align-items-center`}>
              ContraEntrega
            </div>
            <div 
            onClick={()=>this.changeOrderDisplay('onlinePayOrders')}
            className={`col-4 ${orderDisplay==='onlinePayOrders'?'col-selector-active':'col-selector'} d-flex justify-content-center align-items-center`}>
              Pago/online
            </div>
          </div>
        </div> */}
        <TabsSelector namesTabs={['Todos','ContraEntrega','Pago Online']} onClick={this.applyFilterByPay} activeTab={this.state.selectedPay}/>

        <div className="container-fluid filtersContainer">
          <div className="row">
            <div className="col-5 filterByConstumer-col  d-flex justify-content-start align-items-center">
              {/* Inicio Filtro por cliente */}
              {/* TODO: Cargar las opciones con los datos de los nombres de los clientes de los usuarios vendedores */}
              <select onChange={this.applyFilterByCustomer} id="filterByConstumer" defaultValue={'BuscarPorCliente'}>
                <option value="BuscarPorCliente" disabled>Buscar por cliente</option>
                <option value="Pepito">Pepito</option>
                <option value="Julian">Julian</option>
                <option value="MostrarTodos">Mostrar todos</option>
              </select>
              {/* FIn Filtro por cliente */}
            </div>
              {/* Inicio Filtro por estado */}
            <div className="col-7 col-stateFilter d-flex justify-content-end align-items-center">
              <div
              onClick={this.applyFilterByState}
              className="filterBox d-flex justify-content-end align-items-center">
                Filtrar por estado <i className="icon-filterBox icon-filter centerVerticalAndHorizontal"/>
              </div>
            </div>
              {/* Fin Filtro por estado */}
          </div>
        </div>
        
        {/* TODO: Diseñar nueva card for seller orders ... */}
        

        {vectorPedidos.map(pedido=>
          <OrderCard idPedido={pedido.idPedido} ultimoEstado={pedido.ultimoEstado} caso={false} fecha={pedido.fecha} proveedor={pedido.proveedor} 
          imagen={pedido.image} costo={pedido.costo} ganancia={pedido.ganancia} precioDeVenta={pedido.precioDeVenta} cliente={pedido.cliente} direccionEnvio={pedido.direccionEnvio}/>  
        )}

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

                  <div className="col-3 d-flex justify-content-center align-items-center">
                    
                    {order.items.map((item,index)=>(
                      (()=>{
                        if(item.case!==undefined && stopRenderCaseIndicator===false){
                          stopRenderCaseIndicator=true
                          return (
                            <div key={index} className="row">
                              <div className="col-12 orderIdAndDateCard">
                                <div className="openCaseIndicatorBox ">
                                  Caso...
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          stopRenderCaseIndicator=false 
                          return null
                        }
                      })()
                    ))}

                  </div>
                </div>


                <div className="row">
                  <div className="col-9 dateCol">
                    <span>Realizado el {order.fecha}</span>
                  </div>
                  <div className="col-3"/>
                </div>

                <div className="row">
                  <div className="col-9 d-flex">
                    <div className="totalCostCol">
                      {/* <div className="totalCostNumberCard">{numeral(order.costoTotal).format('$0,0')}</div> */}
                      <div className="totalCostNumberCard">$1,000,000</div>
                      
                      <div className="totalCostLabelCard">Costo total</div>
                    </div>
                    <div className="totalUtilityCol">
                      {/* <div className="totalUtilityNumberCard">{numeral(order.gananciaTotal).format('$0,0')}</div> */}
                      <div className="totalUtilityNumberCard">$1,000,000</div>
                      <div className="totalUtilityLabelCard">Ganancia total</div>
                    </div>
                  </div>
                    

                  <div className="col-3 viewOrderButton d-flex justify-content-center align-items-center">
                      <i className="icon-detailswithoutcircle centerVertical"></i>                    
                  </div>
                </div>


            </div>
            </LinkWithDelay>
          </div>
        ))

        :

        <div>
          <p className="noOrdersMsg">Aun no has realizado tu primer pedido.</p>
          <div className="row lookForProductsBtn d-flex justify-content-center align-items-center">
            <button >Ver productos</button>
          </div>
        </div>
        }        
      </div>
    );
  }
}

const mapStateToProps=(state)=>({
  //NOTE: Este es el que me devuelve el estado seleccionado desde el modal del filtro por estados
  activeFilterByOrderState:state.showOrHideApplyStateFilterReducer.activeFilterByOrderState,
  selectedOrderState:state.showOrHideApplyStateFilterReducer.selectedOrderState,
})

const mapDispatchToProps=(dispatch)=>{
  return {
    applyStateFilterToOrders:(option)=>dispatch(applyStateFilterToOrders(option))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(OrdersDetails);
