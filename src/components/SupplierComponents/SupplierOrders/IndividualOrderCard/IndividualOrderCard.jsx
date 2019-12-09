import React, { Component } from 'react'
import './IndividualOrderCard.css'

class IndividualOrderCard extends Component {
    render() {
        return (
            <div>
                <div className="row IndividualOrderCard-id-and-state">
                    <div className="col-6">
                        <div className="IndividualOrderCard-id">Pedido #12000</div>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <div className="IndividualOrderCard-state">Ver caso abierto</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10">
                        <div className="IndividualOrderCard-date">Pepito Perez</div>
                        <div className="IndividualOrderCard-date">Bogota - Carrera 68D #24B-48</div>
                        <div className="IndividualOrderCard-date">Torre 1 Apto 707</div>
                        <div className="IndividualOrderCard-productRow">





                            <div className="IndividualOrderCard-product-col d-flex">
                                <div className="IndividualOrderCard-product">
                                    <div className="IndividualOrderCard-product-name d-flex align-items-center">A0785 Rojos Everithi</div>
                                    <div className="IndividualOrderCard-product-variation d-flex align-items-center">Talla 35</div>
                                </div>

                                <div className="IndividualOrderCard-product-separator"/>

                                <div className="IndividualOrderCard-option">
                                    <div className="IndividualOrderCard-option-number">25</div>
                                    <div className="IndividualOrderCard-option-label">unidades</div>
                                </div>
                            </div>

                            <div className="IndividualOrderCard-product-col d-flex">
                                <div className="IndividualOrderCard-product">
                                    <div className="IndividualOrderCard-product-name d-flex align-items-center">A0785 Rojos Everithi</div>
                                    <div className="IndividualOrderCard-product-variation d-flex align-items-center">Talla 35</div>
                                </div>

                                <div className="IndividualOrderCard-product-separator"/>

                                <div className="IndividualOrderCard-option">
                                    <div className="IndividualOrderCard-option-number">25</div>
                                    <div className="IndividualOrderCard-option-label">unidades</div>
                                </div>
                            </div>






                        </div>
                    </div>
                    <div className="col-2 d-flex align-items-center justify-content-center">
                        <i className="iconCheckCircle icon-check-circle centerVertical"></i>
                    </div>
                </div>
                <div className="row IndividualOrderCard-separator"/>
            </div>
        )
    }
}
export default  IndividualOrderCard