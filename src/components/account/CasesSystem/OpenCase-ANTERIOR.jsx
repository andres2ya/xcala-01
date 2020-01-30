import React, { Component } from 'react'
import {connect} from 'react-redux';
import {openModalOpenCase,saveCaseData,loadEvidenceFiles,resetOpenCaseForm} from '../../../ducks/accountDuck/openCaseDuck';
import {handleErrorMsg} from '../../../ducks/errorsDuck/handleErrors';
import Checkbox from '../../layout/Checkbox/Checkbox'
import SpinnerInModal from '../../layout/SpinnerInModal/SpinnerInModal';
import Draggable from 'react-draggable';


class OpenCase extends Component {

    state={
        
        gotError:false,
        showFullImg:false,
        imgToShowFull:null,
        showCaseResume:false,
        zoom:0.1,
        key:1
    }

    componentDidUpdate=()=>{
        const {showOpenCaseModal}=this.props


if(document.body.className!=='loginStyle'){
        if(showOpenCaseModal===true){
            document.getElementById('ownModal').className='ownModal'
            document.body.className='overFlowYHidden'
        }else{
            document.getElementById('ownModal').removeAttribute('class')
            document.body.removeAttribute('class')
            document.body.className='myAccountStyle'
        }
    }
}

    leerDatos=(e)=>{
        e.preventDefault()
        this.setState({
            gotError:false
        })
        const {saveCaseData}=this.props
        if(e.target.name==='evidenceOne' || e.target.name==='evidenceTwo' || e.target.name==='evidenceThree' || e.target.name==='evidenceFour'){
            if(e.target.files[0].type.indexOf('image/')> -1){
                saveCaseData(e.target.name,e.target.files)
            }else{
                const {handleErrorMsg}=this.props
                this.setState({
                    gotError:true
                })
                handleErrorMsg({code:'onlyImages'})
            }
        }else{
            saveCaseData(e.target.name,e.target.value)
        }
    }
    

    sendRequest=(e)=>{
        e.preventDefault()
        const {loadEvidenceFiles,openCaseData,uid,handleErrorMsg,idRelatedOrderData}=this.props
        if(openCaseData.selectedItem===null
        || openCaseData.selectedReason===null
        || openCaseData.longDescription===null){
            this.setState({
                gotError:true
            })
            handleErrorMsg({code:'No has completado todos los campos'})
        }else{
            //TODO: reemplazar numero pedido por ID del pedidlo. (se debe generar)
            loadEvidenceFiles(null,openCaseData.selectedItem,openCaseData,uid,idRelatedOrderData[0].numeroPedido) 
        }
    }



    showCaseResume=(e)=>{
        e.preventDefault()
        this.setState({
            showCaseResume:!this.state.showCaseResume
        })
    }

