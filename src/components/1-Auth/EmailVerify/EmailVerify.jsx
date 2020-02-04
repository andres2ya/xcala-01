import React, { Component } from 'react'
import {connect} from 'react-redux';
import {sendEmailVerify} from '../../../ducks/authDucks/authDuckSignUp';
import logoXcala from '../../../assets/logoXcala.png';

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
            <div className="auth simpleMessageScreen centerHorizontal">
                <div className="logoWithSubtitle" >
                    <img className="authLogoLeft" src={logoXcala} alt="Xcala Colombia"/>
                    <span>Registro</span>
                </div>

                <div className="simpleMessage">
                    <p className="authTitle">Estas a un paso de comenzar a generar ingresos adicionales con Xcala</p>
                    <p className="authParagraph">Un correo de confirmacion ha sido enviado a: <span className="boldText">{this.props.newUser.emailSignUp}</span>. Porfavor revisa tu bandeja de entrada o correo no deseado y confirma mediante el enlace enviado.</p>
                </div>

                <button onClick={this.retrySendVerifyEmail}>Reenviar correo</button>
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