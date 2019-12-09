import React, { Component } from 'react'
import './ReferenceForTickets.css'

class ReferenceForTickets extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="ReferenceForTickets-product-col">
                            <div className="ReferenceForTickets-product">
                                <div className="ReferenceForTickets-product-name d-flex align-items-center">A0785 Rojos Everithi</div>
                                <div className="ReferenceForTickets-product-variation d-flex align-items-center">Talla 35</div>
                            </div>
                        </div>

                        <div className="ReferenceForTickets-product-separator"/>

                        <div className="ReferenceForTickets-ticketInfo">
                            <div className="ReferenceForTickets-ticketInfo-number">12</div>
                            <div className="ReferenceForTickets-ticketInfo-text">SIGUIENTES ETIQUETAS</div>
                        </div>
                    </div>
                </div>
                <div className="row ReferenceForTickets-separator"/>
            </div>
        )
    }
}
export default  ReferenceForTickets