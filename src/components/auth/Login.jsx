import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn,keepSesion,logOut} from '../../ducks/authDuck'

class Login extends Component {

    state={
        email:'', 
        password:'',
        keep:'No'
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
                    <button onClick={this.olvideContraseña}>Olivde la constraseña</button>
                    
                    <input type="text" name="keep" onChange={this.leerDatos}/>
                    <button onClick={this.go} >go go go</button>
                    <button onClick={this.props.logOut}>cerrar sesion</button>
                    <button onClick={this.check}>check</button>
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
        // recoveryPassword:(data)=>dispatch(recoveryPassword(data)),
        logOut:(data)=>dispatch(logOut(data)),
        keepSesion:(option)=>dispatch(keepSesion(option))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)


