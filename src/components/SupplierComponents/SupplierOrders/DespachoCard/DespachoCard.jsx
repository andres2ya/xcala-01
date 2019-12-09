import React, { Component } from 'react'
import './DespachoCard.css'

class DespachoCard extends Component {
    render() {
        return (
            <div className="col-12">
                <div className="row">
                    <div className="col-6">
                        <div className="DespachoCard-code">Despacho DCHOA0001</div>
                        <div className="DespachoCard-quantity">81</div>
                        <div className="DespachoCard-quantity-label">pedidos despachados</div>
                    </div>
                    <div className="col-6">
                        <div className="DespachoCard-buttom DespachoCard-buttom-despachoOrders">Ver pedidos del despacho</div>
                        <div className="DespachoCard-buttom DespachoCard-buttom-tickets-ready">Descargar rotulos de envio</div>
                        <div className="DespachoCard-buttom DespachoCard-buttom-confirmDespacho-ready">Confirmar despacho</div>
                    </div>
                </div>
                <div className="row DespachoCard-divider"></div>
            </div>
        )
    }
}
export default  DespachoCard