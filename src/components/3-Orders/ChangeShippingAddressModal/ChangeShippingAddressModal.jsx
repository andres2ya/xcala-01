import React, { Component } from 'react'
import './ChangeShippingAddressModal.css'

import numeral from 'numeral';
import HeaderCaseSystem from './../../4-CaseSystem/SellerCaseStyleComponents/Header/HeaderCaseSystem'



export default class ChangeShippingAddressModal extends Component {
    componentDidMount=()=>{
        console.log('Se cargó el ChangeShippingAddressModal con idPedido=',this.props.idPedido)
    }
    componentWillUnmount=()=>{
        console.log('Se desmonto el ChangeShippingAddressModal con idPedido=',this.props.idPedido)
    }
    render() {
        const {user,pedidoObjeto,toggleModal,idPedido,direccionVendedor,carryOnWithChangeShippingAddress}=this.props
        return (
            <div className="container modalOpenCaseInsideCard">
                    <HeaderCaseSystem  idPedido={idPedido} subtitulo={""} parrafo={`¿Estas seguro de querer recibir este pedido en tu direccion: ${user.direccionResidencia} ?`} toggleModal={toggleModal}/>

                    <div className="row">
                        <div className="col-12">
                            <div className="resumenPedidoACancelar">
                            {/* <div><strong>Resumen del pedido</strong></div> */}
                            <div><strong>Fecha creacion:</strong> {pedidoObjeto.fecha}</div>
                            <div><strong>Cliente:</strong> {pedidoObjeto.idCliente}</div>
                            {/* <div><strong>Direccion actual:</strong> {pedidoObjeto.direccionCliente}</div>
                            <div><strong>Nueva direccion:</strong> {direccionVendedor}</div> */}
                            <div><strong>Producto:</strong> {pedidoObjeto.idProducto}</div>
                            <div><strong>Precio de venta:</strong> {numeral(pedidoObjeto.precioVenta).format('$0,0')}</div>
                            <div><strong>Medio de pago:</strong> {pedidoObjeto.tipoPago}</div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="cancelOrderModal-btns col-12 d-flex justify-content-between aling-items-center">
                            <button className="cancelOrderModal-button-noCancel" onClick={()=>toggleModal(null)}>No cambiar</button>
                            <button className="cancelOrderModal-button-cancel" onClick={()=>carryOnWithChangeShippingAddress(idPedido,direccionVendedor)}>Cambiar direccion</button>
                        </div>
                    </div>
                </div>
        )
    }
}
