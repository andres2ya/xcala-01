import React, { Component } from 'react'
import './ProductInListCard.css'
import ProductImgWidgets from '../ProductImgWidgets/ProductImgWidgets'



export default class ProductInListCard extends Component {

    render() {
        const {productName,isRecent,withPromo,promo,oldPrice,suggestedPrice,suggestedProfit,recentCustomer,recentFinalPrice,
            styleImg,mainImg,isFavorite,showUpWidget,upWidget,showDownWidget,downWidget}=this.props
        return (
            <div className="container-fluid ProductInListCard">
                <div className="row">
                    {/* <div className="col-12"> */}
                    <ProductImgWidgets
                    styleImg={styleImg}
                    mainImg={mainImg} 
                    isFavorite={isFavorite}
                    showUpWidget={showUpWidget}
                    upWidget={upWidget}//checkbox or favorite
                    showDownWidget={showDownWidget}
                    downWidget={downWidget}
                    />
                    {/* </div> */}
                </div>
                <div className="row">
                    <div className="col-12 ProductInListCard_productName ">
                        {productName}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {
                            isRecent?
                                <div className="ProductInListCard_recentCustomer">{recentCustomer}</div>
                            :
                                withPromo?
                                    <div>
                                        <div className="d-flex">
                                            <div className="d-flex align-items-end ProductInListCard_suggestedPrice">{suggestedPrice}</div>
                                            <div className="d-flex align-items-center ProductInListCard_promo">{promo}</div>
                                        </div>
                                        <div className="d-flex align-items-end ProductInListCard_oldPrice"><span>{oldPrice}</span>Precio</div>
                                    </div>
                                :
                                    <div className="d-flex">
                                        <div className="d-flex align-items-end ProductInListCard_suggestedPrice">{suggestedPrice}</div>
                                        <div className="d-flex align-items-end ProductInListCard_suggestedPrice_label">Precio</div>
                                    </div>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {
                            isRecent?
                                <div className="d-flex">
                                    <div className="d-flex align-items-end ProductInListCard_recentFinalPrice">{recentFinalPrice}</div>
                                    <div className="d-flex align-items-end ProductInListCard_recentFinalPrice_label">Precio final</div>
                                </div>
                            :
                                <div className="d-flex">
                                    <div className="d-flex align-items-end ProductInListCard_suggestedProfit">
                                        {suggestedProfit}
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
                        isRecent?
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
