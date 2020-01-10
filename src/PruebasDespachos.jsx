import React, { Component } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";

export default class PruebasDespachos extends Component {
    
    state={
        carritoDeDespachoVector:[],
        pedidosEnCarritoPorFecha:[],
        idsEliminados:[],
        adicionales:[],
        renderizar:false,
        a:false,
        habilitarDespacho:false
    }

    // componentDidMount=()=>{
    //     var auxCarritoDeDespacho
    //     var db=firebase.firestore()
    //     db.collection('proveedores')
    //     .doc('RYrofhCYJcdg93Yxqznd')
    //     .get()
    //     .then((doc)=>{
    //         auxCarritoDeDespacho=doc.data().carritoDeDespacho
    //         //NOTE: Llamando al documento correspondiente de "pedidosPorFecha" para conocer la cantidad pedida
    //         var fechasAux=[]
    //         var fechasAuxUni=[]
    //         auxCarritoDeDespacho.map(pedido=>{fechasAux.push(pedido.fecha)})
    //         fechasAuxUni=[...new Set(fechasAux)]

    //         var auxPedidosPorFecha=[]
    //         fechasAuxUni.map((fechaUnica,index)=>{
    //             console.log(fechaUnica)
    //             let auxDiaFecha=fechaUnica.slice(0,2)
    //             let auxMesFecha=fechaUnica.slice(3,5)
    //             let auxAñoFecha=fechaUnica.slice(6,10)
    //             let idDocString=auxDiaFecha+auxMesFecha+auxAñoFecha
    
    //             db.collection('pedidosPorFecha').doc(idDocString).get()
    //             .then(pedidoPorFecha2=>{
    //                 console.log('PEDIDO POR FECHA DESDE BD:',pedidoPorFecha2.data())
    //                 auxPedidosPorFecha.push(pedidoPorFecha2.data())
    //                 if((index+1)===fechasAuxUni.length){
    //                     this.leerVector(auxCarritoDeDespacho,auxPedidosPorFecha)
    //                 }
    //             })
    //             .catch(err=> console.log(err))
    //         })
    //     })
    //     .catch((err)=>{
    //         console.log('Error en get() vectorCarritoDespacho :',err)
    //     })
    // }

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
    leerVector=(carritoDeDespacho)=>{
        this.setState({carritoDeDespachoVector:carritoDeDespacho})
        
        //NOTE: Obteniendo fechas unicas del carrito de despacho
        var fechasAux=[]
        var fechasAuxUni=[]
        carritoDeDespacho.map(dat=>{fechasAux.push(dat.fecha)})
        fechasAuxUni=[...new Set(fechasAux)]
        
        //NOTE: Mapeando cada una de las fechas unicas para armar sus objetos
        fechasAuxUni.map(fechaUnica=>{
            //NOTE: Obteniendo productos unicos para cada fecha unica
            var vectorProductos=[]
            var productosFechaUni=[]
            var productosUniFechUni=[]
            var productosAux=[]
            productosFechaUni=carritoDeDespacho.filter(dat=>dat.fecha===fechaUnica)
            productosFechaUni.map(productoFechaUnica=>{productosAux.push(productoFechaUnica.idProducto)})
            productosUniFechUni=[...new Set(productosAux)]

            //NOTE: Mapeando cada uno de los productos unicos para armar su objeto
            productosUniFechUni.map(productoUniFechaUni=>{
                //NOTE: Creando vector de IDs de los pedidos correspondientes al producto unica de la fecha unica.
                var auxQ=[]
                var auxIDs=[]
                var objetoPorFecha=null
                auxQ=carritoDeDespacho.filter(pedido=>pedido.idProducto===productoUniFechaUni && pedido.fecha===fechaUnica)
                auxQ.map(pedido=>auxIDs.push(pedido.id))
                                
                //NOTE: Creando objeto del producto unico con la cantidad a despachar y la cantidad pendiente
                objetoPorFecha={cantidadADespacharOriginal:auxQ.length,nombre:productoUniFechaUni,cantidadADespachar:auxQ.length,cantidadPendiente:auxQ.length+5,ids:auxIDs}
                vectorProductos.push(objetoPorFecha)
            })
            //NOTE: Guardando en el estaado el objeto de la fecha unica con su respectivo vector productos
            this.state.pedidosEnCarritoPorFecha.push({fecha:fechaUnica,productos:vectorProductos})
        })

        //NOTE: Habilitando el renderizado del componente cuando en el estado ya se han almacenado los pedidos del carrito organizado por fechas.
        if(this.state.pedidosEnCarritoPorFecha.length>0){
            this.setState({renderizar:true})
        }
    }

