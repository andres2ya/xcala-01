import React, { Component } from 'react'
import './BodyFlowCase.css'
import firebase from "firebase/app";
import {Link} from 'react-router-dom'

import Compressor from 'compressorjs'
import Draggable from 'react-draggable';

import Alert from './../../../../Alert/Alert'

//NOTE: NO BORRAR!!! Este es el BodyFlowCase del vendedor!
// export default class BodyFlowCase extends Component {
//     state={
//         guiaFile:null,
//         showAlert:false,
//         whatAlertToShow:null,
//     }
//     componentWillUnmount=()=>{
//         clearTimeout(this.timeOutAlertOnErrorChargingFile)//NOTE: Forma correcta de desactivar los timeout al salir de un componente!
//         clearTimeout(this.timeOutAlertOnSuccessChargingGuia)
//     }

//     toggleAlert=(whatAlertToShow)=>[
//         this.setState({
//             showAlert:!this.state.showAlert,
//             whatAlertToShow: whatAlertToShow,
//         })
//     ]

//     cargarGuiaDevolucion=(e)=>{
//         if(e.target.files[0].type.indexOf('image/')> -1){
//             this.setState({guiaFile:[e.target.files[0]]})
//         }else{
//             console.log('Debes cargar una imagen')
//             this.toggleAlert('formatoInvalido')
//             this.timeOutAlertOnErrorChargingFile=setTimeout(() => {this.toggleAlert(null)}, 6000);
//         }
//     }

//     enviarGuiaDevolucion=async()=>{
//         //NOTE: Funcion para cargar archivo de la guia al storage
//         //luego obtener su URL y guardarlar el el atributo "guiaCargadaURL" del documento del correspondiente pedido
        
//         //NOTE: Comprimiendo archivo
//         const {guiaFile}=this.state
//         let compressedGuiaFile
//         async function compressingGuiaFile() {
//             return Promise.resolve(
//                 new Promise((response,reject)=>{
//                     new Compressor(guiaFile[0],{
//                         quality:0.8,
//                         maxHeight:500,
//                         success(resCompressedGuiaFile){
//                             response(compressedGuiaFile=resCompressedGuiaFile)
//                         },
//                         error(err){
//                             reject(console.log('error al comprimir',err))
//                             //TODO: Usar <Alert/> para notificar de este error.
//                         }
//                     })
//                 })
//             )
//         }
//         await compressingGuiaFile()
//         console.log(compressedGuiaFile)


//         //NOTE: Subiendo archivo comprimido al Storage
//         const {idPedido}=this.props
//         let guiaURL
//         async function loadingCompressedFile_to_storage() {
//             return Promise.resolve(
//                 new Promise((response,reject)=>{
//                     firebase.storage().ref(`/imagenes/casos/${idPedido}/guiaDevolucion`)
//                     .put(compressedGuiaFile)
//                     .then((snapshot)=>{
//                         snapshot.ref.getDownloadURL()
//                         .then(downloadURL=>{
//                             response(guiaURL=downloadURL)
//                         })
//                     })
//                     .catch(err=>{
//                         reject(console.log('ocurrio un error al cargar el archivo al storage',err))
//                         //TODO: Usar <Alert/> para notificar de este error.
//                     })
//                 })
//             )
//         }
//         await loadingCompressedFile_to_storage()
//         console.log(guiaURL)


//         //NOTE: Cargando guiaURL al documento del pedido correspondiente
//         firebase.firestore().collection('pedidos').doc(idPedido)
//         .update({
//             guiaURL:guiaURL,
//             guiaCargada:true
//         })
//         .then(res=>{
//             this.toggleAlert('guiaCargadaConExito')
//             this.timeOutAlertOnSuccessChargingGuia=setTimeout(() => {this.toggleAlert(null)}, 6000);
//         })
//         .catch(err=>{
//             console.log('Ocurrio un error al actualizar la informacion del pedido en su documento en firestore',err)
//             //TODO: Usar <Alert/> para notificar de este error.
//         })
//     }

//     finalizarCaso=async()=>{
//         console.log('Se va a cerrar este caso.')
//         const {idPedido,toggleModal,handleFinishedCaseSuccess}=this.props
//         firebase.firestore().collection('pedidos').doc(idPedido)
//         .update({
//             estado:'Despachado',
//             // casoResuelto:'noResuelto', //NOTE: Mas adelante, tomara valores de "resueltoAFavorVendedor" || "resueltoAFavorProveedor"
//             // guiaCargada:false,
//             // guiaURL:null, //NOTE: Aca se cargara el url de la imagen de la guia 
//             // bonoReintegroActivado:false,
//             // bonoReintegroCodigo:null //NOTE: Aca se registrara el codigo o referencia del bono o reintegro asociado. 
//         })
//         .then(res=>{
//             handleFinishedCaseSuccess()
//         })
//         .catch(err=>{
//             console.log('Ocurrio un error al finalizar caso:',err)
//             //TODO: Usar <Alert/> para notificar de este error.
//         })
//     }

