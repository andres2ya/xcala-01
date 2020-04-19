import React, { Component } from 'react'
import './SharingButton.css'
export default class SharingButton extends Component {
    state={
        loadingSharing:false
    }

    componentWillUnmount=()=>{
        clearTimeout(this.loadingTime)
    }

    loading=()=>{
        clearTimeout(this.loadingTime)
        this.setState({loadingSharing:!this.state.loadingSharing})
        this.loadingTime=setTimeout(() => {
            this.setState({loadingSharing:!this.state.loadingSharing})
        },3000)
    }
    render() {
        return (
            <button className="SharingButton" onClick={this.loading} style={this.state.loadingSharing?{opacity:0.5}:{opacity:1}}>
                <i className="icon-whatsapp"></i>
                {this.state.loadingSharing?'Cargando...':'Compartir'}
            </button>  
        )
    }
}
