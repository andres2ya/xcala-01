import React, { Component } from 'react'
import './ModalSuccessScreen.css';
import AnimatedCheck from './../AnimatedCheck/AnimatedCheck'
import { zoomIn,zoomOut } from 'react-animations';
import Radium, {StyleRoot} from 'radium'
const styles = {
    zoomIn: {
      animation: 'x 0.2s',
      animationName: Radium.keyframes(zoomIn, 'zoomIn'),
      width:'100vw',
      display:'flex',
      justifyContent:'center'
    },
    zoomOut: {
        animation: 'x 0.2s',
        animationName: Radium.keyframes(zoomOut, 'zoomOut'),
        width:'100vw',
        display:'flex',
        justifyContent:'center'
      },
}
export default class ModalSuccessScreen extends Component {
    state={
        zoom:'zoomIn',
    }
    
    cerrarModal=(e)=>{
        this.setState({zoom:'zoomOut'})
        setTimeout(() => {
            this.props.empezar(e)
        }, 100);
    }

    render() {
        const {zoom}=this.state
        const {userName}=this.props
        let userFirstName=userName.split(' ')[0]
        return (
            <StyleRoot>
                <div style={zoom==='zoomIn'?styles.zoomIn:styles.zoomOut} className="animationBox">
                    <div className="ModalSuccessScreen container">
                        <div className="ModalSuccessScreen_body">
                            <div className="row ModalSuccessScreen_AnimateCheck">
                                <div className="col-12">
                                    <div className="d-flex justify-content-center">
                                        <AnimatedCheck/>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div className="shadowAnimatedCheck"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row ModalSuccessScreen_MsgSuccess">
                                <div className="col-12">
                                        <div className="ModalSuccessScreen_MsgSuccess_userName d-flex justify-content-center">{userFirstName}</div>
                                        <div className="d-flex justify-content-center">tu cuenta fue creada con exito!</div>
                                </div>
                            </div>
                        </div>
                        <div onClick={this.cerrarModal} className="ModalSuccessScreen_whiteButton d-flex justify-content-center align-items-center">Empecemos</div>
                    </div>
                </div>
            </StyleRoot>
        )
    }
}
