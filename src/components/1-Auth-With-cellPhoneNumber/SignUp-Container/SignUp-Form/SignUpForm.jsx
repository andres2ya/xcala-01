import React, { Component } from 'react'
import InputAuth from './../../Layouts/InputAuth/InputAuth'
import ButtonAuth from './../../Layouts/ButtonAuth/ButtonAuth'

import './SignUpForm.css'

export default class SignUpForm extends Component {
    render() {
        const {sendCode}=this.props
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="SignUpForm_form">
                            <div className="d-flex justify-content-center">
                                <InputAuth label={'+57'} id={'cellPhone'} type={'number'} placeholder={'Tu numero de celular'}/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <InputAuth iconClass={'icon-profile'} label={'#'} id={'fullName'} type={'text'} placeholder={'Tu nombre completo'}/>
                            </div>
                        </div>
                    </div>
                 </div>
                
                 <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="SignUpForm_parrafo">
                         Recibiras un mensaje de texto con un codigo que debes ingresar
                        </div>
                    </div>
                 </div>

                 <div className="row">
                    <div className="col-12">
                        <div className="SignUpForm_botones">
                            <div className="d-flex justify-content-center">
                                <ButtonAuth style={{height:'35px',width:'90%',padding: '3px 20px 3px 20px', fontSize:'19px'}} texto={'Continuar'} onClick={sendCode}/>
                            </div>
                        </div>
                    </div>
                 </div>



                 <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="SignUpForm_TyC">
                         <input defaultChecked type="checkbox"/> Acepto de manera expresa e informada los Terminos & Condiciones y la Politica de tratamiento de datos personales de Xcala S.A.S
                        </div>
                    </div>
                 </div>
            </div>
        )
    }
}
