import React, { Component } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";
import moment from 'moment';
import 'moment/locale/es';
import {Link} from 'react-router-dom'
import {getDateRange} from './helpers/getDateRange'


export default class Pruebas extends Component {

state={
    fromCache:"",
    pedidosPorFecha:[],
    referencia:"",
    auxFecha:null,
    fecha:null,
    listenerRemoved:null,
    listenerActivate:null
}
    removerListener=()=>{
        console.log('removiendo...')
        this.unsubscribeListenerPedidos()
        this.unsubscribeListenerPedidosPorFechas()
        this.unsubscribeListenerActualizarPendientes()
    }

    componentWillMount=()=>{
        moment.locale('es');
        this.activeListenerPedidosPorFechas()
        this.activeListenerPedidos()
        this.activeListenerActualizarPendientes()
    }

    activeListenerPedidosPorFechas=()=>{
        //NOTE: Funcion que trae todas las fechas del proveedor para guardarlas en el estado y poder mostrar todo el historial, va paginado de a 7 dias.
        var db=firebase.firestore()
        this.unsubscribeListenerPedidosPorFechas=db.collection("pedidosPorFecha").where("idProveedor","==","AFY GLOBAL SAS").orderBy("fecha","asc")
        .onSnapshot((snap)=>{
            var pedidosPorFecha=[]
            snap.forEach(doc=>{
                pedidosPorFecha.push(doc.data())
            })
            this.setState({pedidosPorFecha:pedidosPorFecha})
        })
    }

