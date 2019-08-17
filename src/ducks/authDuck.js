import {saveState} from '../helpers/localStorage'
//1. ACTION TYPES 
const LOGIN_SUCCESS='xcala/auth/LOGIN_SUCCESS'
const LOGIN_ERROR='xcala/auth/LOGIN_ERROR'
//----------------------------------------------------------------
const LOGOUT_SUCCESS='xcala/auth/LOGOUT_SUCCESS'
const LOGOUT_ERROR='xcala/auth/LOGOUT_ERROR'
//----------------------------------------------------------------
const KEEP_SESION_SUCCESS='xcala/auth/KEEP_SESION_SUCCESS'
const KEEP_SESION_ERROR='xcala/auth/KEEP_SESION_ERROR'
//----------------------------------------------------------------
const RECOVERY_PASSWORD_SUCCESS='xcala/auth/RECOVERY_PASSWORD_SUCCESS'
const RECOVERY_PASSWORD_ERROR='xcala/auth/RECOVERY_PASSWORD_ERROR'
//----------------------------------------------------------------
const RESET_PASSWORD_SUCCESS='xcala/auth/RESET_PASSWORD_SUCCESS'
const RESET_PASSWORD_ERROR='xcala/auth/RESET_PASSWORD_ERROR'
//----------------------------------------------------------------
const CONFIRM_RESET_PASSWORD_SUCCESS='xcala/auth/CONFIRM_RESET_PASSWORD_SUCCESS'
const CONFIRM_RESET_PASSWORD_ERROR='xcala/auth/CONFIRM_RESET_PASSWORD_ERROR'
//----------------------------------------------------------------
const SIGNUP_SUCCESS='xcala/auth/SIGNUP_SUCCESS'
const SIGNUP_ERROR='xcala/auth/SIGNUP_ERROR'
//----------------------------------------------------------------
const EMAIL_VERIFICATION_SUCCESS='xcala/auth/EMAIL_VERIFICATION_SUCCESS'
const EMAIL_VERIFICATION_ERROR='xcala/auth/EMAIL_VERIFICATION_ERROR'
//----------------------------------------------------------------
const VERY_EMAIL_SUCCESS='xcala/auth/VERY_EMAIL_SUCCESS'
const VERY_EMAIL_ERROR='xcala/auth/VERY_EMAIL_ERROR'
//----------------------------------------------------------------
const UPDATE_PASSWORD_SUCCESS='xcala/auth/UPDATE_PASSWORD_SUCCESS'
const UPDATE_PASSWORD_ERROR='xcala/auth/UPDATE_PASSWORD_ERROR'
//----------------------------------------------------------------
const UPDATE_EMAIL_SUCCESS='xcala/auth/UPDATE_EMAIL_SUCCESS'
const UPDATE_EMAIL_ERROR='xcala/auth/UPDATE_EMAIL_ERROR'
//----------------------------------------------------------------
const SEND_VERIFY_EMAIL_SUCCESS='xcala/auth/SEND_VERIFY_EMAIL_SUCCESS'
const SEND_VERIFY_EMAIL_ERROR='xcala/auth/SEND_VERIFY_EMAIL_ERROR'





//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const signIn=(credentials)=>{
    return (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )
        .then((res)=>{
            dispatch({type:LOGIN_SUCCESS,payload:res});
        })
        .catch((err)=>{
            dispatch({type:LOGIN_ERROR,payload:err})
        })
    }
}
//----------------------------------------------------------------
export const keepSesion=(option)=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();

        if(option==='Si'){
            console.log('Persistence = LOCAL')
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then((res)=>{
                    dispatch({type:KEEP_SESION_SUCCESS})
                })
                .catch((err)=>{
                    dispatch({type:KEEP_SESION_ERROR,payload:err})
                })
        }else if(option==='No'){
            console.log('Persistence = NONE')
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
                .then((res)=>{
                    dispatch({type:KEEP_SESION_SUCCESS})
                })
                .catch((err)=>{
                    dispatch({type:KEEP_SESION_ERROR,payload:err})
                })
        }else{
            console.log('Persistence = NULL')
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
//----------------------------------------------------------------
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
//----------------------------------------------------------------
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
//----------------------------------------------------------------
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
    authSuccess:null,
    authError:null,
    ShowFormResetPassword:false,
    msg:null,
    isAuth:null,
    newEmail:null
}
const authReducer = (state=initialState, action)=>{
    switch(action.type){
        case LOGIN_SUCCESS:
            console.log('login success')
            console.log(action.payload)
            return {
                ...state,
                authSuccess:`Login success ${action.payload}`,
                authError:null
            }
        //------------------------------------------------------------------
        case LOGIN_ERROR:
            console.log('login error')
            console.log(action.payload)
            return {
                ...state,
                authError:`Login error ${action.payload}`,
                authSuccess:null
            }
        //------------------------------------------------------------------
        case KEEP_SESION_SUCCESS:
            console.log('local persistence ok')
            return{
                ...state
            }
        //-----------------------------------------------------------------
        case KEEP_SESION_ERROR:
            console.log('local persistence bad')
            console.log(action.payload)
            return{
                ...state
            }
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
        case RECOVERY_PASSWORD_SUCCESS:
            console.log(`Email enviado:Porfavor revisar email con instrucciones. ${action.payload}`)
            return{
                ...state
            }
        //------------------------------------------------------------------
        case RECOVERY_PASSWORD_ERROR:
            console.log(`No ha sido posible enviar email de seteo. ${action.payload}`)
            return{
                ...state
            }
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
        case CONFIRM_RESET_PASSWORD_SUCCESS:
            var mensage='Se confirmo el cambio de pass'
            console.log(mensage)
            return{ 
                ...state,
                confirmNewPass:true,
                msg:mensage
            }
        //------------------------------------------------------------------
        case CONFIRM_RESET_PASSWORD_ERROR:
            mensage='No se pudo cambiar la constraseña'
            console.log(mensage)
            return{ 
                ...state,
                confirmNewPass:false,
                msg:mensage
            }
        //------------------------------------------------------------------
        case SIGNUP_SUCCESS:
            mensage='Usuario creado con exito'
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
            
        default:
            console.log('login default')
            return state;
    }
}

export default authReducer
