//1. ACTION TYPES
const SHOW_TRACK_ORDER_MODAL='xcala/orderDetails/SHOW_TRACK_ORDER_MODAL'
//--------------------------------------------------------------------
const HIDE_TRACK_ORDER_MODAL='xcala/orderDetails/HIDE_TRACK_ORDER_MODAL'


//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const openModalTrackOrder=(option,idTrackOrderData)=>{
        if(option===true){
            return{type:SHOW_TRACK_ORDER_MODAL,payload:idTrackOrderData}
        }else{
            return{type:HIDE_TRACK_ORDER_MODAL}
        }
    }
//..................................................................................


//3. REDUCER PRELOADER
const initialState={
    showTrackOrderModal:false,
    idTrackOrderData:null,
}
const trackOrderReducer = (state=initialState, action)=>{
    switch(action.type){
        case SHOW_TRACK_ORDER_MODAL:
            return{
                showTrackOrderModal:true,
                idTrackOrderData:action.payload}
        case HIDE_TRACK_ORDER_MODAL:
            return{
                showTrackOrderModal:false,
                idTrackOrderData:null}
        default:
            return state;
        }
    }
export default trackOrderReducer