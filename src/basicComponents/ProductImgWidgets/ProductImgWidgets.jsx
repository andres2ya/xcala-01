import React, { Component } from 'react'
import './ProductImgWidgets.css'
import FavoriteWidget from '../FavoriteWidget/FavoriteWidget'
import whatsappIconShare from '../../assets/whatsappIconShare.svg'
import shippingCarIcon from '../../assets/shippingCarIcon.svg'

export default class ProductImgWidgets extends Component {
    state={
        isFavorite:this.props.isFavorite,
        mainImg:this.props.mainImg
    }

    render() {
        return (
            <div className="container ProductImgWidgets">
                <div className="row">
                    {/* <div className="col-12"> */}
                        <img className="ProductImgWidgets_img" src={this.state.mainImg} alt="0"/>
                        <div className="ProductImgWidgets_coverWidgets">
                            <div style={{height:'50%'}} className="row">
                                <div className="col-12 d-flex justify-content-start align-items-start">
                                    <div className="ProductImgWidgets_coverWidgets_up">
                                        <FavoriteWidget isFavorite={this.state.isFavorite} height={'32'}/>
                                    </div>
                                </div>
                            </div>
                            <div style={{height:'50%'}} className="row">
                                <div className="col-12 d-flex justify-content-end align-items-end">
                                    <div className="ProductImgWidgets_coverWidgets_downOne">
                                        <img height="32" src={whatsappIconShare} alt=""/> 
                                    </div>
                                    <div className="ProductImgWidgets_coverWidgets_downTwo">
                                        <img className="shadowCircle" id="shippingCarIcon" height="32" src={shippingCarIcon} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        )
    }
}
