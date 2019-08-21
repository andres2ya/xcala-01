import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {signIn,keepSesion,logOut} from '../../ducks/authDucks/authDuckLogin'
import {recoveryPassword} from '../../ducks/authDucks/authDuckRecoveryPassword'
import {changePassword,sendVerificationToChangeEmail} from '../../ducks/authDucks/authUpdatePassAndEmailDuck'
import logoXcala from '../../assets/logoXcala.png';
import '../../styles/Login.css';
import Checkbox from '../layout/Checkbox/Checkbox';




class Login extends Component {
    
    componentDidMount=()=>{
        document.body.className='loginStyle'
    }

    state={
        email:'', 
        password:'',
        keep:'No',
        newPassword:'',
        newEmail:''
    }


    leerDatos=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state.keep)
    }

    go=(e)=>{
        e.preventDefault()
        const {keepSesion}=this.props
        const {keep}=this.state
        keepSesion(keep)
    }

    iniciarSesion=(e)=>{
        e.preventDefault()
        console.log('iniciar sesion')
        console.log(this.props.estado)
        const {signIn} = this.props
        signIn(this.state)
        this.setState({
            email:'',
            password:''
        })
    }

    check=(e)=>{
        e.preventDefault()
        console.log(this.props.fire)
    }

    resetPassword=(e)=>{
        e.preventDefault()
        this.props.recoveryPassword(this.state.email)
    }

    cambiarContraseña=(e)=>{
        e.preventDefault()
        this.props.changePassword(this.state.confirmCurrentPassword,this.state.newPassword)
    }

    cambiarEmail=(e)=>{
        e.preventDefault()
        this.props.sendVerificationToChangeEmail(this.state.newEmail)
    }

    render() {
        return (
            <div>

                <img className="logo center" src={logoXcala} alt="Xcala Colombia"/>
                <div id="seccionIngresar">
                    <div className="center" id="inputEmail">
                        <i className="fas fa-at textWhiteCenter"></i>
                        <input type="email" id="email"  placeholder="Correo de usuario" required autoComplete="off"/>
                    </div>
                    <div className="divider center"></div>
                    <div className="center" id="inputPassword">
                        <i className="fas fa-unlock-alt textWhiteCenter"></i>
                        <input type="password" id="password"  placeholder="Contraseña" required autoComplete="off"/>
                    </div>
                </div>
                <button  type="submit" className="button">Ingresar</button>


                <Checkbox />
                <Link className="textWhiteCenter center" to="/hola" > <span className="subrayar">Olvide mi contraseña</span> </Link>
                
                <div id="seccionIngresosExtra" >
                    <p className="textWhiteCenter">¿Deseas generar ingresos extra en tu tiempo libre?</p>
                    <button  type="button" className="button">Hazlo con Xcala</button>
                </div>
            </div>
        )
    }

}

const mapStateToProps=(state)=>({
    authError:state.authLoginReducer.authError,
    authSuccess:state.authLoginReducer.authSuccess,
    fire:state
})

const mapDispatchToProps=(dispatch)=>{
    return {
        signIn:(creds)=>dispatch(signIn(creds)),
        recoveryPassword:(email)=>dispatch(recoveryPassword(email)),
        logOut:()=>dispatch(logOut()),
        keepSesion:(option)=>dispatch(keepSesion(option)),
        changePassword:(confirmCurrentPassword,newPass)=>dispatch(changePassword(confirmCurrentPassword,newPass)),
        sendVerificationToChangeEmail:(newEmail)=>dispatch(sendVerificationToChangeEmail(newEmail))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Login)


