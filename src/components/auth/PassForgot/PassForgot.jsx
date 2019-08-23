import React, { Component } from 'react'
import logoXcala from '../../../assets/logoXcala.png';

class PassForgot extends Component {
    componentDidMount=()=>{
        document.body.className='loginStyle'
    }

    render() {
        return (
            <div>
                
                <img className="logo centerHorizontal" src={logoXcala} alt="Xcala Colombia"/>
                
                <div className="seccionAUnPasoConXcala centerHorizontal">
                    <p className="AUnPasoTitulo">Recupera tu contraseña</p>
                    <p className="AUnPasoParrafo">¿Olvidaste tu contraseña? Te hemos enviado un correo electronico con instrucciones para crear una nueva contraseña.</p>
                </div>

                <div className="seccionBotonesEmailVerify centerHorizontal">
                    <button>Reenviar correo</button>
                </div>
            </div>
        )
    }
}
export default  PassForgot
