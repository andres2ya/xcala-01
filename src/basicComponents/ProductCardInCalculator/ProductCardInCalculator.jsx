import React, { Component } from 'react'
import './ProductCardInCalculator.css'

export default class ProductCardInCalculator extends Component {
    render() {
        const {mainImg,productName}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center">
                            <img className="ProductCardInCalculator_img" src={mainImg} alt="0"/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="ProductCardInCalculator_name">{productName}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
