import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom';
import {signIn,keepSesion,handleErrorMsg} from '../../../ducks/authDucks/authDuckLogin'
import {recoveryPassword} from '../../../ducks/authDucks/authDuckRecoveryPassword'
import logoXcala from '../../../assets/logoXcala.png';
import './Login.css';
import Checkbox from '../../../components/layout/Checkbox/Checkbox';


class Login extends Component {
    
    state={
        email:'', 
        password:''
    }

    componentDidMount=()=>{
        document.body.className='loginStyle'     
    }

    componentDidUpdate=(prevProps)=>{
        const {tryLogin,retry,errorBool}=this.props
        if(retry===true && tryLogin===false){
            this.props.handleErrorMsg(false,false)
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

    render() {

        if(this.props.isAuthWithEmailVerified)
        return <Redirect to="/myaccount"/>

        return (
            <div>

                <img className="logo centerHorizontal" src={logoXcala} alt="Xcala Colombia"/>
                <form id="seccionIngresar">
                    <div className=" centerVertical centerHorizontal" id="inputEmail">
                        <i className="icon icon-arroba centerVertical"></i>
                        <input value={this.state.email} onChange={this.leerDatos} type="email" name="email"  placeholder="Correo de usuario" required autoComplete="off"/>
                    </div>

                    <div className="divider centerHorizontal"></div>

                    <div className=" centerVertical centerHorizontal" id="inputPassword">
                        <i className="icon icon-locked centerVertical "></i>
                        <input value={this.state.password} onChange={this.leerDatos} type="password" name="password"  placeholder="Contraseña" required autoComplete="off"/>
                    </div>

                    <div id="authError" className="errorMsg centerHorizontal">
                        {this.props.tryLogin? <p>{this.props.authError}</p>:null}
                        {this.props.isAuthWithEmailVerified===true || this.props.isAuth===undefined?null:<p>Tu cuenta ha sido creada pero aun no ha sido verificada.</p>}
                    </div>

                    <button onClick={this.iniciarSesion} type="submit" className="button">Ingresar</button>
                </form>

                <Checkbox mode={'keepSesion'} link={null} styleBox={'box'} styleCheck={'check'} text={'Recordarme'} id={'recordarmeCheck'}/>
                <Link className="textWhiteCenter centerHorizontal" to="/passforgot" > <span className="subrayar">Olvide mi contraseña</span> </Link>
                
                <div id="seccionIngresosExtra" >
                    <p className="textWhiteCenter">¿Deseas generar ingresos extra en tu tiempo libre?</p>
                    <Link to="/signup"><button  type="button" className="button">Hazlo con Xcala</button></Link>
                </div>
            </div>
        )
    }

}

const mapStateToProps=(state)=>({
    authError:state.authLoginReducer.authError,
    authSuccess:state.authLoginReducer.authSuccess,
    retry:state.authLoginReducer.retry,
    tryLogin:state.authLoginReducer.tryLogin,
    errorBool:state.authLoginReducer.errorBool,
    keep:state.authLoginReducer.keep,
    isAuth:state.firebase.auth.uid,
    isAuthWithEmailVerified:state.firebase.auth.emailVerified,
    isKeepOptionManuallySet:state.authLoginReducer.isKeepOptionManuallySet,
    fire:state
})

const mapDispatchToProps=(dispatch)=>{
    return {
        signIn:(creds)=>dispatch(signIn(creds)),
        recoveryPassword:(email)=>dispatch(recoveryPassword(email)),
        handleErrorMsg:(retry,tryLogin)=>dispatch(handleErrorMsg(retry,tryLogin)),
        keepSesion:(option)=>dispatch(keepSesion(option))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)


