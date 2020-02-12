import React, { Component } from 'react';

export default class DownloadingComponent extends Component {
    state={
        appDownloaded:false,
    }
    componentDidMount=()=>{
        document.body.removeAttribute('class')
        window.onappinstalled=()=>{
            console.log('Desde onappinstalled: La aplicacion se instalo correctamente!')
            setTimeout(() => {
                this.setState({appDownloaded:true})
            }, 5000);
        }
    }

    appDownloaded=()=>{
        this.setState({appDownloaded:true})
    }
        
    render() {
        if(this.state.appDownloaded===true){
            return(
                <div>
                    La aplicacion ha sido descargada exitosamente !
                </div>
            )
        }else{
            return (
                <div> 
                    Se comenzara a descargar la aplicacion...
                    <button onClick={this.appDownloaded}>Ya he descargado la aplicacion!</button>
                </div>
        )}
    }
}