import React, { Component } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";
import moment from 'moment';
import 'moment/locale/es';
import {Link} from 'react-router-dom'


export default class pruebas extends Component {

state={
    prueba:"xxgit",
    fromCache:"",
    pedidosPorFecha:true,
    referencia:"",
    auxFecha:null,
    auxFechaSeñuelo:null,
    fecha:null,
    fechaSeñuelo:null,
    listenerRemoved:null,
    listenerActivate:null,
    dates:[
        '11/01/2019',
        '11/02/2019',
        '11/03/2019',
        '11/04/2019',
        '11/05/2019',
        '11/06/2019',
        '11/07/2019',
        '11/08/2019',
        '11/09/2019',
        '11/10/2019',
        '11/11/2019',
        '11/12/2019',
        '11/13/2019',
        '11/14/2019',
        '11/15/2019',
        '11/16/2019',
        '11/17/2019',
        '11/18/2019',
        '11/19/2019',
        '11/20/2019',
        '11/21/2019',
        '11/22/2019',
        '11/23/2019',
        '11/24/2019',
        '12/07/2019']
}
    removerListener=()=>{
        console.log('removiendo...')
        this.unsubscribe()
    }

    componentWillMount=()=>{
        moment.locale('es');
        this.activeListener()
    }

    activeListener = async ()=>{
        await this.setState({fecha:moment(new Date()).format('L')})

        {//NOTE: Opcion mas o menos buena para darle manejo al problema de los dias en que no entra el proveedor.
        var auxFecha
        var dia
        var mes
        var auxMesNumero
        var mesNumero
        var año
        var fechaLimiteInferior=null
        var fechaLimiteSuperior=null
        var auxDia=0
        var diaNumero
        var auxCount=0
        //if(año actual es bisiesto){
            //const meses=[{nombre:'ene.',dias:31},{nombre:'feb.',dias:29},{nombre:'mar.',dias:31},{nombre:'abr.',dias:30},{nombre:'may.',dias:31},{nombre:'jun.',dias:30},{nombre:'jul.',dias:31},{nombre:'ago.',dias:31},{nombre:'sep.',dias:30},{nombre:'oct.',dias:31},{nombre:'nov.',dias:30},{nombre:'dic.',dias:31}]
        //}else{
            const meses=[{nombre:'ene.',dias:31},{nombre:'feb.',dias:28},{nombre:'mar.',dias:31},{nombre:'abr.',dias:30},{nombre:'may.',dias:31},{nombre:'jun.',dias:30},{nombre:'jul.',dias:31},{nombre:'ago.',dias:31},{nombre:'sep.',dias:30},{nombre:'oct.',dias:31},{nombre:'nov.',dias:30},{nombre:'dic.',dias:31}]
        //}

        meses.map(mesConst=>{
            this.state.dates.map(fecha=>{
                let auxFechaDos=moment(new Date(fecha)).format('DD/MM/YYYY')
                dia=moment(new Date(fecha)).format('DD')
                mes=moment(new Date(fecha)).format('MMM')
                auxMesNumero=1 + moment(new Date(fecha)).month();if(auxMesNumero<10){mesNumero='0'+auxMesNumero}else{mesNumero=auxMesNumero}
                año=moment(new Date(fecha)).format('YYYY')
                            
                if(mesConst.nombre===mes){
                        //si el mes de la constante es igual al mes actual
                        if(mesConst.nombre===moment(new Date()).format('MMM')){
                            for (let index = 1+auxCount; index <= moment(new Date()).format('DD'); index++) {if(index<10){auxDia='0'+index}else{auxDia=index}
                                if(dia<10){diaNumero=Math.trunc(dia)}else{diaNumero=dia}
                                if(dia!==auxDia && fechaLimiteInferior===null && diaNumero>index){
                                    // console.log('if :'+dia+' es diferente de? '+auxDia)
                                    let x = moment(new Date(auxDia+'/'+mesNumero+'/'+año)).format('L')
                                    let y = moment(new Date(dia+'/'+mesNumero+'/'+año)).format('L')
                                    fechaLimiteInferior=moment(new Date(x)).format('L')
                                    fechaLimiteSuperior=moment(new Date(y)).format('L')
                                    // console.log(fechaLimiteInferior)
                                    // console.log(fechaLimiteSuperior)
                                }else if(dia!==auxDia && fechaLimiteInferior!==null && fechaLimiteSuperior===null && diaNumero>index){
                                    // console.log('else if :'+dia+' es diferente de? '+auxDia)
                                    let y = moment(new Date(dia+'/'+mesNumero+'/'+año)).format('L')
                                    fechaLimiteSuperior=moment(new Date(y)).format('L')
                                    // console.log(fechaLimiteSuperior)
                                }else{
                                        // console.log('else :'+dia+' es diferente de? '+auxDia)
                                        auxCount=auxCount+1
                                        break;
                                    }
                            }
                        }else{
                            console.log(':-.-:')
                            console.log(mesConst.nombre)
                            console.log(mesConst.dias)
                            console.log(auxCount)
                            for (let index = 1+auxCount; index <= mesConst.dias; index++) {if(index<10){auxDia='0'+index}else{auxDia=index}
                                if(dia<10){diaNumero=Math.trunc(dia)}else{diaNumero=dia}

                                console.log(dia+'es diferente de?'+auxDia)
                                if(dia!==auxDia && fechaLimiteInferior===null && diaNumero>index){
                                    console.log('entro!')
                                    console.log(diaNumero+': es mayor que :'+index)
                                    let x = moment(new Date(auxDia+'/'+mesNumero+'/'+año)).format('L')
                                    fechaLimiteInferior=moment(new Date(x)).format('L')
                                }else{
                                    // console.log('else :'+dia+' es diferente de? '+auxDia)
                                    auxCount=auxCount+1
                                    break;
                                }
                            }
                        }
                        //TODO: No guarda el ultimo dia encontrado de ese mes, sino el primero
                        console.log(dia+auxCount)
                        console.log(dia==auxCount)
                        if(fechaLimiteInferior===null && dia==auxCount){
                            let x = moment(new Date(dia+'/'+mesNumero+'/'+año)).format('L')
                            fechaLimiteInferior=moment(new Date(x)).format('L')
                        }
                }
            })
            //TODO: No ubica el limite superior adecuado al evaluar el siguiente mes
            console.log('limite inferior :'+fechaLimiteInferior)
            console.log('limite superior :'+fechaLimiteSuperior)
        })
        }

        var db=firebase.firestore()
        console.log('Activando nuevo listener...')
        this.unsubscribe=db.collection('pedidos')
        .where("idProveedor","==","AFY GLOBAL SAS")
        //TODO: Se tiene un problema y es: que si un proveedor no entra a la plataforma un determinado
        //dia, pero si recibe pedidos, por parte de los vendedores, en esa misma fecha, no se muestra la informacion
        //ni queda guardada en la base de datos de los dias que no entro.
        //TODO: Otro problema es que si el proveedor no recarga en un dia la plataforma, asi mismo los pedidos de ese
        //dia no se muestran y no quedan guardados en la base de dtaos
        .where("fecha","==",this.state.fecha)
        .orderBy("idProducto","asc")
        .onSnapshot((snap)=>{
            console.log('nuevo listener activo')
            var today=moment(new Date()).format('L') 
                        
        if(this.state.fecha===today){
            var auxPedidos=[]
            var auxUniqueNombresProductos=[]
            var auxNombresProductos=[]
            var vectorProductos=[]
            var auxCountPendientes
            var auxCountPedidos
            // NOTE: Funcion que captura las referencias unicas y las ubica en un vector
            snap.forEach((doc)=>{
                auxPedidos.push(doc.data())
                auxNombresProductos.push(doc.data().idProducto)
            })
            auxUniqueNombresProductos=[...new Set(auxNombresProductos)]
            

            // NOTE: Funcion que recorre el vector de referencias unicas creado y calcula la cantidad pedida y la cantidad pendiente de cada referencia {nombre:"",cantidadPedida:"",cantidadPendiente:""}
            // en el vector auxiliar de Productos
            auxUniqueNombresProductos.map(uniqueNombreProducto=>{
                auxCountPedidos=0
                auxCountPendientes=0
                auxPedidos.map(pedido=>{
                    if(pedido.idProducto===uniqueNombreProducto){
                        auxCountPedidos=auxCountPedidos+1
                    }
                    if(pedido.idProducto===uniqueNombreProducto && pedido.estadoDespacho==="Sin atender"){
                        auxCountPendientes=auxCountPendientes+1
                    }
                })
                vectorProductos.push({nombre:uniqueNombreProducto,cantidadPedida:auxCountPedidos,cantidadPendiente:auxCountPendientes})
            })

            // NOTE: Funcion que una vez se tiene completo el vector auxiliar de productos, lo introduce en el documento correspondiente a la fecha en la cual se esta trabajando 
            //(Si no existe la fecha para ese proveedor, crea el documento)
            db.collection("pedidosPorFecha").where("fecha","==",this.state.fecha).where("idProveedor","==","AFY GLOBAL SAS").get()
            .then((res)=>{
                if(res.empty===true){
                    console.log('Nuevaa fecha'+this.state.fecha)
                    db.collection("pedidosPorFecha").add({
                        fecha:this.state.fecha,
                        idProveedor:"AFY GLOBAL SAS",
                        productos:vectorProductos
                    })
                }else{
                    res.forEach(doc=>{
                        db.collection("pedidosPorFecha").doc(doc.id).update({productos:vectorProductos})
                    })
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            console.log('las fecha actual con la fecha guardada en el estado no coinciden. Se va a remover el listener y a montarlo nuevamente con la fecha actual')
            this.removerListener()
            this.setState({fecha:today})
            this.activeListener()
        }


        })


        //NOTE: Funcion que trae todas las fechas del proveedor para guardarlas en el estado y poder mostrar todo el historial, va paginado de a 7 dias.
        db.collection("pedidosPorFecha").where("idProveedor","==","AFY GLOBAL SAS").orderBy("fecha","asc")
        .onSnapshot((snap)=>{
            var pedidosPorFecha=[]
            snap.forEach(doc=>{
                pedidosPorFecha.push(doc.data())
            })
            this.setState({pedidosPorFecha:pedidosPorFecha})
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
            fecha:this.state.fechaSeñuelo,
            idProducto:this.state.referencia,
            cantidad:1,
            idCliente:"Andres",
            ciudadCliente:"Bogota",
            direccionCliente:"Calle 45 sur #37-82",
            telefonoCliente:"3183667033",
            idDepacho:null,
            estadoDespacho:"Sin atender"
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





    leerFechaSeñuelo=(e)=>{
        e.preventDefault()
        this.setState({auxFechaSeñuelo:e.target.value})
    }
    cambiarDiaSeñuelo=()=>{
        this.setState({fechaSeñuelo:this.state.auxFechaSeñuelo})
    }





    componentDidUpdate=()=>{
        console.log('nuevo dia: '+ this.state.fecha)
    }

    
    render() {
        const {pedidosPorFecha}=this.state
        return (
            <div>
                {pedidosPorFecha===true?
                    <div>
                        <Link to="/">Volver</Link>
                        <button onClick={this.addOrder}>AÑADIR</button>
                        <button onClick={this.cambiarDia}>CAMBIAR DIA</button>
                        <button onClick={this.cambiarDiaSeñuelo}>CAMBIAR DIA SEÑUELO</button>
                        <button onClick={this.removerListener}>REMOVER LISTENER</button>
                        <input onChange={this.leerReferencia} placeholder="Referencia" type="text"/>
                        <input onChange={this.leerFecha} placeholder="Fecha" type="text"/>
                        <input onChange={this.leerFechaSeñuelo} placeholder="Fecha señuelo" type="text"/>
                    </div>
                    :
                    <div>
                    <Link to="/">Volver</Link>
                    <button onClick={this.addOrder}>AÑADIR</button>
                    <button onClick={this.cambiarDia}>CAMBIAR DIA</button>
                    <button onClick={this.cambiarDiaSeñuelo}>CAMBIAR DIA SEÑUELO</button>
                    <button onClick={this.removerListener}>REMOVER LISTENER</button>
                    <input onChange={this.leerReferencia} placeholder="Referencia" type="text"/>
                    <input onChange={this.leerFecha} placeholder="Fecha" type="text"/>
                    <input onChange={this.leerFechaSeñuelo} placeholder="Fecha señuelo" type="text"/>
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
