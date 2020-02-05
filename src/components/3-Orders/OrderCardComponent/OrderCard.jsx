import React, { Component } from 'react'
import numeral from 'numeral';
import './OrderCard.css'
import {truncateLongString} from './../../../helpers/truncateLongStrings' //NOTE: funcion que corta despues de un terminado numero de caracteres y coloca ... al final.

export default class OrderCard extends Component {
  
  render() {
    const {nombreProveedor,pedidoObjeto,idProducto,idPedido,posibleCancelar,cambioLaDireccion,tipoPago,estado,fecha,idProveedor,imagenProducto,costo,ganancia,precioVenta,idCliente,direccionCliente,tiempoCreacion}=this.props
    console.log(idProducto)
    const {
      function_cancelOrder,
      function_changeShippingAddress,
      function_openCase,
      function_showItemCaseDetails}=this.props
    return (
    <div key={idPedido} className="container-fluid OrderCardContainer">
      
      {/* NOTE: Fila nombreProveedor y ultimoEstado */}
      <div className="row">
        <div className="col-12">
          <div className="nombreProveedor">{'Vendido por '}{nombreProveedor?nombreProveedor.truncateLongString(20):'...'}</div>
          <div className={`d-flex align-items-center orderCardStateLabel orderCard-${estado==='Caso abierto'?'Caso-abierto':estado}`}>
            <div>{estado}</div>
            <div className={`OrderCard-circleState OrderCard-circleState-${estado==='Caso abierto'?'Caso-abierto':estado}`}/>
          </div>
        </div>
      </div>


      {/* NOTE: Fila imagen y datosPedido */}
      <div className="row orderDescriptionData">
        <div className="col-12 d-flex align-items-center justify-content-center">
            <img className="imagenProducto" src={imagenProducto} alt=""/>
            <div className="rowLabelsData">
              {/* NOTE: Nombre cliente, fecha pedido, nombre producto */}
              <div>
                  {/* NOTE: "string.truncateLongString(characters)" Funcion para que pasados un determinado numero de caracteres, se ponga automaticamente ... */}
                  <div className="nombreCliente">{idCliente?idCliente.truncateLongString(20):'...'}</div>
                  <div className="fechaPedido">{'Realizado el '}{fecha}</div>
                  <div className="nombreProducto">{idProducto?idProducto.truncateLongString(100):'...'}</div>
              </div>
              {/* NOTE: Tu ganancia, Precio de venta */}
              <div className="d-flex">
                  <div className="tuGanancia">
                    <div className="tuGananciaValor">{numeral(ganancia).format('$0,0')}</div>
                    <div className="tuGananciaLabel">Tu ganancia</div>
                  </div>
                  <div className="separadorGanancia-PrecioVenta-left"></div>
                  <div className="separadorGanancia-PrecioVenta-right"></div>
                  <div className="precioVenta">
                    <div className="precioVentaValor">{numeral(precioVenta).format('$0,0')}</div>
                    <div className="precioVentaLabel">Precio venta</div>
                  </div>
              </div>
          </div>
        </div>
      </div>


      {/* NOTE: Fila boton */}
      <div className="row OrderCard-botones-row">
        <div className="col-12 d-flex justify-content-center">
          {(function RenderBotones(tipoPago,estado,posibleCancelar,cambioLaDireccion,tiempoCreacion) {        
            switch (tipoPago) {
              case 'Pago Online'://NOTE: Pedidos con pago Online
                if(estado==='Despachado'){
                  return(
                    <div className="rowBotonOpcionPedido">
                        <button onClick={(e)=>function_openCase(e,idPedido)}>Abrir caso</button>
                    </div>
                  )
                }else if(estado==='Caso abierto'){
                  return(
                    <div className="rowBotonOpcionPedido">
                        <button onClick={(e)=>function_showItemCaseDetails(e,idPedido,pedidoObjeto)}>Ver caso</button>
                    </div>
                  )
                }
                break;
                
              case 'Contra entrega'://NOTE: Pedidos con pago contra entrega
                if(estado==='Pendiente' && posibleCancelar==='true'){
                  return(
                    <div className="rowBotonOpcionPedidoCancelar">
                        <button onClick={(e)=>function_cancelOrder(e,idPedido,tiempoCreacion,pedidoObjeto)}>Cancelar</button>
                    </div>
                  )
                }else if(estado==='Pendiente' && posibleCancelar==='false' && cambioLaDireccion==='false'){
                  return(
                    <div className="rowBotonOpcionPedidoCancelar">
                        <button  onClick={(e)=>function_changeShippingAddress(e,idPedido,'direccionVendedor',pedidoObjeto)}>Enviar a mi direccion</button>
                    </div>
                  )
                }else if(estado==='Pendiente' && cambioLaDireccion==='true' ){
                  return(
                    <div className="rowBotonOpcionPedido">
                        <button disabled >Se enviara a tu direccion</button>
                    </div>
                  )
                }else if(estado==='Despachado'){
                  return(
                    <div className="rowBotonOpcionPedido">
                        <button onClick={(e)=>function_openCase(e,idPedido)}>Abrir caso</button>
                    </div>
                  )
                }else if(estado==='Caso abierto'){
                  return(
                    <div className="rowBotonOpcionPedido">
                        <button className="botonOpcionPedido" onClick={(e)=>function_showItemCaseDetails(e,idPedido,pedidoObjeto)}>Ver caso</button>
                    </div>
                  )
                }else if(estado==='Cancelado'){
                  return(
                    <div className="rowBotonOpcionPedidoCancelar">
                        <button disabled>Cancelado</button>
                    </div>
                  )
                }
                break;
              default:
                break;
            }
          }(tipoPago,estado,posibleCancelar,cambioLaDireccion,tiempoCreacion))}
        </div>
      </div>
    </div>

    )
  }
}