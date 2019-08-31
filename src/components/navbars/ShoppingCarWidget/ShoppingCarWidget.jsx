import React, { Component } from 'react'
import './ShoppingCarWidget.css'

class ShoppingCarWidget extends Component {
    render() {
        return (
            <div className="ShoppingCarWidget centerVertical">
                <i className="icon-s-car"/><span className="itemsInCar">1</span>
            </div>
        )
    }
}
export default  ShoppingCarWidget