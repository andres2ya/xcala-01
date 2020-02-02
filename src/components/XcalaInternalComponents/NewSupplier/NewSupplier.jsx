import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {signUp,saveDataNewUser} from '../../../ducks/internalXcalaDucks/newSupplierDuck'
import {keepSesion} from '../../../ducks/authDucks/authDuckLogin';
import {handleErrorMsg} from '../../../ducks/errorsDuck/handleErrors';
import EmailVerify from '../../auth/EmailVerify/EmailVerify';
import logoXcala from '../../../assets/logoXcala.png';
import Checkbox from '../../../components/layout/Checkbox/Checkbox';

class NewSupplier extends Component {
    
    state={
        incoherentEmail:false,
        tryCreateUser:false
    }

    componentDidMount=()=>{
        console.log(this.props.s)
        document.body.className='loginStyle'
    }

    componentWillUnmount=()=>{
        document.body.removeAttribute('class')
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

        //Como estoy previniendo el efecto por defecto "recargar la pagina" entonces
        //es necesario indicarle al navegador que de todas formas haga la validacion de los campos
        //en el formulario que contienen "required"
        //Para eso, se usa reportValidity:
        //1.)Se manda a seleccionar el formulario con un querySelector mediante su id
        //2.)Al formulario seleccionado se le agrega la funcion reportValidity,
        //la cual retorna true o false
        //3.)Se Guarda la respuesta en una constante y se utiliza en un condicional para 
        /**dar paso a la funcion deseada , en este caso: signUp y keepSesion*/
        
        var form = document.querySelector('#registerForm')
        var reportVal=form.reportValidity()
    
        const {signUp,keepSesion,newSupplierData,handleErrorMsg} =this.props
        if(reportVal===true){
            if(newSupplierData.passwordSignUp===newSupplierData.repeatPasswordSignUp){
                signUp(newSupplierData)
                keepSesion(true)
            }else{
                handleErrorMsg({code:'Las constraseñas no coinciden'})
                this.setState({
                    incoherentEmail:true
                })
            }
        } else{
            if(newSupplierData.passwordSignUp===newSupplierData.repeatPasswordSignUp){
                handleErrorMsg({code:'No has completado todos los campos'})
            }else{
                handleErrorMsg({code:'Las constraseñas no coinciden'})
            }
        }
    }

    
    render() {
        const {newSupplierData,showEmailVerify}=this.props
        if(showEmailVerify)
        return <EmailVerify newUser={newSupplierData}/>

        const {userRole}=this.props
        if(userRole!=='adminXcala'){
            return <Redirect to='/'/>
        }

        return (
            <div className={`auth signUpScreen centerHorizontal ${this.props.showPreloader===true?'preloaderOn':null}`}>
                <div className="logoWithSubtitle" >
                    <img className="authLogoLeft" src={logoXcala} alt="Xcala Colombia"/>
                    <span>Registro proveedor</span>
                </div>
                    
                <form className="formSignUp" id="registerForm">
                    <p className="labelDatos">Datos de la cuenta</p>
                        <div className=" centerVerticalAndHorizontal" >
                            <i className="icon icon-arroba centerVertical"></i>
                            <input value={newSupplierData.emailSignUp} onChange={this.leerDatos} type="email" name="emailSignUp"  placeholder="Correo del proveedor *" autoComplete="nope" required />
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                            <i className="icon icon-locked centerVertical "></i>
                            <input value={newSupplierData.passwordSignUp} onChange={this.leerDatos} type="password" name="passwordSignUp"  placeholder="Contraseña *" autoComplete="nope"  required />
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                            <i className="icon icon-locked centerVertical "></i>
                            <input value={newSupplierData.repeatPasswordSignUp} onChange={this.leerDatos} type="password" name="repeatPasswordSignUp"  placeholder="Repetir contraseña *" autoComplete="nope"  required/>
                        </div>
                        <div className="errorMsg centerHorizontal">
                            {this.state.tryCreateUser? this.props.errorEspañol:null}   
                        </div>
                    
                    

                    <p className="labelDatos">Datos de la empresa</p>
                        <div className=" centerVerticalAndHorizontal" >
                                <input value={newSupplierData.razonSocial} onChange={this.leerDatos} type="text" name="razonSocial"  placeholder="Razon social *" autoComplete="nope"  required />
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                                <input value={newSupplierData.representanteLegal} onChange={this.leerDatos} type="text" name="representanteLegal"  placeholder="Representante legal *" autoComplete="nope"  required />
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                                <div className="placeholder">Fecha ingreso *</div>
                                <input value={newSupplierData.fechaIngreso} className="fechaNacimientoUsuario" onChange={this.leerDatos} type="date" autoComplete="nope"  name="fechaIngreso"/>
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                                <input value={newSupplierData.identificacionProveedor} onChange={this.leerDatos} type="number" name="identificacionProveedor" placeholder="NIT/Cedula *" autoComplete="nope"  />
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                                <select value={newSupplierData.ciudadProveedor} onChange={this.leerDatos} type="text" name="ciudadProveedor" placeholder="Ciudad de establecimiento *" autoComplete="nope"  required>
                                    <option value="" disabled selected>Ciudad de establecimiento*</option>
                                    <option value="Bogota">Bogota</option>
                                    <option value="Cucuta">Cucuta</option>
                                </select>
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                                <input value={newSupplierData.celularProveedor} onChange={this.leerDatos} type="number" name="celularProveedor" placeholder="Numero de celular *" autoComplete="nope"  required/>
                        </div>
                        <div className="thinInputDivider centerHorizontal"></div>
                        <div className=" centerVerticalAndHorizontal" >
                                <select value={newSupplierData.tipoProveedor} onChange={this.leerDatos} type="text" name="tipoProveedor" placeholder="Tipo de proveedor*" autoComplete="nope"  required>
                                    <option value="" disabled selected>Tipo proveedor*</option>
                                    <option value="Bogota">Fabricante</option>
                                    <option value="Cucuta">Importador/Mayorista</option>
                                    <option value="Cucuta">Minorista</option>
                                </select>
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
    showEmailVerify:state.supplierSignUpReducer.showEmailVerify,
    showRegisterButton:state.supplierSignUpReducer.showRegisterButton,
    newSupplierData:state.supplierSignUpReducer.newSupplierData,
    showPreloader:state.preloaderReducer.showPreloader,
    userRole:state.firebase.profile.role,
    s:state

})

const mapDispatchToProps=(dispatch)=>{
    return{
        signUp:(newUser)=>dispatch(signUp(newUser)),
        keepSesion:(option)=>dispatch(keepSesion(option)),
        saveDataNewUser:(label,newSupplierData)=>dispatch(saveDataNewUser(label,newSupplierData)),
        handleErrorMsg:(err)=>dispatch(handleErrorMsg(err))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewSupplier)