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
    carritoDescargado:false
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
        var db=firebase.firestore()
        db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd').get().then((doc)=>{
            console.log('leyendo carrito...');
            this.leerCarritoDeDespacho(doc.data())
        })
        .catch((err)=>{console.log(err)})

        this.leerCarritoDeDespacho=(carrito)=>{console.log('AUX CARRITO:',carrito.carritoDeDespacho)
            this.setState({carritoDeDespachoAux:carrito.carritoDeDespacho,carritoDescargado:true})
        }
    }   

    activeListenerPedidosPorFechas=()=>{
        //NOTE: Funcion que trae todas las fechas del proveedor para guardarlas en el estado y poder mostrar todo el historial, va paginado de a 7 dias.
        var db=firebase.firestore()
        this.unsubscribeListenerPedidosPorFechas=db.collection("pedidosPorFecha").where("idProveedor","==","AFY GLOBAL SAS").orderBy("fecha","asc")
        .onSnapshot((snap)=>{
            var pedidosPorFecha=[]
            if(snap.empty){
                console.log('No hay documentos')
                this.setState({mapearPedidosPorFecha:false,renderizar:false})
            }else{
                snap.forEach(doc=>{
                    pedidosPorFecha.push(doc.data())
                })
                pedidosPorFecha.map(pedidoPorFecha=>{
                    pedidoPorFecha.productos.sort((a,b)=>(a.nombre-b.nombre))
                })
                this.setState({pedidosPorFecha:pedidosPorFecha,mapearPedidosPorFecha:true,renderizar:true})
            }
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
            var writtingError=false
            const {pedidosPorFecha,mapearPedidosPorFecha}=this.state
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
                auxAñoFecha=fechaUnica.slice(6,10)
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
                        writtingError=true
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
                            .catch((err)=>{
                                console.log(err)
                                writtingError=true
                            })
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
                            .catch((err)=>{
                                console.log(err)
                                writtingError=true
                            })
                            //Añadir
                            db.collection("pedidosPorFecha").doc(idDoc).update({productos:firebase.firestore.FieldValue.arrayUnion({
                                'nombre':productoUnicoFechaUnica,
                                'cantidadPedida':auxCantidadPedidoActual+nuevaCantidadPedido,
                                'cantidadPendiente':auxCantidadPendienteActual+nuevaCantidadPedido
                            })})
                            .catch((err)=>{
                                console.log(err)
                                writtingError=true
                            })
                        }
                    })
                }
            })
        //Solo si existen nuevos pedidos, se ejecuta la funcion de cambiar estado
        if(auxIds.length>0 && writtingError===false){
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
            var auxPedidosParaActualizar=[]
            var auxFechasPedidosParaActualizar=[]
            var auxIdsPedidosParaActualizar=[]
            var auxUniqueFechasPedidosParaActualizar=[]
            var documentoPedidosPorFechaParaActualizar=[]
            var productosFechaUnicaParaActualizar=[]
            var pedidosFechaUnicaParaActualizar=[]
            var productosUnicoFechaUnicaParaActualizar=[]
            var nuevaCantidadDespachada
            const {pedidosPorFecha}=this.state
            snap.forEach(doc=>{
                auxPedidosParaActualizar.push(doc.data());
                auxFechasPedidosParaActualizar.push(doc.data().fecha);
                auxIdsPedidosParaActualizar.push(doc.id)
            })
            auxUniqueFechasPedidosParaActualizar=[...new Set(auxFechasPedidosParaActualizar)]

            auxUniqueFechasPedidosParaActualizar.map(fechaUnica=>{
                documentoPedidosPorFechaParaActualizar=pedidosPorFecha.filter(pedidoPorFecha=>pedidoPorFecha.fecha===fechaUnica)
                let idDocParaActualizar=documentoPedidosPorFechaParaActualizar[0].id
                let vectorProductosDocumentoParaActualizar=documentoPedidosPorFechaParaActualizar[0].productos
                let objetoProductoEnDocumentoParaActualizar=[]

                productosFechaUnicaParaActualizar=[]
                pedidosFechaUnicaParaActualizar=auxPedidosParaActualizar.filter(pedido=>pedido.fecha===fechaUnica)
                pedidosFechaUnicaParaActualizar.map(pedidoFechaUnica=>{productosFechaUnicaParaActualizar.push(pedidoFechaUnica.idProducto)})
                productosUnicoFechaUnicaParaActualizar=[...new Set(productosFechaUnicaParaActualizar)]

                productosUnicoFechaUnicaParaActualizar.map(productoUnicoFechaUnica=>{
                    objetoProductoEnDocumentoParaActualizar=vectorProductosDocumentoParaActualizar.filter(productoDocumento=>productoDocumento.nombre===productoUnicoFechaUnica)
                    let auxCantidadPedidoActualParaActualizar=objetoProductoEnDocumentoParaActualizar[0].cantidadPedida
                    let auxCantidadPendienteActualParaActualizar=objetoProductoEnDocumentoParaActualizar[0].cantidadPendiente

                    nuevaCantidadDespachada=0
                    pedidosFechaUnicaParaActualizar.map(pedidoFechaUnica=>{
                        if(pedidoFechaUnica.idProducto===productoUnicoFechaUnica){
                            nuevaCantidadDespachada=nuevaCantidadDespachada+1
                        }
                    })
                    // Remover
                    db.collection("pedidosPorFecha").doc(idDocParaActualizar).update({productos:firebase.firestore.FieldValue.arrayRemove({
                        'nombre':productoUnicoFechaUnica,
                        'cantidadPedida':auxCantidadPedidoActualParaActualizar,
                        'cantidadPendiente':auxCantidadPendienteActualParaActualizar
                    })})
                    //Añadir
                    db.collection("pedidosPorFecha").doc(idDocParaActualizar).update({productos:firebase.firestore.FieldValue.arrayUnion({
                        'nombre':productoUnicoFechaUnica,
                        'cantidadPedida':auxCantidadPedidoActualParaActualizar,
                        'cantidadPendiente':auxCantidadPendienteActualParaActualizar-nuevaCantidadDespachada
                    })})
                })
            })
            //Solo si existen nuevos pedidos, se ejecuta la funcion de cambiar estado
            if(auxIdsPedidosParaActualizar.length>0){
                this.cambiarEstadoParaActualizar(auxIdsPedidosParaActualizar)
            }
        })
    }

    cambiarEstadoParaActualizar=(idPedidosParaActualizar)=>{
        this.unsubscribeListenerActualizarPendientes()
        //NOTE: Funcion que marca como leidos los documentos cargados en la vista del proveedor, de tal forma que el query no los vuelve a llamar.
        var db=firebase.firestore()
        idPedidosParaActualizar.map((idPedido,index)=>{
            db.collection('pedidos').doc(idPedido).update({'estado':'Despachado por el proveedor'})
            .then(()=>{
                //Si es el ultimo id, entonces activar listener
                if((index+1)===idPedidosParaActualizar.length){
                    this.activeListenerActualizarPendientes()
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        })
    }
    
    componentWillUnmount=()=>{
        this.removerListener()
        console.log('listener removido')
    }

    componentDidUpdate=()=>{
        // console.log('estado al actualizar componente: ',this.state)
    }

    despacharTodo=(e,fecha,idPedidoPorFecha)=>{
        e.preventDefault()
        console.log('FECHA:::',fecha)
        var db=firebase.firestore()
        db.collection('pedidos')
        .where("idProveedor","==","AFY GLOBAL SAS")
        .where("estado","==","Recibido por el proveedor")
        .where('fecha','==',fecha)
        .get()
        .then((snap)=>{
            if(snap.empty){
                console.log('no existen mas pedidos para despachar en esta fecha :')
            }else{
                //NOTE: 1: Se trae el vector de carritoDeDespacho desde la base de datos
                // db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd').get().then((doc)=>{console.log('leyendo carrito...');this.leerCarritoDeDespacho(doc.data())}).catch((err)=>{console.log(err)})
                const {carritoDeDespachoAux}=this.state
                
                //NOTE: 2. Agregar nuevos pedidos al carritoDeDespacho
                snap.forEach(doc=>{carritoDeDespachoAux.push(doc.data())})
                //NOTE: 3. Actualizar vector carritoDeDespacho con los nuevos pedidos en la base de datos
                db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd').update({carritoDeDespacho:carritoDeDespachoAux})
                .then((res)=>{
                    //NOTE: 4. Al exito de la actualizacion del carritoDeDespacho, se cambia el estado de los pedidos agregados a "En carrito de despacho"
                    snap.forEach(doc=>{
                        db.collection("pedidos").doc(doc.id).update({estadoDespacho:'Despachado'})
                        .then((res)=>{console.log(res)})
                        .catch((err)=>{console.log(err)})
                    })
                })
                .catch((err)=>{console.log(err)})
                //NOTE: 5. Cambiar estado del documento "pedidoPorFecha" correspondiente
                db.collection('pedidosPorFecha').doc(idPedidoPorFecha).update({estado:'Completo'}).then((res)=>console.log('actualizado estado en "pedidosPorFecha',res)).catch((err)=>{console.log('Error al actualizar "pedidosPorFecha',err)})
            }
        })
        .catch((err)=>{
            console.log('Error en get() despacharTodo :',err)
        })
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
            this.state.vectorProductosADespacharPorQEspecificas.splice(index,1)
            console.log('XXX:',this.state.vectorProductosADespacharPorQEspecificas)
        }
    }

    despacharQEspecificas=(e,fecha,idPedidoPorFecha)=>{
        e.preventDefault()
        var db=firebase.firestore()
        var auxVectorDespacharQE
        auxVectorDespacharQE=this.state.vectorProductosADespacharPorQEspecificas.filter(productoADespacharPorQE=>productoADespacharPorQE.fecha===fecha)
        console.log(auxVectorDespacharQE)
        
        //NOTE: 1: Se trae el vector de carritoDeDespacho una unica vez. Se crea un vector con los ids de los pedidos que estan siendo agregados al carritoAux
        // db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd').get().then((doc)=>this.leerCarritoDeDespacho(doc.data())).catch((err)=>{console.log(err)})
        const {carritoDeDespachoAux}=this.state 
        var idsPedidosEnCarrito=[]
        //NOTE: 2. Se mapea cada referencia de esa fecha y para cada una de ella considerando su cantidad a despachar se realiza un llamado a la base de datos
        if(auxVectorDespacharQE.length>0){
            auxVectorDespacharQE.map((productoADespacharPorQEFecha,index)=>{
                db.collection('pedidos')
                .where("idProveedor","==","AFY GLOBAL SAS")
                .where("estado","==","Recibido por el proveedor")
                .where('fecha','==',fecha)
                .where('idProducto',"==",productoADespacharPorQEFecha.producto)
                .limit(productoADespacharPorQEFecha.cantidad)
                .get()
                .then((snap)=>{
                    var auxDocData
                    if(snap.empty){
                        console.log('no existen mas pedidos para despachar en esta fecha :')
                    }else{
                        //NOTE: 3. Agregar nuevos pedidos al carritoDeDespacho
                        snap.forEach(doc=>{           
                            auxDocData=doc.data()
                            auxDocData.id=doc.id
                            console.log('objeto auxiliar: ',auxDocData)
                            carritoDeDespachoAux.push(auxDocData)
                            idsPedidosEnCarrito.push(doc.id)
                        })
                        console.log('INDEX:',index,'LENGTH:',auxVectorDespacharQE.length)
                        if((index+1)===auxVectorDespacharQE.length){
                            this.escribirEnBaseDeDatos()
                        }
                    }
                })
                .catch((err)=>{
                    console.log('Error en get() despacharQEspecificas :',err)
                })
            })
        }else{
            console.log('No has ingresado una cantidad valida para despachar')
        }

        this.escribirEnBaseDeDatos=()=>{
            //NOTE: 4. Actualizar vector carritoDeDespacho con los nuevos pedidos en la base de datos
            db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd').update({carritoDeDespacho:carritoDeDespachoAux})
            .then((res)=>{
                //NOTE: 5. Al exito de la actualizacion del carritoDeDespacho, se cambia el estado de los pedidos agregados a "En carrito de despacho"
                idsPedidosEnCarrito.map(id=>{
                    db.collection("pedidos").doc(id).update({estadoDespacho:'Despachado'})
                    .then((res)=>{console.log(res)})
                    .catch((err)=>{console.log(err)})
                })
            })
            .catch((err)=>{console.log(err)})
            //NOTE: 6. Cambiar estado del documento "pedidoPorFecha" correspondiente
            db.collection('pedidosPorFecha').doc(idPedidoPorFecha).update({estado:'incompleto'}).then((res)=>console.log('actualizado estado en "pedidosPorFecha',res)).catch((err)=>{console.log('Error al actualizar "pedidosPorFecha',err)})
        }
    }
    
    componentWillUpdate=()=>{
        // console.log(this.state)
    }

    render() {
        const {pedidosPorFecha,renderizar,carritoDescargado}=this.state
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
                                        <span><input onChange={(e)=>this.leerCantidadesEspecificas(e, pedido.fecha, producto.nombre)} min="0" max={producto.cantidadPendiente} type="number"/></span>
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
            </div>
        )
    }
}
