import React, { Component } from 'react'
import './FooterButton_check.css'

export default class FooterButton_check extends Component {
    render() {
        const {text, funtionCheck}=this.props
        return (
            <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                    <input onChange={funtionCheck} type="checkbox"/>
                    <div className="FooterButton_check_text">{text}</div>
                </div>
            </div>
        )
    }
}
