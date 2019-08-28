import React, { Component } from 'react'
import {logOut} from '../../ducks/authDucks/authDuckLogin';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class MyAccount extends Component {

    componentDidMount=()=>{
        document.body.removeAttribute('class')
        document.body.className='myAccountStyle'
        console.log(this.state)
    }

    render() {
        if(!this.props.isAuth)
        return <Redirect to='/'/>

        return (
            <div>
                {/* TODO: Leer el dato de nombre desde el userProfile en lugar del localstorage para evitar errores */}
                <p className="AUnPasoTitulo">¡Bienvenido {this.props.nombreUsuario}!</p>
                <button onClick={()=>this.props.logOut()}>Cerrar sesion</button>
                <button onClick={()=>console.log(this.props.fire)}>Check</button>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
        isAuth:state.firebase.auth.uid,
        nombreUsuario:state.firebase.profile.nombreUsuario,
        fire:state
})

const mapDispatchToProps=(dispatch)=>{
   return {
       logOut:()=>dispatch(logOut())
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(MyAccount)
