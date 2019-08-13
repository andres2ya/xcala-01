import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../ducks/authDuck'

class Login extends Component {

    state={
        email:'', 
        password:''
    }

    leerDatos=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
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

    render() {
        return (
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
                    <button onSubmit={this.olvideContraseña} type="submit">Olivde la constraseña</button>
                    <button onSubmit={this.mantenerIniciada} type="submit">mantener iniciada</button>
                    <button onSubmit={this.cerrarSesion} type="submit">cerrar sesion</button>
                </div>
            </div>   
        )
    }
}
const mapStateToProps=(state)=>({
    authError:state.authReducer.authError,
    authSuccess:state.authReducer.authSuccess
})

const mapDispatchToProps=(dispatch)=>{
    return {signIn:(creds)=>dispatch(signIn(creds))}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)


