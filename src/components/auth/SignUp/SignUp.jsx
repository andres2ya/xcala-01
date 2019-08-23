import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {signUp} from '../../../ducks/authDucks/authDuckSignUp'
import logoXcala from '../../../assets/logoXcala.png';
import Checkbox from '../../../components/layout/Checkbox/Checkbox';
import './SignUp.css';

class SingUp extends Component {
    
    componentDidMount=()=>{
        document.body.className='loginStyle'
    }

    state={
        email:'',
        password:'',
        nombre:'',
        apellido:'',
        cedula:''
    }

    leerDatos=(e)=>{
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    crearUsuario=(e)=>{
        e.preventDefault()
        const {signUp} =this.props
        signUp(this.state)
    }

    render() {
        return (
            <div className="seccionRegistro">

                <div className="seccionHeaderRegistro">
                    <img className="signup-logo" src={logoXcala} alt="Xcala Colombia"/><span className="subtituloRegistro" >Registro</span>
                </div>

                <p className="labelDatos">Datos de la cuenta</p>
                <div className="seccionDatosCuentaRegistro">
                    <div className=" centerVertical" >
                        <i className="icon icon-arroba centerVertical"></i>
                        <input type="email" id="emailSignUp"  placeholder="Correo de usuario" required autoComplete="off"/>
                    </div>
                    <div className="dividerSignUp centerHorizontal"></div>
                    <div className=" centerVertical" >
                        <i className="icon icon-locked centerVertical "></i>
                        <input type="password" id="passwordSignUp"  placeholder="Contraseña" required autoComplete="off"/>
                    </div>
                    <div className="dividerSignUp centerHorizontal"></div>
                    <div className=" centerVertical" >
                        <i className="icon icon-locked centerVertical "></i>
                        <input type="password" id="passwordSignUp"  placeholder="Repetir contraseña" required autoComplete="off"/>
                    </div>
                </div>

                <p className="labelDatos">Datos personales</p>
                <div className="seccionDatosPersonalesRegistro">
                    <div className=" centerVertical" >
                            <input type="text" id="nombreUsuario"  placeholder="Nombre" required autoComplete="off"/>
                    </div>
                    <div className="dividerSignUp centerHorizontal"></div>
                    <div className=" centerVertical" >
                            <input type="text" id="apellidosUsuario"  placeholder="Apellidos" required autoComplete="off"/>
                    </div>
                    <div className="dividerSignUp centerHorizontal"></div>
                    <div className=" centerVertical" >
                            <div className="placeholder">Fecha nacimiento:</div>
                            <input type="date" id="fechaNacimientoUsuario" required autoComplete="off"/>
                    </div>
                    <div className="dividerSignUp centerHorizontal"></div>
                    <div className=" centerVertical" >
                            <input type="number" id="cedulaUsuario" placeholder="Numero de cedula" required autoComplete="off"/>
                    </div>
                    <div className="dividerSignUp centerHorizontal"></div>
                    <div className=" centerVertical" >
                            <select type="text" id="ciudadUsuario" placeholder="Ciudad de residencia" required autoComplete="off">
                                <option value="" disabled selected>Ciudad de residencia</option>
                                <option value="Bogota">Bogota</option>
                                <option value="Cucuta">Cucuta</option>
                            </select>
                    </div>
                    <div className="dividerSignUp centerHorizontal"></div>
                    <div className=" centerVertical" >
                            <input type="number" id="celularUsuario" placeholder="Numero de celular" required autoComplete="off"/>
                    </div>
                </div>

                <div className="seccionEnviarRegistro ">
                    <Checkbox styleBox={'boxSignUp'} styleCheck={'checkSignUp'} text={'Acepto los'} 
                    link={'/Terminos&condiciones'} textLink={'Terminos y condiciones'}  id={'aceptoRegistroCheck'}/>
                    <Link to="/emailverify"><button>Registrar</button></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    mensaje:state.authSignUpReducer.msg
})

const mapDispatchToProps=(dispatch)=>{
    return{
        signUp:(newUser)=>dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingUp)