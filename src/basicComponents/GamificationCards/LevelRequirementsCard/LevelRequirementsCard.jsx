import React, { Component } from 'react'
import './LevelRequirementsCard.css'
import starIconNoFill from './../../../assets/starIconNoFill.svg'
import starIconFill from './../../../assets/starIconFill.svg'

export default class LevelRequirementsCard extends Component {
    render() {
        const {requirements}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="LevelRequirementsCard">
                            {
                                requirements.map(requirement=>
                                    <div className="d-flex LevelRequirementsCard_card">
                                        {requirement.filled?
                                        <img className="LevelRequirementsCard_img" src={starIconFill} alt=""/>
                                        :
                                        <img className="LevelRequirementsCard_img" src={starIconNoFill} alt=""/>
                                        }
                                        <div className="LevelRequirementsCard_info">
                                            <div className="LevelRequirementsCard_name">{requirement.name}</div>
                                            <div className="LevelRequirementsCard_description">{requirement.description}</div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
