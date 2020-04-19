import React, { Component } from 'react'
import './NextIncome.css'

export default class NextIncome extends Component {
    render() {
        const {style,text,date,value}=this.props
        return (
            <div className="container">
               <div className="row">
                   <div className="col-12">
                       <div style={style.box} className="NextIncome_box d-flex align-items-center">
                            <div style={{width:'65%'}}>
                                <div style={style.text} className="NextIncome_text">{text}</div>
                                <div style={style.date} className="NextIncome_date">{date}</div>
                            </div>
                            <div style={{width:'35%'}} className="d-flex align-items-center NextIncome_value">
                                <div style={style.value}>{value}</div>
                                <span style={{marginLeft:'auto'}}>></span>
                            </div>
                        </div>
                   </div>
               </div>
            </div>
        )
    }
}
