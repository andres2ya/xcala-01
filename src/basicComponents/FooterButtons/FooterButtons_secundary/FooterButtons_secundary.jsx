import React, { Component } from 'react'
import './FooterButtons_secundary.css'

export default class FooterButtons_secundary extends Component {
    render() {
        const {onClick,text}=this.props
        return (
            <div className="container FooterButtons_secundary">
                <button onClick={onClick}>{text}</button>
            </div>
        )
    }
}
