import React, { Component } from 'react'
import './BodyFlowCase.css'
import firebase from "firebase/app";
import {Link} from 'react-router-dom'

import Compressor from 'compressorjs'
import Draggable from 'react-draggable';

import Alert from './../../../../Alert/Alert'

// NOTE: NO BORRAR!!! Este es el BodyFlowCase del vendedor!
export default class BodyFlowCase extends Component {
    state={
        guiaFile:null,
        showAlert:false,
        whatAlertToShow:null,
    }

    componentWillUnmount=()=>{
        clearTimeout(this.timeOutAlertOnErrorChargingFile)//NOTE: Forma correcta de desactivar los timeout al salir de un componente!
        clearTimeout(this.timeOutAlertOnSuccessChargingGuia)
    }

    toggleAlert=(whatAlertToShow)=>{
        this.setState({
            showAlert:!this.state.showAlert,
            whatAlertToShow: whatAlertToShow,
        })
    }

    cargarGuiaDevolucion=(e)=>{
        if(e.target.files[0].type.indexOf('image/')> -1){
            this.setState({guiaFile:[e.target.files[0]]})
        }else{
            console.log('Debes cargar una imagen')
            this.toggleAlert('formatoInvalido')
            this.timeOutAlertOnErrorChargingFile=setTimeout(() => {this.toggleAlert(null)}, 6000);
        }
    }

    enviarGuiaDevolucion=async()=>{
        //NOTE: Funcion para cargar archivo de la guia al storage
        //luego obtener su URL y guardarlar el el atributo "guiaCargadaURL" del documento del correspondiente pedido
        
        //NOTE: Comprimiendo archivo
        const {guiaFile}=this.state
        let compressedGuiaFile
        async function compressingGuiaFile() {
            return Promise.resolve(
                new Promise((response,reject)=>{
                    new Compressor(guiaFile[0],{
                        quality:0.8,
                        maxHeight:500,
                        success(resCompressedGuiaFile){
                            response(compressedGuiaFile=resCompressedGuiaFile)
                        },
                        error(err){
                            reject(console.log('error al comprimir',err))
                            //TODO: Usar <Alert/> para notificar de este error.
                        }
                    })
                })
            )
        }
        await compressingGuiaFile()
        console.log(compressedGuiaFile)


        //NOTE: Subiendo archivo comprimido al Storage
        const {idPedido}=this.props
        let guiaURL
        async function loadingCompressedFile_to_storage() {
            return Promise.resolve(
                new Promise((response,reject)=>{
                    firebase.storage().ref(`/imagenes/casos/${idPedido}/guiaDevolucion`)
                    .put(compressedGuiaFile)
                    .then((snapshot)=>{
                        snapshot.ref.getDownloadURL()
                        .then(downloadURL=>{
                            response(guiaURL=downloadURL)
                        })
                    })
                    .catch(err=>{
                        reject(console.log('ocurrio un error al cargar el archivo al storage',err))
                        //TODO: Usar <Alert/> para notificar de este error.
                    })
                })
            )
        }
        await loadingCompressedFile_to_storage()
        console.log(guiaURL)


        //NOTE: Cargando guiaURL al documento del pedido correspondiente
        firebase.firestore().collection('pedidos').doc(idPedido)
        .update({
            guiaURL:guiaURL,
            guiaCargada:true
        })
        .then(res=>{
            this.toggleAlert('guiaCargadaConExito')
            this.timeOutAlertOnSuccessChargingGuia=setTimeout(() => {this.toggleAlert(null)}, 6000);
        })
        .catch(err=>{
            console.log('Ocurrio un error al actualizar la informacion del pedido en su documento en firestore',err)
            //TODO: Usar <Alert/> para notificar de este error.
        })
    }

    finalizarCaso=async()=>{
        // NOTE: Actualizando doc del pedido.
        console.log('Se va a cerrar este caso.')
        const {idPedido,handleFinishedCaseSuccess}=this.props
        
        firebase.storage().ref(`/imagenes/casos/${idPedido}`)
        .list()
        .then(async res=>{
            if(res.items.length>0){
                async function deleteStorageCaseOrderFiles(res){
                    return Promise.all(
                        res.items.map(async item=>{
                            return  Promise.resolve(
                                new Promise((response,reject)=>{
                                    item.delete()
                                    .then(()=>response(console.log('Exito en delet',item.name)))
                                    .catch(err=>reject(console.log('ocurrio un erro en delet',err)))
                                })
                            )
                    }))
                } 
                await deleteStorageCaseOrderFiles(res)
                this.carryOnFinalizarCaso()
            }else{
                this.carryOnFinalizarCaso()
            }  
        })
        .catch(err=>{
            console.log('ocurrio un error al finalizarCaso...',err)
            //TODO: Usar <Alert/> para notificar de este error.
        })
        handleFinishedCaseSuccess()
    }

