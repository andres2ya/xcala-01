import React, { Component } from 'react'
import './FooterButton_Primary.css'

export default class FooterButton_Primary extends Component {
    render() {
        const {onClick,text}=this.props
        return (
            <div className="container FooterButton_Primary">
                <button onClick={onClick}>{text}</button>
            </div>
        )
    }
}
