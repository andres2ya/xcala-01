import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './DownloadPWA.css'
import {addToHomeScreen} from './../../../helpers/addToHomeScreen'
import ButtonAuth from './../../1-Auth-With-cellPhoneNumber/Layouts/ButtonAuth/ButtonAuth'
import EllipsisDownloading from './../../layout/EllipsisDownloading/EllipsisDownloading'

export default class DownloadPWA extends Component {
    state={
        isDownloading:false,
        isDownloaded:false,
    }
    componentDidMount=()=>{
        //NOTE: 5. Listening when app is installed succesfully
        window.onappinstalled=()=>{
            console.log('Desde onappinstalled: La aplicacion se instalo correctamente!')
            window.XcalaWindowVaraible.appInstalled=true
            setTimeout(() => {
                this.setState({isDownloaded:true,isDownloading:false})
            }, 4000);
        }
    }

    addToHomeScreen = async ()=>{
        //NOTE: 4. Usando funcion que lanza el mensaje de google para añadir a home screen
        const resUser = await addToHomeScreen()
        console.log(resUser)
        if(resUser==='accepted'){
            this.setState({isDownloading:true})
        }
    }
    render() {
        const {closeDownloadPWA}=this.props
        const {isDownloading,isDownloaded}=this.state
        return (
            <footer className='sticky-footer' >
                <div className='DownloadPWABox'>
                    <i onClick={(e)=>closeDownloadPWA(e)} className=" cerrarDownloadPWA icon-cancel-circled"></i>
                    <div className='row DownloadPWABoxContent'>
                        <div className="col-12">
                        
                        {(function optionDownload(addToHomeScreen,isDownloading,isDownloaded) {
                            if(isDownloading===false && isDownloaded===false ){
                                return <Download_QuickAccess addToHomeScreen={addToHomeScreen}/>
                            }else if(isDownloading===true){
                                return <Downloading_PWA/>
                            }else{
                                return <Downloaded_PWA/>
                            }
                        })(this.addToHomeScreen,isDownloading,isDownloaded)}

                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}



class Download_QuickAccess extends Component {
  render() {
    const {addToHomeScreen}=this.props
    return (
        <div>
            <div className="row quickAccessRow">
                <div className="col-12">
                    <div className="quickAccess">Accede rapidamente a Xcala</div>
                    <div>desde tu pantalla principal</div>
                </div>
            </div>
            <div className="row crearIconoBotonRow">
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <ButtonAuth style={{width:'auto',padding: '10px 14px 10px 14px', fontSize:'17px'}} texto={'Crear icono de acceso directo'} onClick={(e)=>addToHomeScreen(e)}/>
                </div>
            </div>
            <div className="row continuarConRegistroDesdeWebRow">
                <div className="col-12">
                    <Link to="/signup">
                        <div>Continuar con el registro</div>
                        <div>desde la web</div>
                    </Link>
                </div>
            </div>
        </div>
    );
  }
}


class Downloading_PWA extends Component {
    render() {
      return (
          <div>
              <div className="row quickAccessRow">
                  <div className="col-12">
                      <div className="quickAccess d-flex justify-content-center"><EllipsisDownloading/></div>
                      <div className="quickAccess">Descargando</div>
                  </div>
              </div>
          </div>
      );
    }
  }


  class Downloaded_PWA extends Component {
    render() {
      return (
          <div>
              <div className="row quickAccessRow">
                  <div className="col-12">
                      <div className="quickAccess">xcala se ha descargado</div>
                      <div>exitosamente</div>
                  </div>
              </div>
              <div className="row crearIconoBotonRow">
                  <div className="col-12 d-flex justify-content-center align-items-center">
                      <a href="https://pruebas-2-xcala.firebaseapp.com/" target='_blank'>
                        <ButtonAuth style={{width:'auto',padding: '10px 14px 10px 14px', fontSize:'17px'}} texto={'Abrir xcala App'}/>
                      </a>
                  </div>
              </div>
          </div>
      );
    }
  }