    activeListenerPedidos = ()=>{
        var db=firebase.firestore()
        this.unsubscribeListenerPedidos=db.collection('pedidos')
        .where("idProveedor","==","AFY GLOBAL SAS")
        .where("estado","==","Ordenados con exito")
        .orderBy("idProducto","asc")
        .onSnapshot((snap)=>{
            var auxPedidos=[]
            var auxUniqueFechasPedidos=[]
            var auxFechasPedidos=[]
            var vectorProductos=[]
            var auxIds=[]
            var documentoPedidosPorFecha=[]
            var pedidosFechaUnica=[]
            var productosFechaUnica=[]
            var productosUnicoFechaUnica=[]
            var nuevaCantidadPedido=0
            var auxDiaFecha
            var auxMesFecha
            var auxAñoFecha
            var idDocString
            const {pedidosPorFecha}=this.state
            // NOTE: Funcion que captura las referencias unicas y las ubica en un vector
            snap.forEach((doc)=>{
                auxPedidos.push(doc.data());
                auxFechasPedidos.push(doc.data().fecha);
                auxIds.push(doc.id)                
            })
            auxUniqueFechasPedidos=[...new Set(auxFechasPedidos)]
            
            auxUniqueFechasPedidos.map(fechaUnica=>{
                auxDiaFecha=fechaUnica.slice(0,2)
                auxMesFecha=fechaUnica.slice(3,5)
                auxAñoFecha=fechaUnica.slice(6,9)
                idDocString=auxDiaFecha+auxMesFecha+auxAñoFecha
                
                documentoPedidosPorFecha=pedidosPorFecha.filter(pedidoPorFecha=>pedidoPorFecha.fecha===fechaUnica)
                if(documentoPedidosPorFecha.length===0){//Por cada fecha no encontrada en coleccion de pedidosPorFecha, creo un nuevo documento
                    vectorProductos=[]
                    productosFechaUnica=[]
                    pedidosFechaUnica=auxPedidos.filter(pedido=>pedido.fecha===fechaUnica)
                    pedidosFechaUnica.map(pedidoFechaUnica=>{productosFechaUnica.push(pedidoFechaUnica.idProducto)})
                    productosUnicoFechaUnica=[...new Set(productosFechaUnica)]
                    
                    productosUnicoFechaUnica.map(productoUnicoFechaUnica=>{//Por cada nombre unico en la fecha unica creo un nuevo objeto en el vector productos
                        pedidosFechaUnica.map(pedidoFechaUnica=>{
                            if(pedidoFechaUnica.idProducto===productoUnicoFechaUnica){
                                nuevaCantidadPedido=nuevaCantidadPedido+1
                            }
                        })
                        vectorProductos.push({nombre:productoUnicoFechaUnica,cantidadPedida:nuevaCantidadPedido,cantidadPendiente:nuevaCantidadPedido})
                        nuevaCantidadPedido=0
                    })
                    db.collection("pedidosPorFecha").doc(idDocString).set({
                        id:idDocString,
                        fecha:fechaUnica,
                        idProveedor:"AFY GLOBAL SAS",
                        productos:vectorProductos
                    })
                    .then((docRef)=>{
                        // console.log('Document written with ID: ',docRef.id)
                    })
                    .catch((err)=>{
                        console.log('Error adding document: ',err)
                    })
                }else{//Si la fecha unica ya existe en un documento de pedidosPorFecha ->Entonces
                    //1. Obtener id documento correspondiente.
                    let idDoc=documentoPedidosPorFecha[0].id
                    //2. Buscar si el producto ya existe dentro del vector productos del documento
                    let vectorProductosDocumento=documentoPedidosPorFecha[0].productos
                    let objetoProductoEnDocumento=[]
                    productosFechaUnica=[]
                    pedidosFechaUnica=auxPedidos.filter(pedido=>pedido.fecha===fechaUnica)
                    pedidosFechaUnica.map(pedidoFechaUnica=>{productosFechaUnica.push(pedidoFechaUnica.idProducto)})
                    productosUnicoFechaUnica=[...new Set(productosFechaUnica)]

                    productosUnicoFechaUnica.map(productoUnicoFechaUnica=>{
                        objetoProductoEnDocumento=vectorProductosDocumento.filter(productoDocumento=>productoDocumento.nombre===productoUnicoFechaUnica)
                        //3. Si no existe, crear el objeto correspondiente.
                        if(objetoProductoEnDocumento.length===0){//Si no existe un objeto para ese producto, entonces
                            //4. contar cantidad pedidos de ese producto
                            nuevaCantidadPedido=0
                            pedidosFechaUnica.map(pedidoFechaUnica=>{
                                if(pedidoFechaUnica.idProducto===productoUnicoFechaUnica){
                                    nuevaCantidadPedido=nuevaCantidadPedido+1
                                }
                            })
                            //5. escribir objeto en documento
                            db.collection("pedidosPorFecha").doc(idDoc).update({productos:firebase.firestore.FieldValue.arrayUnion({
                                'nombre':productoUnicoFechaUnica,
                                'cantidadPedida':nuevaCantidadPedido,
                                'cantidadPendiente':nuevaCantidadPedido
                             })})
                            .catch((err)=>{console.log(err)})
                        }
                        //6. Si ya existe, entonces actualizar su cantidad.
                        else{
                            let auxCantidadPedidoActual=objetoProductoEnDocumento[0].cantidadPedida
                            let auxCantidadPendienteActual=objetoProductoEnDocumento[0].cantidadPendiente

                            nuevaCantidadPedido=0
                            pedidosFechaUnica.map(pedidoFechaUnica=>{
                                if(pedidoFechaUnica.idProducto===productoUnicoFechaUnica){
                                    nuevaCantidadPedido=nuevaCantidadPedido+1
                                }
                            })
                            // Remover
                            db.collection("pedidosPorFecha").doc(idDoc).update({productos:firebase.firestore.FieldValue.arrayRemove({
                                'nombre':productoUnicoFechaUnica,
                                'cantidadPedida':auxCantidadPedidoActual,
                                'cantidadPendiente':auxCantidadPendienteActual
                            })})
                            //Añadir
                            db.collection("pedidosPorFecha").doc(idDoc).update({productos:firebase.firestore.FieldValue.arrayUnion({
                                'nombre':productoUnicoFechaUnica,
                                'cantidadPedida':auxCantidadPedidoActual+nuevaCantidadPedido,
                                'cantidadPendiente':auxCantidadPendienteActual+nuevaCantidadPedido
                            })})
                        }
                    })
                    

                    
                    
                }
            })
        //Solo si existen nuevos pedidos, se ejecuta la funcion de cambiar estado
        if(auxIds.length>0){
            this.cambiarEstado(auxIds)
        }
        })
    }

