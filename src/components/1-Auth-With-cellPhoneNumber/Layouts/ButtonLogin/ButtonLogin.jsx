import React, { Component } from 'react'
import './ButtonLogin.css'

export default class ButtonLogin extends Component {
    render() {
        const {onClick}=this.props
        return (
            <button className='ButtonLogin' onClick={(e)=>onClick(e)}>Iniciar sesion</button>
        )
    }
}