    // disminuirCantidad=(e,producto,fecha,ids,QPendiente,QDespachar)=>{
    //     e.preventDefault()
    //     var db=firebase.firestore()
    //     db.collection('pedidos').doc(ids[0]).get()//al terminar, habria que borrar el id que se opero en su vector del estado
    //     .then((doc)=>{
    //         console.log(doc.data())
    //         if(doc.data().estado==='Despachado por el proveedor'){
    //             let auxDiaFecha=fecha.slice(0,2)
    //             let auxMesFecha=fecha.slice(3,5)
    //             let auxAñoFecha=fecha.slice(6,10)
    //             let idDocString=auxDiaFecha+auxMesFecha+auxAñoFecha

    //             //1. Traer documento. 2. Con un auxiliar actualizar el objeto del producto correspondiente. 3. Actualizar el documento con el objeto auxiliar.
    //             db.collection('pedidosPorFecha').doc(idDocString).get()
    //             .then(doc2=>{
    //                 var auxDoc2=doc2.data()
    //                 console.log(auxDoc2)
    //                 //TODO: Algo paso con el documento de este id, por lo que no tiene productos en su vectorProductos
    //                 var anteriorVectorProductos=doc2.data().productos
    //                 var anteriorObjetoProducto=anteriorVectorProductos.filter(productoo=>productoo.nombre===producto)
    //                 console.log(anteriorVectorProductos)
    //                 var anteriorCantidadPendiente=anteriorObjetoProducto[0].cantidadPendiente
    //                 var nuevaCantidadPendiente=anteriorCantidadPendiente+1
    //                 if(nuevaCantidadPendiente>0){
    //                     console.log(nuevaCantidadPendiente)
    //                     var nuevoObjetoProducto={nombre:producto,cantidadPedida:anteriorObjetoProducto.cantidadPedida,cantidadPendiente:nuevaCantidadPendiente}
    //                     console.log(nuevoObjetoProducto)
    //                     db.collection('pedidosPorFecha').doc(doc2.id).update({productos:firebase.firestore.FieldValue.arrayRemove(anteriorObjetoProducto[0])}).then(res=>console.log(res)).catch(err=>console.log(err))
    //                     db.collection('pedidosPorFecha').doc(doc2.id).update({productos:firebase.firestore.FieldValue.arrayUnion(nuevoObjetoProducto)}).then(res=>console.log(res)).catch(err=>console.log(err))
    //                 }else if(nuevaCantidadPendiente===QPendiente){
    //                     console.log('Se sacara esta referencia de esta fecha del carrito de despacho. Ya que la cantidad a despachar a llegado a "0" ')
    //                 }else{
    //                     console.log('No es posible ')
    //                 }
    //             })
    //             .catch(err=>{
    //                 console.log(err)
    //             })
    //         }else{
    //             db.collection('pedidos').doc(ids[0]).update({'estadoDespacho':'Sin atender'}).then(res=>console.log(res)).catch(err=>console.log(err))
    //         }
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // }

