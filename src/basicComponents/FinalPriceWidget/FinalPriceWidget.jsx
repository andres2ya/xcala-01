import React, { Component } from 'react'
import './FinalPriceWidget.css'

export default class FinalPriceWidget extends Component {
    render() {
        const {backgroundColorBox,simbol,text,value,finalLittleText,finalLittleTextColor}=this.props
        return (
            <div className="container FinalPriceWidget">
                <div className="row">
                    <div className="col-12">
                        <div style={{backgroundColor:backgroundColorBox}}  className="d-flex align-items-center FinalPriceWidget_box">
                            <div className="FinalPriceWidget_text">
                                <span style={{marginRight:'2px'}}>{simbol}</span>{text}
                            </div>
                            <div className="d-flex FinalPriceWidget_value">
                                {value}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div style={{color:finalLittleTextColor}} className="col-12 d-flex align-items-start FinalPriceWidget_finalLittleText">
                        {finalLittleText}
                    </div>
                </div>
            </div>
        )
    }
}
