import React, { Component } from 'react'
import './SignUpVerifySMSCode.css'
import InputAuth from './../../Layouts/InputAuth/InputAuth'
import ButtonAuth from './../../Layouts/ButtonAuth/ButtonAuth'
import InputSMSCode from '../../Layouts/InputSMSCode/InputSMSCode'
import {CSSTransition,TransitionGroup} from 'react-transition-group'

export default class SignUpVerifySMSCode extends Component {
    render() {
        return (
            <div>
                 <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="SignUpVerifySMSCode_parrafo">
                        Ingresa el codigo que recibiste en el mensaje de texto
                        </div>
                    </div>
                 </div>

                 <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <InputSMSCode id={'smsCode'} type={'number'} placeholder={'X-X-X-X-X-X'}/>
                    </div>
                 </div>

                 <div className="row">
                    <div className="col-12">
                        <div className="SignUpVerifySMSCode_botones">
                            <div className="d-flex justify-content-center">
                                <ButtonAuth style={{margin:'10px 0px 10px 0px',height:'35px',width:'60%',padding: '3px 20px 3px 20px', fontSize:'19px'}} texto={'Continuar'} onClick={()=>console.log('Conectar con API firebase, enviar codigo y presentar input de codigo')}/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <ButtonAuth secondary={true} style={{height:'35px',width:'60%',padding: '3px 20px 3px 20px', fontSize:'19px'}} texto={'Reenviar codigo'} onClick={()=>console.log('Conectar con API firebase, enviar codigo y presentar input de codigo')}/>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        )
    }
}
