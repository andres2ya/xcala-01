import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './SignUpContainer.css'
import ButtonLogin from '../Layouts/ButtonLogin/ButtonLogin'
import logoXcala from './../../../assets/logoXcala_180w_SVG_azul.svg'
import SignUpForm from './SignUp-Form/SignUpForm'
import SignUpVerifySMSCode from './SignUp-VerifySMS-Code/SignUpVerifySMSCode'

export default class SignUpContainer extends Component {
    state={
        sendCode:false
    }
    sendCode=(e)=>{
        e.preventDefault()
        this.setState({sendCode:true})
    }
    render() {
        const {sendCode}=this.state
        return (
            <div className="SignUpContainer container-fluid">
                <div className="row SignUpContainer_loginButton">
                    <div className="col-12 d-flex justify-content-end">
                        <Link to="/login">
                            <ButtonLogin/>
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <img className="SignUpContainer_logo" src={logoXcala} alt=""/>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="SignUpContainer_titulo">
                        Registro
                        </div>
                    </div>
                 </div>

                {sendCode?

                    <SignUpVerifySMSCode/>
                    :
                    <SignUpForm sendCode={this.sendCode}/>       

                }

                

            </div>
        )
    }
}
