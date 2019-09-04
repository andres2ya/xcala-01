//1. ACTION TYPES
const APPLY_STATE_FILTER_TO_ORDERS='xcala/getUserOrdersDuck/GET_USER_ORDERS_SUCCESS'
const GET_USER_ORDERS_ERROR='xcala/getUserOrdersDuck/GET_USER_ORDERS_ERROR'
//--------------------------------------------------------------------


//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const getUserOrders=(file,userID)=>{
    return (dispatch,getState,{getFirestore})=>{
        dispatch({type:GET_USER_ORDERS_SUCCESS})
    }
}
//..................................................................................


//3. REDUCER PRELOADER
const initialState={
    userOrders:[]
}
const getUserOrdersReducer = (state=initialState, action)=>{
    switch(action.type){
        case GET_USER_ORDERS_SUCCESS:
            console.log('get_user_orders_success')
            return{
                ...state}
        case GET_USER_ORDERS_ERROR:
            return{
                ...state}
        default:
            return state;
        }
    }
export default getUserOrdersReducer