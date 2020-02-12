import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';
import App from "./App";
import * as serviceWorker from './serviceWorker'



store.firebaseAuthIsReady.then(()=>{
  ReactDOM.render(
    <Provider store={store} >
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById("root")
  );
})
console.log('se registrara el SW')
serviceWorker.register();

