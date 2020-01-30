import React, { Component } from 'react'
import './HeaderCaseSystem.css'

export default class HeaderCaseSystem extends Component {
    
    render() {
        const {idPedido,subtitulo,parrafo,toggleModal}=this.props
        return (
            <div className="row headerModalContent">
                <div className="col-12">
                    <div className="row relatedOrderIdAndBackArrow">
                        <div className="col-8 numberOrderTitleModal">
                            Pedido
                            <div className="orderIdModal">{idPedido}</div>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                        <i
                            onClick={() => toggleModal(null)}
                            className="backOrderDetails icon-arrow-circle-left centerVertical"
                        />
                        </div>
                    </div>

                    <div className="row paragraphOrderDetailsModal">
                        <div className="col-12">
                            <span>{`${subtitulo}`}</span>
                            <span>{parrafo}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
