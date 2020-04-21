import React, { Component } from 'react'
import './ProductHorizontalCard.css'
import ProductImgWidgets from '../ProductImgWidgets/ProductImgWidgets'

export default class ProductHorizontalCard extends Component {
    render() {
        const {styleImg,mainImg,isFavorite,showUpWidget,upWidget,showDownWidget,downWidget,showDeleteWidget}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex ProductHorizontalCard">
                            <div className="ProductHorizontalCard_img_imgFotter">
                                <div className="ProductHorizontalCard_img">
                                    <ProductImgWidgets
                                    styleImg={styleImg}
                                    mainImg={mainImg}
                                    isFavorite={isFavorite}
                                    showUpWidget={showUpWidget}
                                    upWidget={upWidget}
                                    showDownWidget={showDownWidget}
                                    downWidget={downWidget}
                                    />
                                </div>
                                {/* <div className="ProductHorizontalCard_img_footer">#Guia</div> */}
                            </div>
                            <div className="ProductHorizontalCard_productInfo">
                                <div className="ProductHorizontalCard_name_iconRight_sku">
                                    <div className="d-flex">
                                        <div className="ProductHorizontalCard_name">Juguetes Super Play</div>
                                        {
                                            showDeleteWidget?
                                            <div className="ProductHorizontalCard_right_top_circle">
                                                <i className="icon-trash-o"></i>
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    <div className="ProductHorizontalCard_sku">SKU:87ha7 - Variacion 1, variacion 2, variacion 3</div>
                                </div>
                                <div className="ProductHorizontalCard_middleSpace"></div>
                                <div className="ProductHorizontalCard_footerSpace">$49.000 x 1</div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
