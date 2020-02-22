import React, { Component } from 'react'
import './SuccessScreen.css'
import AnimatedCheck from './AnimatedCheck/AnimatedCheck'

export default class SuccessScreen extends Component {
    
    componentDidMount=()=>{
        let theme_color='#22c36d'
        this.metaTagThemeColor=document.querySelector("meta[name=theme-color]")
        this.prevThemeColor=this.metaTagThemeColor.getAttribute("content")
        this.metaTagThemeColor.setAttribute("content", theme_color);
        console.log('fin de montar',this.metaTagThemeColor.getAttribute("content"))
    }
    componentWillUnmount=()=>{
        this.metaTagThemeColor.setAttribute("content", this.prevThemeColor);
        console.log('fin de desmontar',this.metaTagThemeColor.getAttribute("content"))
    }
    
    goQuestionnaire=()=>{
        window.location.href=`/questionnaire${this.props.userName}`
    }

    render() {
        return (
            <div className="SuccessScreenContainer container-fluid">
                <div className="row SuccessScreenContainer_AnimateCheck">
                    <div className="col-12">
                        <div className="d-flex justify-content-center">
                            <AnimatedCheck/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="shadowAnimatedCheck"/>
                        </div>
                    </div>
                </div>

                <div className="row SuccessScreenContainer_MsgSuccess">
                    <div className="col-12">
                            <div className="SuccessScreenContainer_MsgSuccess_userName d-flex justify-content-center">{'Andres Yaya'}</div>
                            <div className="d-flex justify-content-center">tu cuenta fue creada con exito!</div>
                            <div style={{fontSize:'15px'}} className="d-flex justify-content-center">Mejora tu experiencia en xcala completando tus datos.</div>
                    </div>
                </div>

                {/* <div className="row SuccessScreenContainer_bestExperience">
                    <div className="col-12 d-flex justify-content-center">
                        <div>Puedes <span>mejorar tu experiencia</span> completando tus datos.</div>
                    </div>
                </div>

                <div className="row SuccesScreenContainer_buttons">
                    <div className="col-12">
                        <div onClick={this.goQuestionnaire} className="SuccesScreenContainer_button">Mejorar mi experiencia</div>
                        <div className="SuccesScreenContainer_button">Comenzar</div>
                    </div>
                </div> */}
            </div>
        )
    }
}
