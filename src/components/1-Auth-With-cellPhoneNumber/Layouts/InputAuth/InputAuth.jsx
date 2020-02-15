import React, { Component } from 'react'
import './InputAuth.css'

export default class InputAuth extends Component {
    render() {
        const {id,type,value,placeholder,label,iconClass}=this.props
        return (
            <div className="InputAuthDiv d-flex justify-content-center align-items-center">
                <div className="InputAuthLabel d-flex justify-content-center align-items-center">
                    {iconClass?
                    <i style={{paddingTop:'7px',paddingLeft:'6px',fontSize:'20px'}} className={iconClass}/>
                    :label}
                </div> 
                <input 
                    required
                    id={id} 
                    type={type} 
                    value={value} 
                    placeholder={placeholder} 
                    className="InputAuth"/>
            </div>
        )
    }
}
