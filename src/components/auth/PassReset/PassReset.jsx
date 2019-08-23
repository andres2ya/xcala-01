import React, { Component } from 'react'
import logoXcala from '../../../assets/logoXcala.png';
import './PassReset.css'

class PassReset extends Component {
    componentDidMount=()=>{
        document.body.className='loginStyle'
    }

    render() {
        return (
            <div>
                
                <img className="logo centerHorizontal" src={logoXcala} alt="Xcala Colombia"/>
                
                <div className="seccionAUnPasoConXcala centerHorizontal">
                    <p className="AUnPasoTitulo">Recupera tu contraseña</p>
                    <p className="AUnPasoParrafo">Porfavor introduce una nueva contraseña:</p>
                </div>

                <div className="seccionBtnInputPassReset centerHorizontal">
                    <div className=" centerVertical centerHorizontal" id="inputPassword">
                        <i className="icon icon-locked centerVertical "></i>
                        <input type="password" id="newPassword"  placeholder="Nueva contraseña" required autoComplete="off"/>
                    </div>
                    <div className="divider"></div>
                    <div className="separadorBtn"/>
                    <button>Restablecer contraseña</button>
                </div>
            </div>
        )
    }
}
export default  PassReset