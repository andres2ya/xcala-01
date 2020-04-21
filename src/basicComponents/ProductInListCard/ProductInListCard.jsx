import React, { Component } from 'react'
import './ProductInListCard.css'
import ProductImgWidgets from '../ProductImgWidgets/ProductImgWidgets'



export default class ProductInListCard extends Component {
    state={
        productName:this.props.productName,
        isRecent:this.props.isRecent,
        withPromo:this.props.withPromo,
        promo:this.props.promo,
        mainImg:this.props.mainImg,
        suggestedPrice:this.props.suggestedPrice,
        suggestedProfit:this.props.suggestedProfit,
        recentCustomer:this.props.recentCustomer,
        recentFinalPrice:this.props.recentFinalPrice,
        isFavorite:this.props.isFavorite,
    }
    render() {
        return (
            <div className="container-fluid ProductInListCard">
                <div className="row">
                    {/* <div className="col-12"> */}
                    <ProductImgWidgets 
                    mainImg={this.state.mainImg} 
                    isFavorite={this.state.isFavorite}
                    showUpWidget={true}
                    upWidget={'favorite'}//checkbox or favorite
                    showDownWidget={false}
                    downWidget={''}
                    />
                    {/* </div> */}
                </div>
                <div className="row">
                    <div className="col-12 ProductInListCard_productName ">
                        {this.state.productName}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {
                            this.state.isRecent?
                                <div className="ProductInListCard_recentCustomer">{this.state.recentCustomer}</div>
                            :
                                this.state.withPromo?
                                    <div>
                                        <div className="d-flex">
                                            <div className="d-flex align-items-end ProductInListCard_suggestedPrice">{this.state.suggestedPrice}</div>
                                            <div className="d-flex align-items-center ProductInListCard_promo">28% OFF</div>
                                        </div>
                                        <div className="d-flex align-items-end ProductInListCard_oldPrice"><span>$69.000</span>Precio</div>
                                    </div>
                                :
                                    <div className="d-flex">
                                        <div className="d-flex align-items-end ProductInListCard_suggestedPrice">{this.state.suggestedPrice}</div>
                                        <div className="d-flex align-items-end ProductInListCard_suggestedPrice_label">Precio</div>
                                    </div>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {
                            this.state.isRecent?
                                <div className="d-flex">
                                    <div className="d-flex align-items-end ProductInListCard_recentFinalPrice">{this.state.recentFinalPrice}</div>
                                    <div className="d-flex align-items-end ProductInListCard_recentFinalPrice_label">Precio final</div>
                                </div>
                            :
                                <div className="d-flex">
                                    <div className="d-flex align-items-end ProductInListCard_suggestedProfit">
                                        {this.state.suggestedProfit}
                                    </div>
                                    <div className="d-flex align-items-end ProductInListCard_suggestedProfit_label">
                                        Ganancia
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className="row">
                    {
                        this.state.isRecent?
                            null
                        :
                            <div className="col-12">
                                <button className="ProductInListCard_calculatorButton">
                                    Calcular precio final
                                </button>
                                
                            </div>
                    }
                </div>
            </div>
        )
    }
}
