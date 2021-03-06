import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import firebase from "firebase/app";
import './SignUpContainer.css'
import ButtonLogin from '../Layouts/ButtonLogin/ButtonLogin'
import logoXcala from './../../../assets/logoXcala_180w_SVG_azul.svg'
import SignUpForm from './SignUp-Form/SignUpForm'
import SignUpVerifySMSCode from './SignUp-VerifySMS-Code/SignUpVerifySMSCode'
import {CSSTransition} from 'react-transition-group'
import Alert from './../../11-Alert/Alert'
import EllipsisDownloading from './../../layout/EllipsisDownloading/EllipsisDownloading'
import {identifyAndReturnMsgError} from './../../../helpers/errorsHandler'
import {saveInLocalStorage,loadFromLocalStorage,removeFromLocalStorage} from './../../../helpers/localStorage'
import SuccessScreen from '../../16-SuccessScreen/SuccessScreen';
import Modal from '../../12-Modal/Modal';
import ModalSuccessScreen from '../../16-SuccessScreen/ModalSuccessScreen/ModalSuccessScreen';
import Questionnaire from '../../15-Questionnaire/Questionnaire';

export default class SignUpContainer extends Component {
    state={
        sendCode:false,
        showSpinner:false,
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
        acceptedTyC:true,
        creatingUserText:null,
        showResendCodeAlert:false,
        loginSuccess:false,
    }

    

