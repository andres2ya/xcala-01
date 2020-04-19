import React, { Component } from 'react'
import './FooterSharingWithPrice.css'

export default class FooterSharingWithPrice extends Component {
    render() {
        const {finalPrice,shipping}=this.props
        return (
            <footer className="sticky-footer FooterSharingWithPrice">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center align-items-center">
                            <i className="icon-whatsapp"></i>
                            <div>
                                <div className="FooterSharingWithPrice_label">Compartir con precio de venta</div>
                                <div className="FooterSharingWithPrice_price">
                                    {finalPrice}
                                    <span>{` ${shipping}`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>       
            </footer>
        )
    }
}