    modificarCantidadADespachar=(e,producto,fecha)=>{
        e.preventDefault()
        //NOTE: 1. Buscar objeto e index de fecha
        let objetoFecha=this.state.pedidosEnCarritoPorFecha.filter(pedido=>pedido.fecha===fecha)
        let indexObjetoFecha=this.state.pedidosEnCarritoPorFecha.indexOf(objetoFecha[0],0)
        //NOTE: 2. Obtener vector productos del objeto fecha
        let vectorProductos=objetoFecha[0].productos
        //NOTE: 3. Buscar objeto e index producto
        let objetoProducto=vectorProductos.filter(productoo=>productoo.nombre===producto)
        let indexObjetoProducto=vectorProductos.indexOf(objetoProducto[0],0)
        //NOTE: 4. Obtiene cantidad a despachar y pendiente el objeto producto
        let cantidadDespacharOriginal=objetoProducto[0].cantidadADespacharOriginal
        let cantidadDespachar=objetoProducto[0].cantidadADespachar
        let cantidadPend=objetoProducto[0].cantidadPendiente//TODO: Traer desde el vector usado en Pruebas.jsx del estado global 
        let idsAux=objetoProducto[0].ids
        
        const MODO=e.target.id
        switch (MODO) {
            case "disminuirQDespachar":
                if((cantidadDespachar-1)>0){
                    //NOTE: Añadir id a eliminados solo si la "nueva cantidad a despachar" es inferior a la "cantidad original que se solicito despachar"
                    if(cantidadDespacharOriginal > (cantidadDespachar-1)){
                        this.state.idsEliminados.push({id:idsAux[0],producto:producto,fecha:fecha})
                        idsAux.splice(0,1)
                    }
                    
                    //NOTE: Disminuir las cantidades adicionales a despachar, siempre y cuando existan
                    let objetoQAdicional=this.state.adicionales.filter(obj=>obj.producto===producto && obj.fecha===fecha)
                    let indexObjetoAdicional=this.state.adicionales.indexOf(objetoQAdicional[0],0)           
                    if(objetoQAdicional.length>0){
                        let QAdicional=objetoQAdicional[0].cantidadAdicional
                        let adicionalesADespachar={producto:producto,fecha:fecha,cantidadAdicional:QAdicional-1}
                        this.state.adicionales.splice(indexObjetoAdicional,1,adicionalesADespachar)
                        if(QAdicional-1 === 0){
                            this.state.adicionales.splice(indexObjetoAdicional,1)
                        }
                    }

                    //NOTE: 4. Actualizar las cantidades a despachar
                    let newObjetoProducto={nombre:producto,cantidadADespacharOriginal:cantidadDespacharOriginal,cantidadADespachar:cantidadDespachar-1,cantidadPendiente:cantidadPend,ids:idsAux}
                    vectorProductos.splice(indexObjetoProducto,1,newObjetoProducto)
                    let newObjetoFecha={fecha:fecha,productos:vectorProductos}
                    this.state.pedidosEnCarritoPorFecha.splice(indexObjetoFecha,1,newObjetoFecha)
                    this.setState({habilitarDespacho:true})

                }else if((cantidadDespachar-1)===0){

                    //NOTE: No se puede eliminar mas. Y como ha llegado a 0, entonces se procede a eliminar el producto del vector,
                    //Añadiendo id a eliminados
                    this.state.idsEliminados.push({id:idsAux[0],producto:producto,fecha:fecha})
                    idsAux.splice(0,1)

                    //NOTE: Eliminar objeto producto de vectorProductos y actualizar el objeto fecha
                    vectorProductos.splice(indexObjetoProducto,1)
                    let newObjetoFecha={fecha:fecha,productos:vectorProductos}
                    this.state.pedidosEnCarritoPorFecha.splice(indexObjetoFecha,1,newObjetoFecha)
                    this.setState({a:true})
        
                    //NOTE: Si ya no quedan mas productos en vectorProductos, eliminar toda la fecha
                    let objetoFecha2=this.state.pedidosEnCarritoPorFecha.filter(pedido=>pedido.fecha===fecha)
                    if(objetoFecha2[0].productos.length===0){
                        this.state.pedidosEnCarritoPorFecha.splice(indexObjetoFecha,1)
                    }
                }
                break;
            case "aumentarQDespachar":
                if((cantidadDespachar+1)<=cantidadPend){
                    //NOTE: Si existen ids eliminados de esta referencia en esta fecha, entonces recuperarlos hasta que se agoten
                    let idExist=this.state.idsEliminados.filter(id=>id.producto===producto && id.fecha===fecha)
                    let indexIdEliminado=this.state.idsEliminados.indexOf(idExist[0],0)
                    if(idExist.length>0){
                        this.state.idsEliminados.splice(indexIdEliminado,1)
                        idsAux.push(idExist[0].id)
                    }else{
                        //NOTE: Si la cantidad a despachar es mayor a la cantidad a despachar original, entonces,
                        //guardar en un vector en el estado objeto de la fecha, producto y cantidad adicional para 
                        //despachar.
                        let objetoQAdicional=this.state.adicionales.filter(obj=>obj.producto===producto && obj.fecha===fecha)
                        let indexObjetoAdicional=this.state.adicionales.indexOf(objetoQAdicional[0],0)
                        if(objetoQAdicional.length>0){
                            let QAdicional=objetoQAdicional[0].cantidadAdicional
                            let adicionalesADespachar={producto:producto,fecha:fecha,cantidadAdicional:QAdicional+1}
                            this.state.adicionales.splice(indexObjetoAdicional,1,adicionalesADespachar)
                        }else{
                            let adicionalesADespachar={producto:producto,fecha:fecha,cantidadAdicional:1}
                            this.state.adicionales.push(adicionalesADespachar)
                        }
                    }

                    //NOTE: Actualizar las cantidades a despachar
                    let newObjetoProducto={nombre:producto,cantidadADespacharOriginal:cantidadDespacharOriginal,cantidadADespachar:cantidadDespachar+1,cantidadPendiente:cantidadPend,ids:idsAux}
                    vectorProductos.splice(indexObjetoProducto,1,newObjetoProducto)
                    let newObjetoFecha={fecha:fecha,productos:vectorProductos}
                    this.state.pedidosEnCarritoPorFecha.splice(indexObjetoFecha,1,newObjetoFecha)
                    this.setState({habilitarDespacho:true})
                }
                break;
            case "eliminarTodaLaReferencia":
                console.log('Se eliminara toda la referencia')
                //NOTE: Añadir ids al vector ids por eliminar
                idsAux.map(id=>{
                    this.state.idsEliminados.push({id:id,producto:producto,fecha:fecha})
                    // idsAux.splice(0,1)
                })
                //NOTE:Borrar la correspondiente referencia del vector productos dentro de la fecha correspondiente
                vectorProductos.splice(indexObjetoProducto,1)
                let newObjetoFecha={fecha:fecha,productos:vectorProductos}
                this.state.pedidosEnCarritoPorFecha.splice(indexObjetoFecha,1,newObjetoFecha)
                //NOTE: Borrar fecha si ya no le quedan mas productos
                let objetoFecha2=this.state.pedidosEnCarritoPorFecha.filter(pedido=>pedido.fecha===fecha)
                if(objetoFecha2[0].productos.length===0){
                    this.state.pedidosEnCarritoPorFecha.splice(indexObjetoFecha,1)
                }
                this.setState({habilitarDespacho:true})
            default:
                break;
        }
    }

