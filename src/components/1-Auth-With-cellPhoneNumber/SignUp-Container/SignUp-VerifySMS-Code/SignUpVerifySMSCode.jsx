import React, { Component } from 'react'
import './SignUpVerifySMSCode.css'
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
    state={
        idButtonResendCode:'',
        textButtonResendCode:`60s para reenviar codigo`,
    }
    componentDidMount=()=>{
        this.downCountToResend()
    }

    downCountToResend=()=>{
        (this.updateDownCount=(n)=>{
            if(n<60){
                window.XcalaResendCode_setTimeOut=setTimeout(()=>{
                    this.updateDownCount(n)
                }, 1000);
                let updatedDownCount=60-n
                this.setState({textButtonResendCode:`${updatedDownCount}s para reenviar codigo`})
                n++
            }else{
                this.setState({
                    textButtonResendCode:'Reenviar codigo',
                    idButtonResendCode:'signIn_RecaptchaButton_resend',
                })
                this.props.reenviarCodigo(this.downCountToResend)
            }
        })(0)
    }

    componentWillUnmount=()=>{
        clearTimeout(window.XcalaResendCode_setTimeOut)
    }

    render() {
        const {leerDatos,valueCode,verificarCodigoSMS,showInvalidCodeError,showSpinner}=this.props
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
                                    <InputSMSCode onBlur={(e)=>e.preventDefault()} onFocus={(e)=>e.preventDefault()} invalid={true} value={valueCode} onChange={leerDatos} id={'smsCode'} type={'number'} placeholder={'X-X-X-X-X-X'}/>
                                 </div>
                            </StyleRoot> 
                        :
                            <InputSMSCode onBlur={(e)=>e.preventDefault()} onFocus={(e)=>e.preventDefault()}  value={valueCode} onChange={leerDatos} id={'smsCode'} type={'number'} placeholder={'X-X-X-X-X-X'}/>
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
                                <ButtonAuth id={this.state.idButtonResendCode} secondary={true} style={{height:'35px',width:'90%',padding: '3px 20px 3px 20px', fontSize:'19px'}} texto={this.state.textButtonResendCode} onClick={showSpinner}/>
                            </div>

                        </div>
                    </div>
                 </div>
            </div>
        )
    }
}
