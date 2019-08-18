import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn,keepSesion,logOut} from '../../ducks/authDucks/authDuckLogin'
import {recoveryPassword} from '../../ducks/authDucks/authDuckRecoveryPassword'
import {changePassword,sendVerificationToChangeEmail} from '../../ducks/authDucks/authUpdatePassAndEmailDuck'


class Login extends Component {

    state={
        email:'', 
        password:'',
        keep:'No',
        newPassword:'',
        newEmail:''
    }


    leerDatos=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state.keep)
    }

    go=(e)=>{
        e.preventDefault()
        const {keepSesion}=this.props
        const {keep}=this.state
        keepSesion(keep)
    }

    iniciarSesion=(e)=>{
        e.preventDefault()
        console.log('iniciar sesion')
        console.log(this.props.estado)
        const {signIn} = this.props
        signIn(this.state)
        this.setState({
            email:'',
            password:''
        })
    }

    check=(e)=>{
        e.preventDefault()
        console.log(this.props.fire)
    }

    resetPassword=(e)=>{
        e.preventDefault()
        this.props.recoveryPassword(this.state.email)
    }

    cambiarContraseña=(e)=>{
        e.preventDefault()
        this.props.changePassword(this.state.confirmCurrentPassword,this.state.newPassword)
    }

    cambiarEmail=(e)=>{
        e.preventDefault()
        this.props.sendVerificationToChangeEmail(this.state.newEmail)
    }

    render() {
        return (
            <div>
            <div>
                <form onSubmit={this.iniciarSesion} >
                    <h1>Iniciar sesion</h1>
                    <label >Correo</label>
                    <br/>
                    <input value={this.state.email} onChange={this.leerDatos} name="email" placeholder="Correo" type="text"/>
                    <br/>
                    <label >Contraseña</label>
                    <br/>
                    <input value={this.state.password} onChange={this.leerDatos} name="password" placeholder="contraseña" type="password"/>
                    <br/>
                    <button type="submit">Ingresar</button>
                    <div>
                        {this.props.authError   ?  <p>{this.props.authError}</p>    :    <p>{this.props.authSuccess}</p>}
                    </div>
                </form>

                <div>                     
                    <button onClick={this.resetPassword}>Olivde la constraseña</button>
                    <br/>
                    <br/>
                    <input type="text" name="keep" onChange={this.leerDatos}/>
                    <button onClick={this.go} >go go go</button>
                    <button onClick={this.props.logOut}>cerrar sesion</button>
                    <button onClick={this.check}>check</button>
                </div>
            </div>
            <div>
                <h2>Cambiar contraseña</h2>
                <input placeholder="Contraseña actual" onChange={this.leerDatos} name="confirmCurrentPassword" type="password"/>
                <input placeholder="Nueva contraseña" onChange={this.leerDatos} name="newPassword" type="password"/>
                <button onClick={this.cambiarContraseña} >Cambiar contraseña</button>

                <h2>Cambiar email</h2>
                <input onChange={this.leerDatos} name="newEmail" type="email"/>
                <button onClick={this.cambiarEmail}>Cambiar email</button>
            </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    authError:state.authReducer.authError,
    authSuccess:state.authReducer.authSuccess,
    fire:state
})

const mapDispatchToProps=(dispatch)=>{
    return {
        signIn:(creds)=>dispatch(signIn(creds)),
        recoveryPassword:(email)=>dispatch(recoveryPassword(email)),
        logOut:()=>dispatch(logOut()),
        keepSesion:(option)=>dispatch(keepSesion(option)),
        changePassword:(confirmCurrentPassword,newPass)=>dispatch(changePassword(confirmCurrentPassword,newPass)),
        sendVerificationToChangeEmail:(newEmail)=>dispatch(sendVerificationToChangeEmail(newEmail))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)


