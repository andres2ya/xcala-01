//1. ACTION TYPES
const SHOW_APPLY_STATE_FILTER_TO_ORDERS='xcala/orderDetails/SHOW_APPLY_STATE_FILTER_TO_ORDERS'
//--------------------------------------------------------------------
const HIDE_APPLY_STATE_FILTER_TO_ORDERS='xcala/orderDetails/HIDE_APPLY_STATE_FILTER_TO_ORDERS'


//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const applyStateFilterToOrders=(option,orderState)=>{
    if(option===true){
        return {type:SHOW_APPLY_STATE_FILTER_TO_ORDERS}
    }else{
        return {type:HIDE_APPLY_STATE_FILTER_TO_ORDERS,payload:orderState}
    }
    
}
//..................................................................................


//3. REDUCER PRELOADER
const initialState={
    showApplyStateFilterToOrdersModal:false,
    orderStateFilter:null
}
const showOrHideApplyStateFilterReducer = (state=initialState, action)=>{
    switch(action.type){
        case SHOW_APPLY_STATE_FILTER_TO_ORDERS:
            return{
                ...state,
                showApplyStateFilterToOrdersModal:true}
        case HIDE_APPLY_STATE_FILTER_TO_ORDERS:
            return{
                ...state,
                showApplyStateFilterToOrdersModal:false,
                orderStateFilter:action.payload}
        default:
            return state;
        }
    }
export default showOrHideApplyStateFilterReducer