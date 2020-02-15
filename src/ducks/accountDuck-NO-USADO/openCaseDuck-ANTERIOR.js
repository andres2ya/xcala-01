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
//--------------------------------------------------------------------
const RESET_OPEN_CASE_FORM='xcala/orderDetails/RESET_OPEN_CASE_FORM'
//------------------------------------------------------------------------------

//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const openModalOpenCase=(option,idRelatedOrderData,detailMode,index)=>{
        if(option===true){
            return{type:SHOW_OPEN_CASE_MODAL,payload:idRelatedOrderData,detailMode:detailMode,indexDetailMode:index}
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
export const loadEvidenceFiles=(supplierID,itemID,openCasedata,userID,orderID)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        
        dispatch({type:SHOW_LOADER_IN_MODAL_TRUE})
        
        //creando vector de evidencias
        var evidenceArray=[]
        if(openCasedata.evidenceOne){
            evidenceArray.push(openCasedata.evidenceOne)
        }if(openCasedata.evidenceTwo){
            evidenceArray.push(openCasedata.evidenceTwo)
        }if(openCasedata.evidenceThree){
            evidenceArray.push(openCasedata.evidenceThree)
        }if(openCasedata.evidenceFour){
            evidenceArray.push(openCasedata.evidenceFour)
        }
        
        if(evidenceArray.length<1){
            dispatch(createCaseInFirestore(supplierID,itemID,openCasedata,userID,orderID))
        }else{
            // mapeando vector de evidencias, 
            // subiendo evidencias una por una y 
            // obteniendo vector con URL de las evidencias
            const firebase=getFirebase();
            var evidenceURLSArray=[]
        
            evidenceArray.map(function(evidence,index){
                
                /**TODO: Generar id para caso.*/
                var storageRef=firebase.storage().ref(`/${userID}/pedidos/${orderID}/${openCasedata.selectedItem}/caso#1/evidencia-${index+1}`)
                return(
                storageRef.put(evidence[0])
                .then((snapshot)=>{
                    snapshot.ref.getDownloadURL()
                    .then((downloadURL)=>{
                        evidenceURLSArray.push(downloadURL)
                        
                        console.log('Array de urls: abajo ')
                        console.log(evidenceURLSArray)

                        dispatch({type:LOAD_EVIDENCE_FILES_SUCCESS,evidenceURLSArray:evidenceURLSArray})
                        if(evidenceURLSArray.length===evidenceArray.length){
                        // if((index+1)===evidenceArray.length){
                            dispatch(createCaseInFirestore(supplierID,itemID,openCasedata,userID,orderID))
                        }
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    dispatch({type:SHOW_LOADER_IN_MODAL_FALSE})
                    dispatch({type:LOAD_EVIDENCE_FILES_ERROR,err:err})
                })
             )})
        }
    }
}
//..................................................................................
export const createCaseInFirestore=(supplierID,itemID,openCasedata,userID,orderID)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{

    const state=getState()
    const evidenceURLSArray=state.openCaseReducer.evidenceURLSArray

    //subiendo todos los datos del caso a la base de datos
    // const firebase=getFirebase();
    const firestore =getFirestore();

    //NOTE: FORMAS DE AÑADIR INFO A FIRESTORE: Esta es la forma para añadirlo dentro de un arreglo en un unico documento
    // var userDocRef=firestore.collection('users').doc(userID)
            
    // userDocRef.update({
    //     casos:firebase.firestore.FieldValue.arrayUnion({
    //             selectedItem:openCasedata.selectedItem,
    //             selectedReason:openCasedata.selectedReason,
    //             longDescription:openCasedata.longDescription,
    //             evidence:evidenceURLSArray
    //     })
    // })


    // NOTE: Esta es la forma para añadirlo en un documento dentro de la coleccion CASES
    // firestore.collection('cases').add({
    //     supplierID:supplierID,
    //     itemID:itemID,
    //     userID:userID,
    //     orderID:orderID,
    //     selectedItem:openCasedata.selectedItem,
    //     selectedReason:openCasedata.selectedReason,
    //     longDescription:openCasedata.longDescription,
    //     evidence:evidenceURLSArray
    // })

    //NOTE: Esta es la forma para añadirlo directamente en el objeo del correspndiente item dentro del doc del usuario en la coleccion users
    //mediante la obtencion, modificacion y actualizacion del campo.
    // const oldUserOrders=state.firebase.profile.pedidos
    
    // const specificRequiredOrder=oldUserOrders.filter(order=>order.numeroPedido===orderID)

    // const specificRequiredItem=specificRequiredOrder[0].items.filter(item=>item.id===itemID)

    // const updatedSpecificItem={...specificRequiredItem[0],case:{
    //          supplierID:supplierID,
    //          itemID:itemID,
    //          userID:userID,
    //          orderID:orderID,
    //          selectedItem:openCasedata.selectedItem,
    //          selectedReason:openCasedata.selectedReason,
    //          longDescription:openCasedata.longDescription,
    //          evidence:evidenceURLSArray
    //     }}

    // const itemsArrayWithOutSpecificRequiredItem=specificRequiredOrder[0].items.filter(item=>item.id!==itemID)

    // const updateItemsArray=[...itemsArrayWithOutSpecificRequiredItem,updatedSpecificItem]


    // const updatedSpecificOrder=specificRequiredOrder[0]
    // updatedSpecificOrder.items=updateItemsArray

    // const oldUserOrdersWithoutSpecificRequiredOrder=oldUserOrders.filter(order=>order.numeroPedido!==orderID)

    // const updatedUserOrders=[...oldUserOrdersWithoutSpecificRequiredOrder,updatedSpecificOrder]

    // var userDocRef=firestore.collection('users').doc(userID)    
    // userDocRef.update({
    //     pedidos:updatedUserOrders
    // })
    // .then((res)=>{
    //      dispatch({type:SHOW_LOADER_IN_MODAL_FALSE})
    //      dispatch({type:SHOW_SUCCESS_OPEN_CASE_SCREEN})
    // })
    // .catch((err)=>{
    //      console.log(err)
    // })

    //-------
    
    
    //NOTE: Esta es la forma de incluir el case dentro del objeto del item correspondiente mediante la identificacion del pedido, el item y 
    //posteriormente su asignacion para luego reemplazar todo el campo de pedidos con la nueva informacion.
    
    //TODO: Aca tengo que poner la funcion para guardar el case

    const oldUserOrders=state.firebase.profile.pedidos

    var indexOfOrderID
    var indexOfItemID
    oldUserOrders.map((order,index)=>{
        if(order.numeroPedido===orderID){return indexOfOrderID=index}return null})
    oldUserOrders[indexOfOrderID].items.map((item,index)=>{
        if(item.id===itemID){return indexOfItemID=index}return null})

    const newUserOrders=[...oldUserOrders]
    const seletedItemData=newUserOrders[indexOfOrderID].items[indexOfItemID]

    newUserOrders[indexOfOrderID].items[indexOfItemID]={...seletedItemData,case:{
                  supplierID:supplierID,
                  itemID:itemID,
                  userID:userID,
                  orderID:orderID,
                  selectedItem:openCasedata.selectedItem,
                  selectedReason:openCasedata.selectedReason,
                  longDescription:openCasedata.longDescription,
                  evidence:evidenceURLSArray,
                  lastState:'Sin resolver'
             }}

    var userDocRef=firestore.collection('users').doc(userID) 
    console.log('Nuevos datos... abajo')
    console.log(newUserOrders)
    userDocRef.update({
        pedidos:newUserOrders
    })
    .then((res)=>{
         dispatch({type:SHOW_LOADER_IN_MODAL_FALSE})
         dispatch({type:SHOW_SUCCESS_OPEN_CASE_SCREEN})
    })
    .catch((err)=>{
         console.log(err)
    })
}}
//..................................................................................
export const resetOpenCaseForm=(reseted)=>{
    return{ type:RESET_OPEN_CASE_FORM,payload:reseted}
}



//3. REDUCER PRELOADER
const initialState={
    showOpenCaseModal:false,
    showOpenCaseModalInDetailsMode:false,
    indexDetailMode:null,
    idRelatedOrderData:null,
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
    caseCreated:false,
    reseted:false
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
            console.log(action.indexDetailMode)
            return{
                ...state,
                showOpenCaseModal:true,
                idRelatedOrderData:action.payload,
                showOpenCaseModalInDetailsMode:action.detailMode,
                indexDetailMode:action.indexDetailMode
            }
        case HIDE_OPEN_CASE_MODAL:
            return{
                ...state,
                showOpenCaseModal:false
            }
        case RESET_OPEN_CASE_FORM:
            return{
                ...state,
                caseCreated:false,
                reseted:true,
                openCaseData:{'selectedItem':null,
                'selectedReason':null,
                'longDescription':null,
                'evidenceOne':null,
                'evidenceTwo':null,
                'evidenceThree':null,
                'evidenceFour':null,}
            }
        default:
            return state;
        }
    }
export default openCaseReducer 