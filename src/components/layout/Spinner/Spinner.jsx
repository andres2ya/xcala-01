import React, { Component } from "react";
import {connect} from 'react-redux';
import './Spinner.css'

// TODO: Implementar toda la logica del spinner 
// TODO: Cuando el spinner aparece, algunos elementos del DOM como
// los textos, botones, entre otros
// deben quedar con filtro blur:
// filter: blur(2px);
// -webkit-filter: blur(2px);
class Spinner extends Component {
  state = {
    showPreloader: true
  };

  openPreloader = () => {
    this.setState({
      showPreloader: true
    });
  };

  closePreloader = () => {
    this.setState({
      showPreloader: false
    });
  };
  render() {

    if(!this.state.showPreloader)
    return (null)
    
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

const mapStateToProps=()=>{

}

const mapDispatchToProps=()=>{

}

export default connect(mapStateToProps,mapDispatchToProps)(Spinner);
