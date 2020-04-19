import React, { Component } from 'react'
import './HeaderProduct.css'
import ShippingCarWidget from '../shippingCarWidget/ShippingCarWidget'
import FavoriteWidget from '../FavoriteWidget/FavoriteWidget'
import TwoWordsCircle from '../TwoWordsCircle/TwoWordsCircle'


export default class HeaderProduct extends Component {

    state={
        supplierName:this.props.supplierName,
        supplierTwoWords:this.props.supplierTwoWords,
        isFavorite:this.props.isFavorite,
        itemsInCar:this.props.itemsInCar,
    }

    render(){
        return (
            <div className="container-fluid HeaderProduct">
                <div className="row">
                    <div className="col-12 d-flex align-items-center">
                        <div className="HeaderProduct_backRowIcon">
                            <i className="icon-left-open-big"/>
                        </div>

                        {/* <div style={{marginRight:'25px'}}>
                            <div className="HeaderProduct_circleSupplierName d-flex justify-content-center align-items-center">
                                {this.state.supplierTwoWords}
                            </div>
                        </div> */}

                        <TwoWordsCircle style={{marginRight:'25px',backgroundColor:'#93278f',color:'white'}} TwoWords={this.state.supplierTwoWords}/>

                        <div>
                            <div className="row HeaderProduct_soldBy">
                                Vendido por
                            </div>
                            <div className="row HeaderProduct_supplierName">
                                {this.state.supplierName}
                            </div>
                        </div>

                        <div className="d-flex HeaderProduct_iconsFloatRight">
                            <div style={{marginRight:'2px'}}>
                                <FavoriteWidget isFavorite={this.state.isFavorite} height={'40'}/>
                            </div>
                            
                            <div style={{marginLeft:'2px'}}>
                                <ShippingCarWidget itemsInside={this.state.itemsInCar}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
