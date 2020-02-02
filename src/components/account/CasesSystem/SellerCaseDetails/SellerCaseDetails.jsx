import React, { Component } from 'react'
import './SellerCaseDetails.css'
import HeaderCaseSystem from './../../CasesSystem/SellerCaseStyleComponents/Header/HeaderCaseSystem'
import Draggable from 'react-draggable';
import firebase from "firebase/app";



export default  class SellerCaseDetails extends Component {
    state={
        imgToShowFull:null,
        zoom:0.1,
        toggleShowViewer:true,
        showFullImgViewer:false,
        showFormResponseSupplier:false,
        responseSupplier:"",
        showMsgToConfirmAcceptCase:false,
    }

    componentDidMount=()=>{
        console.log('Se cargó el SellerCaseDetails con idPedido=',this.props.idPedido)
    }
    componentWillUnmount=()=>{
        console.log('Se desmonto el SellerCaseDetails con idPedido=',this.props.idPedido)
    }

    showFullImg=(e,evidenceImgSrc)=>{
        e.preventDefault()
        this.setState({
            imgToShowFull:evidenceImgSrc,
            showFullImgViewer:!this.state.showFullImgViewer
        })
    }

    changeFullImg=(e,evidenceImgSrc)=>{
        e.preventDefault()
        this.setState({
            imgToShowFull:evidenceImgSrc
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

    //NOTE: Funciones exclusivas el usuario proveedor
    resolverCaso=async(e)=>{
        const resolucion=e.target.id
        if(resolucion==='resueltoAfavorDelVendedor'){
            this.setState({showMsgToConfirmAcceptCase:true})
        }else{
            // console.log('No se va a resovler a favor del usuario vendeodr, entonces debe aparece una pantalla con un text area para escribir su argumentacion')
            this.setState({showFormResponseSupplier:true})
        }
    }

    leerResponseSupplier=async(e)=>{
        this.setState({responseSupplier:e.target.value})
    }

    enviarRespuestaProveedor=()=>{
        const {idPedido,handleFinishedCaseSuccess_proveedor,showCaseDetailsEvent}=this.props
        firebase.firestore().collection('pedidos').doc(idPedido)
            .update({
                casoResuelto:'resueltoAfavorDelProveedor',
                respuestaProveedor:this.state.responseSupplier,
            })
            .then(res=>{
                console.log('Caso resuelto con exito!:','resueltoAfavorDelProveedor')
                showCaseDetailsEvent()//NOTE: Para cerrar detalles y permitir presentar la pantalla de respuesta en el flujo
                // handleFinishedCaseSuccess_proveedor() TODO: Crear en la pantalla de pedidos con caso del proveedor
            })
            .catch(err=>{
                console.log('Ocurrio un error al finalizar caso:',err)
                //TODO: Usar <Alert/> para notificar de este error.
            })
    }

    confirmarResolucionCasoAfavorDeVendedor=()=>{
        const {idPedido,showCaseDetailsEvent}=this.props
            firebase.firestore().collection('pedidos').doc(idPedido)
            .update({
                casoResuelto:'resueltoAfavorDelVendedor',
            })
            .then(res=>{
                console.log('Caso resuelto con exito!:','resueltoAfavorDelVendedor')
                showCaseDetailsEvent()//NOTE: Para cerrar detalles y permitir presentar la pantalla de respuesta en el flujo
            })
            .catch(err=>{
                console.log('Ocurrio un error al finalizar caso:',err)
                //TODO: Usar <Alert/> para notificar de este error.
            })
    }

    
    render() {
        const {pedidoObjeto,idPedido,toggleModal,showCaseDetailsEvent}=this.props
        var userRole='Proveedor' //TODO: obviamente userRole tiene que salir de la bas de datos...
            if(this.state.showFullImgViewer===false && this.state.showFormResponseSupplier===false && this.state.showMsgToConfirmAcceptCase===false ){
                return (
                    <div className="container modalOpenCaseInsideCard">
    
                        <HeaderCaseSystem 
                            idPedido={idPedido} 
                            subtitulo={''} 
                            parrafo={''}
                            toggleModal={toggleModal}>
                        </HeaderCaseSystem>
    
                        
                        <div className="row dataResumeCaseBox">
                            <div className="col-12">
                                <div className="labelResumeCase">Estado del caso:</div>
                                <div className="dataResumeCase">{pedidoObjeto.casoResuelto}</div>
                            </div>
                        </div>
    
                        <div className="row dataResumeCaseBox">
                            <div className="col-12">
                                <div className="labelResumeCase">Producto relacionado:</div> 
                                <div className="dataResumeCase">{pedidoObjeto.idProducto}</div>
                            </div>
                        </div>
    
                        <div className="row dataResumeCaseBox">
                            <div className="col-12">
                                <div className="labelResumeCase">Motivo del caso:</div> 
                                <div className="dataResumeCase">{pedidoObjeto.caseData.selectedReason}</div>
                            </div>
                        </div>
    
                        <div className="row dataResumeCaseBox">
                            <div className="col-12">
                                <div className="labelResumeCase">Descripcion del caso:</div> 
                                <div style={{overflow: 'auto', height:80}} className="lighterDataResumeCase">{pedidoObjeto.caseData.longDescription}</div>
                            </div>
                        </div>
    
                        {pedidoObjeto.caseData.evidences.length>0?
                        <div>
                            <div className="row dataResumeCaseBox">
                                <div className="col-12">
                                    <span className="labelResumeCase">Pruebas adjuntas</span>
                                </div>
                            </div>
    
                            <div className="d-flex">
                                {pedidoObjeto.caseData.evidences.map((evidence,index)=>(
                                    <div key={index} className="row">
                                        <div className="col-3">
                                            <img onClick={(e)=>this.showFullImg(e,evidence)} className="evidenceIMG" src={evidence} alt={`evidence${index}`}/>
                                        </div>
                                    </div>
                                ))}
                            </div> 
                        </div>
                        :
                            null
                        }


                        {(function renderBotonesCaseDetails(userRole,casoResuelto,resolverCaso,showCaseDetailsEvent) {
                            if(userRole==='Proveedor' && casoResuelto==='noResuelto'){
                                return(
                                    <div>
                                        <div className="row SellerCaseDetailsBtns">
                                            <div className="col-12 d-flex justify-content-between">
                                                <div id="resueltoAfavorDelProveedor" onClick={(e)=>resolverCaso(e)} className="seeCaseResume-NoAcceptCase">No acepta caso</div>
                                                <div id="resueltoAfavorDelVendedor" onClick={(e)=>resolverCaso(e)} className="seeCaseResume-acceptCase">Aceptar caso</div>
                                            </div>
                                        </div>
                                        <div className="row SellerCaseDetailsBtns">
                                            <div className="col-12 d-flex justify-content-center">
                                                <div onClick={()=>showCaseDetailsEvent()} className="seeCaseResume">Cerrar los detalles</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div className="row SellerCaseDetailsBtns">
                                        <div className="col-12 d-flex justify-content-center">
                                            <div onClick={()=>showCaseDetailsEvent()} className="seeCaseResume">Cerrar los detalles</div>
                                        </div>
                                    </div>
                                )
                            }
                        })(userRole,this.props.casoResuelto,this.resolverCaso,this.props.showCaseDetailsEvent)}


                    </div>
                )
            }else if(this.state.showFormResponseSupplier===true){
                const {responseSupplier}=this.state
                return(
                    <div className="container modalOpenCaseInsideCard">
                        <HeaderCaseSystem 
                            idPedido={idPedido} 
                            subtitulo={'Porfavor escribe la respuesta que sera entregada a tu cliente con respecto a su solicitud.'} 
                            parrafo={''}
                            toggleModal={toggleModal}>
                        </HeaderCaseSystem>

                        <div className="row typeDetailedDescription">
                            <div className="col-12 typeOptionOpenCase d-flex justify-content-center align-items-center">
                                <textarea value={this.state.responseSupplier} name="longDescription" onChange={this.leerResponseSupplier} placeholder="(min 150 caracteres) Escribe la respuesta que recibira tu cliente con respecto a la no aceptacion de su solicitud."/>
                            </div>
                        </div>

                        {responseSupplier.length<150?
                        null
                        :
                        <div style={{marginTop:20}} className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <div onClick={this.enviarRespuestaProveedor} className="seeCaseResume-NoAcceptCase_response">Enviar respuesta</div>
                            </div>
                        </div>
                        
                        }

                    </div>
                )

            
            }else if(this.state.showMsgToConfirmAcceptCase===true){
                return(
                    <div className="container modalOpenCaseInsideCard">
                        <HeaderCaseSystem 
                                idPedido={idPedido} 
                                subtitulo={'Al aceptar resolver este caso estableceras contacto con tu cliente a traves de Xcala para llevar a buen termino la solicitud '} 
                                parrafo={''}
                                toggleModal={toggleModal}>
                        </HeaderCaseSystem>

                        <div style={{marginTop:20}} className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <div onClick={this.confirmarResolucionCasoAfavorDeVendedor} className="seeCaseResume-NoAcceptCase_response">Si, deseo atender la solicitud</div>
                            </div>
                        </div>

                    </div>
                )
            }else{return(<SellerCaseDetails_fullImgViewer 
                    pedidoObjeto={pedidoObjeto}
                    showFullImg={this.showFullImg}
                    changeFullImg={this.changeFullImg}
                    zoomInFullIMG={this.zoomInFullIMG}
                    zoomOutFullIMG={this.zoomOutFullIMG}
                    resizeFullIMG={this.resizeFullIMG}
                    toggleShowViewer={this.state.toggleShowViewer}
                    zoom={this.state.zoom}
                    imgToShowFull={this.state.imgToShowFull}
                    />)
            }
    }
}


export class SellerCaseDetails_fullImgViewer extends Component {
    
    render() {
        const {pedidoObjeto,showFullImg,changeFullImg,zoomInFullIMG,zoomOutFullIMG,resizeFullIMG,toggleShowViewer,zoom,imgToShowFull}=this.props
        return(
            <div className="container modalOpenCaseInsideCard">
                <div className="paragraphOrderDetailsModal">
                    <span className="labelResumeCase">Pruebas adjuntas</span>
                </div>


                
                <div id="fullImgWrapper">
                    {toggleShowViewer===true?
                        <Draggable axis="both" defaultPosition={{x: 0, y: 0}}>
                            <div id="draggableEvidenceImg">
                                <img style={{zoom:zoom}} className="FullIMG" src={imgToShowFull} alt="fullImgEvidence"/>
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
                



                <div className="evidencesThumbnails d-flex justify-content-center">
                    {pedidoObjeto.caseData.evidences.map((evidence,index)=>(
                        <div key={index} className="row">
                            <div className="col-3">
                                <img onClick={(e)=>changeFullImg(e,evidence)} className="evidenceIMG" src={evidence} alt={`evidence${index}`}/>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-center">
                    <div className="seeCaseResume" onClick={(e)=>showFullImg(e,null)}>Volver a detalles</div>
                </div>
            </div>
            )
    }
}
