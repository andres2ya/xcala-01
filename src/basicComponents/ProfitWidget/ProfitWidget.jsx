import React, { Component } from 'react'
import './ProfitWidget.css'

export default class ProfitWidget extends Component {
    render() {
        const {backgroundColorText,backgroundColorValue,simbol,text,value,finalLittleText,finalLittleTextColor}=this.props
        return (
            <div className="container ProfitWidget">
                <div className="row">
                    <div className="col-12 d-flex">
                        <div style={{backgroundColor:backgroundColorText}} className="d-flex align-items-center ProfitWidget_boxLeft">
                            <div className="d-flex ProfitWidget_text">
                                <span style={{marginRight:'2px'}}>{simbol}</span>{text}
                            </div>
                        </div>
                        <div style={{backgroundColor:backgroundColorValue}} className="d-flex align-items-center ProfitWidget_boxRight">
                            <div className="d-flex ProfitWidget_value">
                                <input defaultValue={value} type="text"/>
                                <i className="icon-edit-pencil-10px"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div style={{color:finalLittleTextColor}} className="col-12 d-flex align-items-start ProfitWidget_finalLittleText">
                        {finalLittleText}
                    </div>
                </div>
            </div>
        )
    }
}




class ProfitWidgetBak extends Component {
    render() {
        const {backgroundColorText,backgroundColorValue,simbol,text,value,finalLittleText,finalLittleTextColor}=this.props
        return (
            <div className="container ProfitWidget">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex ProfitWidget_box">
                            <div style={{backgroundColor:backgroundColorText}} className="ProfitWidget_text">
                                <span style={{marginRight:'2px'}}>{simbol}</span>{text}
                            </div>
                            <div style={{backgroundColor:backgroundColorValue}} className="d-flex ProfitWidget_value">
                                <input defaultValue={value} type="text"/>
                                <i className="icon-edit-pencil-10px"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div style={{color:finalLittleTextColor}} className="col-12 d-flex align-items-start ProfitWidget_finalLittleText">
                        {finalLittleText}
                    </div>
                </div>
            </div>
        )
    }
}
