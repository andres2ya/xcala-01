//1. ACTION TYPES
const SHOW_APPLY_STATE_FILTER_TO_ORDERS='xcala/orderDetails/SHOW_APPLY_STATE_FILTER_TO_ORDERS'
//--------------------------------------------------------------------
const HIDE_APPLY_STATE_FILTER_TO_ORDERS_CLOSE='xcala/orderDetails/HIDE_APPLY_STATE_FILTER_TO_ORDERS_CLOSE'
//--------------------------------------------------------------------
const HIDE_APPLY_STATE_FILTER_TO_ORDERS='xcala/orderDetails/HIDE_APPLY_STATE_FILTER_TO_ORDERS'
//--------------------------------------------------------------------
const HIDE_APPLY_STATE_FILTER_TO_ORDERS_REMOVE_FILTER='xcala/orderDetails/HIDE_APPLY_STATE_FILTER_TO_ORDERS_REMOVE_FILTER'


//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const applyStateFilterToOrders=(option,orderState,cerrarModal)=>{
    if(option===true){
        return {type:SHOW_APPLY_STATE_FILTER_TO_ORDERS}
    }else{
        if(cerrarModal===true){
            return {type:HIDE_APPLY_STATE_FILTER_TO_ORDERS_CLOSE}
            
        }else if(orderState!=='removerFiltro'){
            return {type:HIDE_APPLY_STATE_FILTER_TO_ORDERS,payload:orderState}
        
        }else{
            return {type:HIDE_APPLY_STATE_FILTER_TO_ORDERS_REMOVE_FILTER,payload:undefined}
        }
    }
    
}
//..................................................................................

//3. REDUCER PRELOADER
const initialState={
    showApplyStateFilterToOrdersModal:false,
    selectedOrderState:undefined,
    activeFilterByOrderState:false
}
const showOrHideApplyStateFilterReducer = (state=initialState, action)=>{
    switch(action.type){
        case SHOW_APPLY_STATE_FILTER_TO_ORDERS:
            return{
                ...state,
                showApplyStateFilterToOrdersModal:true}

        case HIDE_APPLY_STATE_FILTER_TO_ORDERS:
            return{
                showApplyStateFilterToOrdersModal:false,
                selectedOrderState:action.payload,
                activeFilterByOrderState:true}

        case HIDE_APPLY_STATE_FILTER_TO_ORDERS_CLOSE:
            return{
                ...state,
                showApplyStateFilterToOrdersModal:false,
                }

        case HIDE_APPLY_STATE_FILTER_TO_ORDERS_REMOVE_FILTER:
            return{
                showApplyStateFilterToOrdersModal:false,
                selectedOrderState:action.payload,
                activeFilterByOrderState:false}
        default:
            return state;
        }
    }
export default showOrHideApplyStateFilterReducer
