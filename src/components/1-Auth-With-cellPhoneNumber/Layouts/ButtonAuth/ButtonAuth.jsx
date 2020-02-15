import React, { Component } from 'react'
import './ButtonAuth.css'

export default class ButtonAuth extends Component {
    render() {
        const {texto,onClick,style}=this.props
        return (
        <button style={style} onClick={(e)=>onClick(e)} className="ButtonAuth">{texto}</button>
        )
    }
}
