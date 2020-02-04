import React, { Component } from 'react'
import './OpenCaseSeller.css'
import {connect} from 'react-redux';

import firebase from "firebase/app";
import Compressor from 'compressorjs'
import {handleErrorMsg} from '../../../ducks/errorsDuck/handleErrors'

import Checkbox from '../../layout/Checkbox/Checkbox'
import HeaderCaseSystem from '../SellerCaseStyleComponents/Header/HeaderCaseSystem'
import AttachEvidence from '../SellerCaseStyleComponents/AttachEvidence/AttachEvidence'
import SpinnerInModal from '../../layout/SpinnerInModal/SpinnerInModal'



class OpenCaseSeller extends Component {
    state={
        gotError:false,
        showSendCase:false,
        showLoaderSpinner:false,

        openCaseData:{
            selectedReason:'SeleccionarMotivo',
            longDescription:null,
            evidenceOne:null,
            evidenceTwo:null,
            evidenceThree:null,
            evidenceFour:null
        },

    }

    componentDidMount=()=>{
        console.log('Se cargó el openCaseSeller con idPedido=',this.props.idPedido)
    }
    componentWillUnmount=()=>{
        console.log('Se desmonto el openCaseSeller con idPedido=',this.props.idPedido)
    }



    leerDatos=(e)=>{
        e.preventDefault()
        this.setState({gotError:false})
        if(e.target.name==='evidenceOne' || e.target.name==='evidenceTwo' || e.target.name==='evidenceThree' || e.target.name==='evidenceFour'){
            if(e.target.files[0].type.indexOf('image/')> -1){
                this.setState({openCaseData:{...this.state.openCaseData,[e.target.name]:e.target.files[0]}})
            }else{
                const {handleErrorMsg}=this.props
                this.setState({gotError:true})
                handleErrorMsg({code:'onlyImages'})
            }
        }else{
            this.setState({openCaseData:{...this.state.openCaseData,[e.target.name]:e.target.value}})
        }
    }


    acceptTyCForOpenCase=(option)=>{
        this.setState({showSendCase:option})
    }


    sendCase=(e)=>{
        e.preventDefault()
        this.setState({gotError:false})
        const {handleErrorMsg}=this.props
        const {selectedReason, longDescription,evidenceOne,evidenceTwo,evidenceThree,evidenceFour} = this.state.openCaseData
        var evidenceArray=[];if(evidenceOne){evidenceArray.push(evidenceOne)}if(evidenceTwo){evidenceArray.push(evidenceTwo)}if(evidenceThree){evidenceArray.push(evidenceThree)}if(evidenceFour){evidenceArray.push(evidenceFour)}
        
        if(selectedReason==='SeleccionarMotivo' || longDescription===null || longDescription===""){
            this.setState({gotError:true})
            handleErrorMsg({code:'writeOpenCaseData'})
        }else{
            this.setState({showLoaderSpinner:true})
            if(evidenceArray.length<1){//NOTE: No se cargaron evidencias
                this.createCaseInFirebase([])
            }else{//NOTE: Se cargaron evidencias, por lo tanto se procede a comprimir dichas imagenes.
                this.compressingFile(evidenceArray)
            }
        }
    }


    compressingFile=async(evidenceArray)=>{
        
        let compressedFiles=[]
        async function compressing_Evidence_Files(){
            return Promise.all(
                evidenceArray.map(async evidence=>{
                    return Promise.resolve(
                        new Promise((response,reject)=>{
                            new Compressor(evidence,{
                                quality:0.5,
                                maxHeight:250,
                                success(resCompressedFile){
                                    response(compressedFiles.push(resCompressedFile))
                                },
                                error(err){
                                    this.setState({showLoaderSpinner:false,gotError:true})
                                    handleErrorMsg({code:'error al crear caso'})
                                    reject(
                                        //TODO: Usar el getError del state y el hanldeError para mostrar em pantalla el que ocurrio un error
                                        console.log(err)
                                    )
                                }
                            })
                        })
                    )
                })
            )
        }
        await compressing_Evidence_Files()        
        this.loadEvidenceFiles(compressedFiles)
    }


    loadEvidenceFiles=async(compressedFiles)=>{
        const {idPedido}=this.props
        let vectorURLsEvidencias=[]

        async function loadEvidenceFile() {
            return Promise.all(
                compressedFiles.map(async(compressedFile,index)=>{
                    return Promise.resolve(
                        new Promise((response,reject)=>{
                            firebase.storage().ref(`/imagenes/casos/${idPedido}/evidencia_${index+1}`)
                            .put(compressedFile)
                            .then((snapshot)=>{
                                snapshot.ref.getDownloadURL()
                                .then(downloadURL=>{
                                    response(vectorURLsEvidencias.push(downloadURL))
                                })
                            })
                            .catch(err=>{
                                //TODO: Usar el getError del state y el hanldeError para mostrar em pantalla el que ocurrio un error
                                this.setState({showLoaderSpinner:false,gotError:true})
                                handleErrorMsg({code:'error al crear caso'})
                                reject(console.log(err))
                            })
                        })
                    )
            }))
        }
        await loadEvidenceFile()
        this.createCaseInFirebase(vectorURLsEvidencias)
    }
  

