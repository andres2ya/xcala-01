import React, { Component } from 'react'
import './ProductDescriptionBox.css'

export default class ProductDescriptionBox extends Component {
    render() {
        const {productName,sku,description}=this.props
        return (
            <div className="container ProductDescriptionBox">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex align-items-center">
                            <div className="ProductDescriptionBox_productName">{productName}</div>
                            <i className="ProductDescriptionBox_shareIcon d-flex align-items-center icon-whatsapp"/>
                        </div>
                        <div className="ProductDescriptionBox_sku">ID:<span>{sku}</span></div>
                        <p className="ProductDescriptionBox_description">{description}</p>
                    </div>
                </div>
            </div>
        )
    }
}
