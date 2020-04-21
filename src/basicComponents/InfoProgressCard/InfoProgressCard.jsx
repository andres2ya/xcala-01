import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './InfoProgressCard.css'

export default class InfoProgressCard extends Component {
    render() {
        const {isEmpty,isRatio,title,value,upValue,downValue,percent,icon,url}=this.props
        return (
            <div style={{width:'50%'}}>
                <div className="row">
                    <div className="col-12">
                        <Link to={url}>
                        <div style={isEmpty?{backgroundColor:'#007bff'}:{backgroundColor:'white'}} className="InfoProgressCard">
                            <div style={isEmpty?{color:'white'}:{color:'#007bff'}} className="InfoProgressCard_title">{title}</div>
                            {
                            isEmpty?
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="InfoProgressCard_iconCircle d-flex justify-content-center align-items-center">
                                    <i className={icon}/>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="InfoProgressCard_value">
                                    {
                                        isRatio?
                                        <div>
                                            <span>{upValue}</span>
                                            {'/'}
                                            <span style={{color:'#999999'}}>{downValue}</span>
                                        </div>
                                        :
                                        <div>
                                            {value}
                                        </div>
                                    }
                                
                                </div>
                                <div className="InfoProgressCard_bar">
                                    <div style={{backgroundColor:'#e6e6e6',height:'7.5px'}} className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width:`${percent}%`,backgroundColor:'#007bff',height:'7.5px'}} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                        </Link>
                    </div>
                </div>
                
            </div>
        )
    }
}
