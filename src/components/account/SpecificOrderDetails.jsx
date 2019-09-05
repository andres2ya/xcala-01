import React, { Component } from "react";
import {connect} from 'react-redux';
import numeral from 'numeral';

class SpecificOrderDetails extends Component {
  render() {
    var orderId = this.props.match.params.id;
    const {userOrders}=this.props
    var orderIdData=undefined
    if(userOrders){
        orderIdData=userOrders.filter(order=>order.id===orderId)
    }
    


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
            <div className="row orderItemsDetailsContent">
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
          <div className="totalOrderBoxOff d-flex justify-content-center align-items-center">
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