import React, { Component } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";
import moment from 'moment';
import 'moment/locale/es';
import {Link} from 'react-router-dom'


export default class Pruebas extends Component {

state={
    fromCache:"",
    pedidosPorFecha:[],
    mapearPedidosPorFecha:false,
    renderizar:false,
    vectorProductosADespacharPorQEspecificas:[],
    carritoDeDespachoAux:[],
    carritoDescargado:false,
    ejecutandoDespacharTodo:false,
    ejecutandoDespacharQE:false
}
    removerListener=()=>{
        console.log('removiendo...')
        this.unsubscribeListenerPedidos()
        // this.unsubscribeListenerPedidosPorFechas()
        // this.unsubscribeListenerActualizarPendientes()
        // this.unsubscribeListenerRestablecerPendientes()
    }

    componentWillMount=()=>{
        moment.locale('es');
        // this.activeListenerPedidosPorFechas()
        this.activeListenerPedidos()
        // this.activeListenerActualizarPendientes()
        // this.activeListenerRestablecerPendientes()
        this.getCarritoFromDB()
    }   

    getCarritoFromDB=async()=>{
        var db=firebase.firestore()
        await db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd').get()
        .then(async(doc)=>{
            console.log('leyendo carrito...');
            let carrito=doc.data()
            await this.setState({carritoDeDespachoAux:carrito.carritoDeDespacho,carritoDescargado:true})
            // this.markAsDespachadoAllordersInCarrito()
        })
        .catch((err)=>{console.log(err)})
    }
    // markAsDespachadoAllordersInCarrito=()=>{
    //     var db=firebase.firestore()
    //     const {carritoDeDespachoAux}=this.state
        
    //     let ordersToMark=carritoDeDespachoAux.filter(order=>order.estadoDespacho==='Sin atender')
    //     if(ordersToMark.length>0){
    //         ordersToMark.map(order=>{
    //             console.log('Marcar como despachado el pedido con id:',order.id)
    //             db.collection("pedidos").doc(order.id).update({estadoDespacho:'Despachado'})
    //         })
    //     }else{
    //         console.log('No existen pedidos sin marcar en el carrito de despacho')
    //     }
    // }
    ESPACIO=()=>{console.log('ESPACIO')}
    // activeListenerPedidosPorFechas=()=>{
    //     //NOTE: Funcion que trae todas las fechas del proveedor para guardarlas en el estado y poder mostrar todo el historial, va paginado de a 7 dias.
    //     var db=firebase.firestore()
    //     this.unsubscribeListenerPedidosPorFechas=db.collection("pedidosPorFecha").where("idProveedor","==","AFY GLOBAL SAS").orderBy("fecha","asc")
    //     .onSnapshot((snap)=>{
    //         var pedidosPorFecha=[]
    //         if(snap.empty){
    //             console.log('No hay documentos')
    //             this.setState({mapearPedidosPorFecha:false,renderizar:false})
    //         }else{
    //             snap.forEach(doc=>{
    //                 pedidosPorFecha.push(doc.data())
    //             })
    //             pedidosPorFecha.map(pedidoPorFecha=>{
    //                 pedidoPorFecha.productos.sort((a,b)=>(a.nombre-b.nombre))
    //             })
    //             this.setState({pedidosPorFecha:pedidosPorFecha,mapearPedidosPorFecha:true,renderizar:true})
    //         }
    //     })
    // }
    ESPACIO=()=>{console.log('ESPACI')}
    // activeListenerPedidos = ()=>{
    //     var db=firebase.firestore()
    //     this.unsubscribeListenerPedidos=db.collection('pedidos')
    //     .where("idProveedor","==","AFY GLOBAL SAS")
    //     .where("estado","==","Ordenados con exito")
    //     .orderBy("idProducto","asc")
    //     .onSnapshot((snap)=>{

    //         var auxPedidos=[]
    //         var auxUniqueFechasPedidos=[]
    //         var auxFechasPedidos=[]
    //         var vectorProductos=[]
    //         var auxIds=[]
    //         var documentoPedidosPorFecha=[]
    //         var pedidosFechaUnica=[]
    //         var productosFechaUnica=[]
    //         var productosUnicoFechaUnica=[]
    //         var nuevaCantidadPedido=0
    //         var auxDiaFecha
    //         var auxMesFecha
    //         var auxAñoFecha
    //         var idDocString
    //         var writtingError=false
    //         const {pedidosPorFecha,mapearPedidosPorFecha}=this.state
    //         // NOTE: Funcion que captura las referencias unicas y las ubica en un vector
    //         snap.forEach((doc)=>{
    //             auxPedidos.push(doc.data());
    //             auxFechasPedidos.push(doc.data().fecha);
    //             auxIds.push(doc.id)                
    //         })
    //         auxUniqueFechasPedidos=[...new Set(auxFechasPedidos)]
            
    //         auxUniqueFechasPedidos.map(fechaUnica=>{
    //             auxDiaFecha=fechaUnica.slice(0,2)
    //             auxMesFecha=fechaUnica.slice(3,5)
    //             auxAñoFecha=fechaUnica.slice(6,10)
    //             idDocString=auxDiaFecha+auxMesFecha+auxAñoFecha
                