    // prueba = (e)=>{
    //     e.preventDefault()
    //     var db=firebase.firestore()
    //     const {idsEliminados,pedidosIndividualesEnElCarrito}=this.state
    //     if(idsEliminados.length>0){
    //         var batch=db.batch()
    //         idsEliminados.map(async(idEliminado,index)=>{
    //             try {
    //                 let idAEliminar=pedidosIndividualesEnElCarrito.filter(pedidoIndividual=>pedidoIndividual.id===idEliminado.id)
    //                 await db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd').update({carritoDeDespacho:firebase.firestore.FieldValue.arrayRemove(idAEliminar[0])})
    //                 // console.log('Removido del carrito con exito',idAEliminar[0].id)
    //                 let indexIdAEliminar=pedidosIndividualesEnElCarrito.indexOf(idAEliminar[0],0)
    //                 this.state.pedidosIndividualesEnElCarrito.splice(indexIdAEliminar,1)
    //                 // console.log('Pedidos inviduales',this.state.pedidosIndividualesEnElCarrito)
    //                 await db.collection('pedidos').doc(idEliminado.id).update({estado:'Recibido por el proveedor',estadoDespacho:'Reestablecido'})
    //                 // console.log('Estado actualizado con exito',idEliminado.id)
    //                 if(idsEliminados.length===(index+1)){
    //                     console.log('Se restablcera idsEliminado=[]')
    //                     this.setState({idsEliminados:[]},this.pruebaAdicionales())
    //                 }
    //             } catch (error) {
    //                 console.log('OCURRIO UN ERROR:',error)   
    //             }
    //         })  
    //     }else{
    //         console.log('No hay elementos eliminados, se procede a operar adicionales')
    //         this.pruebaAdicionales()
    //     }  
    // }
    prueba = (e)=>{
        console.log('Comenzando eliminados.....')
        e.preventDefault()
        var db=firebase.firestore()
        const {idsEliminados,carritoDeDespachoVector}=this.state
        var batch=db.batch()
        if(idsEliminados.length>0){
            idsEliminados.map((idEliminado,index)=>{
                try {
                    let idAEliminar=carritoDeDespachoVector.filter(pedidoIndividual=>pedidoIndividual.id===idEliminado.id)
                    var refUpdateCarrito= db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd')
                    batch.update(refUpdateCarrito,{carritoDeDespacho:firebase.firestore.FieldValue.arrayRemove(idAEliminar[0])})
                    // console.log('Removido del carrito con exito',idAEliminar[0].id)
                    let indexIdAEliminar=carritoDeDespachoVector.indexOf(idAEliminar[0],0)
                    this.state.carritoDeDespachoVector.splice(indexIdAEliminar,1)
                    // console.log('Pedidos inviduales',this.state.pedidosIndividualesEnElCarrito)
                    var refUpdateEstado= db.collection('pedidos').doc(idEliminado.id)
                    batch.update(refUpdateEstado,{estado:'Pendiente'})
                    // console.log('Estado actualizado con exito',idEliminado.id)
                    if(idsEliminados.length===(index+1)){
                        console.log('Se restablcera idsEliminado=[]')
                        this.setState({idsEliminados:[]},this.pruebaAdicionales(batch))
                    }
                } catch (error) {
                    console.log('OCURRIO UN ERROR:',error)   
                }
            })  
        }else{
            console.log('No hay elementos eliminados, se procede a operar adicionales')
            this.pruebaAdicionales(batch)
        }  
    }

