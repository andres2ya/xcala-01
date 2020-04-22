import React, { Component } from 'react'
import './MissionGamificationCard.css'

export default class MissionGamificationCard extends Component {
    render() {
        const {missionImg,text,callToAction,styleFooter,styleCTA}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="MissionGamificationCard">
                            <div className="MissionGamificationCard_img">
                                <img src={missionImg} alt=""/>
                            </div>
                            <div style={styleFooter} className="MissionGamificationCard_footer d-flex align-items-center justify-content-center">
                                <div className="MissionGamificationCard_text">{text}</div>
                                <div style={styleCTA} className="MissionGamificationCard_CTA">{callToAction}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