    //             documentoPedidosPorFecha=pedidosPorFecha.filter(pedidoPorFecha=>pedidoPorFecha.fecha===fechaUnica)
    //             if(documentoPedidosPorFecha.length===0){//Por cada fecha no encontrada en coleccion de pedidosPorFecha, creo un nuevo documento
                    
    //                 vectorProductos=[]
    //                 productosFechaUnica=[]
    //                 pedidosFechaUnica=auxPedidos.filter(pedido=>pedido.fecha===fechaUnica)
    //                 pedidosFechaUnica.map(pedidoFechaUnica=>{productosFechaUnica.push(pedidoFechaUnica.idProducto)})
    //                 productosUnicoFechaUnica=[...new Set(productosFechaUnica)]
                    
    //                 productosUnicoFechaUnica.map(productoUnicoFechaUnica=>{//Por cada nombre unico en la fecha unica creo un nuevo objeto en el vector productos
    //                     pedidosFechaUnica.map(pedidoFechaUnica=>{
    //                         if(pedidoFechaUnica.idProducto===productoUnicoFechaUnica){
    //                             nuevaCantidadPedido=nuevaCantidadPedido+1
    //                         }
    //                     })
    //                     vectorProductos.push({nombre:productoUnicoFechaUnica,cantidadPedida:nuevaCantidadPedido,cantidadPendiente:nuevaCantidadPedido})
    //                     nuevaCantidadPedido=0
    //                 })
    //                 db.collection("pedidosPorFecha").doc(idDocString).set({
    //                     id:idDocString,
    //                     fecha:fechaUnica,
    //                     idProveedor:"AFY GLOBAL SAS",
    //                     productos:vectorProductos
    //                 })
    //                 .then((docRef)=>{
    //                     // console.log('Document written with ID: ',docRef.id)
    //                 })
    //                 .catch((err)=>{
    //                     console.log('Error adding document: ',err)
    //                     writtingError=true
    //                 })
    //             }else{//Si la fecha unica ya existe en un documento de pedidosPorFecha ->Entonces
    //                 //1. Obtener id documento correspondiente.
    //                 let idDoc=documentoPedidosPorFecha[0].id
    //                 //2. Buscar si el producto ya existe dentro del vector productos del documento
    //                 let vectorProductosDocumento=documentoPedidosPorFecha[0].productos
    //                 let objetoProductoEnDocumento=[]
    //                 productosFechaUnica=[]
    //                 pedidosFechaUnica=auxPedidos.filter(pedido=>pedido.fecha===fechaUnica)
    //                 pedidosFechaUnica.map(pedidoFechaUnica=>{productosFechaUnica.push(pedidoFechaUnica.idProducto)})
    //                 productosUnicoFechaUnica=[...new Set(productosFechaUnica)]

    //                 productosUnicoFechaUnica.map(productoUnicoFechaUnica=>{
    //                     objetoProductoEnDocumento=vectorProductosDocumento.filter(productoDocumento=>productoDocumento.nombre===productoUnicoFechaUnica)
    //                     //3. Si no existe, crear el objeto correspondiente.
    //                     if(objetoProductoEnDocumento.length===0){//Si no existe un objeto para ese producto, entonces
    //                         //4. contar cantidad pedidos de ese producto
    //                         nuevaCantidadPedido=0
    //                         pedidosFechaUnica.map(pedidoFechaUnica=>{
    //                             if(pedidoFechaUnica.idProducto===productoUnicoFechaUnica){
    //                                 nuevaCantidadPedido=nuevaCantidadPedido+1
    //                             }
    //                         })
    //                         //5. escribir objeto en documento
    //                         db.collection("pedidosPorFecha").doc(idDoc).update({productos:firebase.firestore.FieldValue.arrayUnion({
    //                             'nombre':productoUnicoFechaUnica,
    //                             'cantidadPedida':nuevaCantidadPedido,
    //                             'cantidadPendiente':nuevaCantidadPedido
    //                          })})
    //                         .catch((err)=>{
    //                             console.log(err)
    //                             writtingError=true
    //                         })
    //                     }
    //                     //6. Si ya existe, entonces actualizar su cantidad.
    //                     else{
    //                         let auxCantidadPedidoActual=objetoProductoEnDocumento[0].cantidadPedida
    //                         let auxCantidadPendienteActual=objetoProductoEnDocumento[0].cantidadPendiente

    //                         nuevaCantidadPedido=0
    //                         pedidosFechaUnica.map(pedidoFechaUnica=>{
    //                             if(pedidoFechaUnica.idProducto===productoUnicoFechaUnica){
    //                                 nuevaCantidadPedido=nuevaCantidadPedido+1
    //                             }
    //                         })
    //                         // Remover
    //                         db.collection("pedidosPorFecha").doc(idDoc).update({productos:firebase.firestore.FieldValue.arrayRemove({
    //                             'nombre':productoUnicoFechaUnica,
    //                             'cantidadPedida':auxCantidadPedidoActual,
    //                             'cantidadPendiente':auxCantidadPendienteActual
    //                         })})
    //                         .catch((err)=>{
    //                             console.log(err)
    //                             writtingError=true
    //                         })
    //                         //Añadir
    //                         db.collection("pedidosPorFecha").doc(idDoc).update({productos:firebase.firestore.FieldValue.arrayUnion({
    //                             'nombre':productoUnicoFechaUnica,
    //                             'cantidadPedida':auxCantidadPedidoActual+nuevaCantidadPedido,
    //                             'cantidadPendiente':auxCantidadPendienteActual+nuevaCantidadPedido
    //                         })})
    //                         .catch((err)=>{
    //                             console.log(err)
    //                             writtingError=true
    //                         })
    //                     }
    //                 })
    //             }
    //         })
    //     //Solo si existen nuevos pedidos, se ejecuta la funcion de cambiar estado
    //     if(auxIds.length>0 && writtingError===false){
    //         this.cambiarEstado(auxIds)
    //     }
    //     })
    // }

