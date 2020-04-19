import React, { Component } from 'react'
import './FooterButton_tertiary.css'

export default class FooterButton_tertiary extends Component {
    render() {
        const {onClick,text}=this.props
        return (
            <div className="container FooterButton_tertiary">
                <button onClick={onClick}>{text}</button>
            </div>
        )
    }
}
