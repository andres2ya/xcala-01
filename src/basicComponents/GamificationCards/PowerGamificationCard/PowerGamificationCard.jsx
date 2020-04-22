import React, { Component } from 'react'
import './PowerGamificationCard.css'

export default class PowerGamificationCard extends Component {
    render() {
        const {powerImg,firstLineName,secondLineName}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="PowerGamificationCard d-flex">
                            <div className="PowerGamificationCard_img">
                                <img src={powerImg} alt=""/>
                            </div>
                            <div className="PowerGamificationCard_powerName d-flex align-items-center">
                                <div>
                                    <div className="PowerGamificationCard_firstLineName">{firstLineName}</div>
                                    <div className="PowerGamificationCard_secondLineName">{secondLineName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
