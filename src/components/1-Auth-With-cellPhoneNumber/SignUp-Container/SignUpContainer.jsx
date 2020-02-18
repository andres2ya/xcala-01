import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import firebase from "firebase/app";
import './SignUpContainer.css'
import ButtonLogin from '../Layouts/ButtonLogin/ButtonLogin'
import logoXcala from './../../../assets/logoXcala_180w_SVG_azul.svg'
import SignUpForm from './SignUp-Form/SignUpForm'
import SignUpVerifySMSCode from './SignUp-VerifySMS-Code/SignUpVerifySMSCode'
import {CSSTransition} from 'react-transition-group'
import Alert from './../../11-Alert/Alert'
import {identifyAndReturnMsgError} from './../../../helpers/errorsHandler'

export default class SignUpContainer extends Component {
    state={
        sendCode:false,
        phoneNumber:'',
        userName:'',
        smsCode:'',
        showSignInButton:false,
        showInvalidCodeError:false,
        msgErrorWithCode:'',
        showInvalidPhone:false,
        msgErrorWithPhone:'',
        showInvalidName:false,
        msgErrorWithName:'',
    }
    componentDidMount=()=>{
        //NOTE:1. Creando objecto recaptcha cuando el componente es montado. Para que funcione, el elemento con id=signIn_RecaptchaButton debe estar renderizado correctamente.
        //Es objeto, contiene un callback que sera la funcion que se ejecutara al presionar el boton asignado
        firebase.auth().useDeviceLanguage()
        window.XcalaRecaptchaVerifier= new firebase.auth.RecaptchaVerifier('signIn_RecaptchaButton',{
            'size':'invisible',
            'callback': (res)=>{
                this.onCodeSubmit()
            }
        })
        //NOTE:2. Se hace el render del recaptcha almacenado en window.XcalaRecaptchaVerifier y al tener exito se actualiza el ui (que para este caso hace aparecer el boton haciendo una transicion de 0 opacidad a 1 opacidad )
        window.XcalaRecaptchaVerifier.render().then((widgetId)=>{
            window.recaptchaWidgetId = widgetId;
            this.setState({showSignInButton:true})
        });
    }

    //NOTE: 3. Se leen los datos como numero de telefono y nombre usuario
    leerDatos=(e)=>{
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value,
            showInvalidCodeError:false,msgErrorWithCode:'',
            showInvalidPhone:false,msgErrorWithPhone:'',
            showInvalidName:false,msgErrorWithName:''
        })
    }
    
    //NOTE: 4. LUEGO, al presionar btn con id=signIn_RecaptchaButton, se ejecuta el callback del recaptcha
    onCodeSubmit=()=>{
        if(this.state.phoneNumber.length>0 && this.state.userName.includes(' ')){
            let phoneNumber=`+1${this.state.phoneNumber}`
            let appVerifier=window.XcalaRecaptchaVerifier
    
            firebase.auth().signInWithPhoneNumber(phoneNumber,appVerifier)
            .then((confirmationResult)=>{
                console.log('SMS enviado con exito!, enviando al usuario a la pantalla para ingresar codigo...')
                window.XcalaConfirmationResult=confirmationResult
                this.setState({sendCode:true})
            })
            .catch((err)=>{
                // console.log('ocurrio un error al autenticar con numero de telefono, no se enviara codigo y se reseteara el recaptcha y mostrara form de numberPhone para comenzar de nuevo...',err,error)
                let error=identifyAndReturnMsgError(err.code)
                window.XcalaRecaptchaVerifier.reset(window.recaptchaWidgetId)
                this.setState({sendCode:false,showInvalidPhone:true,msgErrorWithPhone:error})
            })
        }else if(this.state.phoneNumber.length===0){
            window.XcalaRecaptchaVerifier.reset(window.recaptchaWidgetId)
            this.setState({showInvalidPhone:true,msgErrorWithPhone:'No has introducido un numero de telefono valido.'})
        }else{
            window.XcalaRecaptchaVerifier.reset(window.recaptchaWidgetId)
            this.setState({showInvalidName:true,msgErrorWithName:'No has introducido tu apellido'})
        }
    }


    //NOTE: 5. POR ULITMO usar el metodo .confirm() del confirmationResult guardado en  window.XcalaConfirmationResult
    //para enviar el codigo de verificacion y confirmarlo.
    verificarCodigoSMS=(e)=>{
        e.preventDefault()
        let code=this.state.smsCode
        if(code.length>0){
            window.XcalaConfirmationResult.confirm(code)
            .then(res=>{
                var user=res.user;
                console.log('user signed successsfully',user)
                //TODO: Crear documento del usuario y Guardar su nombre y su role = vendedor
                window.location.href='/my-account'
            })
            .catch(err=>{
                let error=identifyAndReturnMsgError(err.code)
                this.setState({showInvalidCodeError:true,msgErrorWithCode:error})
            })
        }else{
            this.setState({showInvalidCodeError:true,msgErrorWithCode:'No has ingresado un codigo de verificacion'})
        }
    }
    

    render() {
        const {sendCode,showInvalidCodeError,msgErrorWithCode,showInvalidPhone,msgErrorWithPhone,showInvalidName,msgErrorWithName}=this.state
        return (
            <div id="SignUpContainer_id" className="SignUpContainer container-fluid">

                <div className="sticky-top">
                    <div className="row SignUpContainer_loginButton">
                        <div className="col-12 d-flex justify-content-end">
                            <Link to="/login">
                                <ButtonLogin/>
                            </Link>
                        </div>
                    </div>

                    <CSSTransition in={true}appear={true}timeout={1000}classNames="fade">
                        <div>
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
                        </div>
                    </CSSTransition>

                
                    {sendCode?
                        <CSSTransition key={1}in={true}appear={true}timeout={1000}classNames="fade">
                            <SignUpVerifySMSCode showInvalidCodeError={showInvalidCodeError} verificarCodigoSMS={this.verificarCodigoSMS} valueCode={this.state.smsCode} leerDatos={this.leerDatos}/>
                        </CSSTransition>
                            :
                        <CSSTransition key={2}in={true}appear={true}timeout={1000}classNames="fade">
                            <SignUpForm showInvalidPhone={showInvalidPhone} showInvalidName={showInvalidName}  showSignInButton={this.state.showSignInButton} valuePhoneNumber={this.state.phoneNumber} valueUserName={this.state.userName} leerDatos={this.leerDatos}/>
                        </CSSTransition>   
                    }

                </div>

                {showInvalidCodeError?
                    <Alert mode={'alertCard-red'}><i style={{marginRight:20,fontSize:30}} className="icon-cancel-circled"/>{msgErrorWithCode}</Alert>
                    :
                    null
                }

                {showInvalidPhone?
                    <Alert mode={'alertCard-red'}><i style={{marginRight:20,fontSize:30}} className="icon-cancel-circled"/>{msgErrorWithPhone}</Alert>
                    :
                    null
                }

                {showInvalidName?
                    <Alert mode={'alertCard-red'}><i style={{marginRight:20,fontSize:30}} className="icon-cancel-circled"/>{msgErrorWithName}</Alert>
                    :
                    null
                }
            </div>
        )
    }
}
