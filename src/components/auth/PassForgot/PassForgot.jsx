import React, { Component } from 'react'
import {connect} from 'react-redux'
import {recoveryPassword} from '../../../ducks/authDucks/authDuckRecoveryPassword'
import logoXcala from '../../../assets/logoXcala.png';
import './PassForgot.css'

class PassForgot extends Component {

    state={
        email:''
    }

    componentDidMount=()=>{
        document.body.className='loginStyle'
    }

    leerDatos=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    sendEmailToResetPass=()=>{
        const {recoveryPassword}= this.props
        const {email}= this.state
        recoveryPassword(email)
    }

    render() {
        return (
            <div>
                
                <img className="logo centerHorizontal" src={logoXcala} alt="Xcala Colombia"/>
                
                <div className="seccionAUnPasoConXcala centerHorizontal">
                    <p className="AUnPasoTitulo">Recupera tu contraseña</p>
                    <p className="AUnPasoParrafo">¿Olvidaste tu contraseña? Introduce el correo electronico que utilizaste para el registro. Te enviaremos instrucciones para crear una nueva contraseña.</p>
                </div>

                <div className="seccionSendPassEmail centerHorizontal">
                    <div className=" centerVertical" >
                            <i className="icon icon-arroba centerVertical"></i>
                            <input value={this.state.email} onChange={this.leerDatos} name="email" type="email"  placeholder="Correo de usuario" required autoComplete="off"/>
                    </div>
                    <div className="dividerSignUp centerHorizontal"></div>
                    <p className="AUnPasoParrafo">{this.props.msg}</p>
                </div>

                <div className="seccionBotonesEmailVerify centerHorizontal">

                    {this.props.emailHasBeenSent?
                    null:
                    <div>
                        <button onClick={this.sendEmailToResetPass} >Restablecer contraseña</button>
                    </div>} 

                    {this.props.emailHasBeenSent? 
                    <div>
                        <button>Reenviar correo</button>
                    </div>
                    :null}

                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    emailHasBeenSent:state.authRecoveryPasswordReducer.emailHasBeenSent,
    msg:state.authRecoveryPasswordReducer.msg   
})

const mapDispatchToProps=(dispatch)=>{
    return {
        recoveryPassword:(email)=>dispatch(recoveryPassword(email))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PassForgot)
