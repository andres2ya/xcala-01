//1. ACTION TYPES 
const RECOVERY_PASSWORD_SUCCESS='xcala/auth/RECOVERY_PASSWORD_SUCCESS'
const RECOVERY_PASSWORD_ERROR='xcala/auth/RECOVERY_PASSWORD_ERROR'
//----------------------------------------------------------------
const RESET_PASSWORD_SUCCESS='xcala/auth/RESET_PASSWORD_SUCCESS'
const RESET_PASSWORD_ERROR='xcala/auth/RESET_PASSWORD_ERROR'
//----------------------------------------------------------------
const CONFIRM_RESET_PASSWORD_SUCCESS='xcala/auth/CONFIRM_RESET_PASSWORD_SUCCESS'
const CONFIRM_RESET_PASSWORD_ERROR='xcala/auth/CONFIRM_RESET_PASSWORD_ERROR'





//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const recoveryPassword=(email)=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase()
        firebase.auth().sendPasswordResetEmail(email)
        .then((res)=>{
            dispatch({type:RECOVERY_PASSWORD_SUCCESS,payload:res})
        })
        .catch((err)=>{
            dispatch({type:RECOVERY_PASSWORD_ERROR,payload:err})
        })
    }
}
//----------------------------------------------------------------
export const resetPassword=(code)=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase()
        firebase.auth().verifyPasswordResetCode(code)
        .then((res) =>{
            dispatch({type:RESET_PASSWORD_SUCCESS})
        })
        .catch((err) =>{
            dispatch({type:RESET_PASSWORD_ERROR,payload:err})
        })
    }
}
//----------------------------------------------------------------
export const confirmNewPassword=(code,NewPass)=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase()
        firebase.auth().confirmPasswordReset(code,NewPass)
        .then((res)=>{
            dispatch({type:CONFIRM_RESET_PASSWORD_SUCCESS})
        })
        .catch((err)=>{
            dispatch({type:CONFIRM_RESET_PASSWORD_ERROR,payload:err})
        })
    }
}





//3. REDUCER AUTH
const initialState={
    ShowFormResetPassword:false,
    msg:null,
    emailHasBeenSent:undefined
}
const authRecoveryPasswordReducer = (state=initialState, action)=>{
    switch(action.type){
        case RECOVERY_PASSWORD_SUCCESS:
            console.log(`Email enviado:Porfavor revisar email con instrucciones. ${action.payload}`)
            return{
                ...state,
                emailHasBeenSent:true,
                msg:'¡Email enviado! Revisa tu bandeja de entrada o spam.'
            }
        //------------------------------------------------------------------
        case RECOVERY_PASSWORD_ERROR:
            console.log(`No ha sido posible enviar email de seteo. ${action.payload}`)
            return{
                ...state,
                emailHasBeenSent:false,
                msg:'Email incorrecto. Intenta nuevamente.'
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case RESET_PASSWORD_SUCCESS:
            console.log('Mostrando form de reset password')
            return {
                ...state,
                ShowFormResetPassword:true
            }
        //------------------------------------------------------------------
        case RESET_PASSWORD_ERROR:
            console.log('No se pudo mostrar el form de reset password')
            return{ 
                ...state,
                ShowFormResetPassword:false
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case CONFIRM_RESET_PASSWORD_SUCCESS:
            var mensage='Se confirmo el cambio de pass'
            console.log(mensage)
            return{ 
                ...state,
                msg:mensage
            }
        //------------------------------------------------------------------
        case CONFIRM_RESET_PASSWORD_ERROR:
            mensage='No se pudo cambiar la constraseña'
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

export default authRecoveryPasswordReducer





