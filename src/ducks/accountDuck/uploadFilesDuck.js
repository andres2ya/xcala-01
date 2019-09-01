import {showOrHidePreloader} from '../preloaderDuck/preloaderDuck'
//1. ACTION TYPES
const UPLOAD_FILE_SUCCESS='xcala/uploadAccount/UPLOAD_FILE_SUCCESS'
const UPLOAD_FILE_ERROR='xcala/uploadAccount/UPLOAD_FILE_ERROR'
//--------------------------------------------------------------------
const UPDATE_PHOTO_URL_SUCCESS='xcala/uploadAccount/UPDATE_PHOTO_URL_SUCCESS'
const UPDATE_PHOTO_URL_ERROR='xcala/uploadAccount/UPDATE_PHOTO_URL_ERROR'


//2. ACTIONS y THUNK ACTIONS (Permiten retornar funciones)
export const uploadFile=(file,userID)=>{
    return (dispatch,getState,{getFirebase})=>{
        dispatch(showOrHidePreloader(true))
        const firebase=getFirebase();
        const storageRef=firebase.storage().ref(`/fotos/${userID}/${userID}-profile-photo`)
        storageRef.put(file)
        .then((snapshot)=>{
            snapshot.ref.getDownloadURL()
            .then((downloadURL)=>{
                dispatch(showOrHidePreloader(false))
                dispatch({type:UPLOAD_FILE_SUCCESS,payload:downloadURL})
                dispatch(updateUserPhotoURL(downloadURL))
            })
        })
        .catch((err)=>{
            console.log(err)
            dispatch(showOrHidePreloader(false))
            dispatch({type:UPLOAD_FILE_ERROR,payload:err})
        })
    }
}
//..................................................................................
export const updateUserPhotoURL=(downloadURL)=>{
    return(dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase()
        firebase.auth().onAuthStateChanged((user)=>{//forma correcta de usar current user
            if(user){
                firebase.auth().currentUser.updateProfile({
                    photoURL:downloadURL
                })
                .then(res=>{
                    dispatch({type:UPDATE_PHOTO_URL_SUCCESS})
                    window.location.reload(true)
                })
                .catch(err=>{
                    console.log(err)
                    dispatch({type:UPDATE_PHOTO_URL_ERROR,payload:err})

                })
            }else{console.log('usuario no signed in')}
        }) 
    }
}


//3. REDUCER PRELOADER
const initialState={
    errorWhenUpdatingFile:false,
    userPhotoURL:null
}
const uploadFileReducer = (state=initialState, action)=>{
    switch(action.type){
        case UPLOAD_FILE_SUCCESS:
            return{
                ...state,
                errorWhenUpdatingFile:true,
                userPhotoURL:action.payload}
        case UPLOAD_FILE_ERROR:
            return{
                ...state,
                errorWhenUpdatingFile:false}
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        case UPDATE_PHOTO_URL_SUCCESS:
            return{
                ...state,}
        case UPDATE_PHOTO_URL_ERROR:
            return{
                ...state}
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        default:
            return state;
        }
    }
export default uploadFileReducer



