import React, { Component } from 'react'
import {compose} from 'redux'
import {firebaseConnect,firestoreConnect} from 'react-redux-firebase'


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
        const fireB=this.props.firebase
        const fireS=this.props.firestore
        console.log(this.state,fireB,fireS)
        //...
        this.setState({
            email:'',
            password:''
        })
    }

    render() {
        return (
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
                </form>
        )
    }
}

export default compose(firebaseConnect(),firestoreConnect())(Login)
