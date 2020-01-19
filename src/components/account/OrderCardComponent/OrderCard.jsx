import React, { Component } from 'react'
import numeral from 'numeral';
import './OrderCard.css'

export default class OrderCard extends Component {
  render() {
    const {idPedido,ultimoEstado,caso,fecha,proveedor,imagen,costo,ganancia,precioDeVenta,cliente,direccionEnvio}=this.props
    return (
    <div key={idPedido} className="container-fluid orderCard">
      
      {/* NOTE: Fila idPeiddo y ultimoEstado */}
      <div className="row">
        <div className="col-12 d-flex">
          <div className="orderIdCard-">{'Pedido:'} {idPedido}</div>
          <div className="orderStateCard-">
            <span>o</span>
            <span>{ultimoEstado}</span>
          </div>
        </div>
      </div>

      {/* NOTE: Fila fecha y proveedor */}
      <div className="row">
        <div className="col-12 d-flex">
          <div className="orderDate">{'Realizado el '} {fecha}</div>
          <div className="orderSupplier">{'Vendido por '} {proveedor}</div>
        </div>
      </div>

      {/* NOTE: Fila imagen y datosPedido */}
      <div className="row">
        <div className="col-5 d-flex justify-content-center align-items-center">
          <img width='100' src={imagen} alt=""/>
        </div>
        <div className="col-7">
          <div className="orderCost">{'Costo:'} {numeral(costo).format('$0,0')}</div>
          <div className="orderEarn">{'Ganancia:'} {numeral(ganancia).format('$0,0')}</div>
          <div className="orderSalePrice">{'Precio venta:'} {numeral(precioDeVenta).format('$0,0')}</div>
          <div className="orderCustomer">{'Cliente: '} {cliente}</div>
          <div className="orderCustomerAddress">{'Direccion:'} {direccionEnvio}</div>
        </div>
      </div>

      {/* NOTE: Fila botones*/}
      <div className="row">
        <div className="col-6 d-flex justify-content-center align-items-center">
          <button className="buttonOne">Rastrear</button>
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <button className="buttonTwo">Cancelar</button>
        </div>
        <div className="col-12 d-flex justify-content-center align-items-center">
          <button className="uniqueButton">Ver caso</button>
        </div>
      </div>
    </div>

    )
  }
}