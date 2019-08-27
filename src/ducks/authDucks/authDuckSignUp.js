import {saveInLocalStorage} from '../../helpers/localStorage';
//1. ACTION TYPES 
const SIGNUP_SUCCESS='xcala/auth/SIGNUP_SUCCESS'
const SIGNUP_ERROR='xcala/auth/SIGNUP_ERROR'
//----------------------------------------------------------------
const EMAIL_VERIFICATION_SUCCESS='xcala/auth/EMAIL_VERIFICATION_SUCCESS'
const EMAIL_VERIFICATION_ERROR='xcala/auth/EMAIL_VERIFICATION_ERROR'
//----------------------------------------------------------------
const VERY_EMAIL_SUCCESS='xcala/auth/VERY_EMAIL_SUCCESS'
const VERY_EMAIL_ERROR='xcala/auth/VERY_EMAIL_ERROR'
//----------------------------------------------------------------
const ACCEPT_TERMS_AND_CONDITION='xcala/auth/ACCEPT_TERMS_AND_CONDITION'





//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const acceptTermsCondition=(option)=>{
    return{type:ACCEPT_TERMS_AND_CONDITION,payload:option}
}
//----------------------------------------------------------------
export const signUp=(newUser)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase()
        const firestore=getFirestore()
        firebase.auth().createUserWithEmailAndPassword(newUser.emailSignUp,newUser.passwordSignUp)
        .then((res)=>{
            dispatch({type:SIGNUP_SUCCESS});
            dispatch(sendEmailVerify(newUser));
        })
        .catch((err)=>{
            dispatch({type:SIGNUP_ERROR,payload:err})
        })
    }
}
//----------------------------------------------------------------
export const sendEmailVerify=(newUser)=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase()
        firebase.auth().currentUser.sendEmailVerification()
        .then((res)=>{
            dispatch({type:EMAIL_VERIFICATION_SUCCESS,payload:newUser})
        })
        .catch((err)=>{
            dispatch({type:EMAIL_VERIFICATION_ERROR,payload:err})
        })
    }
}
//----------------------------------------------------------------
export const verifyEmail=(code)=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase = getFirebase()
        firebase.auth().applyActionCode(code)
        .then((res)=>{
            dispatch({type:VERY_EMAIL_SUCCESS,payload:res}) 
        })
        .catch((err)=>{
            dispatch({type:VERY_EMAIL_ERROR,payload:err}) 
        })
    }
}





//3. REDUCER AUTH
const initialState={
    msg:null,
    showEmailVerify:false,
    showRegisterButton:false,
    successVerified:true
}
const authSignUpReducer = (state=initialState, action)=>{
    switch(action.type){
        case ACCEPT_TERMS_AND_CONDITION:
            return{
                ...state,
                showRegisterButton:action.payload
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case SIGNUP_SUCCESS:
            var mensage='Usuario creado con exito'
            console.log(mensage)
            return{ 
                ...state,
                msg:mensage,
                showEmailVerify:true
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case SIGNUP_ERROR:
            mensage='ocurrio un problema al crear el usuario' + action.payload
            console.log(mensage)
            return{ 
                ...state,
                msg:mensage,
                showEmailVerify:false
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case EMAIL_VERIFICATION_SUCCESS:
            mensage='Email enviado con exito:' + action.payload
            console.log(mensage)
            saveInLocalStorage('newUser',action.payload)
            return{ 
                ...state,
                msg:mensage
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case EMAIL_VERIFICATION_ERROR:
            mensage='ocurrio un problema al enviar email de verificacion:' + action.payload
            console.log(mensage)
            return{ 
                ...state,
                msg:mensage
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case VERY_EMAIL_SUCCESS:
                mensage='Email vericado con exito'
            return{
                ...state,
                msg:mensage,
                successVerified:true
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case VERY_EMAIL_ERROR:
                mensage='No se pudo verificar el email' + action.payload.message
            return{
                ...state,
                msg:mensage,
                successVerified:false
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        default:
            return state;
    }
}

export default authSignUpReducer
