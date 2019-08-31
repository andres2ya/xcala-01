import React, { Component } from 'react'
import './ShoppingCarWidget.css'

class ShoppingCarWidget extends Component {
    render() {
        return (
            <div className="centerVerticalAndHorizontal">
                <i className="ShoppingCarWidget icon-s-car"/><span className="itemsInCar">1</span>
            </div>
        )
    }
}
export default  ShoppingCarWidget