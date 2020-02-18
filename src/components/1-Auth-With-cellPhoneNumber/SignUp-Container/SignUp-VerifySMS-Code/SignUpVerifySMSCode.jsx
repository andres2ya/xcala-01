import React, { Component } from 'react'
import './SignUpVerifySMSCode.css'
import InputAuth from './../../Layouts/InputAuth/InputAuth'
import ButtonAuth from './../../Layouts/ButtonAuth/ButtonAuth'
import InputSMSCode from '../../Layouts/InputSMSCode/InputSMSCode'
import { shake } from 'react-animations';
import Radium, {StyleRoot} from 'radium'

const styles = {
    shake: {
      animation: 'x 1s',
      animationName: Radium.keyframes(shake, 'shake'),
      width:'100vw',
      display:'flex',
      justifyContent:'center'
    }
}

export default class SignUpVerifySMSCode extends Component {
    render() {
        const {leerDatos,valueCode,verificarCodigoSMS,showInvalidCodeError}=this.props
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
                        {showInvalidCodeError?
                            <StyleRoot>
                                <div style={styles.shake} className="animationBox">
                                    <InputSMSCode invalid={true} value={valueCode} onChange={leerDatos} id={'smsCode'} type={'number'} placeholder={'X-X-X-X-X-X'}/>
                                </div>
                            </StyleRoot>
                        :
                            <InputSMSCode  value={valueCode} onChange={leerDatos} id={'smsCode'} type={'number'} placeholder={'X-X-X-X-X-X'}/>
                        }
                    </div>
                 </div>

                 <div className="row">
                    <div className="col-12">
                        <div className="SignUpVerifySMSCode_botones">
                            <div className="d-flex justify-content-center">
                                <ButtonAuth style={{margin:'10px 0px 10px 0px',height:'35px',width:'90%',padding: '3px 20px 3px 20px', fontSize:'19px'}} texto={'Continuar'} onClick={verificarCodigoSMS}/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <ButtonAuth secondary={true} style={{height:'35px',width:'90%',padding: '3px 20px 3px 20px', fontSize:'19px'}} texto={'Reenviar codigo'} onClick={()=>console.log('Conectar con API firebase, enviar codigo y presentar input de codigo')}/>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        )
    }
}
