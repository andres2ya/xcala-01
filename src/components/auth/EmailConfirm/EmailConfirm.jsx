import {loadFromLocalStorage} from '../../../helpers/localStorage';
import React, { Component } from 'react'
import {connect} from 'react-redux';
import logoXcala from '../../../assets/logoXcala.png'
import {Link} from 'react-router-dom';
import {verifyEmail} from '../../../ducks/authDucks/authDuckSignUp';

class EmailConfirm extends Component {

    state=loadFromLocalStorage('newUser')
    
    componentDidMount=()=>{
        document.body.className='loginStyle'
        this.props.verifyEmail(this.props.actionCode)
    }

    render() {
        if(!this.props.successVerified)
        return (
            <div>
                <div className="seccionHeaderRegistro seccionRegistro">
                    <img className="signup-logo" src={logoXcala} alt="Xcala Colombia"/><span className="subtituloRegistro" >Registro</span>
                </div>
                <div className="seccionAUnPasoConXcala centerHorizontal">
                    <p className="AUnPasoTitulo">Ha ocurrido un error al momento de verificar tu correo. Es posible que haya sido verificado. En caso contrario, porfavor intenta nuevamente.</p> 
                </div>
                <div className="seccionBotonesEmailVerify centerHorizontal">
                    <Link to="/"><button>Ir al inicio</button></Link>
                </div>
            </div>
        )

        return (
            <div>
                <div className="seccionHeaderRegistro seccionRegistro">
                    <img className="signup-logo" src={logoXcala} alt="Xcala Colombia"/><span className="subtituloRegistro" >Registro</span>
                </div>

                <div className="seccionAUnPasoConXcala centerHorizontal">
                    <p className="AUnPasoTitulo">¡Felicidades <span>{this.state.nombreUsuario}!,</span> tu email ha sido confirmado.</p>
                    <p className="AUnPasoParrafo">Ya puedes comenzar a generar dinero extra con Xcala. Entra a tu cuenta para empezar.</p>
                </div>

                <div className="seccionBotonesEmailVerify centerHorizontal">
                    <Link to="/"><button>Entrar a mi cuenta</button></Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    successVerified:state.authSignUpReducer.successVerified
})

const mapDispatchToProps=(dispatch)=>{
    return{
        verifyEmail:(code)=>dispatch(verifyEmail(code))
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(EmailConfirm) 