//1. ACTION TYPES
const SHOW_OPEN_CASE_MODAL='xcala/orderDetails/SHOW_OPEN_CASE_MODAL'
const HIDE_OPEN_CASE_MODAL='xcala/orderDetails/HIDE_OPEN_CASE_MODAL'
//--------------------------------------------------------------------
const SHOW_OPEN_MODAL_SELLER_CASE_DETAILS='xcala/orderDetails/SHOW_OPEN_MODAL_SELLER_CASE_DETAILS'
const HIDE_OPEN_MODAL_SELLER_CASE_DETAILS='xcala/orderDetails/HIDE_OPEN_MODAL_SELLER_CASE_DETAILS'
//--------------------------------------------------------------------


//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const openModalOpenCase=(option,idPedido)=>{
        if(option===true){
            return{type:SHOW_OPEN_CASE_MODAL,payload:idPedido}
        }else{
            return{type:HIDE_OPEN_CASE_MODAL}
        }
}
//..................................................................................
export const openModal_SellerCaseDetails=(option,idPedido)=>{
    if(option===true){
        return{type:SHOW_OPEN_MODAL_SELLER_CASE_DETAILS,payload:idPedido}
    }else{
        return{type:HIDE_OPEN_MODAL_SELLER_CASE_DETAILS}
    }
}
//..................................................................................




//3. REDUCER PRELOADER
const initialState={
    showOpenCaseModal:false,
    show_SellerCaseDetails:false,
    idPedido:null,
    showLoaderInModal:false,
}

const openCaseReducer = (state=initialState, action)=>{
    switch(action.type){
        
        case SHOW_OPEN_CASE_MODAL:
            return{
                ...state,
                showOpenCaseModal:true,
                idPedido:action.payload,
            }
        case HIDE_OPEN_CASE_MODAL:
            return{
                ...state,
                showOpenCaseModal:false,
            }
//..................................................................................
//..................................................................................
//..................................................................................
        case SHOW_OPEN_MODAL_SELLER_CASE_DETAILS:
            return{
                ...state,
                show_SellerCaseDetails:true,
                idPedido:action.payload,
            }
        case HIDE_OPEN_MODAL_SELLER_CASE_DETAILS:
            return{
                ...state,
                show_SellerCaseDetails:false
            }

        default:
            return state;
        }
    }
export default openCaseReducer 