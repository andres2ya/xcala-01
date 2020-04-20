import React, { Component } from 'react'
import './AccountOptionBox.css'
import {Link} from 'react-router-dom'

export default class AccountOptionBox extends Component {
    render() {
        const {withRightCircle,number,backgroundCircleColor,icon,text,url}=this.props
        return (
            <Link to={url}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex align-items-center AccountOptionBox">
                                <div style={{backgroundColor:backgroundCircleColor}} className="AccountOptionBox_circle_icon d-flex justify-content-center align-items-center">
                                    <i className={icon}/>
                                </div>
                                <div className="d-flex align-items-center AccountOptionBox_text">
                                    <div>{text}</div>
                                </div>
                                {
                                    withRightCircle?
                                    <div className="AccountOptionBox_number">{number}</div>
                                    :
                                    <div className="AccountOptionBox_arrow">></div>
                                }
                            </div>
                        </div>
                    </div> 
                </div>
            </Link>
        )
    }
}
