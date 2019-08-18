import {saveState} from '../helpers/localStorage'
//1. ACTION TYPES 
const UPDATE_PASSWORD_SUCCESS='xcala/auth/UPDATE_PASSWORD_SUCCESS'
const UPDATE_PASSWORD_ERROR='xcala/auth/UPDATE_PASSWORD_ERROR'
//----------------------------------------------------------------
const UPDATE_EMAIL_SUCCESS='xcala/auth/UPDATE_EMAIL_SUCCESS'
const UPDATE_EMAIL_ERROR='xcala/auth/UPDATE_EMAIL_ERROR'
//----------------------------------------------------------------
const SEND_VERIFY_EMAIL_SUCCESS='xcala/auth/SEND_VERIFY_EMAIL_SUCCESS'
const SEND_VERIFY_EMAIL_ERROR='xcala/auth/SEND_VERIFY_EMAIL_ERROR'





//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const changePassword=(currentPass,newPass)=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase()

        firebase.auth().signInWithEmailAndPassword(firebase.auth().currentUser.email,currentPass)
        .then((res)=>{
            firebase.auth().currentUser.updatePassword(newPass)
            .then((res)=>{
                dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:res})
            })
            .catch((err)=>{
                dispatch({type:UPDATE_PASSWORD_ERROR,payload:err})
            })
        })
        .catch((err)=>{
            const ms='Contraseña actual incorrecta o no ingresada'
            var error=ms+' '+err
            dispatch({type:UPDATE_PASSWORD_ERROR,payload:error})
        })

    }
}
//----------------------------------------------------------------
export const changeEmail=(newEmail)=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase()
        firebase.auth().onAuthStateChanged((user)=>{//forma correcta de usar current user
            if(user){
                firebase.auth().currentUser.updateEmail(newEmail)
                .then((res)=>{
                    dispatch({type:UPDATE_EMAIL_SUCCESS,payload:res})
                    localStorage.removeItem('state')
                })
                .catch((err)=>{
                    dispatch({type:UPDATE_EMAIL_ERROR,payload:err})
                })
            }else{console.log('usuario no signed in')}
        })
    }
}
//----------------------------------------------------------------
export const sendVerificationToChangeEmail=(newEmail)=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase()
        let isAuth=firebase.auth().currentUser.emailVerified
        let TheNewEmail=newEmail
        
        console.log('desde ActionCreator:'+isAuth+':'+newEmail)

        firebase.auth().currentUser.sendEmailVerification()
        .then((res)=>{
            dispatch({type:SEND_VERIFY_EMAIL_SUCCESS, isAuth:isAuth , newEmail:TheNewEmail})
        })
        .catch((err)=>{
            dispatch({type:SEND_VERIFY_EMAIL_ERROR , payload:err})
        })
    }
}



//3. REDUCER AUTH
const initialState={
    msg:null,
    isAuth:null,
    newEmail:null
}
const authUpdatePassAndEmailReducer = (state=initialState, action)=>{
    switch(action.type){
        case UPDATE_PASSWORD_SUCCESS:
            mensage='Se actualizo tu contraseña con exito' + action.payload
            console.log(mensage)
            return{
                ...state,
                msg:mensage
            }
        //------------------------------------------------------------------
        case UPDATE_PASSWORD_ERROR:
                mensage='No se pudo actualizar tu contraseña'+' '+ action.payload
                console.log(mensage)
            return{
                ...state,
                msg:mensage
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case UPDATE_EMAIL_SUCCESS:
                mensage='Se actualizo tu email con exito' + action.payload
                console.log(mensage)
            return{
                ...state,
                msg:mensage
            }
        //------------------------------------------------------------------
        case UPDATE_EMAIL_ERROR:
                mensage='No se pudo actualizar tu email' + action.payload.message
                console.log(mensage)
            return{
                ...state,
                msg:mensage
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case SEND_VERIFY_EMAIL_SUCCESS:

                console.log('desde reducer:'+action.isAuth+':'+action.newEmail)
                let newState = {
                    ...state,
                    msg:'email de verificacion enviado con exito',
                    isAuth:action.isAuth,
                    newEmail:action.newEmail
                }
                saveState(newState)
            return newState
        //------------------------------------------------------------------    
        case SEND_VERIFY_EMAIL_ERROR:
                mensage='email no se pudo enviar'+' '+action.payload.message
                console.log(mensage)
            return{
                ...state,
                msg:mensage
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        default:
            console.log('login default')
            return state;
    }
}

export default authUpdatePassAndEmailReducer
