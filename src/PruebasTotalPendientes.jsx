import React, { Component } from 'react'

export default class PruebasTotalPendientes extends Component {

    state={
        pedidosPendientes:[],
        renderizar:false
    }

    componentDidMount=()=>[
        this.getPendingOrders()
    ]

    getPendingOrders=()=>{
        var db=firebase.firestore()
        this.unsubscribeListenerPedidos=db.collection('pedidos')
        .where("idProveedor","==","AFY GLOBAL SAS")
        .where("estado","==","Pendiente")
        .orderBy("idProducto","asc")
        .onSnapshot((snap)=>{
            snap.forEach(doc=>{
                this.state.pedidosPendientes.push(doc.data())
                this.setState({renderizar:true})
            })
        })
    }

    componentWillUnmount=()=>{

    }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}
