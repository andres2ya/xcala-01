import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signUp,saveDataNewUser} from '../../../ducks/authDucks/authDuckSignUp'
import {keepSesion} from '../../../ducks/authDucks/authDuckLogin';
import {handleErrorMsg} from '../../../ducks/errorsDuck/handleErrors';
import EmailVerify from '../EmailVerify/EmailVerify';
import logoXcala from '../../../assets/logoXcala.png';
import Checkbox from '../../../components/layout/Checkbox/Checkbox';

class SingUp extends Component {
    
    state={
        incoherentEmail:false,
        tryCreateUser:false
    }

    componentDidMount=()=>{
        document.body.className='loginStyle'
    }

    leerDatos=(e)=>{
        e.preventDefault()
        const {saveDataNewUser}=this.props
        saveDataNewUser(e.target.name,e.target.value)
        this.setState({
            tryCreateUser:false
        })
    }

    crearUsuario=(e)=>{
        e.preventDefault()
        this.setState({
            tryCreateUser:true
        })
        {//Como estoy previniendo el efecto por defecto "recargar la pagina" entonces
        //es necesario indicarle al navegador que de todas formas haga la validacion de los campos
        //en el formulario que contienen "required"
        //Para eso, se usa reportValidity:
        //1.)Se manda a seleccionar el formulario con un querySelector mediante su id
        //2.)Al formulario seleccionado se le agrega la funcion reportValidity,
        //la cual retorna true o false
        //3.)Se Guarda la respuesta en una constante y se utiliza en un condicional para 
        /**dar paso a la funcion deseada , en este caso: signUp y keepSesion*/}
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
        const {newUserData,showEmailVerify}=this.props
        if(showEmailVerify)
        return <EmailVerify newUser={newUserData}/>

        return (
            <div className={`auth signUpScreen centerHorizontal ${this.props.showPreloader===true?'preloaderOn':null}`}>
                <div className="logoWithSubtitle" >
                    <img className="authLogoLeft" src={logoXcala} alt="Xcala Colombia"/>
                    <span>Registro</span>
                </div>
                    
                <form className="formSignUp" id="registerForm">
                    <p className="labelDatos">Datos de la cuenta</p>
                        <div className=" centerVerticalAndHorizontal" >
                            <i className="icon icon-arroba centerVertical"></i>
                            <input value={newUserData.emailSignUp} onChange={this.leerDatos} type="email" name="emailSignUp"  placeholder="Correo de usuario *" autoComplete="nope" required />
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                            <i className="icon icon-locked centerVertical "></i>
                            <input value={newUserData.passwordSignUp} onChange={this.leerDatos} type="password" name="passwordSignUp"  placeholder="Contraseña *" autoComplete="nope"  required />
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                            <i className="icon icon-locked centerVertical "></i>
                            <input value={newUserData.repeatPasswordSignUp} onChange={this.leerDatos} type="password" name="repeatPasswordSignUp"  placeholder="Repetir contraseña *" autoComplete="nope"  required/>
                        </div>
                        <div className="errorMsg centerHorizontal">
                            {this.state.tryCreateUser? this.props.errorEspañol:null}   
                        </div>
                    
                    

                    <p className="labelDatos">Datos personales</p>
                        <div className=" centerVerticalAndHorizontal" >
                                <input value={newUserData.nombreUsuario} onChange={this.leerDatos} type="text" name="nombreUsuario"  placeholder="Nombres *" autoComplete="nope"  required />
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                                <input value={newUserData.apellidosUsuario} onChange={this.leerDatos} type="text" name="apellidosUsuario"  placeholder="Apellidos *" autoComplete="nope"  required />
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                                <div className="placeholder">Fecha nacimiento *</div>
                                <input value={newUserData.fechaNacimientoUsuario} className="fechaNacimientoUsuario" onChange={this.leerDatos} type="date" autoComplete="nope"  name="fechaNacimientoUsuario"/>
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                                <input value={newUserData.cedulaUsuario} onChange={this.leerDatos} type="number" name="cedulaUsuario" placeholder="Numero de cedula *" autoComplete="nope"  />
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                                <select value={newUserData.ciudadUsuario} onChange={this.leerDatos} type="text" name="ciudadUsuario" placeholder="Ciudad de residencia *" autoComplete="nope"  required>
                                    <option value="" disabled selected>Ciudad de residencia *</option>
                                    <option value="Bogota">Bogota</option>
                                    <option value="Cucuta">Cucuta</option>
                                </select>
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                                <input value={newUserData.celularUsuario} onChange={this.leerDatos} type="number" name="celularUsuario" placeholder="Numero de celular *" autoComplete="nope"  required/>
                        </div>

                        <div className="sendRegister ">
                            <Checkbox mode={'acceptT&C'} styleBox={'boxSignUp'} styleCheck={'checkSignUp'} text={'Acepto los'} 
                            link={'/Terminos&condiciones'} textLink={'Terminos y condiciones'}  id={'aceptoRegistroCheck'}/>

                            {this.props.showRegisterButton? <button type="submit" onClick={this.crearUsuario}>Registrar</button>:null}
                        </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    errorEspañol:state.handlerErrorsReducer.errorEspañol,
    showEmailVerify:state.authSignUpReducer.showEmailVerify,
    showRegisterButton:state.authSignUpReducer.showRegisterButton,
    newUserData:state.authSignUpReducer.newUserData,
    showPreloader:state.preloaderReducer.showPreloader,
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