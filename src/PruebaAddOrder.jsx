import React, { Component } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


class PruebaAddOrder extends Component {

    state={}

    componentDidMount=()=>{
        console.log(this.props.userId)
    }

    addOrder=()=>{
        this.setState({idPedido:this.state.idPedido+1})
        console.log('1')
        let creationTime= Date.now()//NOTE: Usada para calcular diferencia tiempo entre la creacion y el momento de visualizacion para saber si han pasada 24 hr. Hora expresada en milisegundos, dividir sobre 1000 para obtener segundos
        let creationDate=new Date()
        let day=creationDate.getDate()
        let month=creationDate.getMonth()+1 //NOTE: Mas 1 debido a que enero es el index 0
        let year=creationDate.getFullYear()
        if(month<=9){month=`0${month}`}
        let creationDateLocalFormat=`${day}/${month}/${year}`

        let hour=creationDate.getHours()
        let minutes=creationDate.getMinutes()
        let seconds=creationDate.getSeconds()
        let creationHourLocalFormat=`${hour}:${minutes}:${seconds}`
        
        var db=firebase.firestore();
        db.collection('pedidos').add({
            // idPedido:this.state.idPedido,
            idVendedor:this.props.userId,
            idProveedor:'OYufDRLH3TYPNpcEkVbtAstkMNi1',
            tipoPago:this.state.tipoPago,
            tiempoCreacion:creationTime,
            fecha:creationDateLocalFormat,
            hora:creationHourLocalFormat,
            imagenProducto:'https://www.zapatos.es/media/catalog/product/cache/image/650x650/0/0/0000200860916_01_ts.jpg',
            cantidad:1,

            idCliente:this.state.idCliente,
            // ciudadCliente:"Bogota",
            ciudadCliente:this.state.clienteObjeto[0].ciudad,
            // direccionCliente:"Calle 45 sur #37-82",
            direccionCliente:this.state.clienteObjeto[0].direccionDeEnvio,
            // telefonoCliente:"3183667033",
            telefonoCliente:this.state.clienteObjeto[0].telefonoContacto,

            idDepacho:null,
            // estadoDespacho:'Sin atender',

            estado:this.state.estado,
            // ultimoEstado:this.state.ultimoEstado,
            
            costo:'50000',
            ganancia:'20000',
            precioVenta:'70000',
            
            posibleCancelar:this.state.posibleCancelar,
            cambioLaDireccion:this.state.cambioLaDireccion,
            // casoAbierto:this.state.casoAbierto,
        })
        .then(doc=>{
            console.log(doc.id)
            db.collection('pedidos').doc(doc.id).update({id:doc.id})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
leerDatos=(e)=>{
    e.preventDefault()
    if(e.target.id==='idCliente'){
        let cliente=this.props.customersUser.filter(customer=>customer.nombre===e.target.value)
        this.setState({clienteObjeto:cliente})
    }
    this.setState({[e.target.id]:e.target.value})
}

componentDidUpdate=()=>{
    console.log(this.state)
}


render() {
    return (
        <div>
                <div className="d-block">
                    {/* <input id="idPedido" onChange={this.leerDatos} placeholder="idPedido" type="text"/> */}
                    {/* <input id="idVendedor" onChange={this.leerDatos} placeholder="idVendedor x" type="text"/> */}
                    {/* <input id="idProveedor" onChange={this.leerDatos} placeholder="idProveedor" type="text"/> */}
                    <label htmlFor="tipoPago">Tipo de pago</label>
                    <select id="tipoPago" onChange={this.leerDatos}>
                        <option value="Pago Online">online</option>
                        <option value="ContraEntrega">contra entrega</option>
                    </select>
                    {/* <input id="fecha" onChange={this.leerDatos} placeholder="Fecha" type="text"/> */}
                    

                    <input id="idProducto" onChange={this.leerDatos} placeholder="idProducto" type="text"/>
                    
                    {/* <input id="idCliente" onChange={this.leerDatos} placeholder="idCliente" type="text"/> */}
                    

                    {this.props.customersUser?
                        <select id='idCliente' onChange={this.leerDatos}>
                            {this.props.customersUser.map(cliente=><option value={cliente.nombre}>{cliente.nombre}</option>)}
                        </select>
                        :
                        console.log('Esperando a que se cargen clientes del vendedor')
                    }



                    <input id="estado" onChange={this.leerDatos} placeholder="estado" type="text"/>


                    <label htmlFor="posibleCancelar">¿Posible Cancelar?</label>
                    <select id="posibleCancelar" onChange={this.leerDatos}>
                        {/* TODO: Deben ser booleanos de verdad */}
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

const mapStateToProps=(state)=>({
    userId:state.firebase.auth.uid,
    customersUser:state.firebase.profile.clientes,
})

export default connect(mapStateToProps,null)(PruebaAddOrder)