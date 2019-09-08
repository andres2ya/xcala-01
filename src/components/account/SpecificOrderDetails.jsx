import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import numeral from 'numeral';
import Hammer from 'hammerjs';
import {openModalTrackOrder} from '../../ducks/accountDuck/trackOrderDuck';

class SpecificOrderDetails extends Component {
  state={
      panUpTotalOrderBox:false,
      panDownTotalOrderBox:false
  }


  componentDidMount=()=>{
      /**Integraccion HammerJS */
    // 1)  Seleccionando el elemento al cual se le aplicara el listener de hammer
      var totalOrderBox=document.getElementById('totalOrderBox');
    // 2)  Creando una instancia de hammer
      var totalOrderBoxHammer= new Hammer(totalOrderBox)
    // 3)  Bloqueando el vertical scrolling cuando se toca el elementoByid seleccionado
      totalOrderBoxHammer.get('pan').set({direction:Hammer.DIRECTION_ALL})
    // 4)  Creando el listener de hammer al elemento by id
      totalOrderBoxHammer.on('panup pandown',(e)=>this.panHammer(e))
  }

  componentWillUnmount=()=>{
    document.getElementById('ownModal').removeAttribute('class')
    document.body.removeAttribute('class')
    document.body.className='myAccountStyle'
    this.props.openModalTrackOrder(false);
  }

  panHammer=(e)=>{
      const {panUpTotalOrderBox,panDownTotalOrderBox}=this.state
      if(e.type==='panup' && panUpTotalOrderBox===false){
        this.setState({
            panUpTotalOrderBox:true,
            panDownTotalOrderBox:false
        })
      }

      if(e.type==='pandown' && panDownTotalOrderBox===false){
        this.setState({
            panDownTotalOrderBox:true,
            panUpTotalOrderBox:false
        })
      }
  }

  trackOrder=(e,idTrackOrderData)=>{
    e.preventDefault()
    window.scrollTo(0, 0)//Seteando el scroll en las posiciones iniciales para no afectar el modal
    this.props.openModalTrackOrder(true,idTrackOrderData)
  }

