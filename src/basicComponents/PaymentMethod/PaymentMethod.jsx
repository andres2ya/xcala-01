import React, { Component } from 'react'
import './PaymentMethod.css'

export default class PaymentMethod extends Component {
    render() {
        const {paymentMethodSelected}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="PaymentMethod d-flex align-items-center">
                            <div>{`Pago ${paymentMethodSelected}`}</div>
                            <div className="PaymentMethod_icon"><i className="icon-pencilonly"/></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
