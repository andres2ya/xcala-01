import React, { Component } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";
import {Link} from 'react-router-dom'


export default class PruebaAddOrder extends Component {

    state={
        referencia:"",
        auxFecha:null,
        fecha:null
    }

    addOrder=()=>{
        console.log('1')
        var db=firebase.firestore();
        db.collection('pedidos').add({
            idVendedor:"Clara",
            idProveedor:"AFY GLOBAL SAS",
            fecha:this.state.fecha,
            idProducto:this.state.referencia,
            cantidad:1,
            idCliente:"Andres",
            ciudadCliente:"Bogota",
            direccionCliente:"Calle 45 sur #37-82",
            telefonoCliente:"3183667033",
            idDepacho:null,
            estado:"Ordenados con exito",
            estadoDespacho:'Sin atender'
        })
    }
    
    leerReferencia=(e)=>{
        e.preventDefault()
    this.setState({referencia:e.target.value})
}

leerFecha=(e)=>{
    e.preventDefault()
    this.setState({auxFecha:e.target.value})
}
cambiarDia=()=>{
    this.setState({fecha:this.state.auxFecha})
}


render() {
    return (
        <div>
                <div>
                    <Link to="/">Volver</Link>
                    <button onClick={this.addOrder}>AÑADIR</button>
                    <button onClick={this.cambiarDia}>CAMBIAR DIA</button>
                    <button onClick={this.removerListener}>REMOVER LISTENER</button>
                    <input onChange={this.leerReferencia} placeholder="Referencia" type="text"/>
                    <input onChange={this.leerFecha} placeholder="Fecha" type="text"/>
                </div>            
        </div>
    )
}

}