import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './OnboardingContainer.css'
import logoXcala from './../../../assets/logoXcala_180w_SVG_smaller.svg'
import ButtonLogin from '../../1-Auth-With-cellPhoneNumber/Layouts/ButtonLogin/ButtonLogin';
import ButtonAuth from '../../1-Auth-With-cellPhoneNumber/Layouts/ButtonAuth/ButtonAuth';
import DownloadPWA from '../../10-Footers/DownloadPWA/DownloadPWA';
import {CSSTransition,TransitionGroup} from 'react-transition-group'


export default class OnboardingContainer extends Component {
  state={
    showDownloadingFooter:false,
    isDeferredPromptCharge:false,
    appInstalled:window.XcalaWindowVaraible.appInstalled,
  }
  componentDidMount=()=>{
    if(window.XcalaWindowVaraible.deferredPromptInternal!==null){
      console.log('deferred is charged!')
      this.setState({isDeferredPromptCharge:true})
    }else{
      //NOTE: 3. Listening changes in window.XcalaWindowVaraible.deferredPrompt
      window.XcalaWindowVaraible.listenerDeferredPrompt((val)=>{
        console.log('Se escucho la captura de beforeinstallPrompt!',val)
        this.setState({isDeferredPromptCharge:true})
      })
    }
    //NOTE: 6. Listening changes in window.XcalaWindowVaraible.appInstalled
    window.XcalaWindowVaraible.listenerAppInstalled((val)=>{
      console.log('Se escucho instalaccion del app!',val)
      this.setState({appInstalled:true})
    })

  }

  downloadPWA=(e)=>{
    e.preventDefault()
    this.setState({showDownloadingFooter:!this.state.showDownloadingFooter})
  }

  render() {
    const {isDeferredPromptCharge,appInstalled,showOnboardingContainerComponent}=this.state
    return (
      <div className="OnboardingContainer container-fluid"> 

      <div className="sticky-top">
        <div className="row OnboardingContainer_loginButton">
          <div className="col-12 d-flex justify-content-end">
            <Link to="/login">
              <ButtonLogin onClick={()=>{console.log('ok')}}/>
            </Link>
          </div>
        </div>

        <CSSTransition key={1}in={true}appear={true}timeout={1000}classNames="fade">
          <div className="row">
            <div className="col-12 d-flex justify-content-start">
              <img className="OnboardingContainer_logo" src={logoXcala} alt=""/>
            </div>
          </div>
        </CSSTransition>

        <div className="row">
          <div className="col-12 d-flex justify-content-start">
            <div className="OnboardingContainer_titulo">
            ¡Tu actitud multiplica!
            </div>
          </div>
        </div>
      </div>
        

        {/* TODO: Implementar slider touch basado en :  https://blog.envylabs.com/build-your-own-touch-slider-with-hammerjs-af99665d2869  */}
        <div className="row OnboardingContainer_steps">
          <div className="col-12 d-flex justify-content-center align-items-center">
            x
          </div>
        </div>
        

        <div className="row OnboardingContainer_footerOne">
          <div className="col-12">
            <div className="d-flex justify-content-center align-items-center OnboardingContainer_footerOne_parrafo">
              <p>
                Con Xcala <span>ganas dinero compartiendo miles de productos en whatsapp,</span> redes sociales, familiares y amigos.
              </p>
            </div>
            
            <div className="d-flex  justify-content-center align-items-center">

              {(function optionOnboardingButton(downloadPWA,isDeferredPromptCharge,appInstalled) {
                if(isDeferredPromptCharge===true && appInstalled===false){
                  return <ButtonAuth style={{width:'100%',padding: '10px 20px 10px 20px', fontSize:'20px'}} texto={'Unirme a Xcala'} onClick={downloadPWA}/>
                }else if(isDeferredPromptCharge===false && appInstalled===false){
                  return (
                  <Link to="/signup" >
                    <ButtonAuth style={{width:'100%',padding: '10px 20px 10px 20px', fontSize:'20px'}} texto={'Continuar con el registro'} onClick={()=>console.log('redireccionar de una vez a register ya que no se alcanzo a cargar el deferredPrompt')}/>
                  </Link>
                  )
                }else{
                  return(
                  <a href="https://pruebas-2-xcala.firebaseapp.com/signup" target='_blank'>
                    <ButtonAuth style={{width:'100%',padding: '10px 20px 10px 20px', fontSize:'20px'}} texto={'Continuar con el registro'} onClick={()=>console.log('llevando a la app para continuar con el registro')}/>
                  </a>
                  )
                }
              })(this.downloadPWA,isDeferredPromptCharge,appInstalled)}

            </div>
          </div>
        </div>

        {this.state.showDownloadingFooter?
        <DownloadPWA closeDownloadPWA={this.downloadPWA}/>
        :
        null
        }

      </div>
    );
  }
}
