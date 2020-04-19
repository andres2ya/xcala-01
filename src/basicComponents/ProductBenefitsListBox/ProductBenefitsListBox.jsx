import React, { Component } from 'react'
import './ProductBenefitsListBox.css'

export default class ProductBenefitsListBox extends Component {
    render() {
        const {title,text}=this.props
        return (
            <div className="container ProductBenefitsListBox">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex align-items-center">
                            <div className="ProductBenefitsListBox_title">{title}</div>
                            <i className="ProductBenefitsListBox_shareIcon d-flex align-items-center icon-whatsapp"/>
                        </div>
                        <p className="ProductBenefitsListBox_list">
                            {text}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
