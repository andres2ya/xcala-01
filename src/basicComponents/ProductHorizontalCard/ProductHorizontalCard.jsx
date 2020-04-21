import React, { Component } from 'react'
import './ProductHorizontalCard.css'
import ProductImgWidgets from '../ProductImgWidgets/ProductImgWidgets'
import PlusMinusInput from './../../components/15-Questionnaire/LayOuts/PlusMinusInput/PlusMinusInput'
export default class ProductHorizontalCard extends Component {
    render() {
        const {styleImg,mainImg,isFavorite,showUpWidget,upWidget,showDownWidget,downWidget,showDeleteWidget,footerImgSpace,guideNumber,middleSpace,footerSpace,price,quantity,getValue}=this.props
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
                                <div className="ProductHorizontalCard_img_footer">
                                    {
                                     ((footerImgSpace)=>{
                                        switch (footerImgSpace) {
                                            case 'guideNumber':
                                                return(<div>{guideNumber}</div>)
                                            default:
                                                break;
                                        }
                                     })(footerImgSpace)
                                    }
                                </div>
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
                                <div className="ProductHorizontalCard_middleSpace">
                                    {
                                     ((middleSpace)=>{
                                        switch (middleSpace) {
                                            case 'guideNumber':
                                                return(<div>{guideNumber}</div>)
                                            default:
                                                break;
                                        }
                                     })(middleSpace)
                                    }
                                </div>
                                <div className="ProductHorizontalCard_footerSpace">
                                    {
                                     ((footerSpace)=>{
                                        switch (footerSpace) {
                                            case 'pricePlusQuantity':
                                                return(
                                                    <div className="d-flex align-items-center">
                                                        <span className="ProductHorizontalCard_price">
                                                            {price} x
                                                        </span> 
                                                        <span className="ProductHorizontalCard_quantity">
                                                            {quantity}
                                                        </span>
                                                    </div>)
                                            case 'pricePlusInput':
                                                return(
                                                    <div className="d-flex align-items-center">
                                                        <span className="ProductHorizontalCard_price">
                                                            {price} x
                                                        </span>
                                                        <span>
                                                            <PlusMinusInput defaultValue={quantity} style={{backGround:{margin:'8px 0px 8px 0px'},quantityInput:{height:'30px',width:'35px'},minus:{height:'30px',width:'20px'},plus:{height:'30px',width:'20px'}}} getValue={getValue} id='edadInput' min={1} max={999}/>
                                                        </span>
                                                    </div>)
                                            default:
                                                break;
                                        }
                                     })(footerSpace)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