    pruebaAdicionales=(batch)=>{
        console.log('Comenzando adicionales.....')
        var db=firebase.firestore()
        let adicionalesFechas=[]
        let adicionalesFechasUnicas=[]
        const {carritoDeDespachoVector,adicionales}=this.state
        adicionales.map(adicional=>{adicionalesFechas.push(adicional.fecha)})
        adicionalesFechasUnicas=[...new Set(adicionalesFechas)]
        // console.log('ADICIONALES FECHAS UNICAS:',adicionalesFechasUnicas)
        if(adicionalesFechasUnicas.length>0){
            adicionalesFechasUnicas.map((adicionalFechaUnica,index)=>{
                let pedidosAdicionalesFechaUnica=adicionales.filter(adicional=>adicional.fecha===adicionalFechaUnica)
                // console.log('PEDIDOS ADICIONALES FECHAS UNICAS:',pedidosAdicionalesFechaUnica)
                pedidosAdicionalesFechaUnica.map(async(pedidoAdicionalFechaUnica,index2)=>{
                    const snap=await 
                    db.collection('pedidos')
                    .where("idProveedor","==","AFY GLOBAL SAS")
                    .where("estado","==","Pendiente")
                    .where('fecha','==',adicionalFechaUnica)
                    .where('idProducto',"==",pedidoAdicionalFechaUnica.producto)
                    .limit(pedidoAdicionalFechaUnica.cantidadAdicional)
                    .get()
                    .then((snap)=>{return snap})
                    .catch(err => console.log('ERROR:',err))

                    let contadorAux=0
                    snap.forEach(doc=>{
                        let auxDocData=doc.data()
                        auxDocData.id=doc.id

                        var refUpdateCarritoAdicionales= db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd')
                        batch.update(refUpdateCarritoAdicionales,{carritoDeDespacho:firebase.firestore.FieldValue.arrayUnion(auxDocData)})

                        carritoDeDespachoVector.push(auxDocData)

                        var refUpdateEstadoAdicionales= db.collection('pedidos').doc(doc.id)
                        batch.update(refUpdateEstadoAdicionales,{estado:'Despachado'})

                        contadorAux=contadorAux+1
                        if((index+1)===adicionalesFechasUnicas.length 
                        && (index2+1)===pedidosAdicionalesFechaUnica.length 
                        && pedidoAdicionalFechaUnica.cantidadAdicional===contadorAux){
                            this.setState({adicionales:[]},this.pruebaCrearDespacho(batch))
                        }else{
                        }
                    })
                })
            })
        }else{
            console.log('No hay elementos adicionales, se procede a crear despacho')
            this.pruebaCrearDespacho(batch)
        }
    }

