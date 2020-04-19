import React, { Component } from 'react'
import './FooterButton_TextOnly.css'
export default class FooterButton_TextOnly extends Component {
    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center align-items-center FooterButton_TextOnly">
                    {this.props.text}
                </div>
            </div>
        )
    }
}
