import React, { Component } from "react";
import {connect} from 'react-redux';
import './SpinnerInModal.css'

// Se ejecuta una accion que cambia el estado de
// showPreloader (en el reducer de preloader) a true o false.
// Todos los div padres de los componentes tienen la siguiente funcion en su 
// className:
// <div className={`auth loginScreen centerHorizontal ${this.props.showPreloader===true?'preloaderOn':null}`}>
// la cual, cuando 'showPreloader=true' agrega una clase llamada 'preloaderOn'
// y difumina el contendio del componente.

// Asi mismo, cuando 'showPreloader' cambia a true, en la actualizacion del componente Spinner
// se inyecta al elemento con id=overlay, una clase llamada
// overlay on, la cual activa la capa superpuesta.

//  Finalmente, cuando showPreloader cambia a false,
//  tanto la clase 'preloaderOn' como 'overlayOn' se eliminan de sus respectivos componentes. 


class SpinnerInModal extends Component {
  
  render() {
  
    return (
        <div className="sk-fading-circle">
            <div className="sk-circle1 sk-circle"></div>
            <div className="sk-circle2 sk-circle"></div>
            <div className="sk-circle3 sk-circle"></div>
            <div className="sk-circle4 sk-circle"></div>
            <div className="sk-circle5 sk-circle"></div>
            <div className="sk-circle6 sk-circle"></div>
            <div className="sk-circle7 sk-circle"></div>
            <div className="sk-circle8 sk-circle"></div>
            <div className="sk-circle9 sk-circle"></div>
            <div className="sk-circle10 sk-circle"></div>
            <div className="sk-circle11 sk-circle"></div>
            <div className="sk-circle12 sk-circle"></div>
        </div>
    );
  }
}

const mapStateToProps=(state)=>({
    showPreloader:state.preloaderReducer.showPreloader
})

// const mapDispatchToProps=()=>{

// }

export default connect(mapStateToProps,null)(SpinnerInModal);