    createCaseInFirebase=(vectorURLsEvidencias)=>{
        const {idPedido,toggleModal,carryOnWithOpenCase}=this.props
        const {selectedReason,longDescription}=this.state.openCaseData

        firebase.firestore().collection('pedidos').doc(idPedido)
        .update({
            estado:'Caso abierto',
            caseData:{
                selectedReason:selectedReason,
                longDescription:longDescription,
                evidences:vectorURLsEvidencias
            },
            casoResuelto:'noResuelto', //NOTE: Mas adelante, tomara valores de "resueltoAFavorVendedor" || "resueltoAFavorProveedor"
            guiaCargada:false,
            guiaURL:null, //NOTE: Aca se cargara el url de la imagen de la guia 
            respuestaProveedor:null,
            proveedorRespondio:false,
        })
        .then(res=>{
            this.setState({showLoaderSpinner:false})
            toggleModal(null)
            carryOnWithOpenCase()
        })
        .catch(err=>{
            this.setState({showLoaderSpinner:false,gotError:true})
            handleErrorMsg({code:'error al crear caso'})
        })
    }

   


    render() {
        const {idPedido,toggleModal,errorEspañol}=this.props
        const {showLoaderSpinner,gotError}=this.state
       
        
        if(showLoaderSpinner===false){
            return (
                <div className="container modalOpenCaseInsideCard">

                    <HeaderCaseSystem 
                        idPedido={idPedido} 
                        subtitulo={'Solicitar cambio o reclamo por garantia'} 
                        parrafo={'Adidas X de Pepito.'}
                        toggleModal={toggleModal}>
                    </HeaderCaseSystem>

                

                    <div className="errorMsg centerHorizontal">
                        {gotError?errorEspañol:null}   
                    </div>

                    
                    <div className="row selectReason">
                        <div className="col-12 selectOptionOpenCase d-flex justify-content-center align-items-center">
                            <select className="boldText" defaultValue={this.state.openCaseData.selectedReason} name="selectedReason" onChange={this.leerDatos}   id="selectReasonForOpenCase">
                                <option value="SeleccionarMotivo" disabled>Motivo de la solicitud</option>
                                <option value="garantia" >Reclamar garantia</option>
                                <option value="cambio" >Solicitar cambio</option>
                                <option value="retracto" >Retracto de compra</option>
                            </select>
                        </div>
                    </div>
                    <div className="row typeDetailedDescription">
                        <div className="col-12 typeOptionOpenCase d-flex justify-content-center align-items-center">
                            <textarea value={this.state.openCaseData.longDescription} name="longDescription" onChange={this.leerDatos} placeholder="Escribe una descripcion ampliada de tu solicitud"/>
                        </div>
                    </div>


                    <div className="row attachEvidence">
                        <div className="col-12 typeOptionOpenCase">
                            <p className="boldText">Adjuntar pruebas*</p>               
                            <AttachEvidence evidence={this.state.openCaseData.evidenceOne} leerDatos={this.leerDatos} className={'inputEvidenceLabelOne'} inputID={'addEvidenceInputOne'} inputName={'evidenceOne'}/>        
                            <AttachEvidence evidence={this.state.openCaseData.evidenceTwo} leerDatos={this.leerDatos} className={'inputEvidenceLabelTwo'} inputID={'addEvidenceInputTwo'} inputName={'evidenceTwo'}/>        
                            <AttachEvidence evidence={this.state.openCaseData.evidenceThree} leerDatos={this.leerDatos} className={'inputEvidenceLabelThree'} inputID={'addEvidenceInputThree'} inputName={'evidenceThree'}/>        
                            <AttachEvidence evidence={this.state.openCaseData.evidenceFour} leerDatos={this.leerDatos} className={'inputEvidenceLabelFour'} inputID={'addEvidenceInputFour'} inputName={'evidenceFour'}/>        
                        </div>
                    </div>


                    <div className="row acceptTyCForOpenCase">
                        <div className="col-12">              
                        <Checkbox 
                            mode={'acceptT&CForOpenCase'} 
                            styleBox={'boxOpenCase'} 
                            styleCheck={'checkOpenCase'} 
                            text={'Declaro que he leido y entendido la'} 
                            colorLink={'linkBlue'} 
                            link={'/Terminos&condiciones'} 
                            textLink={' politica de cambios, devoluciones y garantias.'}  
                            id={'aceptoRegistroCheck'}
                            acceptTyCForOpenCase={this.acceptTyCForOpenCase}>
                        </Checkbox>
                        
                        
                        {this.state.showSendCase?
                            <div className="div openCaseBtn d-flex justify-content-start">
                                <button onClick={this.sendCase}>Enviar solicitud</button>
                            </div>
                        :
                            null
                        }
                        
                        </div>
                    </div> 
                </div>
            )
        }else if(showLoaderSpinner===true){
            return(
                <div className="container modalOpenCaseInsideCard">
                    <HeaderCaseSystem 
                        idPedido={idPedido} 
                        subtitulo={'Solicitar cambio o reclamo por garantia'} 
                        parrafo={'Adidas X de Pepito.'}
                        toggleModal={toggleModal}>
                    </HeaderCaseSystem>
                    <div className="d-flex align-content-center">
                        <SpinnerInModal/>
                    </div>
                </div>
            )
        }else{
            return(null)
        }
    }
}

const mapStateToProps=(state)=>({
    errorEspañol:state.handlerErrorsReducer.errorEspañol,
})

const mapDispatchToProps=(dispatch)=>{
    return{
        handleErrorMsg:(msg)=>dispatch(handleErrorMsg(msg))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OpenCaseSeller) 