    componentDidMount=()=>{
        //NOTE:1. Creando objecto recaptcha cuando el componente es montado. Para que funcione, el elemento con id=signIn_RecaptchaButton debe estar renderizado correctamente.
        //Es objeto, contiene un callback que sera la funcion que se ejecutara al presionar el boton asignado
        window.XcalaSendingCode=false
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



    componentWillUnmount=()=>{
        clearTimeout(window.XcalaResendCodeAlert_setTimeout)
        clearTimeout(window.XcalaRedirectToProducts_setTimeout)
    }


    //NOTE: 3. Se leen los datos como numero de telefono y nombre usuario
    leerDatos=(e)=>{
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value,
            showInvalidCodeError:false,msgErrorWithCode:'',
            showInvalidPhone:false,msgErrorWithPhone:'',
            showInvalidName:false,msgErrorWithName:'',
        })
    }



    toogleAcceptedTyC=()=>{
        this.setState({acceptedTyC:!this.state.acceptedTyC})
    }
    


    showSpinner=(e)=>{
        console.log('show spinner while recaptcha is successfully passed...')
        this.setState({
            showSpinner:true,
            showInvalidCodeError:false,msgErrorWithCode:'',
            showInvalidPhone:false,msgErrorWithPhone:'',
            showInvalidName:false,msgErrorWithName:''
        })
    }



    //NOTE: 4. LUEGO, al presionar btn con id=signIn_RecaptchaButton, se ejecuta el callback del recaptcha
    onCodeSubmit=(downCountToResend)=>{
        if(this.state.acceptedTyC===true){
            if(this.state.phoneNumber.length>0 && this.state.userName.includes(' ') && window.XcalaSendingCode===false){
                window.XcalaSendingCode=true
                let phoneNumber=`+1${this.state.phoneNumber}`
                let appVerifier=window.XcalaRecaptchaVerifier
        
                firebase.auth().signInWithPhoneNumber(phoneNumber,appVerifier)
                .then((confirmationResult)=>{
                    console.log('SMS enviado con exito!, enviando al usuario a la pantalla para ingresar codigo...')
                    window.XcalaConfirmationResult=confirmationResult
                    this.setState({sendCode:true,showSpinner:false})
                    window.XcalaSendingCode=false
                    if(downCountToResend){downCountToResend()}
                })
                .catch((err)=>{
                    console.log('error:',err)
                    let error=identifyAndReturnMsgError(err.code)
                    window.XcalaRecaptchaVerifier.reset(window.recaptchaWidgetId)
                    this.setState({sendCode:false,showSpinner:false,showInvalidPhone:true,msgErrorWithPhone:error})
                    window.XcalaSendingCode=false
                })
            }else if(this.state.phoneNumber.length===0){
                window.XcalaRecaptchaVerifier.reset(window.recaptchaWidgetId)
                this.setState({showSpinner:false,showInvalidPhone:true,msgErrorWithPhone:'No has introducido un numero de telefono valido.'})
            }else if(this.state.userName.includes(' ')===false){
                window.XcalaRecaptchaVerifier.reset(window.recaptchaWidgetId)
                this.setState({showSpinner:false,showInvalidName:true,msgErrorWithName:'No has introducido tu apellido'})
            }else{
                console.log('Existe un envio de codigo en proceso...')
            }
        }else{
            window.XcalaRecaptchaVerifier.reset(window.recaptchaWidgetId)
            this.setState({showSpinner:false})
            alert('Debes aceptar de manera expresa e informada los Terminos & Condiciones y la Politica de tratamiento de datos personales para poder crear una cuenta en Xcala')
        }
    }


    
    //NOTE: 4.5. Opcion de reenviar codigo
    reenviarCodigo=(downCountToResend)=>{
        if(window.XcalaRecaptchaVerifier_button_id==='signIn_RecaptchaButton_resend'){
            // console.log('ya se monto en "signIn_RecaptchaButton_resend", por lo tanto solamente se va es a resetear')        
            window.XcalaRecaptchaVerifier.reset(window.recaptchaWidgetId)
            
        }else{
            // console.log('Es la primera vez que se pide reenviar, por lo tanto se va a montar el recaptcha en "signIn_RecaptchaButton_resend"')       
            window.XcalaRecaptchaVerifier_button_id='signIn_RecaptchaButton_resend'
            window.XcalaRecaptchaVerifier=null
            window.recaptchaWidgetId=null
            firebase.auth().useDeviceLanguage()
            window.XcalaRecaptchaVerifier= new firebase.auth.RecaptchaVerifier('signIn_RecaptchaButton_resend',{
                'size':'invisible',
                'callback': (res)=>{
                    if(window.XcalaIsPosibleToResendCode===true){
                        this.onCodeSubmit(downCountToResend)
                        this.showSpinner()
                        this.setState({showResendCodeAlert:true,smsCode:''})
                        window.XcalaResendCodeAlert_setTimeout=setTimeout(() => {
                            this.setState({showResendCodeAlert:false})
                        }, 10000);
                    }else{
                        console.log('No se puede enviar sms ya que no ha terminado la cuenta regresiva')
                    }
                }
            })
            window.XcalaRecaptchaVerifier.render().then((widgetId)=>{
                window.recaptchaWidgetId = widgetId;
            });
        }
    }


    //NOTE: 5. Usa el metodo firebase.auth.PhoneAuthProvider.credential(window.XcalaConfirmationResult.verificationId,code) para confirmar si el codigo es correcto y devolver informacion del usuario,
    //por ejemplo, en este caso, si es existente o o no. Y posteriormente llama a crearUsuarioEnFirestore para crear un doc con los datos del usuario en caso que sea nuevo.
    //al terminar, si es existente redirije a/products, si no entonces lo envia a /questionnaire.
    verificarCodigoSMS=(e)=>{
        console.log('sendindg code')
        e.preventDefault()
        this.showSpinner()
        this.setState({creatingUserText:'Verificando...'})

        let code=this.state.smsCode
        if(code.length>0){
            let credential = firebase.auth.PhoneAuthProvider.credential(window.XcalaConfirmationResult.verificationId,code)
            console.log(credential)
            firebase.auth().signInWithCredential(credential)
            .then(res=>{
                console.log('res',res)
                if(res.additionalUserInfo.isNewUser===true){
                    //NOTE: Crear usuario con firestore
                    // this.setState({creatingUserText:`${this.state.userName}, tu cuenta ha sido creada con exito!`})
                    saveInLocalStorage('successCreatedUser',{successSignup:true,successFirestoreSetDoc:false})
                    this.crearUsuarioEnFirestore(res.user.uid)
                }else{
                    let successCreatedUser = loadFromLocalStorage('successCreatedUser')
                    if(successCreatedUser.successSignup===true && successCreatedUser.successFirestoreSetDoc===true){
                        console.log('Cuando se hizo el signup el usuario fue creado con total exito')
                        // NOTE: Redirigir al main page/products
                        this.setState({creatingUserText:`Nos alegra tenerte de vuelta, te estamos redirigiendo al Main page.`})
                        window.XcalaRedirectToProducts_setTimeout=setTimeout(() => {
                            // window.location.href='/products'
                            // window.location.href=`/success${this.state.userName}`
                            this.setState({loginSuccess:true})
                        }, 700);
                    }else{
                        console.log('El usuario no fue creado con exito, debio ocurrir algun fallo al crear en base de datos firestore, por lo cual lanza nuevamente la funcion de crear en firestore')
                        this.crearUsuarioEnFirestore(res.user.uid)
                    }
                }
            })
            .catch(err=>{
                console.log(err)
                let error=identifyAndReturnMsgError(err.code)
                this.setState({showSpinner:false,showInvalidCodeError:true,msgErrorWithCode:error})
            })
        }else{
            this.setState({showSpinner:false,showInvalidCodeError:true,msgErrorWithCode:'No has ingresado un codigo de verificacion'})
        }
    }



    crearUsuarioEnFirestore=(uid)=>{
        firebase.firestore().collection('users').doc(uid).set({
            uid:uid,
            phoneNumber:`+57${this.state.phoneNumber}`,
            userName:this.state.userName,
            creationDate:new Date(),
            role:'vendedor',
        })
        .then(res=>{
            console.log('usuario creado exitosamente',res)
            saveInLocalStorage('successCreatedUser',{successSignup:true,successFirestoreSetDoc:true})
            //NOTE: Redirigir a formulario opcional
            // window.location.href=`/questionnaire${this.state.userName}`
            // window.location.href=`/success${this.state.userName}`
            this.setState({loginSuccess:true})
        })
        .catch(err=>{
            //NOTE: Solo se entra a este catch si se llama crearUsarioEnFirestore por fuera de un then. Es decir, si se llama directamente.
            console.log('Error reportado desde creandoUsuarioEnFirestore!')
        })
    }
    











    render() {
        const {loginSuccess,userName,showSpinner,sendCode,showInvalidCodeError,msgErrorWithCode,showInvalidPhone,msgErrorWithPhone,showInvalidName,msgErrorWithName,creatingUserText,showResendCodeAlert}=this.state
        
        if(loginSuccess===true){
        // return <Questionnaire userName={userName}/>
        return <Redirect to={`/questionnaire${userName}`}></Redirect>
        }
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

                    
                
                    <div className="rowFormAndVerifyCode">
                        {showSpinner?
                            <div className="row">
                                <div className="showSpinner_signUp col-12 d-flex justify-content-center align-items-center">
                                    <div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <EllipsisDownloading/>
                                        </div>
                                        {creatingUserText?
                                        <div className="d-flex justify-content-center align-items-center" 
                                             style={{textAlign:'center',lineHeight:1,color:'#10174b'}}>
                                            {creatingUserText}
                                        </div>
                                        :null}
                                    </div>
                                </div>
                            </div>
                        :
                        null}


                        {sendCode?
                            <CSSTransition key={1}in={true}appear={true}timeout={1000}classNames="fade">
                                <SignUpVerifySMSCode reenviarCodigo={this.reenviarCodigo} showInvalidCodeError={showInvalidCodeError} verificarCodigoSMS={this.verificarCodigoSMS} valueCode={this.state.smsCode} leerDatos={this.leerDatos}/>
                            </CSSTransition>
                        :                        
                            <CSSTransition key={2}in={true}appear={true}timeout={1000}classNames="fade">
                                <SignUpForm toogleAcceptedTyC={this.toogleAcceptedTyC} showSpinner={this.showSpinner} showInvalidPhone={showInvalidPhone} showInvalidName={showInvalidName}  showSignInButton={this.state.showSignInButton} valuePhoneNumber={this.state.phoneNumber} valueUserName={this.state.userName} leerDatos={this.leerDatos}/>
                            </CSSTransition>   
                        }
                    </div>
                    
                </div>



                {showInvalidCodeError?<Alert mode={'alertCard-red'}><i style={{marginRight:20,fontSize:30}} className="icon-cancel-circled"/>{msgErrorWithCode}</Alert>:null}
                {showInvalidPhone?<Alert mode={'alertCard-red'}><i style={{marginRight:20,fontSize:30}} className="icon-cancel-circled"/>{msgErrorWithPhone}</Alert>:null}
                {showInvalidName?<Alert mode={'alertCard-red'}><i style={{marginRight:20,fontSize:30}} className="icon-cancel-circled"/>{msgErrorWithName}</Alert>:null}
                {showResendCodeAlert?<Alert mode={'alertCard-green'}><i style={{marginRight:20,fontSize:30}} className="icon-check-circle"/>{'Se ha reenviado el codigo de confirmacion.'}</Alert>:null}
            
                
            </div>
        )
    }
}
