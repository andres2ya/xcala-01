import React, { Component } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";

export default class PruebasDespachos extends Component {
    
    state={
        pedidosIndividualesEnElCarrito:[],
        pedidosEnCarrito:[],
        idsEliminados:[],
        renderizar:false,
        a:false
    }

    componentDidMount=()=>{
        var auxCarritoDeDespacho
        var db=firebase.firestore()
        db.collection('proveedores')
        .doc('RYrofhCYJcdg93Yxqznd')
        .get()
        .then((doc)=>{
            auxCarritoDeDespacho=doc.data().carritoDeDespacho
            //NOTE: Llamando al documento correspondiente de "pedidosPorFecha" para conocer la cantidad pedida
            var fechasAux=[]
            var fechasAuxUni=[]
            auxCarritoDeDespacho.map(pedido=>{fechasAux.push(pedido.fecha)})
            fechasAuxUni=[...new Set(fechasAux)]

            var auxPedidosPorFecha=[]
            fechasAuxUni.map((fechaUnica,index)=>{
                console.log(fechaUnica)
                let auxDiaFecha=fechaUnica.slice(0,2)
                let auxMesFecha=fechaUnica.slice(3,5)
                let auxAñoFecha=fechaUnica.slice(6,10)
                let idDocString=auxDiaFecha+auxMesFecha+auxAñoFecha
    
                db.collection('pedidosPorFecha').doc(idDocString).get()
                .then(pedidoPorFecha2=>{
                    console.log(pedidoPorFecha2.data())
                    auxPedidosPorFecha.push(pedidoPorFecha2.data())
                    if((index+1)===fechasAuxUni.length){
                        this.leerVector(auxCarritoDeDespacho,auxPedidosPorFecha)
                    }
                })
                .catch(err=> console.log(err))
            })
        })
        .catch((err)=>{
            console.log('Error en get() vectorCarritoDespacho :',err)
        })
    }

    //leerVector por productos solamente, sin conciderar fechas.
    // leerVector=(data)=>{
    //     this.setState({pedidosIndividualesEnElCarrito:data})

    //     var productosAux=[]
    //     var productosAuxUni=[]
    //     data.map(dat=>{productosAux.push(dat.idProducto)})
    //     productosAuxUni=[...new Set(productosAux)]
        
    //     productosAuxUni.map(productoUnico=>{
    //         var auxQ=[]
    //         var objetoPorProducto=null
    //         auxQ=data.filter(pedido=>pedido.idProducto===productoUnico)
    //         //TODO: Traer del objeto de "pedidosPorFecha" correspondiente a la fecha el valor de cantidad pedida para el producto correspondiente
    //         objetoPorProducto={nombre:productoUnico,cantidadADespachar:auxQ.length,cantidadPedida:auxQ.length}
            
    //         this.state.pedidosEnCarrito.push(objetoPorProducto)
    //     })

    //     if(this.state.pedidosEnCarrito.length>0){
    //         this.setState({renderizar:true})
    //     }
    // }


