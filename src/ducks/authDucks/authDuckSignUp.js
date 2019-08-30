import {saveInLocalStorage} from '../../helpers/localStorage';
import {handleErrorMsg} from '../errorsDuck/handleErrors'
import {showOrHidePreloader} from '../preloaderDuck/preloaderDuck';

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
//----------------------------------------------------------------
const SAVE_DATA_NEW_USER='xcala/auth/SAVE_DATA_NEW_USER'




//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const acceptTermsCondition=(option)=>{
    return{type:ACCEPT_TERMS_AND_CONDITION,payload:option}
}
//----------------------------------------------------------------
export const saveDataNewUser=(label,data)=>{
    return{type:SAVE_DATA_NEW_USER,label:label,data:data}
}
//----------------------------------------------------------------
export const signUp=(newUser)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        dispatch(showOrHidePreloader(true))
        const firebase=getFirebase()
        const firestore=getFirestore()
        firebase.auth().createUserWithEmailAndPassword(newUser.emailSignUp,newUser.passwordSignUp)
        .then((res)=>{
            firestore.collection('users').doc(res.user.uid).set(newUser)
            .then((res)=>{
                dispatch({type:SIGNUP_SUCCESS});
                dispatch(sendEmailVerify(newUser));
                dispatch(showOrHidePreloader(false))
            })
        })
        .catch((err)=>{
            console.log(err)
            dispatch({type:SIGNUP_ERROR,payload:err})
            dispatch(handleErrorMsg(err))
            dispatch(showOrHidePreloader(false))
        })
    }
}
//----------------------------------------------------------------
export const sendEmailVerify=(newUser)=>{
    return(dispatch,getState,{getFirebase})=>{
        dispatch(showOrHidePreloader(true))
        const firebase=getFirebase()
        firebase.auth().onAuthStateChanged((user)=>{//forma correcta de usar current user
            console.log(user)
            if(user){
                firebase.auth().currentUser.sendEmailVerification()
                .then((res)=>{
                    dispatch({type:EMAIL_VERIFICATION_SUCCESS,payload:newUser})
                    dispatch(showOrHidePreloader(false))
                })
                .catch((err)=>{
                    dispatch({type:EMAIL_VERIFICATION_ERROR,payload:err})
                    dispatch(showOrHidePreloader(false))
                })
            }else{console.log('usuario no signed in')}
        })
        
    }
}
//----------------------------------------------------------------
export const verifyEmail=(code)=>{
    return(dispatch,getState,{getFirebase})=>{
        dispatch(showOrHidePreloader(true))
        const state=getState()
        const firebase = getFirebase()
        firebase.auth().applyActionCode(code)
        .then((res)=>{
            dispatch({type:VERY_EMAIL_SUCCESS,payload:res})
            dispatch(showOrHidePreloader(false))    
        })
        .catch((err)=>{
            dispatch({type:VERY_EMAIL_ERROR,payload:err})
            dispatch(showOrHidePreloader(false)) 
        })
    }
}





//3. REDUCER AUTH
const initialState={
    msg:null,
    showEmailVerify:false,
    showRegisterButton:false,
    successVerified:false,
    newUserData:{
        emailSignUp:'',
        passwordSignUp:'',
        repeatPasswordSignUp:'',
        nombreUsuario:'',
        apellidosUsuario:'',
        fechaNacimientoUsuario:'',
        cedulaUsuario:'',
        ciudadUsuario:'',
        celularUsuario:'',
    }
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
        case SAVE_DATA_NEW_USER:
            return{
                ...state,
                newUserData:{...state.newUserData,[action.label]:action.data}
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
            console.log(mensage+' '+action.payload)
            return{ 
                ...state,
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
