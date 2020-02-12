import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {addToHomeScreen} from './../../helpers/addToHomeScreen';
import DownloadingComponent from '../DownloadingComponent/DownloadingComponent';

export default class MainProductsPage extends Component {
    state={
        showInstallButton:false,
        showDownloadingApp:false,
    }
    componentDidMount=()=>{
        document.body.removeAttribute('class')
        //NOTE: Si el deferredPrompt existe, por que fue lanzado por Google, entonces mostrar boton descargar, de lo contrario, no se mostrara.
        //Tampoco se mostrara si deferredPrompt es undefined debido a que Google no lanzo el evento ya que el usuario ya ha instalado la App
        if(window.XcalaWindowVaraible.deferredPrompt!==undefined){
            this.setState({showInstallButton:true})
        }
    }
    addToHomeScreen = async ()=>{
        const resUser = await addToHomeScreen()
        console.log(resUser)
        if(resUser==='accepted'){
            this.setState({showDownloadingApp:true})
        }
    }
    render() {
        const {showDownloadingApp}=this.state
        if(showDownloadingApp===true){
            return(
                <DownloadingComponent/>
            )
        }
        return (
            <div>
                Hola desde main productsPage
                <Link to="/my-account">
                    <button>Ir a mi cuenta</button>
                </Link>

                {/* NOTE: Este funciona para redirigir al PWA desde el browser!!! */}
                <a href="https://pruebas-2-xcala.firebaseapp.com/" target='_blank'>open PWA</a>


                {
                this.state.showInstallButton?
                <div>
                    <div className="row">
                        <div style={{textAlign:'center'}} className="col-12 f-lex justify-content-center">
                            <p>Mejora la experiencia descargando la App de Xcala</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 f-lex justify-content-center">
                            <button onClick={this.addToHomeScreen}>Descargar App</button>
                        </div>
                    </div>
                </div>
                :
                null   
                }
            </div>
        )
    }
}
