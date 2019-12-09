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
                dispatch({type:UPLOAD_FILE_SUCCESS})
                console.log(userID)
                dispatch(setUserPhotoURLInProfile(downloadURL))
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
export const setUserPhotoURLInProfile=(downloadURL)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase()
        firebase.auth().onAuthStateChanged((user)=>{//forma correcta de usar current user
            console.log(user)
            if(user){
                const firestore=getFirestore()
                firestore.collection('users').doc(user.uid).update({
                userPhotoURL:downloadURL
                })
                .then(res=>{
                    dispatch({type:UPDATE_PHOTO_URL_SUCCESS})
                })
                .catch(err=>{
                    console.log(err)
                    dispatch({type:UPDATE_PHOTO_URL_ERROR,payload:err})
                })
            }else{console.log('no user signin')}
        })
    }
}


// export const updateUserPhotoURL=(downloadURL)=>{
//     return(dispatch,getState,{getFirebase})=>{
//         const firebase=getFirebase()
//         firebase.auth().onAuthStateChanged((user)=>{//forma correcta de usar current user
//             if(user){
//                 firebase.auth().currentUser.updateProfile({
//                     photoURL:downloadURL
//                 })
//                 .then(res=>{
//                     dispatch({type:UPDATE_PHOTO_URL_SUCCESS})
//                 })
//                 .catch(err=>{
//                     console.log(err)
//                     dispatch({type:UPDATE_PHOTO_URL_ERROR,payload:err})
//                 })
//             }else{console.log('usuario no signed in')}
//         }) 
//     }
// }


//3. REDUCER PRELOADER
const initialState={
    errorWhenUpdatingFile:false,
    photoURLProfileChanged:false
}
const uploadFileReducer = (state=initialState, action)=>{
    switch(action.type){
        case UPLOAD_FILE_SUCCESS:
            return{
                ...state,
                errorWhenUpdatingFile:false}
        case UPLOAD_FILE_ERROR:
            return{
                ...state,
                errorWhenUpdatingFile:true}
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        case UPDATE_PHOTO_URL_SUCCESS:
            return{
                ...state,
                photoURLProfileChanged:true}
        case UPDATE_PHOTO_URL_ERROR:
            return{
                ...state,
                photoURLProfileChanged:false}
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        default:
            return state;
        }
    }
export default uploadFileReducer