  render() {
    var orderId = this.props.match.params.id;
    const {userOrders}=this.props
    var orderIdData=undefined
    if(userOrders){
        orderIdData=userOrders.filter(order=>order.id===orderId)
    }
    

    const {panUpTotalOrderBox}=this.state
    return (
      <div className="SpecificOrderContainer">
        <div className="row numberOrderTitle">
          <div className="col-10 d-flex align-items-center">
            Pedido #{orderIdData ? orderIdData[0].numeroPedido : null}
          </div>
          <div className="col-2 d-flex align-items-center">
            <Link to="/order-details">
              <i className="backBtnGeneral icon-arrow-circle-left centerVertical"/>
            </Link>
          </div>
        </div>
        {/* <div className="row paragraphOrderDetails d-flex align-items-center">
          <div className="col-10">
            {orderIdData ? orderIdData[0].fecha : null}.
          </div>
        </div> */}
        <div className="row">
          <div className="col-12 d-flex align-items-center specificOrderStateCard">
            <div className={`specificOrderStateCircle ${orderIdData ? orderIdData[0].estado: null}`}/>
            <div className="boldText">
              {orderIdData ? orderIdData[0].estado : null}: {orderIdData ? orderIdData[0].fecha : null}.
            </div>
          </div>
        </div>
        <div className="row supplierName">
          <div className="col-12">
            <span className="boldText">Proveedor:</span>{orderIdData ? orderIdData[0].items[0].proveedor : null}
          </div>
        </div>

        <div className="orderItemsDetailsBox">
          <div className="row orderItemsDetailsTitles">
            <div className="col-5 d-flex justify-content-center align-items-center">
              Producto
            </div>
            <div className="col-7 d-flex justify-content-center align-items-center">
              Datos
            </div>
          </div>




          <div className="row dividerSpecificOrderDetails"/>
            <div className="col-12">
              <div className={`${panUpTotalOrderBox?'container-listItemsOfOrderOn':'container-listItemsOfOrderOff'}`}>
              {orderIdData?orderIdData[0].items.map(item=>(
                // TODO:  key debe ser remplazada por un id de verdad.
                <div key={item.idProducto} className="row orderItemsDetailsContent">
                <div className="col-5">
                    <div className="row d-flex justify-content-center align-items-center">
                        <span className="boldText">{item.nombreProducto}</span>
                    </div>
                    <div className="row d-flex justify-content-center align-items-center">
                        <img width="100" src={item.fotoProducto} alt="fotoProducto"/>
                    </div>
                </div>
                <div className="col-7">
                    <div className="row">
                        <span className="boldText">Costo:</span>
                        {numeral(item.precioProducto).format('$0,0')}
                    </div>
                    <div className="row">
                        <span className="boldText">Precio de venta:</span>
                        {numeral(item.precioVenta).format('$0,0')}
                    </div>
                    <div className="row">
                        <span className="boldText">Ganancia:</span>
                        {numeral(item.gananciaVenta).format('$0,0')}
                    </div>
                    <div className="row">
                        <span className="boldText">Cliente:</span>
                        {item.clienteNombre}
                    </div>
                    <div className="row">
                        <span className="boldText">Direccion de envio:</span>
                        {item.clienteDireccion}
                    </div>
                </div>
              </div>
              ))
              :
              null}
            </div>
          </div>
        </div>





        <footer className="sticky-footer">
          <i className={`${panUpTotalOrderBox?'swipeDownIcon icon-down-open-big':'swipeUpIcon icon-up-open-big'} d-flex justify-content-center align-items-end`}></i>
          <div id="totalOrderBox" className={`${panUpTotalOrderBox?'totalOrderBoxOn':'totalOrderBoxOff'}`}>
            <div id="totalOrderBoxContent" className={`row ${panUpTotalOrderBox?'totalOrderBoxContentOn':'totalOrderBoxContentOff'}`}>
               {panUpTotalOrderBox?
               <div className="col-12">
                <div id="totalOrderTitle" className="totalOrderTitle">Total pedido</div>

                <div className="row yourIncome">
                    <div className="col-7 d-flex align-items-center">
                        <div className="totalLabelSubtotal">Tu ingreso total:</div>   
                    </div>
                    <div className="col-5 d-flex align-items-center">
                        <div className="totalValueSubtotal">{orderIdData?numeral(orderIdData[0].ingresoTotal).format('$0,0'):null}</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-7">
                        <div className="totalLabel">Costo productos:</div>   
                    </div>
                    <div className="col-5">
                        <div className="totalValue">-{orderIdData?numeral(orderIdData[0].costoProductos).format('$0,0'):null}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7">
                        <div className="totalLabel">Costo envio:</div>   
                    </div>
                    <div className="col-5">
                        <div className="totalValue">-{orderIdData ?numeral(orderIdData[0].costoEnvios).format('$0,0'):null}</div>
                    </div>
                </div>
                <div className="row totalCostSubTotal">
                    <div className="col-7 d-flex align-items-center">
                        <div className="totalLabelSubtotal">Costo total:</div>   
                    </div>
                    <div className="col-5 d-flex align-items-center">
                        <div className="totalValueSubtotal">-{orderIdData ?numeral(orderIdData[0].costoTotal).format('$0,0'):null}</div>
                    </div>
                </div>

                <div className="row yourUtility">
                    <div className="col-7 d-flex align-items-center">
                        <div className="totalLabelSubtotal">Tu ganancia total:</div>   
                    </div>
                    <div className="col-5 d-flex align-items-center">
                        <div className="totalValueSubtotal">{orderIdData ?numeral(orderIdData[0].gananciaTotal).format('$0,0'):null}</div>
                    </div>
                </div>

                <div className="row specificOrderOptionsBtn">
                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <button onClick={orderIdData?(e)=>this.trackOrder(e,orderIdData):null}>Rastrear pedido</button>
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <button>Abrir caso</button>
                    </div>
                </div>
               </div>
                :
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <div id="orderDetailsTitlePanUp" className="row totalOrderTitle">Detalles del pedido</div>
                </div>
               } 
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
const mapStateToProps=(state)=>({
    userOrders:state.firebase.profile.pedidos
})
const mapDispatchToProps=(dispatch)=>{
  return{
    openModalTrackOrder:(option,idTrackOrderData)=>dispatch(openModalTrackOrder(option,idTrackOrderData))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SpecificOrderDetails);