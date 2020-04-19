import React, { Component } from 'react'
import './HeaderCategory.css'
import whatsappIconShare from '../../assets/whatsappIconShare.svg'
import ShippingCarWidget from '../shippingCarWidget/ShippingCarWidget'


//NOTE: Como llamar este componente
{/* <HeaderCategory 
categoryImage={babiesCategory}
categoryName={'Bebes'}
categoryDescription={'Juguetes, ropa, accesorios...'}
itemsInCar={100}
/> */}
export default class HeaderCategory extends Component {
    state={
        categoryImage:this.props.categoryImage,
        categoryName:this.props.categoryName,
        categoryDescription:this.props.categoryDescription,
        itemsInCar:this.props.itemsInCar
    }
    render() {
        return (
            <div style={{backgroundImage:`url(${this.state.categoryImage})`}} className="container-fluid HeaderCategory sticky-top">
                <div className="row">
                    <div className="col-12 d-flex align-items-center">
                        <div className="HeaderCategory_backRowIcon">
                            <i className="icon-left-open-big"/>
                        </div>

                        <div>
                            <div className="row HeaderCategory_categoryName">
                                {this.state.categoryName}
                            </div>
                            <div className="row HeaderCategory_categoryDescription">
                                {this.state.categoryDescription}
                            </div>
                        </div>

                        <div className="d-flex HeaderCategory_iconsFloatRight">
                            <div style={{marginRight:'2px'}}>
                                <img height="40" src={whatsappIconShare} alt=""/>
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
