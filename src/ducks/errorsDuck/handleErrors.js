import {identifyAndReturnMsgError} from '../../helpers/errorsHandler';
//1. ACTION TYPES LOGIN
const HANDLE_ERROR_MSG='xcala/auth/HANDLE_ERROR_MSG'




//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const handleErrorMsg=(error,retry,tryLogin,from)=>{
    //Traductor de errores "identifyAndReturnMsgError"
    const errorEspañol=identifyAndReturnMsgError(error.code)
    const errorCode=error.code

    const internetError= (function(){
        if(errorCode==='auth/network-request-failed'){
            return true
        }else{
            return false
        }
    })()
    
    if(from==='signIn'){
        return {
            type:HANDLE_ERROR_MSG,
            payload:{errorEspañol:errorEspañol,retry:retry,tryLogin:tryLogin,internetError:internetError}
        }
    }else{
        return {
            type:HANDLE_ERROR_MSG,
            payload:{errorEspañol:errorEspañol}
        }
    }
}




//3. REDUCER AUTH
const initialState={
    errorEspañol:null,
    retry:false,
    tryLogin:false,
    internetError:false
}
const handlerErrorsReducer = (state=initialState, action)=>{
    switch(action.type){
        case HANDLE_ERROR_MSG:
            return{
                ...state,
                retry:action.payload.retry,
                tryLogin:action.payload.tryLogin,
                errorEspañol:action.payload.errorEspañol,
                internetError:action.payload.internetError
            }
        default:
            return state;
        }
    }
export default handlerErrorsReducer