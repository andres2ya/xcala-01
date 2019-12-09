//1. ACTION TYPES LOGIN
const SHOW_PRELOADER='xcala/preloader/SHOW_PRELOADER'
//-----------------------------------------------------
const HIDE_PRELOADER='xcala/preloader/HIDE_PRELOADER'


//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const showOrHidePreloader=(option)=>{
    if(option===true){
        return {type:SHOW_PRELOADER}
    }else{
        return {type:HIDE_PRELOADER}
    }
}


//3. REDUCER PRELOADER
const initialState={
    showPreloader:false
}
const preloaderReducer = (state=initialState, action)=>{
    switch(action.type){
        case SHOW_PRELOADER:
            return{
                ...state,
                showPreloader:true}
        case HIDE_PRELOADER:
            return{
                ...state,
                showPreloader:false}
        default:
            return state;
        }
    }
export default preloaderReducer