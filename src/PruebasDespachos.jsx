import React, { Component } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";

export default class PruebasDespachos extends Component {
    
    state={
        pedidosIndividualesEnElCarrito:[],
        pedidosEnCarrito:[],
        renderizar:false
    }

    componentDidMount=()=>{
        var auxCarritoDeDespacho
        var db=firebase.firestore()
        db.collection('proveedores')
        .doc('RYrofhCYJcdg93Yxqznd')
        .get()
        .then((doc)=>{
            auxCarritoDeDespacho=doc.data().carritoDeDespacho
            this.leerVector(auxCarritoDeDespacho)
        })
        .catch((err)=>{
            console.log('Error en get() despacharQEspecificas :',err)
        })
    }

    leerVector=(data)=>{
        this.setState({pedidosIndividualesEnElCarrito:data})

        var fechasAux=[]
        var fechasAuxUni=[]
        data.map(dat=>{fechasAux.push(dat.fecha)})
        fechasAuxUni=[...new Set(fechasAux)]
        
        fechasAuxUni.map(fechaUnica=>{
            var vectorProductos=[]
            var productosFechaUni=[]
            var productosUniFechUni=[]
            var productosAux=[]
            productosFechaUni=data.filter(dat=>dat.fecha===fechaUnica)
            productosFechaUni.map(productoFechaUnica=>{productosAux.push(productoFechaUnica.idProducto)})
            productosUniFechUni=[...new Set(productosAux)]
            productosUniFechUni.map(productoUniFechaUni=>{
                var auxQ=[]
                var objetoPorFecha=null
                auxQ=data.filter(pedido=>pedido.idProducto===productoUniFechaUni && pedido.fecha===fechaUnica)
                //TODO: Traer del objeto de "pedidosPorFecha" correspondiente a la fecha el valor de cantidad pedida para el producto correspondiente
                objetoPorFecha={nombre:productoUniFechaUni,cantidadADespachar:auxQ.length,cantidadPedida:auxQ.length}
                vectorProductos.push(objetoPorFecha)
            })
            this.state.pedidosEnCarrito.push({fecha:fechaUnica,productos:vectorProductos})
        })

        if(this.state.pedidosEnCarrito.length>0){
            this.setState({renderizar:true})
        }
    }

    armarDespacho=(e)=>{
        e.preventDefault()
        var db=firebase.firestore()
        db.collection('despachos').add({idDespacho:'DPACHO0001',pedidos:this.state.pedidosIndividualesEnElCarrito,fecha:'07/12/2019'})
        .then((ref)=>{
            console.log(ref)
            db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd').update({carritoDeDespacho:[]})
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>[
                console.log(err)
            ])
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render() {
        const {pedidosEnCarrito,renderizar}=this.state
        console.log(pedidosEnCarrito,renderizar)
        return (
            <div>
                {renderizar===true?
                    <div>
                        <h1>CARRITO DE DESPACHO 1</h1>
                        {pedidosEnCarrito.map(pedido=>
                            <div>
                                <strong>{pedido.fecha}</strong>
                                {pedido.productos.map((producto)=>
                                    <div>
                                        <strong>{producto.nombre}</strong>
                                        <span>Pedida:{producto.cantidadPedida}</span>
                                        <span> | </span>
                                        <span>A despachar:{producto.cantidadADespachar}</span>
                                    </div>
                                )}
                                <div>-----------------------------------------------------------</div>

                            </div>
                        )}
                        <button onClick={this.armarDespacho}>Solicitar transporte "Arma el documento despacho correspondiente"</button>
                    </div>
                    :
                    <div>No hay nada...</div>
                }
            </div>
        )        
    }
}
