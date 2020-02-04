import React, { Component } from 'react'
import numeral from 'numeral';
import './OrderCard.css'
import LinkWithDelay from '../../../helpers/LinkWithDelay'

export default class OrderCard extends Component {
  
  render() {
    const {pedidoObjeto,idProducto,idPedido,posibleCancelar,cambioLaDireccion,tipoPago,estado,fecha,idProveedor,imagenProducto,costo,ganancia,precioVenta,idCliente,direccionCliente,tiempoCreacion}=this.props
    const {
      function_trackOrder,
      function_cancelOrder,
      function_changeShippingAddress,
      function_openCase,
      function_showItemCaseDetails}=this.props
    
    return (
    <div key={idPedido} className="container-fluid orderCard">
      
      {/* NOTE: Fila idPeiddo y ultimoEstado */}
      <div className="row">
        <div className="col-12 d-flex">
          <div className="orderIdCard-">{'Pedido:'} {idPedido}</div>
          <div className="orderStateCard-">
            <span>o</span>
            <span>{estado}</span>
          </div>
        </div>
      </div>

      {/* NOTE: Fila fecha y proveedor */}
      <div className="row">
        <div className="col-12 d-flex">
          <div className="orderDate">{'Realizado el '} {fecha}</div>
          <div className="orderSupplier">{'Vendido por '} {'idProveedor'}</div>
        </div>
      </div>

      {/* NOTE: Fila imagen y datosPedido */}
      <div className="row">
        <div className="col-5 justify-content-center align-items-center">
    <div className="d-flex justify-content-center">{idProducto}</div>
          <div className="d-flex justify-content-center align-items-center">
            <img width='100' src={imagenProducto} alt=""/>
          </div>
        </div>
        <div className="col-7">
          <div className="orderCost">{'Costo:'} {numeral(costo).format('$0,0')}</div>
          <div className="orderEarn">{'Ganancia:'} {numeral(ganancia).format('$0,0')}</div>
          <div className="orderSalePrice">{'Precio venta:'} {numeral(precioVenta).format('$0,0')}</div>
          <div className="orderCustomer">{'Cliente: '} {idCliente}</div>
          <div className="orderCustomerAddress">{'Direccion:'} {direccionCliente}</div>
        </div>
      </div>




      {/* NOTE: Funcion autoejecutable para renderizar botones de los pedidos de acuerdo con su estado. */}
      {(function RenderBotones(tipoPago,estado,posibleCancelar,cambioLaDireccion,tiempoCreacion) {
          
          switch (tipoPago) {
            case 'Pago Online'://NOTE: Pedidos con pago Online
              if(estado==='Pendiente'){
                return(
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <button className="uniqueButton" onClick={(e)=>function_trackOrder(e,idPedido)}>Rastrear</button>
                    </div>
                  </div>
                )
              }else if(estado==='Despachado'){
                return(
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <button className="uniqueButton" onClick={(e)=>function_openCase(e,idPedido)}>Abrir caso</button>
                    </div>
                  </div>
                )
              }else if(estado==='Caso abierto'){
                return(
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <button className="uniqueButton" onClick={(e)=>function_showItemCaseDetails(e,idPedido,pedidoObjeto)}>Ver caso</button>
                    </div>
                  </div>
                )
              }
              break;


            case 'ContraEntrega'://NOTE: Pedidos con pago contra entrega
              if(estado==='Pendiente' && posibleCancelar==='true'){
                return(
                  <div className="row">
                    <div className="col-6 d-flex justify-content-center align-items-center">
                      <button className="buttonOne" onClick={(e)=>function_trackOrder(e,idPedido)}>Rastrear</button>
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center">
                      <button className="buttonTwo" onClick={(e)=>function_cancelOrder(e,idPedido,tiempoCreacion,pedidoObjeto)}>Cancelar</button>
                    </div>
                  </div>
                )

              }else if(estado==='Pendiente' && posibleCancelar==='false' && cambioLaDireccion==='false'){
                return(
                  <div className="row">
                    <div className="col-6 d-flex justify-content-center align-items-center">
                      <button className="buttonOne" onClick={(e)=>function_trackOrder(e,idPedido)}>Rastrear</button>
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center">
                      <button className="buttonTwo" onClick={(e)=>function_changeShippingAddress(e,idPedido,'direccionVendedor',pedidoObjeto)}>Enviar a mi direccion</button>
                    </div>
                  </div>
                )
               
              }else if(estado==='Pendiente' && cambioLaDireccion==='true' ){
                return(
                  <div className="row">
                    <div className="col-6 d-flex justify-content-center align-items-center">
                      <button className="buttonOne" onClick={(e)=>function_trackOrder(e,idPedido)}>Rastrear</button>
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center">
                      <button disabled className="buttonTwo">Se enviara a tu direccion</button>
                    </div>
                  </div>
                )

              }else if(estado==='Despachado'){
                return(
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <button className="uniqueButton" onClick={(e)=>function_openCase(e,idPedido)}>Abrir caso</button>
                    </div>
                  </div>
                )

              }else if(estado==='Caso abierto'){
                return(
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <button className="uniqueButton" onClick={(e)=>function_showItemCaseDetails(e,idPedido,pedidoObjeto)}>Ver caso</button>
                    </div>
                  </div>
                )

              }else if(estado==='Cancelado'){
                return(
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <button disabled className="uniqueButton">Cancelado</button>
                    </div>
                  </div>
                )
              }
              break;
          
            default:
              break;
          }

          }(tipoPago,estado,posibleCancelar,cambioLaDireccion,tiempoCreacion))}

    </div>

    )
  }
}