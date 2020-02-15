import React, { Component } from 'react'
import './InputSMSCode.css'

export default class InputSMSCode extends Component {
    render() {
        const {id,type,value,placeholder}=this.props
        return (
            <input 
                required
                id={id} 
                type={type} 
                value={value} 
                placeholder={placeholder} 
                className="InputSMSCode"/>
        )
    }
}
