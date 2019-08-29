import React, { Component } from 'react'
import {loadFromLocalStorage} from '../../../helpers/localStorage';
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom';
import {signIn,keepSesion,handleErrorMsg,logOut} from '../../../ducks/authDucks/authDuckLogin'
import {recoveryPassword} from '../../../ducks/authDucks/authDuckRecoveryPassword'
import {sendEmailVerify} from '../../../ducks/authDucks/authDuckSignUp';
import logoXcala from '../../../assets/logoXcala.png';
import '../auth.css';
import Checkbox from '../../../components/layout/Checkbox/Checkbox';
import EmailVerify from '../EmailVerify/EmailVerify';


class Login extends Component {
    
    state={
        email:'', 
        password:'',
        isRetrySendEmailVerify:false,
        newUser:loadFromLocalStorage('newUser')
    }

    componentDidMount=()=>{
        document.body.className='loginStyle'
        //En el caso que entre a login desde la pantalla de confirmacion de correo verificado, 
        //entonces primero: hace signout, para luego permitir entrar a la cuenta y que el emailVerified cambie a true.
        //como en EmailConfirm sea actualiza el successVerified cuando se confirma el codigo (ApplyActionCode) entonces aca 
        //lo llamo para determinar cuando se esta mandando a renderizar el Login desde el EmailConfirm
        const {successVerified,logOut}=this.props
        if(successVerified){
            logOut()
            this.setState({
                email:this.state.newUser.emailSignUp
            })
        }
    }

    componentDidUpdate=(prevProps)=>{
        const {tryLogin,retry,errorBool}=this.props
        if(retry===true && tryLogin===false){
            this.props.handleErrorMsg(null,false,false)
        }
        if(prevProps.errorBool!==errorBool){
            this.setState({
                 email:'',
                 password:''
            })
        }
    }

    leerDatos=(e)=>{
        if(this.props.tryLogin===true){
            this.props.handleErrorMsg(true,false)
        }
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    iniciarSesion=(e)=>{
        e.preventDefault()
        const {signIn} = this.props
        if(this.props.isKeepOptionManuallySet===false){
            this.props.keepSesion(false)
        }
        signIn(this.state)
    }

    resetPassword=(e)=>{
        e.preventDefault()
        this.props.recoveryPassword(this.state.email)
    }

    retrySendEmailVerification=(e)=>{
        e.preventDefault()
        const {sendEmailVerify}=this.props
        sendEmailVerify(this.state.newUser)
        this.setState({
            isRetrySendEmailVerify:true
        })
    }

    render() {
        if(this.state.isRetrySendEmailVerify===true){
             return <EmailVerify newUser={this.state.newUser}/>
        }else if(this.props.isAuthWithEmailVerified){
             return <Redirect to="/myaccount"/>
        }else{
        
        return (
            <div className="auth loginScreen centerHorizontal">
                <img className="authLogoCenter" src={logoXcala} alt="Xcala Colombia"/>
                <form className="formLogin" id="seccionIngresar">
                    <div className="centerVerticalAndHorizontal">
                        <i className="icon icon-arroba centerVertical"></i>
                        <input value={this.state.email} onChange={this.leerDatos} type="email" name="email"  placeholder="Correo de usuario" required autoComplete="off"/>
                    </div>
                    
                    <div className="grossInputDivider centerHorizontal"/>

                    <div className="centerVerticalAndHorizontal">
                        <i className="icon icon-locked centerVertical "></i>
                        <input value={this.state.password} onChange={this.leerDatos} type="password" name="password"  placeholder="Contraseña" required autoComplete="off"/>
                    </div>
                    

                    <div className="errorMsg centerHorizontal">
                        {this.props.tryLogin? <p>{this.props.errorEspañol}</p>
                        :
                        null}
                        
                        {this.props.isAuthWithEmailVerified===true || this.props.isAuth===undefined?
                        null
                        :
                        <div onClick={this.retrySendEmailVerification}>
                            <p id="linkReenviar">Tu cuenta ha sido creada pero aun no ha sido verificada.</p>
                            <a className="link boldText">Haz click para reenviar correo de verificacion</a>
                        </div>
                        }
                    </div>

                    <button onClick={this.iniciarSesion} type="submit">Ingresar</button>
                </form>

                <Checkbox mode={'keepSesion'} link={null} styleBox={'box'} styleCheck={'check'} text={'Recordarme'} id={'recordarmeCheck'}/>
                <Link className="centerText boldText centerHorizontal" to="/passforgot" > <span className="link">Olvide mi contraseña</span> </Link>
                
                <div className="registerHook" >
                    <p className="authSubtitle">¿Deseas generar ingresos extra en tu tiempo libre?</p>
                    <Link to="/signup"><button  type="button" className="button">Hazlo con Xcala</button></Link>
                </div>
            </div>
        )
        }
    }

}

const mapStateToProps=(state)=>({
    errorEspañol:state.authLoginReducer.errorEspañol,
    authSuccess:state.authLoginReducer.authSuccess,
    retry:state.authLoginReducer.retry,
    tryLogin:state.authLoginReducer.tryLogin,
    errorBool:state.authLoginReducer.errorBool,
    keep:state.authLoginReducer.keep,
    isAuth:state.firebase.auth.uid,
    isAuthWithEmailVerified:state.firebase.auth.emailVerified,
    successVerified:state.authSignUpReducer.successVerified,
    isKeepOptionManuallySet:state.authLoginReducer.isKeepOptionManuallySet,
    fire:state
})

const mapDispatchToProps=(dispatch)=>{
    return {
        signIn:(creds)=>dispatch(signIn(creds)),
        recoveryPassword:(email)=>dispatch(recoveryPassword(email)),
        handleErrorMsg:(retry,tryLogin)=>dispatch(handleErrorMsg(retry,tryLogin)),
        keepSesion:(option)=>dispatch(keepSesion(option)),
        sendEmailVerify:(newUser)=>dispatch(sendEmailVerify(newUser)),
        logOut:()=>dispatch(logOut())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)


