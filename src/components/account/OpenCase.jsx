import React, { Component } from 'react'
import {connect} from 'react-redux';
import {openModalOpenCase,saveCaseData,loadEvidenceFiles} from '../../ducks/accountDuck/openCaseDuck';
import {handleErrorMsg} from '../../ducks/errorsDuck/handleErrors';
import Checkbox from '../../components/layout/Checkbox/Checkbox'


class OpenCase extends Component {

    state={
        gotError:false
    }

    componentDidUpdate=()=>{
        const {showOpenCaseModal}=this.props



        if(showOpenCaseModal===true){
            document.getElementById('ownModal').className='ownModal'
            document.body.className='overFlowYHidden'
        }else{
            document.getElementById('ownModal').removeAttribute('class')
            document.body.removeAttribute('class')
            document.body.className='myAccountStyle'
        }
    }

    leerDatos=(e)=>{
        e.preventDefault()
        this.setState({
            gotError:false
        })
        const {saveCaseData}=this.props
        if(e.target.name==='evidenceOne' || e.target.name==='evidenceTwo' || e.target.name==='evidenceThree' || e.target.name==='evidenceFour'){
            saveCaseData(e.target.name,e.target.files)
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
            loadEvidenceFiles(openCaseData,uid,idRelatedOrderData[0].numeroPedido) //TODO: reemplazar numero pedido por ID del pedidlo. (toca generarlo)
        }
    }

    render() {
        const {showOpenCaseModal,idRelatedOrderData,openCaseData,showBtnSendRequestForOpenCase}=this.props
        

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
                    
                    <div className="errorMsg centerHorizontal">
                        {this.state.gotError? this.props.errorEspañol:null}   
                    </div>
                    
                    <div className="row selectRelatedItem">
                        <div className="col-12 selectOptionOpenCase d-flex justify-content-center align-items-center">
                            <select className="boldText" defaultValue={openCaseData.selectedItem?openCaseData.selectedItem:'SeleccionarItem'} name="selectedItem" onChange={this.leerDatos} id="selectItemForOpenCase">
                                <option value="SeleccionarItem" disabled>Producto relacionado</option>
                                {/* TODO: reemplazar valor de option por un id del producto */}
                                {itemsOfIdRelatedOrder?itemsOfIdRelatedOrder.map(item=>(<option value={item.nombreProducto}>{item.nombreProducto} {'de'} {item.clienteNombre}</option>)):null}
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
                                <input id="addEvidenceInputOne" name="evidenceOne" className="evidenceFileInput" onChange={this.leerDatos} type="file"/>
                            </div>

                            <div className="inputEvidencesFileBox">
                                <label className="inputEvidenceLabelTwo d-flex justify-content-center align-items-center" htmlFor="addEvidenceInputTwo">
                                    {openCaseData.evidenceTwo?
                                        <i className="icon-check centerVertical"></i>
                                    :
                                        <i className="icon-plus centerVertical"></i>
                                    }
                                </label>
                                <input id="addEvidenceInputTwo" name="evidenceTwo" className="evidenceFileInput" onChange={this.leerDatos} type="file"/>
                            </div>

                            <div className="inputEvidencesFileBox">
                                <label className="inputEvidenceLabelThree d-flex justify-content-center align-items-center" htmlFor="addEvidenceInputThree">
                                    {openCaseData.evidenceThree?
                                        <i className="icon-check centerVertical"></i>
                                    :
                                        <i className="icon-plus centerVertical"></i>
                                    }
                                </label>
                                <input id="addEvidenceInputThree" name="evidenceThree" className="evidenceFileInput" onChange={this.leerDatos} type="file"/>
                            </div>

                            <div className="inputEvidencesFileBox">
                                <label className="inputEvidenceLabelFour d-flex justify-content-center align-items-center" htmlFor="addEvidenceInputFour">
                                    {openCaseData.evidenceFour?
                                        <i className="icon-check centerVertical"></i>
                                    :
                                        <i className="icon-plus centerVertical"></i>
                                    }
                                </label>
                                <input id="addEvidenceInputFour" name="evidenceFour" className="evidenceFileInput" onChange={this.leerDatos} type="file"/>
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
    idRelatedOrderData:state.openCaseReducer.idRelatedOrder,
    showBtnSendRequestForOpenCase:state.openCaseReducer.showBtnSendRequestForOpenCase,
    openCaseData:state.openCaseReducer.openCaseData,
    uid:state.firebase.auth.uid,
    errorEspañol:state.handlerErrorsReducer.errorEspañol
})
const mapDispatchToProps=(dispatch)=>{
    return{
        openModalOpenCase:(option,idRelatedOrder)=>dispatch(openModalOpenCase(option,idRelatedOrder)),
        saveCaseData:(label,data)=>dispatch(saveCaseData(label,data)),
        loadEvidenceFiles:(data,userID,orderID)=>dispatch(loadEvidenceFiles(data,userID,orderID)),
        handleErrorMsg:(msg)=>dispatch(handleErrorMsg(msg))
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(OpenCase)