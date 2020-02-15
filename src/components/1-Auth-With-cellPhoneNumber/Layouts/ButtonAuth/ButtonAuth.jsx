import React, { Component } from 'react'
import './ButtonAuth.css'

export default class ButtonAuth extends Component {
    render() {
        const {texto,onClick,style,secondary}=this.props
        if(secondary){
            return(
            <button style={style} onClick={(e)=>onClick(e)} className="ButtonAuth-secondary">{texto}</button>
            )
        }else{
            return (
            <button style={style} onClick={(e)=>onClick(e)} className="ButtonAuth">{texto}</button>
            )
        }
    }
}
