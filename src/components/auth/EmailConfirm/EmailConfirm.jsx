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
                    <p className="AUnPasoTitulo">Ha ocurrido un error al momento de verificar tu correo. Porfavor ten en cuenta lo siguiente:</p>
                    <p className="AUnPasoParrafo">* Es posible que haya sido verificado. Por lo tanto te recomendamos ir al inicio de tu cuenta.</p>
                    <p className="AUnPasoParrafo">* Es posible que haya trasncurrido mas de 30 minutos desde que se solicito la confirmacion del correo. En este caso, ve a la pantalla de inicio, ingresa tus datos de acceso y te enviaremos un correo con un nuevo link de verificacion.</p>
                </div>
                
                <Link to="/"><button>Ir al inicio</button></Link>
                
            </div>
        )

        return (
            <div>
                <div className="seccionHeaderRegistro seccionRegistro">
                    <img className="signup-logo" src={logoXcala} alt="Xcala Colombia"/><span className="subtituloRegistro" >Registro</span>
                </div>

                <div className="seccionAUnPasoConXcala centerHorizontal">
                    {/* TODO: Leer el dato de nombre desde el userProfile en lugar del localstorage para evitar errores */}
                    <p className="AUnPasoTitulo">¡Felicidades <span>{'this.state.nombreUsuario'}!,</span> tu email ha sido confirmado.</p>
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
    successVerified:state.authSignUpReducer.successVerified,
    fire:state
})

const mapDispatchToProps=(dispatch)=>{
    return{
        verifyEmail:(code)=>dispatch(verifyEmail(code))
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(EmailConfirm) 