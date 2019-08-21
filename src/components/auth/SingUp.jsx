import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signUp} from '../../ducks/authDucks/authDuckSignUp'

class SingUp extends Component {

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
            <div>
                
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