//     render() {
//         const {titulo,parrafo,mode,toggleModal}=this.props
        
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
//                 return(
//                 <div>
//                     <BodyFlowCase_Header titulo={titulo} parrafo={parrafo}/>

//                     <div className="row">
//                         <div className="col-12 d-flex justify-content-center">
//                             <label className='labelCargarGuia' htmlFor="guiaDevolucion">
//                                 <i  className="d-flex justify-content-center align-items-center icon-arrow-circle-up"/>
//                                 <span>{this.state.guiaFile===null?'Cargar guia':this.state.guiaFile[0].name}</span>
//                             </label>
//                             <input accept="image/*" onChange={(e)=>this.cargarGuiaDevolucion(e)} className="guiaDevolucionInput" id="guiaDevolucion" type="file"/>
//                         </div>
//                     </div>
                    

//                     {this.state.guiaFile===null?null:
//                     <div className="row">
//                         <div className="col-12 d-flex justify-content-center">
//                             <div className="enviarGuiaDevolucionBtn" onClick={this.enviarGuiaDevolucion}>Enviar guia</div>
//                         </div>
//                     </div>
//                     }
                
//                     {(function showAlerts(showAlert,whatAlertToShow) {
//                         if(showAlert===true){
//                             switch (whatAlertToShow) {
//                                 case 'formatoInvalido':
//                                     return(<Alert mode={'alertCard-red'}><i style={{marginRight:20,fontSize:30}} className="icon-cancel-circled"/>Solo es permitido cargar imagenes.</Alert>);
//                                 case 'guiaCargadaConExito':
//                                     return(<Alert mode={'alertCard-green'}><i style={{marginRight:20,fontSize:30}} className="icon-check-circle"/>¡La guia se ha cargado con exito!</Alert>);
//                                 default:
//                                     break;
//                             }
//                         }
//                     })(this.state.showAlert,this.state.whatAlertToShow)}
//                 </div>
//                 )
//             case 'esperandoBono_o_reintegro': 
//                 return(
//                 <div>
//                     <BodyFlowCase_Header titulo={titulo} parrafo={parrafo}/>
//                     <div className="row">
//                         <div className="col-12 d-flex justify-content-center">
//                             {this.props.bonoReintegroActivado?
//                             <div className="codigoDelBono_asociado_al_caso_activado">{this.props.bonoReintegroCodigo}</div>
//                             :
//                             <div className="codigoDelBono_asociado_al_caso_desactivado">XXX-XXX-XXX-XXX</div>
//                             }
//                         </div>
//                     </div>
//                 </div>
//                 )
//             case 'resueltoAfavorDelProveedor':
//                 return(
//                 <div>
//                     <BodyFlowCase_Header titulo={titulo} parrafo={parrafo}/>

//                     <div className="row dataResumeCaseBox">
//                         <div className="col-12">
//                             <div className="labelResumeCase">Respuesta del proveedor:</div> 
//                             <div style={{overflow: 'auto', height:120}} className="lighterDataResumeCase">{this.props.respuestaProveedor}</div>
//                         </div>
//                     </div>

//                     <div className="row btns_antes_cerrar_caso">
//                         <div className="col-12 d-flex justify-content-between">
//                             <div onClick={this.finalizarCaso} className="resueltoAfavorDelProveedor-btn aceptarCerrarCaso d-flex justify-content-center align-items-center">
//                                 Finalizar caso
//                             </div>

//                             <div className="resueltoAfavorDelProveedor-btn pedirAyudaAntesDeCerrarCaso d-flex justify-content-center  align-items-center">
//                                 {/* TODO: Escribir el mensaje definitivo trayendo el nombre del usuario desde DB*/}
//                                 <a target="_blank" href={`https://wa.me/573183667033?text=Hola!%20equipo%20Xcala,%20soy%20${'nombre usuario'}%20,necesito%20apoyo%20para%20resolver%20un%20caso%20con%20ID:%20${this.props.idPedido}`}>
//                                 Contactar a soporte
//                                 </a>
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

export default class BodyFlowCase extends Component {
//NOTE: Este seria el BodyFlowCase del proveedor, debe reubicarse en su carpeta.
    state={
        showFullImgGuia:false,
        toggleShowViewer:true,
        zoom:0.1,
    }
    

