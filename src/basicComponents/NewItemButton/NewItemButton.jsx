import React, { Component } from 'react'
import './NewItemButton.css'

export default class NewItemButton extends Component {
    render() {
        return (
            <div className="NewItemButton d-flex align-items-center">
                {this.props.newItemText}
            </div>
        )
    }
}