    //Leer vector conciderando tanto fechas como productos
    leerVector=(data,pedidosPorFecha)=>{
        this.setState({pedidosIndividualesEnElCarrito:data})

        //NOTE: Obteniendo fechas unicas del carrito de despacho
        var fechasAux=[]
        var fechasAuxUni=[]
        data.map(dat=>{fechasAux.push(dat.fecha)})
        fechasAuxUni=[...new Set(fechasAux)]
        
        //NOTE: Mapeando cada una de las fechas unicas para armar sus objetos
        fechasAuxUni.map(fechaUnica=>{
            //NOTE: Obteniendo productos unicos para cada fecha unica
            var vectorProductos=[]
            var productosFechaUni=[]
            var productosUniFechUni=[]
            var productosAux=[]
            productosFechaUni=data.filter(dat=>dat.fecha===fechaUnica)
            productosFechaUni.map(productoFechaUnica=>{productosAux.push(productoFechaUnica.idProducto)})
            productosUniFechUni=[...new Set(productosAux)]

            //NOTE: Mapeando cada uno de los productos unicos para armar su objeto
            productosUniFechUni.map(productoUniFechaUni=>{
                //NOTE: Creando vector de IDs de los pedidos correspondientes al producto unica de la fecha unica.
                var auxQ=[]
                var auxIDs=[]
                var objetoPorFecha=null
                auxQ=data.filter(pedido=>pedido.idProducto===productoUniFechaUni && pedido.fecha===fechaUnica)
                auxQ.map(pedido=>auxIDs.push(pedido.id))
                
                //NOTE: Obteniendo cantidad pendiente del documento de la fecha unica en el objeto del producto unico
                var QPendiente=0
                let objetoPedidoPorFecha=pedidosPorFecha.filter(pedidoXFecha=>pedidoXFecha.fecha===fechaUnica)
                let vectorProductosAux=objetoPedidoPorFecha[0].productos
                let objetoProducto=vectorProductosAux.filter(producto=>producto.nombre===productoUniFechaUni)
                let cantidadPendiente=objetoProducto[0].cantidadPendiente
                QPendiente=cantidadPendiente
                
                //NOTE: Creando objeto del producto unico con la cantidad a despachar y la cantidad pendiente
                objetoPorFecha={nombre:productoUniFechaUni,cantidadADespachar:auxQ.length,cantidadPendiente:QPendiente+auxQ.length,ids:auxIDs}
                vectorProductos.push(objetoPorFecha)
            })
            //NOTE: Guardando en el estaado el objeto de la fecha unica con su respectivo vector productos
            this.state.pedidosEnCarrito.push({fecha:fechaUnica,productos:vectorProductos})
        })

        //NOTE: Habilitando el renderizado del componente cuando en el estado ya se han almacenado los pedidos del carrito organizado por fechas.
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
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    disminuirCantidad=(e,producto,fecha,ids,QPendiente,QDespachar)=>{
        e.preventDefault()
        var db=firebase.firestore()
        db.collection('pedidos').doc(ids[0]).get()//al terminar, habria que borrar el id que se opero en su vector del estado
        .then((doc)=>{
            console.log(doc.data())
            if(doc.data().estado==='Despachado por el proveedor'){
                let auxDiaFecha=fecha.slice(0,2)
                let auxMesFecha=fecha.slice(3,5)
                let auxAñoFecha=fecha.slice(6,10)
                let idDocString=auxDiaFecha+auxMesFecha+auxAñoFecha

                //1. Traer documento. 2. Con un auxiliar actualizar el objeto del producto correspondiente. 3. Actualizar el documento con el objeto auxiliar.
                db.collection('pedidosPorFecha').doc(idDocString).get()
                .then(doc2=>{
                    var auxDoc2=doc2.data()
                    console.log(auxDoc2)
                    //TODO: Algo paso con el documento de este id, por lo que no tiene productos en su vectorProductos
                    var anteriorVectorProductos=doc2.data().productos
                    var anteriorObjetoProducto=anteriorVectorProductos.filter(productoo=>productoo.nombre===producto)
                    console.log(anteriorVectorProductos)
                    var anteriorCantidadPendiente=anteriorObjetoProducto[0].cantidadPendiente
                    var nuevaCantidadPendiente=anteriorCantidadPendiente+1
                    if(nuevaCantidadPendiente>0){
                        console.log(nuevaCantidadPendiente)
                        var nuevoObjetoProducto={nombre:producto,cantidadPedida:anteriorObjetoProducto.cantidadPedida,cantidadPendiente:nuevaCantidadPendiente}
                        console.log(nuevoObjetoProducto)
                        db.collection('pedidosPorFecha').doc(doc2.id).update({productos:firebase.firestore.FieldValue.arrayRemove(anteriorObjetoProducto[0])}).then(res=>console.log(res)).catch(err=>console.log(err))
                        db.collection('pedidosPorFecha').doc(doc2.id).update({productos:firebase.firestore.FieldValue.arrayUnion(nuevoObjetoProducto)}).then(res=>console.log(res)).catch(err=>console.log(err))
                    }else if(nuevaCantidadPendiente===QPendiente){
                        console.log('Se sacara esta referencia de esta fecha del carrito de despacho. Ya que la cantidad a despachar a llegado a "0" ')
                    }else{
                        console.log('No es posible ')
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }else{
                db.collection('pedidos').doc(ids[0]).update({'estadoDespacho':'Sin atender'}).then(res=>console.log(res)).catch(err=>console.log(err))
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    disminuirCantidadADespachar=(e,producto,fecha,ids,QPendiente,QDespachar)=>{
        e.preventDefault()
        //NOTE: 1. Buscar objeto e index de fecha
        let objetoFecha=this.state.pedidosEnCarrito.filter(pedido=>pedido.fecha===fecha)
        let indexObjetoFecha=this.state.pedidosEnCarrito.indexOf(objetoFecha[0],0)
        //NOTE: 2. Buscar objeto producto y su index
        let vectorProductos=objetoFecha[0].productos
        let objetoProducto=vectorProductos.filter(productoo=>productoo.nombre===producto)
        let indexObjetoProducto=vectorProductos.indexOf(objetoProducto[0],0)
        //NOTE: 3. Obtiene cantidad a despachar y pendiente
        let cantidadDespachar=objetoProducto[0].cantidadADespachar
        let cantidadPend=objetoProducto[0].cantidadPendiente
        let idsAux=objetoProducto[0].ids
        
        if((cantidadDespachar-1)>0){
            this.state.idsEliminados.push(ids[0])
            idsAux.splice(0,1)
            //NOTE: 4. Crea un nuevo objeto producto con la cantidad a despachar actualizada
            let newObjetoProducto={nombre:producto,cantidadADespachar:cantidadDespachar-1,cantidadPendiente:cantidadPend,ids:idsAux}
            //NOTE: 5. Crea un nuevo vectorProductos reemplazando el objeto producto anterior con el recien creado
            vectorProductos.splice(indexObjetoProducto,1,newObjetoProducto)
            //NOTE: 6. Crea un nuevo objeto fecha reemplazando el vectorProducto anterior con el recien creado.
            let newObjetoFecha={fecha:fecha,productos:vectorProductos}
            //NOTE: Actualizando vector pedidosEnCarrito del estado
            this.state.pedidosEnCarrito.splice(indexObjetoFecha,1,newObjetoFecha)
            this.setState({a:true})
        }else if((cantidadDespachar-1)===0){
            //NOTE: No se puede eliminar mas. Y como ha llegado a 0, entonces se procede a eliminar el producto del vector
            vectorProductos.splice(indexObjetoProducto,1)
            let newObjetoFecha={fecha:fecha,productos:vectorProductos}
            this.state.pedidosEnCarrito.splice(indexObjetoFecha,1,newObjetoFecha)
            this.setState({a:true})

            let objetoFecha2=this.state.pedidosEnCarrito.filter(pedido=>pedido.fecha===fecha)
            if(objetoFecha2[0].productos.length===0){
                console.log('No quedan mas productos para esta fecha')
                this.state.pedidosEnCarrito.splice(indexObjetoFecha,1)
            }
        }

        
        console.log('PEDIDOS EN CARRITO',this.state.pedidosEnCarrito)
        console.log('IDs ELIMINADOS:',this.state.idsEliminados)
        //TODO: Terminar... Borrar la fecha cuando ya no quedan productos dentro de ella.
    }


    //render sin conciderar fechas
    //TODO: Crear opcion para eliminar todas las cantidades de una referencia, y aumentar o disminuir las cantidades. De tal forma que cambie su estado como si no hubiese sido seleccionada, o para seleccionala.
    // render() {
    //     const {pedidosEnCarrito,renderizar}=this.state
    //     console.log(pedidosEnCarrito,renderizar)
    //     return (
    //         <div>
    //             {renderizar===true?
    //                 <div>
    //                     <h1>CARRITO DE DESPACHO 1</h1>
    //                     {pedidosEnCarrito.map(pedido=>
    //                         <div>
    //                             <strong>{pedido.fecha}</strong>
                                
    //                             <div>
    //                                 <strong>{pedido.nombre}</strong>
    //                                 <span>Pedida:{pedido.cantidadPedida}</span>
    //                                 <span> | </span>
    //                                 <span>A despachar:</span>
    //                                 <span>
    //                                     <button onClick={(e)=>this.disminuirCantidad(e,pedido.nombre)}>-</button>
    //                                         {/* Para actualizar la vista al disminuir o aumentar la cantidad, simplemente, SI Y SOLO SI SE TIENE EXITO,
    //                                         en la funcion que realiza esa tarea, se guarda en el estado la cantidad adicional o menor correspondiente y se le suma o resta al valor de al vista*/}
    //                                     <span>{pedido.cantidadADespachar+{/*this.state.masCantidad OR + this.state.menosCantidad*/}}</span>
    //                                     <button>+</button>
    //                                     <button>x</button>
    //                                 </span>
    //                             </div>
                                
    //                             {/* <div>-----------------------------------------------------------</div> */}

    //                         </div>
    //                     )}
    //                     <button onClick={this.armarDespacho}>Solicitar transporte "Arma el documento despacho correspondiente"</button>
    //                 </div>
    //                 :
    //                 <div>No hay nada...</div>
    //             }
    //         </div>
    //     )        
    // }


    //Render conciderando tanto fechas como productos
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
                                        <span>Pendiente:{producto.cantidadPendiente}</span>
                                        <span> | </span>
                                        <span>A despachar:</span>
                                        <span>
                                            <button onClick={(e)=>this.disminuirCantidadADespachar(e,producto.nombre,pedido.fecha,producto.ids,producto.cantidadPendiente,producto.cantidadADespachar)}>-</button>
                                            {/* Para actualizar la vista al disminuir o aumentar la cantidad, simplemente, SI Y SOLO SI SE TIENE EXITO,
                                            en la funcion que realiza esa tarea, se guarda en el estado la cantidad adicional o menor correspondiente y se le suma o resta al valor de al vista*/}
                                            <span>{producto.cantidadADespachar}</span>
                                            <button>+</button>
                                            <button>x</button>
                                        </span>
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
