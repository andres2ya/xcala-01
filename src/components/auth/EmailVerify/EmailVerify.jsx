import React, { Component } from 'react'
import {connect} from 'react-redux';
import {sendEmailVerify} from '../../../ducks/authDucks/authDuckSignUp';
import logoXcala from '../../../assets/logoXcala.png';
import './EmailVerify.css'

class EmailVerify extends Component {

    componentDidMount=()=>{
        document.body.className='loginStyle'
    }

    retrySendVerifyEmail=()=>{
        const {sendEmailVerify,newUser}=this.props
        sendEmailVerify(newUser)
    }

    render() {
        return (
            <div>
                <div className="seccionHeaderRegistro seccionRegistro">
                    <img className="signup-logo" src={logoXcala} alt="Xcala Colombia"/><span className="subtituloRegistro" >Registro</span>
                </div>

                <div className="seccionAUnPasoConXcala centerHorizontal">
                    <p className="AUnPasoTitulo">Estas a un paso de comenzar a generar ingresos adicionales con Xcala</p>
                    <p className="AUnPasoParrafo">Un correo de confirmacion ha sido enviado a: <span className="email">{this.props.newUser.email}</span>. Porfavor revisa tu bandeja de entrada o correo no deseado y confirma mediante el enlace enviado.</p>
                </div>

                <div className="seccionBotonesEmailVerify centerHorizontal">
                    <button onClick={this.retrySendVerifyEmail}>Reenviar correo</button>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        sendEmailVerify:(newUser)=>dispatch(sendEmailVerify(newUser))
    }
}
export default  connect(null,mapDispatchToProps)(EmailVerify)