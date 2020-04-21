import React, { Component } from 'react'
import './ProductImgWidgets.css'
import FavoriteWidget from '../FavoriteWidget/FavoriteWidget'
import whatsappIconShare from '../../assets/whatsappIconShare.svg'
import shippingCarIcon from '../../assets/shippingCarIcon.svg'

export default class ProductImgWidgets extends Component {
    render() {
        const {styleImg,isFavorite,mainImg,showUpWidget,upWidget,showDownWidget,downWidget}=this.props
        return (
            <div className="container ProductImgWidgets">
                <div className="row">
                    {/* <div className="col-12"> */}
                        <img style={styleImg} className="ProductImgWidgets_img" src={mainImg} alt="0"/>
                        
                        <div style={styleImg} className="ProductImgWidgets_coverWidgets">
                            {
                                showUpWidget?
                                <div style={{height:'50%'}} className="row">
                                    <div className="col-12 d-flex justify-content-start align-items-start">
                                        <div className="ProductImgWidgets_coverWidgets_up">
                                            {
                                                ((upWidget)=>{
                                                    switch (upWidget) {
                                                        case 'favorite':
                                                            
                                                            return(<FavoriteWidget isFavorite={isFavorite} height={'32'}/>)
                                                        case 'checkbox':
                                                            
                                                            return(<input type="checkbox"/>)
                                                        default:
                                                            break;
                                                    }
                                                })(upWidget)
                                            }
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                            }
                            {
                                showDownWidget?
                                <div style={{height:'50%'}} className="row">
                                    <div className="col-12 d-flex justify-content-end align-items-end">
                                            {
                                                ((downWidget)=>{
                                                    switch (downWidget) {
                                                        case 'share_and_car':
                                                            return(
                                                            <div>
                                                                <div className="ProductImgWidgets_coverWidgets_downOne">
                                                                    <img height="32" src={whatsappIconShare} alt=""/> 
                                                                </div>
                                                                <div className="ProductImgWidgets_coverWidgets_downTwo">
                                                                    <img className="shadowCircle" id="shippingCarIcon" height="32" src={shippingCarIcon} alt=""/>
                                                                </div>
                                                            </div>
                                                            )
                                                        case 'checkbox':
                                                            return(<input type="checkbox"/>)
                                                        default:
                                                            break;
                                                    }
                                                })(downWidget)
                                            }
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                    {/* </div> */}
                </div>
            </div>
        )
    }
}
