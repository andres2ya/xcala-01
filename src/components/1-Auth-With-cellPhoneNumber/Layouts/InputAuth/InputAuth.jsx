import React, { Component } from 'react'
import './InputAuth.css'

export default class InputAuth extends Component {
    render() {
        const {id,name,type,value,placeholder,label,iconClass,onFocus,onBlur,onChange,invalid}=this.props
        let classN
        if(invalid===true){
            classN='InputAuth_invalid'
        }else{
            classN='InputAuth'
        }

        return (
            <div className="InputAuthDiv d-flex justify-content-center align-items-center">
                <div className="InputAuthLabel d-flex justify-content-center align-items-center">
                    {iconClass?
                    <i style={{paddingTop:'7px',paddingLeft:'6px',fontSize:'20px'}} className={iconClass}/>
                    :label}
                </div> 
                <input
                    name={name}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    required
                    id={id} 
                    type={type} 
                    value={value} 
                    placeholder={placeholder} 
                    className={classN}
                />
            </div>
        )
    }
}
