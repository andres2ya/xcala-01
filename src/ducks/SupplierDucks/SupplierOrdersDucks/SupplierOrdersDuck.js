//1. ACTION TYPES LOGIN
const GET_SUPPLIER_ORDERS_SUCCESS='xcala/supplier/orders/GET_SUPPLIER_ORDERS_SUCCESS'
const GET_SUPPLIER_ORDERS_ERROR='xcala/supplier/orders/GET_SUPPLIER_ORDERS_ERROR'

//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const getSupplierOrders=(idSupplier)=>{
    return (dispatch,getState,{getFirebase})=>{
        
    }
}

//3. REDUCER AUTH
const initialState={}
const supplierOrders = (state=initialState, action)=>{
    switch(action.type){
        case GET_SUPPLIER_ORDERS_SUCCESS:
            return{
                ...state
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case GET_SUPPLIER_ORDERS_ERROR:
            return{
                ...state
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        default:
            return state;
        }
    }
export default supplierOrders