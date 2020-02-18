import React, { Component } from 'react'
import './ButtonAuth.css'

export default class ButtonAuth extends Component {
    render() {
        const {texto,onClick,style,secondary,className,id}=this.props
        if(onClick===undefined){this.click=()=>{}}else{this.click=e=>onClick(e)}
        let classN;if(className){classN=className}else{classN='ButtonAuth'}
        
        if(secondary){
            return(
            <button id={id} style={style} onClick={this.click} className="ButtonAuth-secondary">{texto}</button>
            )
        }else{
            return (
            <button id={id} style={style} onClick={this.click} className={classN}>{texto}</button>
            )
        }
    }
}
