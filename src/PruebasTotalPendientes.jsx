import React, { Component } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";

export default class PruebasTotalPendientes extends Component {

    state={
        pedidosPendientes:[],
        vectorProductosPendientes:[],
        renderizar:false
    }

    componentDidMount=()=>[
        this.getPendingOrders()
    ]

    getPendingOrders=()=>{//Provisional para poder traer los pedidos, en produccion, los pedidos se obtienen del vector en el estado global de la aplicacion, sin volver a llamar
        var db=firebase.firestore()
        this.unsubscribeListenerPedidos=db.collection('pedidos')
        .where("idProveedor","==","AFY GLOBAL SAS")
        .where("estado","==","Pendiente")
        .orderBy("idProducto","asc")
        .onSnapshot((snap)=>{
            this.setState({pedidosPendientes:[],vectorProductosPendientes:[]})
            const snapLength=snap.size
            let index=0
            snap.forEach(doc=>{
                this.state.pedidosPendientes.push(doc.data())
                console.log('INDEX:',(index+1),'SNAP LENGTH:',snapLength)
                if((index+1)===snapLength){
                    this.makingVectorProductos()
                }else{
                    index=index+1
                }
            })
        })
    }

    makingVectorProductos=()=>{
        const {pedidosPendientes}=this.state
        let productos =[];pedidosPendientes.map(pedidoPendiente=>{productos.push(pedidoPendiente.idProducto)})
        let uniqueProductos=[...new Set(productos)]
        uniqueProductos.map(uniqueProducto=>{
            let objetoProducto={}
            let cantidadPendiente=0
            pedidosPendientes.map(pedido=>{
                if(pedido.idProducto===uniqueProducto){
                    cantidadPendiente=cantidadPendiente+1
                }
            })
            objetoProducto={nombre:uniqueProducto,cantidadPendiente:cantidadPendiente}
            this.state.vectorProductosPendientes.push(objetoProducto)
            this.setState({renderizar:true})
        })
    }

    componentWillUnmount=()=>{
        this.unsubscribeListenerPedidos()
    }

    render() {
        const {vectorProductosPendientes}=this.state
        console.log(vectorProductosPendientes)
        if(vectorProductosPendientes!==[]){
            return (
                <div>
                    {vectorProductosPendientes.map(producto=>
                    <div>
                        <span>
                            <strong>PRODUCTO:</strong>{producto.nombre}:
                        </span>
                        <span>
                            <strong>Q PENDIENTE:</strong>{producto.cantidadPendiente}
                        </span>
                    </div>
                    )}
                </div>
            )
        }else{

            return (
                <div>
                    No tienes productos pendientes!
                </div>
            )
        }
    }
}