    cambiarEstado=(idPedidos)=>{
        this.unsubscribeListenerPedidos()
        //NOTE: Funcion que marca como leidos los documentos cargados en la vista del proveedor, de tal forma que el query no los vuelve a llamar.
        var db=firebase.firestore()
        idPedidos.map((idPedido,index)=>{
            db.collection('pedidos').doc(idPedido).update({'estado':'Recibido por el proveedor'})
            .then(()=>{
                //Si es el ultimo id, entonces activar listener
                if((index+1)===idPedidos.length){
                    this.activeListenerPedidos()
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        })
    }

    activeListenerActualizarPendientes=()=>{
        var db=firebase.firestore()
        this.unsubscribeListenerActualizarPendientes=db.collection('pedidos')
        .where("idProveedor","==","AFY GLOBAL SAS")
        .where("estado","==","Recibido por el proveedor")
        .where("estadoDespacho","==","Despachado")
        .orderBy("idProducto","asc")
        .onSnapshot((snap)=>{
            snap.forEach(doc=>{
                console.log('Pedido despachado :',doc.data())
                const {pedidosPorFecha}=this.state
                var idDocumentoPedidoPorFecha=doc.data().fecha
                var documentoPedidoPorFecha=pedidosPorFecha.filter(pedidoPorFecha=>pedidoPorFecha.fecha===idDocumentoPedidoPorFecha)
                console.log('Documento pedidoPorFecha Relacionado :',documentoPedidoPorFecha[0])
            })
        })
    }








    
    componentWillUnmount=()=>{
        this.removerListener()
        console.log('listener removido')
    }

    addOrder=()=>{
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

    componentDidUpdate=()=>{
        console.log('nuevo dia: '+ this.state.fecha)
    }

    
    render() {
        const {pedidosPorFecha}=this.state
        return (
            <div>
                {/* TODO: Solo trae los documentos que tienen productos, o cuyo vectorProductos!==empty */}
                {pedidosPorFecha===true?
                    <div>
                        <Link to="/">Volver</Link>
                        <button onClick={this.addOrder}>AÑADIR</button>
                        <button onClick={this.cambiarDia}>CAMBIAR DIA</button>
                        <button onClick={this.removerListener}>REMOVER LISTENER</button>
                        <input onChange={this.leerReferencia} placeholder="Referencia" type="text"/>
                        <input onChange={this.leerFecha} placeholder="Fecha" type="text"/>
                    </div>
                    :
                    <div>
                    <Link to="/">Volver</Link>
                    <button onClick={this.addOrder}>AÑADIR</button>
                    <button onClick={this.cambiarDia}>CAMBIAR DIA</button>
                    <button onClick={this.removerListener}>REMOVER LISTENER</button>
                    <input onChange={this.leerReferencia} placeholder="Referencia" type="text"/>
                    <input onChange={this.leerFecha} placeholder="Fecha" type="text"/>
                    {pedidosPorFecha.map(pedido=>
                        <div>
                            <strong>{pedido.fecha}</strong>

                            {pedido.productos.map(producto=>
                                <div>
                                    <strong>{producto.nombre}</strong>
                                    <span>Pedida:{producto.cantidadPedida}</span>
                                    <span> | </span>
                                    <span>Pendiente:{producto.cantidadPendiente}</span>
                                </div>
                            )}

                            <div>-----------------------------------------------------------</div>

                        </div>
                    )}
                    </div>  
                }
            </div>
        )
    }
}