    activeListenerPedidos = ()=>{
        var db=firebase.firestore()
        this.unsubscribeListenerPedidos=db.collection('pedidos')
        .where("idProveedor","==","AFY GLOBAL SAS")
        .where("estado","==","Pendiente")
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
            const {pedidosPorFecha}=this.state

            // NOTE: Funcion que captura las referencias unicas y las ubica en un vector
            snap.forEach((doc)=>{
                auxPedidos.push(doc.data());
                auxFechasPedidos.push(doc.data().fecha);
                auxIds.push(doc.id)                
            })
            auxUniqueFechasPedidos=[...new Set(auxFechasPedidos)]
            console.log('NUEVA CANTIDAD ANTES DEL MAP FECHA UNCIA:',nuevaCantidadPedido)
            auxUniqueFechasPedidos.map(fechaUnica=>{
                console.log('FECHA UNICA:',fechaUnica)
                console.log('NUEVA CANTIDAD DENTRO DEL MAP FECHA UNICA:',nuevaCantidadPedido)

                documentoPedidosPorFecha=pedidosPorFecha.filter(pedidoPorFecha=>pedidoPorFecha.fecha===fechaUnica)
                if(documentoPedidosPorFecha.length===0){//Por cada fecha no encontrada en coleccion de pedidosPorFecha, creo un nuevo documento
                    vectorProductos=[]
                    productosFechaUnica=[]
                    pedidosFechaUnica=auxPedidos.filter(pedido=>pedido.fecha===fechaUnica)
                    pedidosFechaUnica.map(pedidoFechaUnica=>{productosFechaUnica.push(pedidoFechaUnica.idProducto)})
                    productosUnicoFechaUnica=[...new Set(productosFechaUnica)]
                    console.log('NUEVA CANTIDAD ANTES DEL MAP PRODUCTOS UNICOS FECHA UNCIA:',nuevaCantidadPedido)
                    
                    productosUnicoFechaUnica.map(productoUnicoFechaUnica=>{//Por cada nombre unico en la fecha unica creo un nuevo objeto en el vector productos
                        console.log('PEDIDOS FECHA UNICA;',pedidosFechaUnica)
                        console.log('NUEVA CANTIDAD ANTES DEL MAP PEDIDOS FECHA UNCIA:',nuevaCantidadPedido)
                        pedidosFechaUnica.map(pedidoFechaUnica=>{
                            if(pedidoFechaUnica.idProducto===productoUnicoFechaUnica){
                                nuevaCantidadPedido=nuevaCantidadPedido+1
                            }
                        })
                        console.log('NUEVA CANTIDAD ANTES REINICIAR:',nuevaCantidadPedido)
                        vectorProductos.push({nombre:productoUnicoFechaUnica,cantidadPedida:nuevaCantidadPedido,cantidadPendiente:nuevaCantidadPedido,prueba:'DESDE NUEVA FECHA'})
                        nuevaCantidadPedido=0
                        console.log('NUEVA CANTIDAD DESPUES REINICIAR:',nuevaCantidadPedido)

                    })
                    //NOTE: Guardando en estado la nueva fecha con su correspondiente vector productos
                    this.state.pedidosPorFecha.push({
                        fecha:fechaUnica,
                        idProveedor:"AFY GLOBAL SAS",
                        productos:vectorProductos
                    })
                    this.setState({renderizar:true})

                }else{//Si la fecha unica ya existe en un documento de pedidosPorFecha ->Entonces
                    //1. Obtener index objeto (documento) correspondiente.
                    let indexObjetoFecha=this.state.pedidosPorFecha.indexOf(documentoPedidosPorFecha[0],0)

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
                            //5.NOTE: escribir objeto producto en objeto fecha del estado
                            this.state.pedidosPorFecha[indexObjetoFecha].productos.push({
                                nombre:productoUnicoFechaUnica,
                                cantidadPedida:nuevaCantidadPedido,
                                cantidadPendiente:nuevaCantidadPedido
                            })
                            this.setState({renderizar:true})
                            nuevaCantidadPedido=0


                        }
                        //6. Si ya existe, entonces actualizar su cantidad.
                        else{
                            nuevaCantidadPedido=0
                            pedidosFechaUnica.map(pedidoFechaUnica=>{
                                if(pedidoFechaUnica.idProducto===productoUnicoFechaUnica){
                                    nuevaCantidadPedido=nuevaCantidadPedido+1
                                }
                            })
                            //NOTE:obtener index objeto producto
                            let indexObjetoProducto=this.state.pedidosPorFecha[indexObjetoFecha].productos.indexOf(objetoProductoEnDocumento[0],0)
                            //NOTE: Reemplazar objeto producto
                            this.state.pedidosPorFecha[indexObjetoFecha].productos.splice(indexObjetoProducto,1,{
                                nombre:productoUnicoFechaUnica,
                                cantidadPedida:nuevaCantidadPedido,
                                cantidadPendiente:nuevaCantidadPedido
                            })
                            this.setState({renderizar:true})
                            nuevaCantidadPedido=0
                        }
                    })
                }
            })
        //Solo si existen nuevos pedidos, se ejecuta la funcion de cambiar estado
        // if(auxIds.length>0 && writtingError===false){
        //     this.cambiarEstado(auxIds)
        // }
        })
    }

    // cambiarEstado=(idPedidos)=>{
    //     this.unsubscribeListenerPedidos()
    //     //NOTE: Funcion que marca como leidos los documentos cargados en la vista del proveedor, de tal forma que el query no los vuelve a llamar.
    //     var db=firebase.firestore()
    //     idPedidos.map((idPedido,index)=>{
    //         db.collection('pedidos').doc(idPedido).update({'estado':'Recibido por el proveedor'})
    //         .then(()=>{
    //             //Si es el ultimo id, entonces activar listener
    //             if((index+1)===idPedidos.length){
    //                 this.activeListenerPedidos()
    //             }
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    //     })
    // }

    // activeListenerActualizarPendientes=()=>{
    //     var db=firebase.firestore()
    //     this.unsubscribeListenerActualizarPendientes=db.collection('pedidos')
    //     .where("idProveedor","==","AFY GLOBAL SAS")
    //     .where("estado","==","Recibido por el proveedor")
    //     .where("estadoDespacho","==","Despachado")
    //     .orderBy("idProducto","asc")
    //     .onSnapshot((snap)=>{
    //         var auxPedidosParaActualizar=[]
    //         var auxFechasPedidosParaActualizar=[]
    //         var auxIdsPedidosParaActualizar=[]
    //         var auxUniqueFechasPedidosParaActualizar=[]
    //         var documentoPedidosPorFechaParaActualizar=[]
    //         var productosFechaUnicaParaActualizar=[]
    //         var pedidosFechaUnicaParaActualizar=[]
    //         var productosUnicoFechaUnicaParaActualizar=[]
    //         var nuevaCantidadDespachada
    //         const {pedidosPorFecha}=this.state
    //         snap.forEach(doc=>{
    //             auxPedidosParaActualizar.push(doc.data());
    //             auxFechasPedidosParaActualizar.push(doc.data().fecha);
    //             auxIdsPedidosParaActualizar.push(doc.id)
    //         })
    //         auxUniqueFechasPedidosParaActualizar=[...new Set(auxFechasPedidosParaActualizar)]

    //         auxUniqueFechasPedidosParaActualizar.map(fechaUnica=>{
    //             documentoPedidosPorFechaParaActualizar=pedidosPorFecha.filter(pedidoPorFecha=>pedidoPorFecha.fecha===fechaUnica)
    //             let idDocParaActualizar=documentoPedidosPorFechaParaActualizar[0].id
    //             let vectorProductosDocumentoParaActualizar=documentoPedidosPorFechaParaActualizar[0].productos
    //             let objetoProductoEnDocumentoParaActualizar=[]

    //             productosFechaUnicaParaActualizar=[]
    //             pedidosFechaUnicaParaActualizar=auxPedidosParaActualizar.filter(pedido=>pedido.fecha===fechaUnica)
    //             pedidosFechaUnicaParaActualizar.map(pedidoFechaUnica=>{productosFechaUnicaParaActualizar.push(pedidoFechaUnica.idProducto)})
    //             productosUnicoFechaUnicaParaActualizar=[...new Set(productosFechaUnicaParaActualizar)]

    //             productosUnicoFechaUnicaParaActualizar.map(productoUnicoFechaUnica=>{
    //                 objetoProductoEnDocumentoParaActualizar=vectorProductosDocumentoParaActualizar.filter(productoDocumento=>productoDocumento.nombre===productoUnicoFechaUnica)
    //                 let auxCantidadPedidoActualParaActualizar=objetoProductoEnDocumentoParaActualizar[0].cantidadPedida
    //                 let auxCantidadPendienteActualParaActualizar=objetoProductoEnDocumentoParaActualizar[0].cantidadPendiente

    //                 nuevaCantidadDespachada=0
    //                 pedidosFechaUnicaParaActualizar.map(pedidoFechaUnica=>{
    //                     if(pedidoFechaUnica.idProducto===productoUnicoFechaUnica){
    //                         nuevaCantidadDespachada=nuevaCantidadDespachada+1
    //                     }
    //                 })
    //                 // Remover
    //                 db.collection("pedidosPorFecha").doc(idDocParaActualizar).update({productos:firebase.firestore.FieldValue.arrayRemove({
    //                     'nombre':productoUnicoFechaUnica,
    //                     'cantidadPedida':auxCantidadPedidoActualParaActualizar,
    //                     'cantidadPendiente':auxCantidadPendienteActualParaActualizar
    //                 })})
    //                 //Añadir
    //                 db.collection("pedidosPorFecha").doc(idDocParaActualizar).update({productos:firebase.firestore.FieldValue.arrayUnion({
    //                     'nombre':productoUnicoFechaUnica,
    //                     'cantidadPedida':auxCantidadPedidoActualParaActualizar,
    //                     'cantidadPendiente':auxCantidadPendienteActualParaActualizar-nuevaCantidadDespachada
    //                 })})
    //             })
    //         })
    //         //Solo si existen nuevos pedidos, se ejecuta la funcion de cambiar estado
    //         if(auxIdsPedidosParaActualizar.length>0){
    //             this.cambiarEstadoParaActualizar(auxIdsPedidosParaActualizar)
    //         }
    //     })
    // }

    // cambiarEstadoParaActualizar=(idPedidosParaActualizar)=>{
    //     this.unsubscribeListenerActualizarPendientes()
    //     //NOTE: Funcion que marca como leidos los documentos cargados en la vista del proveedor, de tal forma que el query no los vuelve a llamar.
    //     var db=firebase.firestore()
    //     idPedidosParaActualizar.map((idPedido,index)=>{
    //         db.collection('pedidos').doc(idPedido).update({estado:'Despachado por el proveedor'})
    //         .then(()=>{
    //             //Si es el ultimo id, entonces activar listener
    //             if((index+1)===idPedidosParaActualizar.length){
    //                 this.activeListenerActualizarPendientes()
    //             }
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    //     })
    // }

    // activeListenerRestablecerPendientes=()=>{
        
    //     var db=firebase.firestore()
    //     this.unsubscribeListenerRestablecerPendientes=db.collection('pedidos')
    //     .where("idProveedor","==","AFY GLOBAL SAS")
    //     .where("estado","==","Recibido por el proveedor")
    //     .where("estadoDespacho","==","Reestablecido")
    //     .orderBy("idProducto","asc")
    //     .onSnapshot((snap)=>{
    //         var auxPedidosParaActualizar=[]
    //         var auxFechasPedidosParaActualizar=[]
    //         var auxIdsPedidosParaActualizar=[]
    //         var auxUniqueFechasPedidosParaActualizar=[]
    //         var documentoPedidosPorFechaParaActualizar=[]
    //         var productosFechaUnicaParaActualizar=[]
    //         var pedidosFechaUnicaParaActualizar=[]
    //         var productosUnicoFechaUnicaParaActualizar=[]
    //         var nuevaCantidadDespachada
    //         const {pedidosPorFecha}=this.state
    //         snap.forEach(doc=>{
    //             auxPedidosParaActualizar.push(doc.data());
    //             auxFechasPedidosParaActualizar.push(doc.data().fecha);
    //             auxIdsPedidosParaActualizar.push(doc.id)
    //         })
    //         auxUniqueFechasPedidosParaActualizar=[...new Set(auxFechasPedidosParaActualizar)]

    //         auxUniqueFechasPedidosParaActualizar.map(fechaUnica=>{
    //             documentoPedidosPorFechaParaActualizar=pedidosPorFecha.filter(pedidoPorFecha=>pedidoPorFecha.fecha===fechaUnica)
    //             let idDocParaActualizar=documentoPedidosPorFechaParaActualizar[0].id
    //             let vectorProductosDocumentoParaActualizar=documentoPedidosPorFechaParaActualizar[0].productos
    //             let objetoProductoEnDocumentoParaActualizar=[]

    //             productosFechaUnicaParaActualizar=[]
    //             pedidosFechaUnicaParaActualizar=auxPedidosParaActualizar.filter(pedido=>pedido.fecha===fechaUnica)
    //             pedidosFechaUnicaParaActualizar.map(pedidoFechaUnica=>{productosFechaUnicaParaActualizar.push(pedidoFechaUnica.idProducto)})
    //             productosUnicoFechaUnicaParaActualizar=[...new Set(productosFechaUnicaParaActualizar)]

    //             productosUnicoFechaUnicaParaActualizar.map(productoUnicoFechaUnica=>{
    //             objetoProductoEnDocumentoParaActualizar=vectorProductosDocumentoParaActualizar.filter(productoDocumento=>productoDocumento.nombre===productoUnicoFechaUnica)
    //             let auxCantidadPedidoActualParaActualizar=objetoProductoEnDocumentoParaActualizar[0].cantidadPedida
    //             let auxCantidadPendienteActualParaActualizar=objetoProductoEnDocumentoParaActualizar[0].cantidadPendiente

    //             nuevaCantidadDespachada=0
    //             pedidosFechaUnicaParaActualizar.map(pedidoFechaUnica=>{
    //                 if(pedidoFechaUnica.idProducto===productoUnicoFechaUnica){
    //                     nuevaCantidadDespachada=nuevaCantidadDespachada+1
    //                 }
    //             })
    //             // Remover
    //             db.collection("pedidosPorFecha").doc(idDocParaActualizar).update({productos:firebase.firestore.FieldValue.arrayRemove({
    //                 'nombre':productoUnicoFechaUnica,
    //                 'cantidadPedida':auxCantidadPedidoActualParaActualizar,
    //                 'cantidadPendiente':auxCantidadPendienteActualParaActualizar
    //             })})
    //             //Añadir
    //             db.collection("pedidosPorFecha").doc(idDocParaActualizar).update({productos:firebase.firestore.FieldValue.arrayUnion({
    //                 'nombre':productoUnicoFechaUnica,
    //                 'cantidadPedida':auxCantidadPedidoActualParaActualizar,
    //                 'cantidadPendiente':auxCantidadPendienteActualParaActualizar+nuevaCantidadDespachada
    //             })})
    //         })
    //     })
    //     //Solo si existen nuevos pedidos, se ejecuta la funcion de cambiar estado
    //     if(auxIdsPedidosParaActualizar.length>0){
    //         this.cambiarEstadoParaRestablecer(auxIdsPedidosParaActualizar)
    //     }
    // })
    // }
    
    // cambiarEstadoParaRestablecer=(idPedidosARestablecer)=>{
    //     this.unsubscribeListenerRestablecerPendientes()
    //     //NOTE: Funcion que marca como leidos los documentos cargados en la vista del proveedor, de tal forma que el query no los vuelve a llamar.
    //     var db=firebase.firestore()
    //     idPedidosARestablecer.map((idPedido,index)=>{
    //         db.collection('pedidos').doc(idPedido).update({estado:'Recibido por el proveedor',estadoDespacho:'Sin atender'})
    //         .then(()=>{
    //             //Si es el ultimo id, entonces activar listener
    //             if((index+1)===idPedidosARestablecer.length){
    //                 this.activeListenerRestablecerPendientes()
    //             }
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    //     })
    // }
    
    
    componentDidUpdate=()=>{
        // console.log('estado al actualizar componente: ',this.state)
    }
    
    componentWillUnmount=()=>{
        this.removerListener()
        console.log('listener removido')
    }

    // despacharTodo=(e,fecha,idPedidoPorFecha)=>{
    // e.preventDefault()
    // if(this.state.ejecutandoDespacharTodo===false){
    //     console.log('1-Se comenzara a ejecutar despacharTodo')
    //     this.setState({ejecutandoDespacharTodo:true})
    //     console.log('2-Se ha marcado "ejecutandoDespacharTodo" como true.')
    //     var db=firebase.firestore()
    //     db.collection('pedidos')
    //     .where("idProveedor","==","AFY GLOBAL SAS")
    //     .where("estado","==","Recibido por el proveedor")
    //     .where("estadoDespacho","==","Sin atender")
    //     .where('fecha','==',fecha)
    //     .get()
    //     .then((snap)=>{
    //         if(snap.empty){
    //             console.log('4-no existen mas pedidos para despachar en esta fecha:')
    //             this.setState({ejecutandoDespacharTodo:false})
    //             console.log('5-Se ha marcado "ejecutandoDespacharTodo" como false.')
    //         }else{
    //             this.unsubscribeListenerActualizarPendientes()
    //             console.log('3-Se ha desactivado listener actualizar pendientes.')
    //             //NOTE: 1: Se trae el vector de carritoDeDespacho desde la base de datos
    //             // db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd').get().then((doc)=>{console.log('leyendo carrito...');this.leerCarritoDeDespacho(doc.data())}).catch((err)=>{console.log(err)})
    //             const {carritoDeDespachoAux}=this.state
    //             //NOTE: 2. Agregar nuevos pedidos al carritoDeDespacho
    //             let lengthSnap=0
    //             snap.forEach(doc=>{
    //                 let auxDocData=doc.data()
    //                 auxDocData.id=doc.id
    //                 carritoDeDespachoAux.push(auxDocData)
    //                 lengthSnap=lengthSnap+1
    //             })
    //             //NOTE: 3. Actualizar vector carritoDeDespacho con los nuevos pedidos en la base de datos
    //             console.log('Se actualizara carrito en base de datos')
    //             db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd').update({carritoDeDespacho:carritoDeDespachoAux})
    //             .then(async(res)=>{
    //                 console.log('Actualizacion exitosa del carrito en base de datos.')
    //                 //NOTE: 4. Al exito de la actualizacion del carritoDeDespacho, se cambia el estado de los pedidos agregados a "En carrito de despacho"
    //                 await this.getCarritoFromDB()
    //                 console.log('5.1-Termino de actualizar carrito')
    //                 let lengthSnap2=0
    //                 console.log('6-Se comenzara a ejecutar forEach para el snap del listener')
    //                 snap.forEach(async(doc)=>{
    //                     console.log('7-Ejecucion del forEach:')
    //                     await db.collection("pedidos").doc(doc.id).update({estadoDespacho:'Despachado'})
    //                     console.log('8-Actualizado con exito el "estadoDespacho del pedido: ',doc.id)
    //                     lengthSnap2=lengthSnap2+1
    //                     console.log('9-Turno: ',lengthSnap2,'==',lengthSnap,(lengthSnap2)===lengthSnap)
    //                     if((lengthSnap2)===lengthSnap){
    //                         db.collection('pedidosPorFecha').doc(idPedidoPorFecha).update({estado:'Completo'})
    //                         .then((res)=>{
    //                             //NOTE: 5. Cambiar estado del documento "pedidoPorFecha" correspondiente
    //                             console.log('actualizado estado en "pedidosPorFecha": Completo')
    //                             this.setState({ejecutandoDespacharTodo:false},this.activeListenerActualizarPendientes())
    //                         })
    //                         .catch((err)=>{console.log('Error al actualizar "pedidosPorFecha',err)})
    //                     }
    //                 })
    //             })
    //             .catch((err)=>{console.log(err)})
    //         }
    //     })
    //     .catch((err)=>{
    //         console.log('Error en get() despacharTodo :',err)
    //     })
    // }else{
    //     console.log('Se esta ejecutando despachar todo')
    // }
    // }

    despacharTodo=(e,fecha)=>{
        e.preventDefault()
        if(this.state.ejecutandoDespacharTodo===false){
            this.setState({ejecutandoDespacharTodo:true})
            var db=firebase.firestore()
            db.collection('pedidos')
            .where("idProveedor","==","AFY GLOBAL SAS")
            .where("estado","==","Pendiente")
            .where('fecha','==',fecha)
            .get()
            .then((snap)=>{
                if(!snap.empty){
                    this.unsubscribeListenerPedidos()
                    const {carritoDeDespachoAux}=this.state

                    //NOTE: Eliminar del vector pedidosPorFecha del estado, la fecha correspondiente
                    let objetoFecha=this.state.pedidosPorFecha.filter(pedido=>pedido.fecha===fecha)
                    let indexObjetoFecha=this.state.pedidosPorFecha.indexOf(objetoFecha[0],0)
                    this.state.pedidosPorFecha.splice(indexObjetoFecha,1)
                    this.setState({renderizar:true})

                    var batch=db.batch()
                    snap.forEach(async doc=>{
                        let auxDocData=doc.data()
                        auxDocData.id=doc.id
                        carritoDeDespachoAux.push(auxDocData)
                        var refUpdateEstado= db.collection("pedidos").doc(doc.id)
                        batch.update(refUpdateEstado,{estado:'EnCarrito'})
                    })
                    
                    var refUpdateCarrito=db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd')
                    batch.update(refUpdateCarrito,{carritoDeDespacho:carritoDeDespachoAux})
                    batch.commit()
                    .then(async(res)=>{
                        await this.getCarritoFromDB()
                        this.setState({ejecutandoDespacharTodo:false})
                        this.activeListenerPedidos()
                    })
                    .catch((err)=>{console.log(err)})
                }else{
                    this.setState({ejecutandoDespacharTodo:false})
                }
            })
            .catch((err)=>{
                console.log('Error en get() despacharTodo :',err)
            })
        }else{
            console.log('Se esta ejecutando despachar todo')
        }
        }

    leerCantidadesEspecificas=(e,fecha,producto)=>{
        
        //TODO: Limpiar caja texto del input al presionar "despachar Q especificas"
        e.preventDefault()
        var auxProductoUnicoQE
        var Q=parseInt(e.target.value) 
        var Qmax=parseInt(e.target.max) 

        console.log('Q:',e.target.value,'MAX:',e.target.max,'TYPE:',e.target.type)
        if(Q>0 && Q<(Qmax+1)){
            auxProductoUnicoQE={cantidad:Q,fecha:fecha,producto:producto}
            let auxExistProduct=this.state.vectorProductosADespacharPorQEspecificas.filter(productoo=>productoo.producto===producto && productoo.fecha===fecha)
            if(auxExistProduct.length>0){
                const index = this.state.vectorProductosADespacharPorQEspecificas.findIndex(item=>item.producto===producto && item.fecha===fecha)
                this.state.vectorProductosADespacharPorQEspecificas.splice(index,1)
                this.state.vectorProductosADespacharPorQEspecificas.push(auxProductoUnicoQE)
            }else{
                this.state.vectorProductosADespacharPorQEspecificas.push(auxProductoUnicoQE)
            }
            console.log('XXX:',this.state.vectorProductosADespacharPorQEspecificas)
        }else{
            console.log('No has introducido una cantidad validad')
            const index = this.state.vectorProductosADespacharPorQEspecificas.findIndex(item=>item.producto===producto && item.fecha===fecha)
            if(index>0){
                this.state.vectorProductosADespacharPorQEspecificas.splice(index,1)
                console.log('XXX:',this.state.vectorProductosADespacharPorQEspecificas)
            }
        }
    }

    despacharQEspecificas=(e,fecha)=>{
        e.preventDefault()
        var db=firebase.firestore()
        var auxVectorDespacharQE
        const {carritoDeDespachoAux}=this.state 
        if(this.state.ejecutandoDespacharQE===false){
            auxVectorDespacharQE=this.state.vectorProductosADespacharPorQEspecificas.filter(productoADespacharPorQE=>productoADespacharPorQE.fecha===fecha)
            if(auxVectorDespacharQE.length>0){
                console.log('Se comenzara a ejecutar despacharQE')
                this.unsubscribeListenerPedidos()
                this.setState({ejecutandoDespacharQE:true})
                auxVectorDespacharQE.map((productoADespacharPorQEFecha)=>{
                    db.collection('pedidos')
                    .where("idProveedor","==","AFY GLOBAL SAS")
                    .where("estado","==","Pendiente")
                    .where('fecha','==',fecha)
                    .where('idProducto',"==",productoADespacharPorQEFecha.producto)
                    .limit(productoADespacharPorQEFecha.cantidad)
                    .get()
                    .then((snap)=>{
                        if(!snap.empty){
                            //NOTE: Eliminar del vector pedidosPorFecha del estado, el objeto producto correspondiente, o la fecha completa si es el caso
                            var objetoFecha=this.state.pedidosPorFecha.filter(pedido=>pedido.fecha===fecha)
                            var indexObjetoFecha=this.state.pedidosPorFecha.indexOf(objetoFecha[0])
                            var vectorProductosFecha=objetoFecha[0].productos
                            var objetoProducto=vectorProductosFecha.filter(producto=>producto.nombre===productoADespacharPorQEFecha.producto)
                            var indexObjetoProducto=vectorProductosFecha.indexOf(objetoProducto[0])
                            var cantidadPendienteObjetoProducto=objetoProducto[0].cantidadPendiente
                            if(cantidadPendienteObjetoProducto-productoADespacharPorQEFecha.cantidad===0){
                                this.state.pedidosPorFecha[indexObjetoFecha].productos.splice(indexObjetoProducto,1)
                                this.setState({renderizar:true})
                                let newVectorProductosFecha=objetoFecha[0].productos
                                if(newVectorProductosFecha.length===0){
                                    this.state.pedidosPorFecha.splice(indexObjetoFecha,1)
                                    this.setState({renderizar:true})
                                }
                            }
                            
                            //NOTE: 3. Agregar nuevos pedidos al carritoDeDespacho
                            var auxDocData
                            var batch=db.batch()
                            snap.forEach(doc=>{           
                                auxDocData=doc.data()
                                auxDocData.id=doc.id
                                carritoDeDespachoAux.push(auxDocData)
                                var refUpdateEstado= db.collection("pedidos").doc(doc.id)
                                batch.update(refUpdateEstado,{estado:'EnCarrito'})
                            })
                            var refUpdateCarrito=db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd')
                            batch.update(refUpdateCarrito,{carritoDeDespacho:carritoDeDespachoAux})
                            batch.commit()
                            .then(async(res)=>{
                                await this.getCarritoFromDB()
                                this.setState({ejecutandoDespacharQE:false})
                                this.activeListenerPedidos()
                            })
                            .catch((err)=>{console.log(err)})
                        }else{
                            console.log('no existen mas pedidos para despachar en esta fecha :')
                            this.setState({ejecutandoDespacharQE:false})
                        }
                    })
                    .catch((err)=>{
                        console.log('Error en get() despacharQEspecificas :',err)
                    })
                })
            }else{
                console.log('No has ingresado una cantidad valida para despachar')
            }
        }else{
            console.log('Ya se esta ejecutando despacharQE')
        }
    }


    render() {
        const {pedidosPorFecha,renderizar,carritoDescargado}=this.state
        console.log('PEDIDOR POR FECHA DESDE RENDER:',pedidosPorFecha)
        // pedidosPorFecha.map(pedidoPorFecha=>{
        //     pedidoPorFecha.productos.sort((a,b)=>(a.nombre-b.nombre))
        // })
        return (
            <div>
                {renderizar===false?
                    <div>
                        <Link to="/">Volver</Link>
                        <h1>PANEL PEDIDOS PROVEEDOR</h1>
                    </div>
                    :
                    <div>
                        <Link to="/">Volver</Link>
                        <h1>PANEL PEDIDOS PROVEEDOR</h1>
                        {pedidosPorFecha.map(pedido=>
                            <div>
                                <strong>{pedido.fecha}</strong>

                                {pedido.productos.map((producto)=>
                                    <div>
                                        <strong>{producto.nombre}</strong>
                                        <span>Pedida:{producto.cantidadPedida}</span>
                                        <span> | </span>
                                        <span>Pendiente:{producto.cantidadPendiente}</span>
                                        <span><input id="inputQADespachar" onChange={(e)=>this.leerCantidadesEspecificas(e, pedido.fecha, producto.nombre)} min="0" max={producto.cantidadPendiente} type="number"/></span>
                                    </div>
                                )}
                                
                                {pedido.estado==='incompleto'?
                                    
                                    carritoDescargado===true?
                                    <button onClick={(e)=>this.despacharTodo(e,pedido.fecha,pedido.id)}>Despachar pendientes</button>
                                    :
                                    <button disabled>Despachar pendientes</button>
                                :
                                    carritoDescargado===true?
                                    <button onClick={(e)=>this.despacharTodo(e,pedido.fecha,pedido.id)}>Despachar todo</button>
                                    :
                                    <button disabled>Despachar todo</button>

                                }

                                {carritoDescargado===true?
                                <button onClick={(e)=>this.despacharQEspecificas(e,pedido.fecha,pedido.id)}>Despachar cantidades especificas</button>
                                :
                                <button disabled>Despachar cantidades especificas</button>
                                }
                                <div>-----------------------------------------------------------</div>

                            </div>
                        )}
                    </div>  
                }
                <Link to='/pruebasdespacho'>despachos</Link>
            </div>
        )
    }

}
