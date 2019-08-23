import React, { Component } from 'react'
import logoXcala from '../../../assets/logoXcala.png'

class EmailConfirm extends Component {
    componentDidMount=()=>{
        document.body.className='loginStyle'
    }

    render() {
        return (
            <div>
                <div className="seccionHeaderRegistro seccionRegistro">
                    <img className="signup-logo" src={logoXcala} alt="Xcala Colombia"/><span className="subtituloRegistro" >Registro</span>
                </div>

                <div className="seccionAUnPasoConXcala centerHorizontal">
                    <p className="AUnPasoTitulo">¡Felicidades!, <span>{'this.props.nameUser'}</span> tu email ha sido confirmado.</p>
                    <p className="AUnPasoParrafo">Ya puedes comenzar a generar dinero extra con Xcala. Vayamos a tu cuenta para empezar.</p>
                </div>

                <div className="seccionBotonesEmailVerify centerHorizontal">
                    <button>Ir a mi cuenta</button>
                </div>
            </div>
        )
    }
}
export default  EmailConfirm 