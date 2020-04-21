import React, { Component } from 'react'
import './MiniWidgetsToDonut.css'

export default class MiniWidgetsToDonut extends Component {
    render() {
        const {mode,text,value,label,level,points,percent,tail,icon}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        {((mode)=>{
                            switch (mode) {
                                case 'onlyText':
                                    return <MiniWidgetsToDonut_text_and_label text={text} value={value} label={label} />
                                case 'textWidgets':
                                    return(
                                        <div>
                                            <MiniWidgetsToDonut_text_and_label text={text} value={value} label={label} icon={icon} />  
                                            <MiniWidgetsToDonut_widgets level={level} points={points} percent={percent} tail={tail}/>
                                        </div>
                                    )
                                case 'onlyWidgets':
                                    return <MiniWidgetsToDonut_widgets level={level} points={points} percent={percent} tail={tail}/>
                                default:
                                    break;
                            }
                        })(mode)}
                    </div>
                </div>
                
            </div>
        )
    }
}


export class MiniWidgetsToDonut_text_and_label extends Component {
  render() {
    const {text,value,label,icon}=this.props
    return (
        <div className="MiniWidgetsToDonut_text_and_label d-flex justify-content-center align-items-center">
            <div>
                <div className="MiniWidgetsToDonut_text d-flex justify-content-center align-items-center">
                    {text}{value}
                </div>
                <div className="MiniWidgetsToDonut_label d-flex justify-content-center align-items-center">
                    {label}
                </div>
            </div>
            {icon?<div className="MiniWidgetsToDonut_icon"><i className={icon}/></div>:null}
        </div>
    );
  }
}


export class MiniWidgetsToDonut_widgets extends Component {
  render() {
    const {level,points,percent,tail}=this.props
    return (
        <div className="MiniWidgetsToDonut_widgets d-flex justify-content-center align-items-center">
            <div className={`MiniWidgetsToDonut_level MiniWidgetsToDonut_level_${level} d-flex justify-content-center align-items-center`}>
                <span></span>{'Nivel '}{level}
            </div>
            <div className="MiniWidgetsToDonut_points_or_percent d-flex justify-content-center align-items-center">
                {points}{percent}{tail}
            </div>
        </div>
    );
  }
}


