//1. ACTION TYPES 
const SIGNUP_SUCCESS='xcala/auth/SIGNUP_SUCCESS'
const SIGNUP_ERROR='xcala/auth/SIGNUP_ERROR'
//----------------------------------------------------------------
const EMAIL_VERIFICATION_SUCCESS='xcala/auth/EMAIL_VERIFICATION_SUCCESS'
const EMAIL_VERIFICATION_ERROR='xcala/auth/EMAIL_VERIFICATION_ERROR'
//----------------------------------------------------------------
const VERY_EMAIL_SUCCESS='xcala/auth/VERY_EMAIL_SUCCESS'
const VERY_EMAIL_ERROR='xcala/auth/VERY_EMAIL_ERROR'





//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const signUp=(newUser)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase()
        const firestore=getFirestore()
        firebase.auth().createUserWithEmailAndPassword(newUser.email,newUser.password)
        .then((res)=>{
            dispatch({type:SIGNUP_SUCCESS})
            const user =firebase.auth().currentUser
            user.sendEmailVerification()
            .then((res)=>{
                dispatch({type:EMAIL_VERIFICATION_SUCCESS})
            })
            .catch((err)=>{
                dispatch({type:EMAIL_VERIFICATION_ERROR,payload:err})
            })
        })
        .catch((err)=>{
            dispatch({type:SIGNUP_ERROR,payload:err})
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
    msg:null
}
const authSignUpReducer = (state=initialState, action)=>{
    switch(action.type){
        case SIGNUP_SUCCESS:
            var mensage='Usuario creado con exito'
            console.log(mensage)
            return{ 
                ...state,
                msg:mensage
            }
        //------------------------------------------------------------------
        case SIGNUP_ERROR:
            mensage='ocurrio un problema al crear el usuario' + action.payload
            console.log(mensage)
            return{ 
                ...state,
                msg:mensage
            }
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        //------------------------------------------------------------------
        case EMAIL_VERIFICATION_SUCCESS:
            mensage='Email verificado' + action.payload
            console.log(mensage)
            return{ 
                ...state,
                msg:mensage
            }
        //------------------------------------------------------------------
        case EMAIL_VERIFICATION_ERROR:
            mensage='ocurrio un problema al enviar email de verificacion' + action.payload
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
                msg:mensage
            }
        //------------------------------------------------------------------
        case VERY_EMAIL_ERROR:
                mensage='No se pudo verificar el email' + action.payload.message
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

export default authSignUpReducer
