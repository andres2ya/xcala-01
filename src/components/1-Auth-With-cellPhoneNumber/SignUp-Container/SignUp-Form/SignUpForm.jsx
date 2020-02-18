import React, { Component } from 'react'
import InputAuth from './../../Layouts/InputAuth/InputAuth'
import ButtonAuth from './../../Layouts/ButtonAuth/ButtonAuth'
import './SignUpForm.css'
// import { shake } from 'react-animations';
// import Radium, {StyleRoot} from 'radium'

// const styles = {
//     shake: {
//       animation: 'x 0.5s',
//       animationName: Radium.keyframes(shake, 'shake'),
//       width:'90vw',
//       display:'flex',
//       justifyContent:'center'
//     }
// }

export default class SignUpForm extends Component {
    
    onFocus=(e)=>{
        e.preventDefault()
        let SignUpContainer=document.getElementById('SignUpForm_botones_id')
        SignUpContainer.style.marginBottom="150px"
    }
    onBlur=(e)=>{
        e.preventDefault()
        let SignUpContainer=document.getElementById('SignUpForm_botones_id')
        SignUpContainer.style.marginBottom='0px'
    }
    render() {
        const {leerDatos,valuePhoneNumber,valueUserName,showSignInButton,showInvalidPhone,showInvalidName}=this.props
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="SignUpForm_form">
                            <div className="d-flex justify-content-center">
                            {showInvalidPhone?
                                // <StyleRoot>
                                //     <div style={styles.shake} className="animationBox">
                                        <InputAuth invalid={true} value={valuePhoneNumber} name={'phoneNumber'} onChange={leerDatos} onFocus={this.onFocus} onBlur={this.onBlur}label={'+57'} id={'cellPhone'} type={'number'} placeholder={'Tu numero de celular'}/>
                                //     </div>
                                // </StyleRoot>
                            :
                                <InputAuth value={valuePhoneNumber} name={'phoneNumber'} onChange={leerDatos} onFocus={this.onFocus} onBlur={this.onBlur}label={'+57'} id={'cellPhone'} type={'number'} placeholder={'Tu numero de celular'}/>
                            }
                            </div>
                            <div className="d-flex justify-content-center">
                            {showInvalidName?
                                // <StyleRoot>
                                //     <div style={styles.shake} className="animationBox">
                                        <InputAuth invalid={true} value={valueUserName} name={'userName'} onChange={leerDatos} onFocus={this.onFocus} onBlur={this.onBlur} iconClass={'icon-profile'} label={'#'} id={'fullName'} type={'text'} placeholder={'Tu nombre completo'}/>
                                //     </div>
                                // </StyleRoot>
                            :
                                <InputAuth value={valueUserName} name={'userName'} onChange={leerDatos} onFocus={this.onFocus} onBlur={this.onBlur} iconClass={'icon-profile'} label={'#'} id={'fullName'} type={'text'} placeholder={'Tu nombre completo'}/>
                            }   
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
                        <div id="SignUpForm_botones_id" className="SignUpForm_botones">
                            <div className="d-flex justify-content-center">
                                {showSignInButton?
                                    <ButtonAuth id={'signIn_RecaptchaButton'} style={{transition:'opacity 500ms linear',opacity:1,height:'35px',width:'90%',padding: '3px 20px 3px 20px', fontSize:'19px'}} texto={'Continuar'}/>
                                    :
                                    <ButtonAuth id={'signIn_RecaptchaButton'} style={{transition:'opacity 500ms linear',opacity: 0,height:'35px',width:'90%',padding: '3px 20px 3px 20px', fontSize:'19px'}} texto={'Continuar'}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>


                 <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div  className="SignUpForm_TyC">
                         <input defaultChecked type="checkbox"/> Acepto de manera expresa e informada los Terminos & Condiciones y la Politica de tratamiento de datos personales de Xcala S.A.S
                        </div>
                    </div>
                 </div>
            </div>
        )
    }
}