    toggleAlert=(whatAlertToShow)=>{
        this.setState({
            showAlert:!this.state.showAlert,
            whatAlertToShow: whatAlertToShow,
        })
    }

    activarCodigoReintegro=()=>{
        console.log('Activando codigo....')
        //TODO: Funcion que crea un nuevo doc en coleccion "codigos", luego registra el id de ese doc como el codigo relacionada al caso en cuestion
        //actualiznaod entonces los atributos "bonoReintregoActivado=true && "bonoReintegroCodigo="id documento creado"
        
    }


    showFullImgGuia=()=>{
        this.setState({
            showFullImgGuia:!this.state.showFullImgGuia
        })
    }

    zoomInFullIMG=(e)=>{
        e.preventDefault()
        var newZoom=this.state.zoom+0.1
        if(this.state.zoom<=2){
            this.setState({
                zoom:newZoom
            })
        }
    }

    zoomOutFullIMG=(e)=>{
        e.preventDefault()
        var newZoom=this.state.zoom-0.1
        if(this.state.zoom>0.2){
            this.setState({
                zoom:newZoom
            })
        }
    }

    resizeFullIMG=async(e)=>{
        e.preventDefault()
        await this.setState({toggleShowViewer:!this.state.toggleShowViewer})
        this.setState({toggleShowViewer:!this.state.toggleShowViewer})
    }

   
    render() {
        const {titulo,parrafo,mode,toggleModal,guiaURL,guiaCargada,bonoReintegroActivado,bonoReintegroCodigo}=this.props
        
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
                if(this.state.showFullImgGuia===false){
                    return(
                    <div>
                        <BodyFlowCase_Header titulo={titulo} parrafo={parrafo}/>
    
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                {guiaCargada?
                                <img onClick={this.showFullImgGuia} height="50" src={guiaURL}/>
                                :
                                <div className='labelCargarGuia' htmlFor="guiaDevolucion">
                                    <i  className="d-flex justify-content-center align-items-center icon-arrow-circle-down"/>
                                    <span>Esperando guia</span>
                                </div>
                                }
                            </div>
                        </div>
                        
                        
                        
                        {(function activarCodigoReintegro(guiaCargada,bonoReintegroActivado,bonoReintegroCodigo,activarCodigoReintegro) {
                            if(guiaCargada===true && bonoReintegroActivado===false){
                                return (
                                    <div style={{marginTop:30}} className="row">
                                        <div className="col-12 d-flex justify-content-center">
                                            <div className="enviarGuiaDevolucionBtn" onClick={(e)=>activarCodigoReintegro()} >Activar codigo</div>
                                        </div>
                                    </div>
                                )
                            }else if(guiaCargada===true && bonoReintegroActivado===true){
                                return (
                                    <div style={{marginTop:30}} className="row">
                                        <div className="col-12 d-flex justify-content-center">
                                            <div className="codigoDelBono_asociado_al_caso_activado">CODIGO: {bonoReintegroCodigo}</div>
                                        </div>
                                    </div>
                                )
                            }else{
                                return(null)
                            }
                        })(guiaCargada,bonoReintegroActivado,bonoReintegroCodigo,this.activarCodigoReintegro)}
    
    
    
    
                    </div>
                    )
                }else{
                    return(
                    <div>
                        <BodyFlowCase_fullImgGuia
                        resizeFullIMG={this.resizeFullIMG}
                        zoomOutFullIMG={this.zoomOutFullIMG}
                        zoomInFullIMG={this.zoomInFullIMG}
                        toggleShowViewer={this.state.toggleShowViewer}
                        zoom={this.state.zoom}
                        guiaURL={guiaURL}
                        />
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <div className="seeCaseResume" onClick={this.showFullImgGuia}>Volver</div>
                            </div>
                        </div>
                    </div>
                    )
                }
            
            case 'resueltoAfavorDelProveedor':
                return(
                <div>
                    <BodyFlowCase_Header titulo={titulo} parrafo={parrafo}/>

                    <div className="row dataResumeCaseBox">
                        <div className="col-12">
                            <div className="labelResumeCase">Tu respuesta:</div> 
                            <div style={{overflow: 'auto', height:50}} className="lighterDataResumeCase">{this.props.respuestaProveedor}</div>
                        </div>
                    </div>

                    <div className="row btns_antes_cerrar_caso">
                        <div className="col-12 d-flex justify-content-center">
                            <div onClick={toggleModal} className="resueltoAfavorDelProveedor-btn aceptarCerrarCaso d-flex justify-content-center align-items-center">
                                Aceptar
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
