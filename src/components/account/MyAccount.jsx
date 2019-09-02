import React, { Component } from 'react'
import {logOut} from '../../ducks/authDucks/authDuckLogin';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import './account.css'

class MyAccount extends Component {

    componentDidMount=()=>{
        document.body.removeAttribute('class')
        document.body.className='myAccountStyle'
        console.log(this.state)
    }

    uploadPhoto=(e)=>{
        const file=e.target.files[0]
        const {isAuth}=this.props
        this.props.uploadFile(file,isAuth)
    }

    render() {
        if(!this.props.isAuth)
        return <Redirect to='/'/>

        return (
            <div>
                <div className="row titulo">
                    Opciones de tu cuenta
                </div>
                <div className="row firstRow">
                    <div className="col-6 Fcardd ">
                        <div className="FcarddOver">
                                <div className="">
                                {/* ICONO */}
                                </div>
                                <span>
                                {/* Detalles de tus pedidos */}
                                </span>
                        </div>
                    </div>
                    <div className="col-6 Scardd">
                        <div className="ScarddOver">
                                <div className="">
                                {/* ICONO */}
                                </div>
                                <span>
                                {/* Detalles de tu cuenta */}
                                </span>
                        </div>
                    </div>
                </div>
                <div className="row secondRow">
                    <div className="col-6 Tcardd ">
                        <div className="TcarddOver">
                                <div className="">
                                {/* ICONO */}
                                </div>
                                <span>
                                {/* Detalles de tus pedidos */}
                                </span>
                        </div>
                    </div>
                    <div className="col-6 FRcardd">
                        <div className="FRcarddOverDos"/>
                        <div className="FRcarddOver">
                                <div className="">
                                {/* ICONO */}
                                </div>
                                <span>
                                {/* Detalles de tu cuenta */}
                                </span>
                        </div>
                    </div>
                </div>
                
                <button onClick={()=>this.props.logOut()}>Cerrar sesion</button>
                <button onClick={()=>console.log(this.props.fire)}>Check</button>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
        isAuth:state.firebase.auth.uid,
        fire:state
})

const mapDispatchToProps=(dispatch)=>{
   return {
       logOut:()=>dispatch(logOut())
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(MyAccount)