    carryOnFinalizarCaso=()=>{
        const {idPedido}=this.props
        firebase.firestore().collection('pedidos').doc(idPedido)
        .update({
            estado:'Despachado',
            casoResuelto:'noResuelto', //NOTE: Mas adelante, tomara valores de "resueltoAFavorVendedor" || "resueltoAFavorProveedor"
            guiaCargada:false,
            guiaURL:null, //NOTE: Aca se cargara el url de la imagen de la guia 
            respuestaProveedor:null,
            proveedorRespondio:false,
            caseData:firebase.firestore.FieldValue.delete(),
            datosProveedor:firebase.firestore.FieldValue.delete(),
        })
        .then(res=>{console.log('Exito al finalizar el caso en firestore')})
    }

    render() {
        const {titulo,parrafo,mode,toggleModal}=this.props
        
        switch (mode) {
            case 'esperandoResolucion':  
                return(
                <div>
                    <BodyFlowCase_Header titulo={titulo} parrafo={parrafo}/>
                    <div className="row openCaseBtnSuccessMsg">
                        <div className="col-12 d-flex justify-content-center">
                            <button onClick={(e) => toggleModal(null)}>Aceptar</button>
                        </div>
                    </div>
                </div>
                )
            case 'resueltoAfavorDelVendedor':
                const {direccionProveedor,barrioDireccionProveedor,ciudadProveedor,identificacionProveedor,razonSocial,celularProveedor}=this.props.datosProveedor
                return(
                <div>
                        <BodyFlowCase_Header titulo={titulo} parrafo={parrafo}/>
    
                        <div style={{fontSize:13,marginBottom:10}} className="row">
                            <div className="col-12">
                                <div className="direccionProveedor">
                                    <strong>Direccion de envio:</strong> {direccionProveedor}, Barrio {barrioDireccionProveedor}, {ciudadProveedor}
                                </div>
                                <div className="nombreProveedor">
                                    <strong>Dirigido a:</strong> {razonSocial}
                                </div>
                                <div className="identificacionProveedor">
                                    <strong>Identificacion:</strong> {identificacionProveedor}
                                </div>
                                <div className="contactoProveedor">
                                    <strong>Telefono contacto:</strong> {celularProveedor}
                                </div>
                                
                            </div>
                        </div>
    
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <label className='labelCargarGuia' htmlFor="guiaDevolucion">
                                    <i  className="d-flex justify-content-center align-items-center icon-arrow-circle-up"/>
                                    <span>{this.state.guiaFile===null?'Cargar guia':this.state.guiaFile[0].name}</span>
                                </label>
                                <input accept="image/*" onChange={(e)=>this.cargarGuiaDevolucion(e)} className="guiaDevolucionInput" id="guiaDevolucion" type="file"/>
                            </div>
                        </div>
                        
    
                        {this.state.guiaFile===null?null:
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <div className="enviarGuiaDevolucionBtn" onClick={this.enviarGuiaDevolucion}>Enviar guia</div>
                            </div>
                        </div>
                        }
                    
                        {(function showAlerts(showAlert,whatAlertToShow) {
                            if(showAlert===true){
                                switch (whatAlertToShow) {
                                    case 'formatoInvalido':
                                        return(<Alert mode={'alertCard-red'}><i style={{marginRight:20,fontSize:30}} className="icon-cancel-circled"/>Solo es permitido cargar imagenes.</Alert>);
                                    case 'guiaCargadaConExito':
                                        return(<Alert mode={'alertCard-green'}><i style={{marginRight:20,fontSize:30}} className="icon-check-circle"/>¡La guia se ha cargado con exito!</Alert>);
                                    default:
                                        break;
                                }
                            }
                        })(this.state.showAlert,this.state.whatAlertToShow)}
                    </div>
                )
                
            case 'esperandoBono_o_reintegro':
                const proveedorRespondio=this.props.pedidoObjeto.proveedorRespondio
                const reason=this.props.pedidoObjeto.caseData.selectedReason
                let reasonRender
                if(reason==='garantia' || reason==='cambio'){reasonRender='reenviarProducto'}else{reasonRender='reintegrarDinero'}
                console.log(proveedorRespondio)
                return(
                <div>
                    <BodyFlowCase_Header titulo={titulo} parrafo={parrafo}/>
                    
                    {(function activarCodigoReintegro(proveedorRespondio,reasonRender,finalizarCaso,idPedido) {
                        if(reasonRender==='reenviarProducto' && proveedorRespondio===true){
                            return (
                                <div>
                                    <p style={{marginTop:15}} className='openCaseModalSuccessMsgParagraph'>
                                        El proveedor ha comenzado el proceso de envio del producto que responde a la garantia o cambio solicidado. Debes estar pendiente de recibir el envio (recuerda que en este caso, el envio debe ser pagado por el destinatario al momento de la entrega).
                                    </p>
                                    <div className="row btns_antes_cerrar_caso">
                                        <div className="col-12 d-flex justify-content-between">
                                            <div onClick={(e)=>finalizarCaso(e)} className="resueltoAfavorDelProveedor-btn aceptarCerrarCaso d-flex justify-content-center align-items-center">
                                                He recibido el producto
                                            </div>

                                            <div className="resueltoAfavorDelProveedor-btn pedirAyudaAntesDeCerrarCaso d-flex justify-content-center  align-items-center">
                                                {/* TODO: Escribir el mensaje definitivo trayendo el nombre del usuario desde DB*/}
                                                <a target="_blank" href={`https://wa.me/573183667033?text=Hola!%20equipo%20Xcala,%20soy%20${'nombre usuario'}%20,necesito%20apoyo%20para%20resolver%20un%20caso%20con%20ID:%20${idPedido}`}>
                                                Contactar a soporte
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }else if(reasonRender==='reintegrarDinero' && proveedorRespondio===true){
                            return (
                                <div>
                                    <p style={{marginTop:15}} className='openCaseModalSuccessMsgParagraph'>
                                        El proveedor ha comenzado el proceso de reintegro del dinero correspondiente al valor del producto (recuerda que el reintegro no contempla el valor de la comision de xcala, asi como tampoco los gastos de envio y recaudo de dinero).
                                    </p>
                                    <div className="row btns_antes_cerrar_caso">
                                        <div className="col-12 d-flex justify-content-between">
                                            <div onClick={(e)=>finalizarCaso(e)} className="resueltoAfavorDelProveedor-btn aceptarCerrarCaso d-flex justify-content-center align-items-center">
                                                He recibido el reintegro
                                            </div>

                                            <div className="resueltoAfavorDelProveedor-btn pedirAyudaAntesDeCerrarCaso d-flex justify-content-center  align-items-center">
                                                {/* TODO: Escribir el mensaje definitivo trayendo el nombre del usuario desde DB*/}
                                                <a target="_blank" href={`https://wa.me/573183667033?text=Hola!%20equipo%20Xcala,%20soy%20${'nombre usuario'}%20,necesito%20apoyo%20para%20resolver%20un%20caso%20con%20ID:%20${idPedido}`}>
                                                Contactar a soporte
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }else if(proveedorRespondio===false){
                            return (
                                <div style={{marginTop:30}} className="row">
                                    <div className="col-12 d-flex justify-content-center">
                                        <div className="codigoDelBono_asociado_al_caso_activado">Debes esperar a que el proveedor termine le resolucion del caso.</div>
                                    </div>
                                </div>
                            )
                        }else{
                            return(null)
                        }
                    })(proveedorRespondio,reasonRender,this.finalizarCaso,this.props.idPedido)}
                        
                </div>
                )
            case 'resueltoAfavorDelProveedor':
                return(
                <div>
                    <BodyFlowCase_Header titulo={titulo} parrafo={parrafo}/>

                    <div className="row dataResumeCaseBox">
                        <div className="col-12">
                            <div className="labelResumeCase">Respuesta del proveedor:</div> 
                            <div style={{overflow: 'auto', height:120}} className="lighterDataResumeCase">{this.props.respuestaProveedor}</div>
                        </div>
                    </div>

                    <div className="row btns_antes_cerrar_caso">
                        <div className="col-12 d-flex justify-content-between">
                            <div onClick={this.finalizarCaso} className="resueltoAfavorDelProveedor-btn aceptarCerrarCaso d-flex justify-content-center align-items-center">
                                Finalizar caso
                            </div>

                            <div className="resueltoAfavorDelProveedor-btn pedirAyudaAntesDeCerrarCaso d-flex justify-content-center  align-items-center">
                                {/* TODO: Escribir el mensaje definitivo trayendo el nombre del usuario desde DB*/}
                                <a target="_blank" href={`https://wa.me/573183667033?text=Hola!%20equipo%20Xcala,%20soy%20${'nombre usuario'}%20,necesito%20apoyo%20para%20resolver%20un%20caso%20con%20ID:%20${this.props.idPedido}`}>
                                Contactar a soporte
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                )
            default:
                return(null)
        }    
    }
}




// export default class BodyFlowCase extends Component {
// //NOTE: Este seria el BodyFlowCase del proveedor, debe reubicarse en su carpeta.
//     state={
//         showFullImgGuia:false,
//         toggleShowViewer:true,
//         zoom:0.1,
//         x:false,
//     }
    

//     toggleAlert=(whatAlertToShow)=>{
//         this.setState({
//             showAlert:!this.state.showAlert,
//             whatAlertToShow: whatAlertToShow,
//         })
//     }

   
//     solicitarTransporte=()=>{
//         console.log('Solicitando transporte espeficial....')
//         const batch=firebase.firestore().batch()

//         const refDespachos= firebase.firestore().collection('despachos').doc('xxx')//TODO: agregar funcion para generar el id
//         batch.set(refDespachos,{
//             idDespacho:'xxx',
//             fecha:'03/02/2020',
//             tipoDespacho:'resolucionCaso',
//             pedido:this.props.pedidoObjeto //TODO: Definir elementos del pedido a escribir en el despacho ...¿dejar escribir todos?
//         })

//         const refPedidos=firebase.firestore().collection('pedidos').doc(this.props.idPedido)
//         batch.update(refPedidos,{proveedorRespondio:true})

//         batch.commit()
//         .then((res)=>{
//             console.log('Despacho especial creado con exito y proveedorRespondio===true ..... ok!')
//         })
//         .catch(err=>console.log('Ocurrio un erro al crear el despacho especial y/o actualizar proveedorRespondio',err))
//     }


//     solicitarReintegroDineroAfavorDelUsuarioVendedor=()=>{
//         console.log('Solicitando reintegro...')
//         const batch=firebase.firestore().batch()

//         const refReintegros=firebase.firestore().collection('reintegros').doc('R000001')//TODO: agregar funcion para generar el id
//         batch.set(refReintegros,{
//             idReintegro:'R0000001',
//             fecha:'03/02/2020',
//             idProveedor:this.props.pedidoObjeto.idProveedor,
//             idVendedor:this.props.pedidoObjeto.idVendedor,
//             idPedido:this.props.pedidoObjeto.id,
//             montoReintegro:this.props.pedidoObjeto.costoProducto, //TODO: ¿es correcto?
//         })

//         const refPedidos=firebase.firestore().collection('pedidos').doc(this.props.idPedido)
//         batch.update(refPedidos,{proveedorRespondio:true})

//         batch.commit()
//         .then((res)=>{
//             console.log('Reintegro creado con exito y proveedorRespondio===true ..... ok!')
//         })
//         .catch(err=>console.log('Ocurrio un erro al crear el reintegro y/o actualizar proveedorRespondio',err))
//     }





//     showFullImgGuia=()=>{
//         this.setState({
//             showFullImgGuia:!this.state.showFullImgGuia
//         })
//     }

//     zoomInFullIMG=(e)=>{
//         e.preventDefault()
//         var newZoom=this.state.zoom+0.1
//         if(this.state.zoom<=2){
//             this.setState({
//                 zoom:newZoom
//             })
//         }
//     }

//     zoomOutFullIMG=(e)=>{
//         e.preventDefault()
//         var newZoom=this.state.zoom-0.1
//         if(this.state.zoom>0.2){
//             this.setState({
//                 zoom:newZoom
//             })
//         }
//     }

//     resizeFullIMG=async(e)=>{
//         e.preventDefault()
//         await this.setState({toggleShowViewer:!this.state.toggleShowViewer})
//         this.setState({toggleShowViewer:!this.state.toggleShowViewer})
//     }

   
//     render() {
//         const {titulo,parrafo,mode,toggleModal,guiaURL,guiaCargada,bonoReintegroActivado,bonoReintegroCodigo}=this.props
        
        
//         switch (mode) {
//             case 'esperandoResolucion':  
//                 return(
//                 <div>
//                     <BodyFlowCase_Header titulo={titulo} parrafo={parrafo}/>
//                     <div className="row openCaseBtnSuccessMsg">
//                         <div className="col-12 d-flex justify-content-center">
//                             <button onClick={(e) => toggleModal(null)}>Aceptar</button>
//                         </div>
//                     </div>
//                 </div>
//                 )
//             case 'resueltoAfavorDelVendedor':
//                    const reason=this.props.pedidoObjeto.caseData.selectedReason
//                    const proveedorRespondio=this.props.pedidoObjeto.proveedorRespondio
//                    let reasonRender
//                    if(reason==='garantia' || reason==='cambio'){reasonRender='reenviarProducto'}else{reasonRender='reintegrarDinero'}

//                    if(this.state.showFullImgGuia===false){
//                     return(
//                     <div>

//                         {guiaCargada?
//                         <BodyFlowCase_Header titulo={'Has resuelto este caso exitosamente'} parrafo={'Ya has recibido la guia de envio'}/>
//                         :
//                         <BodyFlowCase_Header titulo={titulo} parrafo={parrafo}/>
//                         }

//                         <div className="row">
//                             <div className="col-12 d-flex justify-content-center">
//                                 {guiaCargada?
//                                 <img onClick={this.showFullImgGuia} height="50" src={guiaURL}/>
//                                 :
//                                 <div className='labelCargarGuia' htmlFor="guiaDevolucion">
//                                     <i  className="d-flex justify-content-center align-items-center icon-arrow-circle-down"/>
//                                     <span>Esperando guia</span>
//                                 </div>
//                                 }
//                             </div>
//                         </div>
                            
                        
                        
                        
//                         {(function activarCodigoReintegro(proveedorRespondio,reasonRender,guiaCargada,bonoReintegroActivado,bonoReintegroCodigo,solicitarTransporte,solicitarReintegroDineroAfavorDelUsuarioVendedor) {
//                             if(guiaCargada===true && reasonRender==='reenviarProducto' && proveedorRespondio===false){
//                                 return (
//                                     <div>
//                                         <p style={{marginTop:15}} className='openCaseModalSuccessMsgParagraph'>
//                                             Puedes esperar a recibir el envio y cuando tengas listo el producto para cumplir con la garantia o cambio, porfavor solicita el transporte para enviarlo (recuerda que este envio sera cobrado al destinatario y no requiere etiqueta adhesiva).
//                                         </p>
//                                         <div style={{marginTop:30}} className="row">
//                                             <div className="col-12 d-flex justify-content-center">
//                                                 <div className="enviarGuiaDevolucionBtn" onClick={(e)=>solicitarTransporte()} >Solicitar transporte</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )
//                             }else if(guiaCargada===true && reasonRender==='reintegrarDinero' && proveedorRespondio===false){
//                                 return (
//                                     <div>
//                                         <p style={{marginTop:15}} className='openCaseModalSuccessMsgParagraph'>
//                                             Puedes esperar a recibir el producto y luego solicitar el reintegro del dinero (recuerda que el dinero a reintegrar sera descontado de tus ganancias).
//                                         </p>
//                                         <div style={{marginTop:30}} className="row">
//                                             <div className="col-12 d-flex justify-content-center">
//                                                 <div className="enviarGuiaDevolucionBtn" onClick={(e)=>solicitarReintegroDineroAfavorDelUsuarioVendedor()}>Solicitar reintegrar dinero</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )
//                             }else if(guiaCargada===true && proveedorRespondio===true){
//                                 return (
//                                     <div style={{marginTop:30}} className="row">
//                                         <div className="col-12 d-flex justify-content-center">
//                                             <div className="codigoDelBono_asociado_al_caso_activado">Has resuelto este caso exitosamente. Una vez el usuario vendedor reciba el reintegro o el producto enviado, este caso se cerrara automaticamente.</div>
//                                         </div>
//                                     </div>
//                                 )
//                             }else{
//                                 return(null)
//                             }
//                         })(proveedorRespondio,reasonRender,guiaCargada,bonoReintegroActivado,bonoReintegroCodigo,this.solicitarTransporte,this.solicitarReintegroDineroAfavorDelUsuarioVendedor)}
    



//                             {/* {reasonRender==='reenviarProducto'?
//                                 <div onClick={this.solicitarTransporte}>Solicitar transporte</div>
//                             :
//                                 <div onClick={this.solicitarReintegroDineroAfavorDelUsuarioVendedor}>Solicitar reintegro a favor del usuario vendedor.</div>
//                             } */}
    
    
//                     </div>
//                     )
//                 }else{
//                     return(
//                     <div>
//                         <BodyFlowCase_fullImgGuia
//                         resizeFullIMG={this.resizeFullIMG}
//                         zoomOutFullIMG={this.zoomOutFullIMG}
//                         zoomInFullIMG={this.zoomInFullIMG}
//                         toggleShowViewer={this.state.toggleShowViewer}
//                         zoom={this.state.zoom}
//                         guiaURL={guiaURL}
//                         />
//                         <div className="row">
//                             <div className="col-12 d-flex justify-content-center">
//                                 <div className="seeCaseResume" onClick={this.showFullImgGuia}>Volver</div>
//                             </div>
//                         </div>
//                     </div>
//                     )
//                 }
            
//             case 'resueltoAfavorDelProveedor':
//                 return(
//                 <div>
//                     <BodyFlowCase_Header titulo={titulo} parrafo={parrafo}/>

//                     <div className="row dataResumeCaseBox">
//                         <div className="col-12">
//                             <div className="labelResumeCase">Tu respuesta:</div> 
//                             <div style={{overflow: 'auto', height:50}} className="lighterDataResumeCase">{this.props.respuestaProveedor}</div>
//                         </div>
//                     </div>

//                     <div className="row btns_antes_cerrar_caso">
//                         <div className="col-12 d-flex justify-content-center">
//                             <div onClick={toggleModal} className="resueltoAfavorDelProveedor-btn aceptarCerrarCaso d-flex justify-content-center align-items-center">
//                                 Aceptar
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 )
//             default:
//                 return(null)
//         }    
//     }
// }



export class BodyFlowCase_Header extends Component {
    render() {
        const {titulo,parrafo}=this.props
        return (
            <div className="row openCaseSuccessMsg">
                <div className="col-12">
                    <p className="openCaseModalSuccessMsgTitle">{titulo}</p>
                    <p className="openCaseModalSuccessMsgParagraph">{parrafo}</p>
                </div>
            </div>
        )
    }
}



export class BodyFlowCase_fullImgGuia extends Component {
    render() {
        const {resizeFullIMG,zoomOutFullIMG,zoomInFullIMG,toggleShowViewer,zoom,guiaURL}=this.props
        return (
            <div>
                <div id="fullImgWrapper">
                    {toggleShowViewer===true?
                        <Draggable axis="both" defaultPosition={{x: 0, y: 0}}>
                            <div id="draggableEvidenceImg">
                                <img style={{zoom:zoom}} className="FullIMG" src={guiaURL} alt="fullImgEvidence"/>
                            </div> 
                        </Draggable>                                        
                    :
                        null
                    }
                </div>

                <div className="row zoomIconsRow">
                    <div className="col-6"/>
                    <div className="col-2 backZoomIcon d-flex justify-content-center align-items-center">
                        <i onClick={(e)=>resizeFullIMG(e)}  className="resizeIcon icon-resize centerVertical"/>
                    </div>
                    <div className="col-2 backZoomIcon d-flex justify-content-center align-items-center">
                        <i onClick={(e)=>zoomOutFullIMG(e)} className="zoomIcon icon-zoom-out centerVertical"/>
                    </div>
                    <div className="col-2 backZoomIcon d-flex justify-content-center align-items-center">
                        <i onClick={(e)=>zoomInFullIMG(e)} className="zoomIcon icon-zoom-in centerVertical"/>
                    </div>
                </div>
            </div>
        )
    }
}
