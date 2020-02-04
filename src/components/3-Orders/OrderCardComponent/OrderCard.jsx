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
    <div key={idPedido} className="container-fluid OrderCardContainer">
      
      {/* NOTE: Fila idPeiddo y ultimoEstado */}
      <div className="row">
        <div className="col-12 d-flex">
          <div className={`orderCardStateLabel orderCard-${estado==='Caso abierto'?'Caso-abierto':estado}`}>{estado}</div>
          {/* <div className="orderStateCard-">
            <span>o</span>
            <span>{estado}</span>
          </div> */}
        </div>
      </div>

      {/* NOTE: Fila fecha y proveedor */}
      <div className="row upperLabels">
        <div className="col-12 d-flex">
          <div className="orderLabelData">{'Realizado el '}{fecha}</div>
          <div className="orderLabelData">{'Vendido por '}{'idProveedor'}</div>
        </div>
      </div>

      {/* NOTE: Fila imagen y datosPedido */}
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
          {/* <div className="col-5 d-flex justify-content-center align-items-center"> */}
            {/* <div className="d-flex justify-content-center">{'idProducto'}</div> */}
            {/* <div className="d-flex justify-content-center align-items-center"> */}
              <img width='120' src={imagenProducto} alt=""/>
            {/* </div> */}
          {/* </div> */}
          {/* <div className="col-7 d-flex justify-content-center align-items-center"> */}
            <div className="rowLabelsData">
              <div className="orderLabelData"><span>{'Costo:'}</span> {numeral(costo).format('$0,0')}</div>
              <div className="orderLabelData"><span>{'Ganancia:'}</span> {numeral(ganancia).format('$0,0')}</div>
              <div className="orderLabelData"><span>{'Precio venta:'}</span> {numeral(precioVenta).format('$0,0')}</div>
              <div className="orderLabelData"><span>{'Cliente: '}</span> {idCliente}</div>
            </div>
            
            {/* <div className="orderLabelData">{'Direccion:'} {direccionCliente}</div> */}
          {/* </div> */}
        </div>
      </div>

      {(function RenderBotones(tipoPago,estado,posibleCancelar,cambioLaDireccion,tiempoCreacion) {
          
          switch (tipoPago) {
            case 'Pago Online'://NOTE: Pedidos con pago Online
              if(estado==='Despachado'){
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
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <button className="uniqueButton" onClick={(e)=>function_cancelOrder(e,idPedido,tiempoCreacion,pedidoObjeto)}>Cancelar</button>
                    </div>
                  </div>
                )
              }else if(estado==='Pendiente' && posibleCancelar==='false' && cambioLaDireccion==='false'){
                return(
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <button className="uniqueButton" onClick={(e)=>function_changeShippingAddress(e,idPedido,'direccionVendedor',pedidoObjeto)}>Enviar a mi direccion</button>
                    </div>
                  </div>
                )
              }else if(estado==='Pendiente' && cambioLaDireccion==='true' ){
                return(
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <button disabled className="uniqueButton">Se enviara a tu direccion</button>
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


      {/* NOTE: Funcion autoejecutable para renderizar botones de los pedidos de acuerdo con su estado. */}
      {/* {(function RenderBotones(tipoPago,estado,posibleCancelar,cambioLaDireccion,tiempoCreacion) {
          
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

          }(tipoPago,estado,posibleCancelar,cambioLaDireccion,tiempoCreacion))} */}

    </div>

    )
  }
}