    showFullImg=(e,evidenceImgSrc)=>{
        e.preventDefault()
        this.setState({
            showFullImg:!this.state.showFullImg,
            imgToShowFull:evidenceImgSrc,
            showCaseResume:!this.state.showCaseResume
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

    resizeFullIMG=(e)=>{
        e.preventDefault()
        var newKey=this.state.key+1
        this.setState({
            key:newKey
        })
    }

    

 



    render() {
        const {indexDetailMode,showOpenCaseModalInDetailsMode,caseCreated,showOpenCaseModal,idRelatedOrderData,openCaseData,showBtnSendRequestForOpenCase,showLoaderInModal}=this.props
        
        if(showOpenCaseModal===true && showOpenCaseModalInDetailsMode===true){
            const itemsOfIdRelatedOrder=[...idRelatedOrderData[0].items]
            return (
              <div className="container modalOpenCaseInsideCard">
                <div className="row modalOpenCaseContent">
                  <div className="col-12">
                    <div className="row relatedOrderIdAndBackArrow">
                      <div className="col-8 numberOrderTitleModal d-flex justify-content-star align-items-center">
                        Pedido #
                        {idRelatedOrderData
                          ? idRelatedOrderData[0].numeroPedido
                          : null}
                      </div>
                      <div className="col-4 d-flex justify-content-end">
                        <i
                          onClick={() => this.props.openModalOpenCase(false)}
                          className="backOrderDetails icon-arrow-circle-left centerVertical"
                        />
                      </div>
                    </div>


                    {this.state.showFullImg?null:
                        <div className="seeCaseResume" onClick={this.showCaseResume}>{this.state.showCaseResume?'Cerrar resumen':'Ver resumen del caso'}</div>
                    }
                    









                    {(()=>{
                        if(this.state.showCaseResume===true && this.state.showFullImg===false){
                            return (
                            <div className="generalDataResumenCaseBox">
                                <div className="row dataResumeCaseBox">
                                    <div className="col-12">
                                        <div className="labelResumeCase">Estado del caso:</div>
                                        <div className="dataResumeCase">{itemsOfIdRelatedOrder[indexDetailMode].case.lastState}</div>
                                    </div>
                                </div>

                                <div className="row dataResumeCaseBox">
                                    <div className="col-12">
                                        <div className="labelResumeCase">Producto relacionado:</div> 
                                        <div className="dataResumeCase">{itemsOfIdRelatedOrder[indexDetailMode].nombreProducto} de {itemsOfIdRelatedOrder[indexDetailMode].clienteNombre}</div>
                                    </div>
                                </div>

                                <div className="row dataResumeCaseBox">
                                    <div className="col-12">
                                        <div className="labelResumeCase">Motivo del caso:</div> 
                                        <div className="dataResumeCase">{itemsOfIdRelatedOrder[indexDetailMode].case.selectedReason}</div>
                                    </div>
                                </div>

                                <div className="row dataResumeCaseBox">
                                    <div className="col-12">
                                        <div className="labelResumeCase">Tu descripcion del caso:</div> 
                                        <div style={{overflow: 'auto', height:80}} className="lighterDataResumeCase">{itemsOfIdRelatedOrder[indexDetailMode].case.longDescription}</div>
                                    </div>
                                </div>

                                {itemsOfIdRelatedOrder[indexDetailMode].case.evidence?
                                <div className="row dataResumeCaseBox">
                                    <div className="col-12">
                                        <span className="labelResumeCase">Tus pruebas</span>
                                    </div>
                                </div>
                                :
                                null}


                                <div className="d-flex">
                                    {itemsOfIdRelatedOrder[indexDetailMode].case.evidence?
                                    itemsOfIdRelatedOrder[indexDetailMode].case.evidence.map((evidence,index)=>(
                                        <div key={index} className="row">
                                            <div className="col-3">
                                                <img onClick={(e)=>this.showFullImg(e,evidence)} className="evidenceIMG" src={evidence} alt={`evidence${index}`}/>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    null
                                    }
                                </div>
                            </div>
                            )













                        }else if(this.state.showCaseResume===false && this.state.showFullImg===true){
                            return(
                            <div>
                                <div className="paragraphOrderDetailsModal">
                                    <span className="labelResumeCase">Tus pruebas</span>
                                </div>


                                
                                    <div id="fullImgWrapper">
                                        
                                        <Draggable 
                                        axis="both"
                                        defaultPosition={{x: 0, y: 0}}
                                        key={this.state.key}> 
                                        <div id="draggableEvidenceImg">
                                            <img style={{zoom:this.state.zoom}} className="FullIMG" src={this.state.imgToShowFull} alt="fullImgEvidence"/>
                                        </div> 
                                        </Draggable>                                        

                                    </div>

                                    <div className="row zoomIconsRow">
                                        <div className="col-6"/>
                                        <div className="col-2 backZoomIcon d-flex justify-content-center align-items-center">
                                            <i onClick={this.resizeFullIMG}  className="resizeIcon icon-resize centerVertical"/>
                                        </div>
                                        <div className="col-2 backZoomIcon d-flex justify-content-center align-items-center">
                                            <i onClick={this.zoomOutFullIMG} className="zoomIcon icon-zoom-out centerVertical"/>
                                        </div>
                                        <div className="col-2 backZoomIcon d-flex justify-content-center align-items-center">
                                            <i onClick={this.zoomInFullIMG} className="zoomIcon icon-zoom-in centerVertical"/>
                                        </div>
                                    </div>
                                



                                <div className="evidencesThumbnails d-flex justify-content-center">
                                    {itemsOfIdRelatedOrder[indexDetailMode].case.evidence?
                                    itemsOfIdRelatedOrder[indexDetailMode].case.evidence.map((evidence,index)=>(
                                        <div key={index} className="row">
                                            <div className="col-3">
                                                <img onClick={(e)=>this.changeFullImg(e,evidence)} className="evidenceIMG" src={evidence} alt={`evidence${index}`}/>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    null
                                    }
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="seeCaseResume" onClick={(e)=>this.showFullImg(e,null)}>Volver</div>
                                </div>
                            </div>
                            )
















                        }else if(this.state.showCaseResume===false && this.state.showFullImg===false){
                            return (
                            <div>
                                <div className="row openCaseSuccessMsg">
                                    <div className="col-12">
                                        <p className="openCaseModalSuccessMsgTitle">Tu solicitud ya fue atendida y esta proxima a ser resuelta.</p>
                                        <p className="openCaseModalSuccessMsgParagraph">Porfavor revisa los detalles de este pedido para conocer la resolucion del caso una vez se haya finalizado.</p>
                                    </div>
                                </div>
            
            
                                <div className="row openCaseBtnSuccessMsg">
                                    <div className="col-12 d-flex justify-content-center">
                                        <button onClick={(e) => this.props.openModalOpenCase(false)}>Aceptar</button>
                                    </div>
                                </div>
                            </div>
                            ) 








                        } else{
                            return null
                        }
                    })()}


                  </div>
                </div>
              </div>
            )

}











        // --------------------------------------------












        
        if(showOpenCaseModal){
            const itemsOfIdRelatedOrder=[...idRelatedOrderData[0].items]
            return (
              <div className="container modalOpenCaseInsideCard">
                <div className="row modalOpenCaseContent">
                  <div className="col-12">
                    <div className="row relatedOrderIdAndBackArrow">
                      <div className="col-8 numberOrderTitleModal d-flex justify-content-star align-items-center">
                        Pedido #
                        {idRelatedOrderData
                          ? idRelatedOrderData[0].numeroPedido
                          : null}
                      </div>
                      <div className="col-4 d-flex justify-content-end">
                        <i
                          onClick={() => this.props.openModalOpenCase(false)}
                          className="backOrderDetails icon-arrow-circle-left centerVertical"
                        />
                      </div>
                    </div>
                    <div className="row paragraphOrderDetailsModal">
                        <div className="col-12">
                            Solicitar cambio o reclamo por garantia.
                        </div>
                    </div>
                    




                    
                    {/* Funcion auto ejecutada que decide si mostrar el fomrulario, el spinner o el mensaje de exito */}
                    {(()=>{
                        if(showLoaderInModal===false && caseCreated===false){
                            return (
                            <div>
                                <div className="errorMsg centerHorizontal">
                                    {this.state.gotError? this.props.errorEspañol:null}   
                                </div>
                                
                                <div className="row selectRelatedItem">
                                    <div className="col-12 selectOptionOpenCase d-flex justify-content-center align-items-center">
                                        
                                        
                                        <select className="boldText" defaultValue={openCaseData.selectedItem?openCaseData.selectedItem:'SeleccionarItem'} name="selectedItem" onChange={this.leerDatos} id="selectItemForOpenCase">
                                            <option value="SeleccionarItem" disabled>Producto relacionado</option>
                                            {/* TODO: reemplazar valor de option por un id del producto */}
                                            {itemsOfIdRelatedOrder?itemsOfIdRelatedOrder.map(item=>(
                                                

                                            (()=>{
                                                if(item.case!==undefined){
                                                if(item.case.lastState!=='Sin resolver'){
                                                    return <option value={item.id}>{item.nombreProducto} {'de'} {item.clienteNombre}</option>
                                                } else{
                                                    return <option value={item.id} disabled>{item.nombreProducto} {'de'} {item.clienteNombre} {'(caso abierto)'}</option>
                                                }
                                                }else {
                                                    return <option value={item.id}>{item.nombreProducto} {'de'} {item.clienteNombre}</option>
                                                }
                                            })()
                                            


                                            ))
                                            :
                                            null}
                                        </select>
                                    </div>
                                </div>
                                <div className="row selectReason">
                                    <div className="col-12 selectOptionOpenCase d-flex justify-content-center align-items-center">
                                        <select className="boldText" defaultValue={openCaseData.selectedReason?openCaseData.selectedReason:'SeleccionarMotivo'} name="selectedReason" onChange={this.leerDatos}   id="selectReasonForOpenCase">
                                            <option value="SeleccionarMotivo" disabled>Motivo de la solicitud</option>
                                            <option value="garantia" >Reclamar garantia</option>
                                            <option value="cambio" >Solicitar cambio</option>
                                            <option value="retracto" >Retracto de compra</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row typeDetailedDescription">
                                    <div className="col-12 typeOptionOpenCase d-flex justify-content-center align-items-center">
                                        <textarea value={openCaseData.longDescription?openCaseData.longDescription:undefined} name="longDescription" onChange={this.leerDatos} placeholder="Escribe una descripcion ampliada de tu solicitud"/>
                                    </div>
                                </div>
                                <div className="row attachEvidence">
                                    <div className="col-12 typeOptionOpenCase">
                                        <p className="boldText">Adjuntar pruebas*</p>
                                        
                                        
                                        <div className="inputEvidencesFileBox">
                                            <label className="inputEvidenceLabelOne d-flex justify-content-center align-items-center" htmlFor="addEvidenceInputOne">
                                                {openCaseData.evidenceOne?
                                                    <i className="icon-check centerVertical"></i>
                                                :
                                                    <i className="icon-plus centerVertical"></i>
                                                }
                                            </label>
                                            <input accept="image/*"  id="addEvidenceInputOne" name="evidenceOne" className="evidenceFileInput" onChange={this.leerDatos} type="file"/>
                                        </div>
            
                                        <div className="inputEvidencesFileBox">
                                            <label className="inputEvidenceLabelTwo d-flex justify-content-center align-items-center" htmlFor="addEvidenceInputTwo">
                                                {openCaseData.evidenceTwo?
                                                    <i className="icon-check centerVertical"></i>
                                                :
                                                    <i className="icon-plus centerVertical"></i>
                                                }
                                            </label>
                                            <input accept="image/*"  id="addEvidenceInputTwo" name="evidenceTwo" className="evidenceFileInput" onChange={this.leerDatos} type="file"/>
                                        </div>
            
                                        <div className="inputEvidencesFileBox">
                                            <label className="inputEvidenceLabelThree d-flex justify-content-center align-items-center" htmlFor="addEvidenceInputThree">
                                                {openCaseData.evidenceThree?
                                                    <i className="icon-check centerVertical"></i>
                                                :
                                                    <i className="icon-plus centerVertical"></i>
                                                }
                                            </label>
                                            <input accept="image/*"  id="addEvidenceInputThree" name="evidenceThree" className="evidenceFileInput" onChange={this.leerDatos} type="file"/>
                                        </div>
            
                                        <div className="inputEvidencesFileBox">
                                            <label className="inputEvidenceLabelFour d-flex justify-content-center align-items-center" htmlFor="addEvidenceInputFour">
                                                {openCaseData.evidenceFour?
                                                    <i className="icon-check centerVertical"></i>
                                                :
                                                    <i className="icon-plus centerVertical"></i>
                                                }
                                            </label>
                                            <input accept="image/*"  id="addEvidenceInputFour" name="evidenceFour" className="evidenceFileInput" onChange={this.leerDatos} type="file"/>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="row acceptTyCForOpenCase">
                                    <div className="col-12">
                                    <Checkbox mode={'acceptT&CForOpenCase'} styleBox={'boxOpenCase'} styleCheck={'checkOpenCase'} text={'Declaro que he leido y entendido la'} 
                                    colorLink={'linkBlue'} link={'/Terminos&condiciones'} textLink={' politica de cambios, devoluciones y garantias.'}  id={'aceptoRegistroCheck'}/>
                                    
                                    {showBtnSendRequestForOpenCase?
                                        <div className="div openCaseBtn d-flex justify-content-start">
                                            <button onClick={this.sendRequest}>Enviar solicitud</button>
                                        </div>
                                        :
                                        null}
                    
                                    </div>
                                </div>
                            </div>
                            )








                        }else if(showLoaderInModal===true){
                            return <SpinnerInModal/>





                            
                        }else if(caseCreated===true){
                            return  (
                            <div>
                            <div className="row openCaseSuccessMsg">
                                <div className="col-12">
                                    <p className="openCaseModalSuccessMsgTitle">Tu solicitud ha sido enviada con exito.</p>
                                    <p className="openCaseModalSuccessMsgParagraph">Porfavor revisa los detalles de este pedido para conocer la resolucion del caso una vez se haya finalizado.</p>
                                </div>
                            </div>
                            <div className="row openCaseBtnSuccessMsg">
                                <div className="col-12 d-flex justify-content-center">
                                    <button onClick={() => {this.props.openModalOpenCase(false)
                                                            this.props.resetOpenCaseForm(true)}
                                    }>Aceptar</button>
                                </div>
                            </div>
                            </div>
                                )
                        }
                    })()}
                    {/* Fin de la funcion */}

                  </div>
                </div>
                
              </div>
            );
            
        }else{
            return null
        }
        
    }
}
const mapStateToProps=(state)=>({
    showOpenCaseModal:state.openCaseReducer.showOpenCaseModal,
    idRelatedOrderData:state.openCaseReducer.idRelatedOrderData,
    showOpenCaseModalInDetailsMode:state.openCaseReducer.showOpenCaseModalInDetailsMode,
    indexDetailMode:state.openCaseReducer.indexDetailMode,
    showBtnSendRequestForOpenCase:state.openCaseReducer.showBtnSendRequestForOpenCase,
    openCaseData:state.openCaseReducer.openCaseData,
    uid:state.firebase.auth.uid,
    errorEspañol:state.handlerErrorsReducer.errorEspañol,
    showLoaderInModal:state.openCaseReducer.showLoaderInModal,
    caseCreated:state.openCaseReducer.caseCreated
})
const mapDispatchToProps=(dispatch)=>{
    return{
        openModalOpenCase:(option,idRelatedOrderData)=>dispatch(openModalOpenCase(option,idRelatedOrderData)),
        saveCaseData:(label,data)=>dispatch(saveCaseData(label,data)),
        loadEvidenceFiles:(supplierID,itemID,openCaseData,userID,orderID)=>dispatch(loadEvidenceFiles(supplierID,itemID,openCaseData,userID,orderID)),
        handleErrorMsg:(msg)=>dispatch(handleErrorMsg(msg)),
        resetOpenCaseForm:(reseted)=>dispatch(resetOpenCaseForm(reseted))
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(OpenCase)