import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signUp,saveDataNewUser} from '../../../ducks/authDucks/authDuckSignUp'
import {keepSesion,handleErrorMsg} from '../../../ducks/authDucks/authDuckLogin';
import EmailVerify from '../EmailVerify/EmailVerify';
import logoXcala from '../../../assets/logoXcala.png';
import Checkbox from '../../../components/layout/Checkbox/Checkbox';
import './SignUp.css';

class SingUp extends Component {
    
    componentDidMount=()=>{
        document.body.className='loginStyle'
    }

    state={
        // emailSignUp:'',
        // passwordSignUp:'',
        // repeatPasswordSignUp:'',
        // nombreUsuario:'',
        // apellidosUsuario:'',
        // fechaNacimientoUsuario:'',
        // cedulaUsuario:'',
        // ciudadUsuario:'',
        // celularUsuario:'',
        incoherentEmail:false
    }

    leerDatos=(e)=>{
        e.preventDefault()
        // this.setState({
        //      [e.target.name]:e.target.value
        // })
        const {saveDataNewUser}=this.props
        saveDataNewUser(e.target.name,e.target.value)
    }

    crearUsuario=(e)=>{
        e.preventDefault()
        //Como estoy previniendo el efecto por defecto "recargar la pagina" entonces
        //es necesario indicarle al navegador que de todas formas haga la validacion de los campos
        //en el formulario que contienen "required"
        //Para eso, se usa reportValidity:
        //1.)Se manda a seleccionar el formulario con un querySelector mediante su id
        //2.)Al formulario seleccionado se le agrega la funcion reportValidity,
        //la cual retorna true o false
        //3.)Se Guarda la respuesta en una constante y se utiliza en un condicional para 
        //dar paso a la funcion deseada , en este caso: signUp y keepSesion
        var form = document.querySelector('#registerForm')
        var reportVal=form.reportValidity()
    
        const {signUp,keepSesion,newUserData,handleErrorMsg} =this.props
        if(reportVal===true){
            if(newUserData.passwordSignUp===newUserData.repeatPasswordSignUp){
                signUp(newUserData)
                keepSesion(true)
            }else{
                handleErrorMsg({code:'Las constraseñas no coinciden'})
                this.setState({
                    incoherentEmail:true
                })
            }
        } else{
            if(newUserData.passwordSignUp===newUserData.repeatPasswordSignUp){
                handleErrorMsg({code:'No has completado todos los campos'})
            }else{
                handleErrorMsg({code:'Las constraseñas no coinciden'})
            }
        }
    }

    
    render() {
        const {newUserData}=this.props
        return (
            
            <div>
                {this.props.showEmailVerify?
                    <EmailVerify newUser={newUserData}/>
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
                            <input value={newUserData.emailSignUp} onChange={this.leerDatos} type="email" name="emailSignUp"  placeholder="Correo de usuario *" autoComplete="nope" required />
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                            <i className="icon icon-locked centerVertical "></i>
                            <input value={newUserData.passwordSignUp} onChange={this.leerDatos} type="password" name="passwordSignUp"  placeholder="Contraseña *" autoComplete="nope"  required />
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                            <i className="icon icon-locked centerVertical "></i>
                            <input value={newUserData.repeatPasswordSignUp} onChange={this.leerDatos} type="password" name="repeatPasswordSignUp"  placeholder="Repetir contraseña *" autoComplete="nope"  required/>
                        </div>
                        <div id="authError" className="errorMsg centerHorizontal">
                            {this.props.errorEspañol}   
                        </div>
                    </div>

                    <p className="labelDatos">Datos personales</p>
                    <div id="registerForm" className="seccionDatosPersonalesRegistro">
                        <div className=" centerVertical" >
                                <input value={newUserData.nombreUsuario} onChange={this.leerDatos} type="text" name="nombreUsuario"  placeholder="Nombres *" autoComplete="nope"  required />
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                                <input value={newUserData.apellidosUsuario} onChange={this.leerDatos} type="text" name="apellidosUsuario"  placeholder="Apellidos *" autoComplete="nope"  required />
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                                <div className="placeholder">Fecha nacimiento *</div>
                                <input value={newUserData.fechaNacimientoUsuario} className="fechaNacimientoUsuario" onChange={this.leerDatos} type="date" autoComplete="nope"  name="fechaNacimientoUsuario"/>
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                                <input value={newUserData.cedulaUsuario} onChange={this.leerDatos} type="number" name="cedulaUsuario" placeholder="Numero de cedula *" autoComplete="nope"  />
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                                <select value={newUserData.ciudadUsuario} onChange={this.leerDatos} type="text" name="ciudadUsuario" placeholder="Ciudad de residencia *" autoComplete="nope"  required>
                                    <option value="" disabled selected>Ciudad de residencia *</option>
                                    <option value="Bogota">Bogota</option>
                                    <option value="Cucuta">Cucuta</option>
                                </select>
                        </div>
                        <div className="dividerSignUp centerHorizontal"></div>
                        <div className=" centerVertical" >
                                <input value={newUserData.celularUsuario} onChange={this.leerDatos} type="number" name="celularUsuario" placeholder="Numero de celular *" autoComplete="nope"  required/>
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
    errorEspañol:state.authLoginReducer.errorEspañol,
    showEmailVerify:state.authSignUpReducer.showEmailVerify,
    showRegisterButton:state.authSignUpReducer.showRegisterButton,
    newUserData:state.authSignUpReducer.newUserData
})

const mapDispatchToProps=(dispatch)=>{
    return{
        signUp:(newUser)=>dispatch(signUp(newUser)),
        keepSesion:(option)=>dispatch(keepSesion(option)),
        saveDataNewUser:(label,newUserData)=>dispatch(saveDataNewUser(label,newUserData)),
        handleErrorMsg:(err)=>dispatch(handleErrorMsg(err))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingUp)