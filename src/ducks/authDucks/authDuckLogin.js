import {handleErrorMsg} from '../errorsDuck/handleErrors'
import {showOrHidePreloader} from '../preloaderDuck/preloaderDuck';
//1. ACTION TYPES LOGIN
const LOGIN_SUCCESS='xcala/auth/LOGIN_SUCCESS'
const LOGIN_ERROR='xcala/auth/LOGIN_ERROR'
//----------------------------------------------------------------
const LOGOUT_SUCCESS='xcala/auth/LOGOUT_SUCCESS'
const LOGOUT_ERROR='xcala/auth/LOGOUT_ERROR'
//----------------------------------------------------------------
const KEEP_SESION_SUCCESS='xcala/auth/KEEP_SESION_SUCCESS'
const KEEP_SESION_ERROR='xcala/auth/KEEP_SESION_ERROR'





//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const signIn=(credentials)=>{
    return (dispatch,getState,{getFirebase})=>{
        dispatch(showOrHidePreloader(true))
        const firebase=getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )
        .then((res)=>{
            dispatch({type:LOGIN_SUCCESS,payload:res});
            dispatch(showOrHidePreloader(false))
        })
        .catch((err)=>{
            dispatch({type:LOGIN_ERROR,payload:err});
            dispatch(handleErrorMsg(err,false,true,'signIn'));
            dispatch(showOrHidePreloader(false))
        })
    }
}
//----------------------------------------------------------------
export const keepSesion=(option)=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();

        if(option===true){
            console.log('Persistence = LOCAL')
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(()=>{
                    dispatch({type:KEEP_SESION_SUCCESS,payload:option})
                })
                .catch((err)=>{
                    dispatch({type:KEEP_SESION_ERROR,payload:err})
                })
        }else if(option===false){
            console.log('Persistence = NONE')
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
                .then(()=>{
                    dispatch({type:KEEP_SESION_SUCCESS,payload:option})
                })
                .catch((err)=>{
                    dispatch({type:KEEP_SESION_ERROR,payload:err})
                })
        }
    }
}
//----------------------------------------------------------------
export const logOut=()=>{
    return (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        firebase.auth().signOut()
        .then((res)=>{
            console.log('logout success')
            firebase.logout()
            dispatch({type:LOGOUT_SUCCESS,payload:res});
        })
        .catch((err)=>{
            console.log('logout error')
            dispatch({type:LOGOUT_ERROR,payload:err})
        })
    }
}





//3. REDUCER AUTH
const initialState={
    authSuccess:null,
    errorBool:false,
    keep:false,
    isKeepOptionManuallySet:false
    
}
const authLoginReducer = (state=initialState, action)=>{
    switch(action.type){
        case LOGIN_SUCCESS:
            console.log('login success')
            console.log(action.payload)
            return {
                ...state,
                authSuccess:'Ingreso Exitoso',
                authError:null,
                errorBool:false,
                tryLogin:false
            }
        //------------------------------------------------------------------
        case LOGIN_ERROR:
            console.log('login error')
            console.log(action.payload)
            return {
                ...state,
                authSuccess:null,
                errorBool:true
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case KEEP_SESION_SUCCESS:
            console.log('local persistence ok')
            return{
                ...state,
                keep:action.payload,
                isKeepOptionManuallySet:true
            }
        //-----------------------------------------------------------------
        case KEEP_SESION_ERROR:
            console.log('local persistence bad')
            console.log(action.payload)
            return{
                ...state
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case LOGOUT_SUCCESS:
            console.log('cerrada con exito')
            return{
                ...state,
            }
        //------------------------------------------------------------------
        case LOGOUT_ERROR:
            console.log('cerrada sin exito')
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
export default authLoginReducer