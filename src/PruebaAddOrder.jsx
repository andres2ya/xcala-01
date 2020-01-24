import React, { Component } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";
import {Link} from 'react-router-dom'


export default class PruebaAddOrder extends Component {

    state={}

    addOrder=()=>{
        this.setState({idPedido:this.state.idPedido+1})
        console.log('1')
        var db=firebase.firestore();
        db.collection('pedidos').add({
            idPedido:this.state.idPedido,
            idVendedor:this.state.idVendedor,
            idProveedor:this.state.idProveedor,
            tipoPago:this.state.tipoPago,
            fecha:this.state.fecha,

            idProducto:this.state.idProducto,
            imagenProducto:'https://www.zapatos.es/media/catalog/product/cache/image/650x650/0/0/0000200860916_01_ts.jpg',
            cantidad:1,

            idCliente:this.state.idCliente,
            ciudadCliente:"Bogota",
            direccionCliente:"Calle 45 sur #37-82",
            telefonoCliente:"3183667033",

            idDepacho:null,
            estadoDespacho:'Sin atender',

            estado:"Pendiente",
            ultimoEstado:this.state.ultimoEstado,
            
            costo:'50000',
            ganancia:'20000',
            precioVenta:'70000',
            
            posibleCancelar:this.state.posibleCancelar,
            cambioLaDireccion:this.state.cambioLaDireccion,
            // casoAbierto:this.state.casoAbierto,
        })
    }
    
leerDatos=(e)=>{
    e.preventDefault()
    this.setState({[e.target.id]:e.target.value})
}

componentDidUpdate=()=>{
    console.log(this.state)
}


render() {
    return (
        <div>
                <div className="d-block">
                    <input id="idPedido" onChange={this.leerDatos} placeholder="idPedido" type="text"/>
                    <input id="idVendedor" onChange={this.leerDatos} placeholder="idVendedor" type="text"/>
                    <input id="idProveedor" onChange={this.leerDatos} placeholder="idProveedor" type="text"/>
                    <label htmlFor="tipoPago">Tipo de pago</label>
                    <select id="tipoPago" onChange={this.leerDatos}>
                        <option value="Pago Online">online</option>
                        <option value="ContraEntrega">contra entrega</option>
                    </select>
                    <input id="fecha" onChange={this.leerDatos} placeholder="Fecha" type="text"/>
                    

                    <input id="idProducto" onChange={this.leerDatos} placeholder="idProducto" type="text"/>
                    
                    <input id="idCliente" onChange={this.leerDatos} placeholder="idCliente" type="text"/>

                    <input id="ultimoEstado" onChange={this.leerDatos} placeholder="ultimoEstado" type="text"/>


                    <label htmlFor="posibleCancelar">¿Posible Cancelar?</label>
                    <select id="posibleCancelar" onChange={this.leerDatos}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>

                
                    <label htmlFor="cambioLaDireccion">¿Cambio La Direccion?</label>
                    <select id="cambioLaDireccion" onChange={this.leerDatos}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>

                    {/* <label htmlFor="casoAbierto">¿Caso Abierto?</label>
                    <select id="casoAbierto" onChange={this.leerDatos}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select> */}

                    <button onClick={this.addOrder}>AÑADIR</button>
                </div>            
        </div>
    )
}

}