import React, { Component } from 'react'
import './CancelOrderModal.css'

import numeral from 'numeral';
import HeaderCaseSystem from './../CasesSystem/SellerCaseStyleComponents/Header/HeaderCaseSystem'

export default class CancelOrderModal extends Component {
    componentDidMount=()=>{
        console.log('Se cargó el CancelOrderModal con idPedido=',this.props.idPedido)
    }
    componentWillUnmount=()=>{
        console.log('Se desmonto el CancelOrderModal con idPedido=',this.props.idPedido)
    }
    render() {
        const {pedidoObjeto,idPedido,tiempoCreacion,toggleModal,carryOnWithCancelOrder}=this.props
            return (
                <div className="container modalOpenCaseInsideCard">
                    <HeaderCaseSystem  idPedido={idPedido} subtitulo={""} parrafo={'¿Estas seguro de cancelar este pedido?'} toggleModal={toggleModal}/>
                    
                    <div className="row">
                        <div className="col-12">
                            <div className="resumenPedidoACancelar">
                            {/* <div><strong>Resumen del pedido</strong></div> */}
                            <div><strong>Fecha creacion:</strong> {pedidoObjeto.fecha}</div>
                            <div><strong>Cliente:</strong> {pedidoObjeto.idCliente}</div>
                            <div><strong>Producto:</strong> {pedidoObjeto.idProducto}</div>
                            <div><strong>Precio de venta:</strong> {numeral(pedidoObjeto.precioVenta).format('$0,0')}</div>
                            <div><strong>Medio de pago:</strong> {pedidoObjeto.tipoPago}</div>
                            </div>
                        </div>
                    </div>
                    

                    <div className="row">
                        <div className="cancelOrderModal-btns col-12 d-flex justify-content-between aling-items-center">
                            <button className="cancelOrderModal-button-noCancel" onClick={()=>toggleModal(null)}>No cancelar</button>
                            <button className="cancelOrderModal-button-cancel" onClick={()=>carryOnWithCancelOrder(idPedido,tiempoCreacion)}>Cancelar pedido</button>
                        </div>
                    </div>
                </div>
            )
    }
}