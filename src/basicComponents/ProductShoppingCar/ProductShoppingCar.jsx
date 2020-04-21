import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './ProductShoppingCar.css'
import ProductHorizontalCard from '../ProductHorizontalCard/ProductHorizontalCard'

export default class ProductShoppingCar extends Component {
    render() {
        const {downCards,
            styleImg,mainImg,isFavorite,showUpWidget,upWidget,showDownWidget,downWidget,
            showDeleteWidget,footerImgSpace,guideNumber,middleSpace,footerSpace,price,quantity,getValue}=this.props
        return (
            <div>
                <ProductHorizontalCard
                styleImg={styleImg}
                mainImg={mainImg}
                isFavorite={isFavorite}
                showUpWidget={showUpWidget}// true or false
                upWidget={upWidget}//checkbox or favorite
                showDownWidget={showDownWidget}// true or false
                downWidget={downWidget}//share_and_car

                showDeleteWidget={showDeleteWidget}
                footerImgSpace={footerImgSpace}//empty or guideNumber
                guideNumber={guideNumber}
                middleSpace={middleSpace}// empty or 
                footerSpace={footerSpace}//empy or pricePlusQuantity or pricePlusInput
                price={price}
                quantity={quantity}
                getValue={getValue}
                />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {downCards.map(downCard=>
                                <div className="ProductShoppingCar_downCard d-flex align-items-center">
                                    {downCard.text}
                                    <div className="ProductShoppingCar_downCard_icon">
                                        <Link to={downCard.url}>
                                            <i className={downCard.icon}/>
                                        </Link> 
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
