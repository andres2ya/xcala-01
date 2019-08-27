import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signUp} from '../../../ducks/authDucks/authDuckSignUp'
import EmailVerify from '../EmailVerify/EmailVerify';
import logoXcala from '../../../assets/logoXcala.png';
import Checkbox from '../../../components/layout/Checkbox/Checkbox';
import './SignUp.css';

class SingUp extends Component {
    
    componentDidMount=()=>{
        document.body.className='loginStyle'
    }

    state={
        emailSignUp:'',
        passwordSignUp:'',
        repeatPasswordSignUp:'',
        nombreUsuario:'',
        apellidosUsuario:'',
        fechaNacimientoUsuario:'',
        cedulaUsuario:'',
        ciudadUsuario:'',
        celularUsuario:'',
        incoherentEmail:false
    }

    leerDatos=(e)=>{
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    crearUsuario=(e)=>{
        e.preventDefault()
        var form = document.querySelector('#registerForm')
        var reportVal=form.reportValidity()
    
        if(this.state.passwordSignUp===this.state.repeatPasswordSignUp && reportVal===true){
            const {signUp} =this.props
            signUp(this.state)
        }else{
            console.log('las contraseñas no coinciden')
            this.setState({
                incoherentEmail:true
            })
        }
    }

    render() {
        return (
            
            <div>
                {this.props.showEmailVerify?
                    <EmailVerify newUser={this.state}/>
                :
                <div className="seccionRegistro">
                    <div className="seccionHeaderRegistro">
                        <img className="signup-logo" src={logoXcala} alt="Xcala Colombia"/><span className="subtituloRegistro" >Registro</span>
                    </div>
                <form id="registerForm">
                    <p className="labelDatos">Datos de la cuenta</p>
                    <div className="seccionDatosCuentaRegistro">
                        <div className=" centerVertical" >
                            <i className="icon icon-arroba centerVertical"></i>
                            <input onChange={this.leerDatos} type="email" name="emailSignUp"  placeholder="Correo de usuario *" required autoComplete="off"/>
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                            <i className="icon icon-locked centerVertical "></i>
                            <input onChange={this.leerDatos} type="password" name="passwordSignUp"  placeholder="Contraseña *" required autoComplete="off"/>
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                            <i className="icon icon-locked centerVertical "></i>
                            <input onChange={this.leerDatos} type="password" name="repeatPasswordSignUp"  placeholder="Repetir contraseña *" required autoComplete="off"/>
                        </div>
                    </div>

                    <p className="labelDatos">Datos personales</p>
                    <div id="registerForm" className="seccionDatosPersonalesRegistro">
                        <div className=" centerVertical" >
                                <input onChange={this.leerDatos} type="text" name="nombreUsuario"  placeholder="Nombres *" required autoComplete="off"/>
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                                <input onChange={this.leerDatos} type="text" name="apellidosUsuario"  placeholder="Apellidos *" required autoComplete="off"/>
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                                <div className="placeholder">Fecha nacimiento *</div>
                                <input className="fechaNacimientoUsuario" onChange={this.leerDatos} type="date" name="fechaNacimientoUsuario" required autoComplete="off"/>
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                                <input onChange={this.leerDatos} type="number" name="cedulaUsuario" placeholder="Numero de cedula *" required autoComplete="off"/>
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                                <select onChange={this.leerDatos} type="text" name="ciudadUsuario" placeholder="Ciudad de residencia *" required autoComplete="off">
                                    <option value="" disabled selected>Ciudad de residencia *</option>
                                    <option value="Bogota">Bogota</option>
                                    <option value="Cucuta">Cucuta</option>
                                </select>
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                                <input onChange={this.leerDatos} type="number" name="celularUsuario" placeholder="Numero de celular *"  autoComplete="off" required/>
                        </div>

                        <div className="seccionEnviarRegistro ">
                            <Checkbox mode={'acceptT&C'} styleBox={'boxSignUp'} styleCheck={'checkSignUp'} text={'Acepto los'} 
                            link={'/Terminos&condiciones'} textLink={'Terminos y condiciones'}  id={'aceptoRegistroCheck'}/>

                            {this.props.showRegisterButton? <button type="submit" onClick={this.crearUsuario}>Registrar</button>:null}
                        </div>
                    </div>
                </form>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    msg:state.authSignUpReducer.msg,
    showEmailVerify:state.authSignUpReducer.showEmailVerify,
    showRegisterButton:state.authSignUpReducer.showRegisterButton
})

const mapDispatchToProps=(dispatch)=>{
    return{
        signUp:(newUser)=>dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingUp)