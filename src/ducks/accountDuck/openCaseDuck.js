//1. ACTION TYPES
const SHOW_OPEN_CASE_MODAL='xcala/orderDetails/SHOW_OPEN_CASE_MODAL'
//--------------------------------------------------------------------
const HIDE_OPEN_CASE_MODAL='xcala/orderDetails/HIDE_OPEN_CASE_MODAL'
//--------------------------------------------------------------------
const ACCEPT_TYC_FOR_OPEM_CASE='xcala/orderDetails/ACCEPT_TYC_FOR_OPEM_CASE'
//--------------------------------------------------------------------
const SAVE_CASE_DATA='xcala/orderDetails/SAVE_CASE_DATA'
//--------------------------------------------------------------------
const LOAD_EVIDENCE_FILES_SUCCESS='xcala/orderDetails/LOAD_EVIDENCE_FILES_SUCCESS'
const LOAD_EVIDENCE_FILES_ERROR='xcala/orderDetails/LOAD_EVIDENCE_FILES_ERROR'
//--------------------------------------------------------------------
const SHOW_LOADER_IN_MODAL_TRUE='xcala/orderDetails/SHOW_LOADER_IN_MODAL_TRUE'
const SHOW_LOADER_IN_MODAL_FALSE='xcala/orderDetails/SHOW_LOADER_IN_MODAL_FALSE'
//--------------------------------------------------------------------

const SHOW_SUCCESS_OPEN_CASE_SCREEN='xcala/orderDetails/SHOW_SUCCESS_OPEN_CASE_SCREEN'



//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const openModalOpenCase=(option,idRelatedOrder)=>{
        if(option===true){
            return{type:SHOW_OPEN_CASE_MODAL,payload:idRelatedOrder}
        }else{
            return{type:HIDE_OPEN_CASE_MODAL}
        }
    }
//..................................................................................
export const acceptTyCForOpenCase=(option)=>{
        return{type:ACCEPT_TYC_FOR_OPEM_CASE,payload:option}
    }
//..................................................................................
export const saveCaseData=(Label,data)=>{
    return{type:SAVE_CASE_DATA,label:Label,data:data}
}
//..................................................................................
export const loadEvidenceFiles=(data,userID,orderID)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        
        dispatch({type:SHOW_LOADER_IN_MODAL_TRUE})
        
        //creando vector de evidencias
        var evidenceArray=[]
        if(data.evidenceOne){
            evidenceArray.push(data.evidenceOne)
        }if(data.evidenceTwo){
            evidenceArray.push(data.evidenceTwo)
        }if(data.evidenceThree){
            evidenceArray.push(data.evidenceThree)
        }if(data.evidenceFour){
            evidenceArray.push(data.evidenceFour)
        }
        
        if(evidenceArray.length<1){
            dispatch(createCaseInFirestore(data,userID,orderID))
        }else{
            // mapeando vector de evidencias, 
            // subiendo evidencias una por una y 
            // obteniendo vector con URL de las evidencias
            const firebase=getFirebase();
            var evidenceURLSArray=[]
        
            evidenceArray.map(function(evidence,index){
                
                /**TODO: Generar id para caso.*/
                var storageRef=firebase.storage().ref(`/${userID}/pedidos/${orderID}/${data.selectedItem}/caso#1/evidencia-${index+1}`)
                storageRef.put(evidence[0])
                .then((snapshot)=>{
                    snapshot.ref.getDownloadURL()
                    .then((downloadURL)=>{
                        evidenceURLSArray.push(downloadURL)
                        console.log('desde map:abajo'+index)
                        console.log(evidenceURLSArray)
                        dispatch({type:LOAD_EVIDENCE_FILES_SUCCESS,evidenceURLSArray:evidenceURLSArray})
                        if((index+1)===evidenceArray.length){
                            dispatch(createCaseInFirestore(data,userID,orderID))
                        }
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    dispatch({type:SHOW_LOADER_IN_MODAL_FALSE})
                    dispatch({type:LOAD_EVIDENCE_FILES_ERROR,err:err})
                })
            })
        }
    }
}
//..................................................................................
export const createCaseInFirestore=(data,userID,orderID)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{

    //TODO: Estrategia para persistir el valor del arreglo de urls: simplemente, despachar un action que guarda en el estado el vector, 
    //y luego despachar un action que lee ese vector y ahora si guarda en firestore

    const state=getState()
    const evidenceURLSArray=state.openCaseReducer.evidenceURLSArray

    console.log('holi: abajo')
    console.log(evidenceURLSArray)
    //subiendo todos los datos del caso a la base de datos
    const firebase=getFirebase();
    const firestore =getFirestore();
    var userDocRef=firestore.collection('users').doc(userID)
            
    userDocRef.update({
        casos:firebase.firestore.FieldValue.arrayUnion({
                selectedItem:data.selectedItem,
                selectedReason:data.selectedReason,
                longDescription:data.longDescription,
                evidence:evidenceURLSArray
        })
    })
    .then((res)=>{
        dispatch({type:SHOW_LOADER_IN_MODAL_FALSE})
        dispatch({type:SHOW_SUCCESS_OPEN_CASE_SCREEN})
        console.log('all right'+res)
    })
    .catch((err)=>{
        console.log(err)
    })
}}
//..................................................................................




//3. REDUCER PRELOADER
const initialState={
    showOpenCaseModal:false,
    idRelatedOrder:null,
    showBtnSendRequestForOpenCase:false,
    openCaseData:{
        selectedItem:null,
        selectedReason:null,
        longDescription:null,
        evidenceOne:null,
        evidenceTwo:null,
        evidenceThree:null,
        evidenceFour:null,
    },
    evidenceURLSArray:null,
    errorWhenLoadingEvidenceFiles:null,
    showLoaderInModal:false,
    caseCreated:false
    
}
const openCaseReducer = (state=initialState, action)=>{
    switch(action.type){
        case SHOW_SUCCESS_OPEN_CASE_SCREEN:
            return{
                ...state,
                caseCreated:true
            }
        case SHOW_LOADER_IN_MODAL_TRUE:
            return{
                ...state,
                showLoaderInModal:true
            }
        case SHOW_LOADER_IN_MODAL_FALSE:
            return{
                ...state,
                showLoaderInModal:false
            }
        case  ACCEPT_TYC_FOR_OPEM_CASE:
            return{
                ...state,
                showBtnSendRequestForOpenCase:action.payload
            }
        case  SAVE_CASE_DATA:
            return{
                ...state,
                openCaseData:{...state.openCaseData,[action.label]:action.data}
            }
        case  LOAD_EVIDENCE_FILES_SUCCESS:
            console.log(action.evidenceURLSArray)
            return{
                ...state,
                evidenceURLSArray:action.evidenceURLSArray
            }
        case  LOAD_EVIDENCE_FILES_ERROR:
            return{
                ...state,
                errorWhenLoadingEvidenceFiles:action.err
            }
        case SHOW_OPEN_CASE_MODAL:
            return{
                ...state,
                showOpenCaseModal:true,
                idRelatedOrder:action.payload
            }
        case HIDE_OPEN_CASE_MODAL:
            return{
                ...state,
                showOpenCaseModal:false
            }
        default:
            return state;
        }
    }
export default openCaseReducer 