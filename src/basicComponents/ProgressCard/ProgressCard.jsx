import React, { Component } from 'react'
import './ProgressCard.css'
export default class ProgressCard extends Component {
    render() {
        const {text,value,label,progressBarTitle,percent}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div>
                            <div className="ProgressCard_text_and_label d-flex justify-content-center align-items-center">
                                <div>
                                    <div className="ProgressCard_text d-flex justify-content-center align-items-center">
                                        {text}{value}
                                    </div>
                                    <div className="ProgressCard_label d-flex justify-content-center align-items-center">
                                        {label}
                                    </div>
                                </div>
                            </div>
                            <div className="ProgressCard_bar">
                                <div className="ProgressCard_title d-flex justify-content-end">{progressBarTitle}</div>
                                <div style={{backgroundColor:'#e6e6e6',height:'10px'}} className="progress">
                                    <div className="progress-bar" role="progressbar" style={{width:`${percent}%`,backgroundColor:'#1b1464',height:'10px'}} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
                                        {percent}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
