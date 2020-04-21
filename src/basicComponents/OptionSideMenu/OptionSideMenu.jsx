import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './OptionSideMenu.css'

export default class OptionSideMenu extends Component {
    render() {
        const {withRightCircle,number,backgroundCircleColor,icon,text,url}=this.props
        return (
            <Link to={url}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex align-items-center OptionSideMenu">
                                <div style={{backgroundColor:backgroundCircleColor}} className="OptionSideMenu_circle_icon d-flex justify-content-center align-items-center">
                                    <i className={icon}/>
                                </div>
                                <div className="d-flex align-items-center OptionSideMenu_text">
                                    <div>{text}</div>
                                </div>
                                {
                                    withRightCircle?
                                    <div className="OptionSideMenu_number">{number}</div>
                                    :
                                    <div className="OptionSideMenu_arrow">></div>
                                }
                            </div>
                        </div>
                    </div> 
                </div>
            </Link>
        )
    }
}
