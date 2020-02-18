import React, { Component } from 'react'
import './InputSMSCode.css'

export default class InputSMSCode extends Component {
    render() {
        const {id,type,value,placeholder,onChange,invalid}=this.props
        let classN
        if(invalid===true){
            classN='InputSMSCode_invalid'
        }else{
            classN='InputSMSCode'
        }

        return (
            <input
                name="smsCode"
                onChange={onChange}
                required
                id={id} 
                type={type} 
                value={value} 
                placeholder={placeholder} 
                className={classN}
            />
        )
    }
}
