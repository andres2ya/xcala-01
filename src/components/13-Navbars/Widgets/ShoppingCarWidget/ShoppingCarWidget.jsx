import React, { Component } from 'react'
import './ShoppingCarWidget.css'

class ShoppingCarWidget extends Component {
    
    render() {
        return (
            <div className={`${this.props.classNavIcon} centerVertical`}>
                <i className="icon-s-car centerVertical"/><span className="itemsInCar"> {this.props.numberItemsInCar} </span>
            </div>
        )
    }
}
export default  ShoppingCarWidget