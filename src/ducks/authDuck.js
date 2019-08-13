//1. Actions types
const LOGIN_SUCCESS='xcala/auth/SUCCESS'
const LOGIN_ERROR='xcala/auth/ERROR'


//2. Actions Thunks(Permiten retornar funciones)
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


//3. Reducer
const initialState={
    authSuccess:null,
    authError:null,
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
        case LOGIN_ERROR:
            console.log('login error')
            console.log(action.payload)
            return {
                ...state,
                authError:`Login error ${action.payload}`,
                authSuccess:null
            }
        default:
            console.log('login default')
            return state;
    }
}

export default authReducer