    pruebaCrearDespacho=(batch)=>{
        console.log('Comenzando creacion despacho.....')
        var db=firebase.firestore()

        var refCrearDespacho= db.collection('despachos').doc('DPACHO0002')
        batch.set(refCrearDespacho,{idDespacho:'DPACHO0001',pedidos:this.state.carritoDeDespachoVector,fecha:'07/12/2019'})

        var refLimpiarCarrito= db.collection('proveedores').doc('RYrofhCYJcdg93Yxqznd')
        batch.update(refLimpiarCarrito,{carritoDeDespacho:[]})
        batch.commit()
        .then(()=>{
            this.setState({pedidosEnCarritoPorFecha:[],despachoCreado:true})
        })
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
        const {pedidosEnCarritoPorFecha,renderizar,idsEliminados,adicionales}=this.state
        console.log('PEDIDOS EN CARRITO POR FECHA DESDE RENDER::::::',pedidosEnCarritoPorFecha,renderizar)
        console.log('ELIMINADOS DESDE RENDER::::::',idsEliminados)
        console.log('ADICIONALES DESDE RENDER:',adicionales)

        return (
            <div>
                {renderizar===true?
                    <div>
                        <h1>CARRITO DE DESPACHO 1</h1>
                        {pedidosEnCarritoPorFecha.map(pedido=>
                            <div>
                                <strong>{pedido.fecha}</strong>
                                {pedido.productos.map((producto)=>
                                    <div>
                                        <strong>{producto.nombre}</strong>
                                        <span>A despachar:</span>
                                        <span>
                                            <button id="disminuirQDespachar" onClick={(e)=>this.modificarCantidadADespachar(e,producto.nombre,pedido.fecha,producto.ids,producto.cantidadPendiente,producto.cantidadADespachar)}>-</button>
                                            {/* Para actualizar la vista al disminuir o aumentar la cantidad, simplemente, SI Y SOLO SI SE TIENE EXITO,
                                            en la funcion que realiza esa tarea, se guarda en el estado la cantidad adicional o menor correspondiente y se le suma o resta al valor de al vista*/}
                                            <span>{producto.cantidadADespachar}</span>
                                            <button id="aumentarQDespachar" onClick={(e)=>this.modificarCantidadADespachar(e,producto.nombre,pedido.fecha,producto.ids,producto.cantidadPendiente,producto.cantidadADespachar)}>+</button>
                                            <button id="eliminarTodaLaReferencia" onClick={(e)=>this.modificarCantidadADespachar(e,producto.nombre,pedido.fecha,producto.ids,producto.cantidadPendiente,producto.cantidadADespachar)}>x</button>
                                            <button onClick={(e)=>this.prueba(e)}>probar</button>
                                        </span>
                                    </div>
                                )}
                                <div>-----------------------------------------------------------</div>

                            </div>
                        )}
                        {this.state.habilitarDespacho===true?
                        <button onClick={this.armarDespacho}>Solicitar transporte "Arma el documento despacho correspondiente"</button>
                        :
                        <button disabled onClick={this.armarDespacho}>Solicitar transporte "Arma el documento despacho correspondiente"</button>
                        }
                    </div>
                    :
                    <div>No hay nada...</div>
                }
            </div>
        )        
    }

}


