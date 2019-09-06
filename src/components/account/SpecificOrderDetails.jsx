import React, { Component } from "react";
import {connect} from 'react-redux';
import numeral from 'numeral';
import Hammer from 'hammerjs';

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

  panHammer=(e)=>{
      const {panUpTotalOrderBox,panDownTotalOrderBox}=this.state
      if(e.type==='panup' && panUpTotalOrderBox===false){
        this.setState({
            panUpTotalOrderBox:true,
            panDownTotalOrderBox:false
        })
        console.log(e.type)
      }

      if(e.type==='pandown' && panDownTotalOrderBox===false){
        this.setState({
            panDownTotalOrderBox:true,
            panUpTotalOrderBox:false
        })
        console.log(e.type)
      }
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
      <div className="container">
        <div className="row numberOrderTitle">
          Pedido #{orderIdData ? orderIdData[0].numeroPedido : null}
        </div>
        <div className="row paragraphOrderDetails d-flex align-items-center">
          fue realizado el {orderIdData ? orderIdData[0].fecha : null} y esta
          actualmente: <span className={`d-flex justify-content-center align-items-center orderIdCard-SpecificOrder ${orderIdData ? orderIdData[0].estado: null}`}>{orderIdData ? orderIdData[0].estado : null}.</span>
        </div>
        <div className="row supplierName">
        <span className="boldText">Proveedor:</span>{orderIdData ? orderIdData[0].items[0].proveedor : null}
        </div>

        <div className="orderItemsDetailsBox">
          <div className="row orderItemsDetailsTitles">
            <div className="col-6 d-flex justify-content-center align-items-center">
              Producto
            </div>
            <div className="col-6 d-flex justify-content-center align-items-center">
              Datos
            </div>
          </div>




          <div className="row dividerSpecificOrderDetails"/>
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





        <footer className="sticky-footer">
          <i className="swipeUpIcon icon-up-open-big d-flex justify-content-center align-items-end"></i>
          <div id="totalOrderBox" className={`${panUpTotalOrderBox?'totalOrderBoxOn':'totalOrderBoxOff'} d-flex justify-content-center align-items-center`}>
            <span className="totalOrderTitle">Detalles del pedido</span>
          </div>
        </footer>
      </div>
    );
  }
}
const mapStateToProps=(state)=>({
    userOrders:state.firebase.profile.pedidos
})
export default connect(mapStateToProps,null)(SpecificOrderDetails);