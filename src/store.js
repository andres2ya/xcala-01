import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { reactReduxFirebase, firebaseReducer, getFirebase} from "react-redux-firebase";
import { reduxFirestore, firestoreReducer, getFirestore} from "redux-firestore";
import firebase from "firebase/app";
import "firebase/auth";//para habilitar toda la autenticacion
import "firebase/firestore";
import "firebase/storage"
import authLoginReducer from './ducks/authDucks/authDuckLogin'
import authRecoveryPasswordReducer from './ducks/authDucks/authDuckRecoveryPassword'
import authSignUpReducer from './ducks/authDucks/authDuckSignUp'
import authUpdatePassAndEmailReducer from './ducks/authDucks/authUpdatePassAndEmailDuck'
import handlerErrorsReducer from './ducks/errorsDuck/handleErrors';
import preloaderReducer from './ducks/preloaderDuck/preloaderDuck';
import uploadFileReducer from './ducks/accountDuck/uploadFilesDuck';
import showOrHideApplyStateFilterReducer from './ducks/accountDuck/applyFilterToOrdersDuck';
import trackOrderReducer from './ducks/accountDuck/trackOrderDuck';
import openCaseReducer from './ducks/accountDuck/openCaseDuck';
import supplierSignUpReducer from './ducks/internalXcalaDucks/newSupplierDuck'


//1. Configurando firebase en la aplicacion
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// NOTE:Activar offline persistence
firebase.firestore().enablePersistence()
  .catch(function(err) {
      if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });


//2. Configurando react-redux-firebase
const rrfConfig = {
    userProfile: "users",//Indica la coleccion de firebase donde esta ubicada la informacion de los usuarios para
    useFirestoreForProfile: true,//luego poderla sincronizar con el ID en "firebase.auth.profile"
    attachAuthIsReady:true
    //,logErrors: false,
};

//3. Crear en enhacer del store con compose de redux y firebase
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

//4. Creando reducer unico
const rooReducer = combineReducers({
    //reducers contectados con firebase y firestore
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    //los demas reducers necesarios para la app
    handlerErrorsReducer:handlerErrorsReducer,
    authLoginReducer:authLoginReducer,
    authRecoveryPasswordReducer:authRecoveryPasswordReducer,
    authSignUpReducer:authSignUpReducer,
    authUpdatePassAndEmailReducer:authUpdatePassAndEmailReducer,
    preloaderReducer:preloaderReducer,
    uploadFileReducer:uploadFileReducer,
    showOrHideApplyStateFilterReducer:showOrHideApplyStateFilterReducer,
    trackOrderReducer:trackOrderReducer,
    openCaseReducer:openCaseReducer,
    supplierSignUpReducer:supplierSignUpReducer
});

//5. Creando store con el reducer unico "rooReducer", la inicializacion del estado "initialState", y la composicion de middlewares "thunks, etc"
const initialState ={};
const store=createStoreWithFirebase(
/**Primer Argumento: Reducers */rooReducer,/**Destructuring de todos los reducers, osea que creara el store con todos los reducers contenidos en docks*/
/**Segund Arg: Estado inicial */initialState,                            
                                compose(
                                    reactReduxFirebase(firebase),
                                    applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})
                                    //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                                    )
                                )         
)

//withExtraArgument permite que a todos los thunk se les pase tambien un argumento adicional, en este caso, todos los servicios de firebase y firestore
//De esta forma, del mismo thunk podremos obtener los servicios sin hacer import
export default store;
