import React, { Component } from 'react'
import './InputForm.css'

export default class InputForm extends Component {
    render() {
        const {color,onChange,placeholder,value,type}=this.props
        return (
            <div className={`container InputForm InputForm_${color}`}>
                <input onChange={onChange} type={type} placeholder={placeholder} value={value} />
            </div>
        )
    }
}
