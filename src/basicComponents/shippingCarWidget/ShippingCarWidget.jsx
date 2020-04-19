import React, { Component } from 'react'
import './ShippingCarWidget.css'
import shippingCarIcon from '../../assets/shippingCarIcon.svg'


export default class ShippingCarWidget extends Component {
    render() {
        return (
            <div>
                <div className="d-flex">
                    <img className="shadowCircle" id="shippingCarIcon" height="40" src={shippingCarIcon} alt=""/>
                    <label
                    className="shippingCarIcon_label d-flex justify-content-center align-items-center" 
                    htmlFor="shippingCarIcon">
                        {this.props.itemsInside}
                    </label>
                </div>
            </div>
        )
    }
}
