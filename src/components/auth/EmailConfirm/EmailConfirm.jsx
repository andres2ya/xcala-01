import React, { Component } from 'react'
import {connect} from 'react-redux';
import logoXcala from '../../../assets/logoXcala.png'
import {Link} from 'react-router-dom';
import {verifyEmail} from '../../../ducks/authDucks/authDuckSignUp';

class EmailConfirm extends Component {
    
    componentDidMount=()=>{
        document.body.className='loginStyle'
        this.props.verifyEmail(this.props.actionCode)
    }

    render() {
        if(!this.props.successVerified)
        return (
            <div className={`auth simpleMessageScreen centerHorizontal ${this.props.showPreloader===true?'preloaderOn':null}`}>
                <div className="logoWithSubtitle" >
                    <img className="authLogoLeft" src={logoXcala} alt="Xcala Colombia"/>
                    <span>Registro</span>
                </div>

                <div className="simpleMessage">
                    <p className="authTitle">Ha ocurrido un error al momento de verificar tu correo. Porfavor ten en cuenta lo siguiente:</p>
                    <p className="authParagraph">* Es posible que haya sido verificado. Por lo tanto te recomendamos ir al inicio de tu cuenta.</p>
                    <p className="authParagraph">* Es posible que haya trasncurrido mas de 30 minutos desde que se solicito la confirmacion del correo. En este caso, ve a la pantalla de inicio, ingresa tus datos de acceso y te enviaremos un correo con un nuevo link de verificacion.</p>
                </div>
                
                <Link to="/"><button>Ir al inicio</button></Link>
                
            </div>
        )

        return (
            <div className={`auth simpleMessageScreen centerHorizontal ${this.props.showPreloader===true?'preloaderOn':null}`}>
                <div className="logoWithSubtitle" >
                    <img className="authLogoLeft" src={logoXcala} alt="Xcala Colombia"/>
                    <span>Registro</span>
                </div>

                <div className="simpleMessage">
                    <p className="authTitle">¡Felicidades <span>{this.props.nombreUsuario}!,</span> tu email ha sido confirmado.</p>
                    <p className="authParagraph">Ya puedes comenzar a generar dinero extra con Xcala. Entra a tu cuenta para empezar.</p>
                </div>

                 <Link to="/"><button>Entrar a mi cuenta</button></Link>
                
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    successVerified:state.authSignUpReducer.successVerified,
    nombreUsuario:state.firebase.profile.nombreUsuario,
    showPreloader:state.preloaderReducer.showPreloader,
})

const mapDispatchToProps=(dispatch)=>{
    return{
        verifyEmail:(code)=>dispatch(verifyEmail(code))
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(EmailConfirm) 