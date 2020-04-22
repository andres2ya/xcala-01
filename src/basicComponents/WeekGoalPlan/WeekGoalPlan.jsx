import React, { Component } from 'react'
import './WeekGoalPlan.css'

export default class WeekGoalPlan extends Component {
    render() {
        const {upLabel,downValueLeft,downValueLabelLeft,downValueRight,downValueLabelRight}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="WeekGoalPlan">
                            <div className="d-flex align-items-center WeekGoalPlan_up">
                                <div className="WeekGoalPlan_up_label">{upLabel}</div>
                            </div>
                            <div className="d-flex align-items-end WeekGoalPlan_down">
                                <div className="WeekGoalPlan_down_value_left d-flex justify-content-center align-items-end">
                                    <div>
                                        <div className="d-flex justify-content-center">
                                            <input defaultValue={downValueLeft}/>
                                        </div>
                                        <div className="WeekGoalPlan_down_value_label_left d-flex justify-content-center align-items-end">{downValueLabelLeft}</div>
                                    </div>
                                </div>
                                <div className="WeekGoalPlan_down_value_right d-flex justify-content-center align-items-end">
                                    <div>
                                        <div>{downValueRight}</div>
                                        <div className="WeekGoalPlan_down_value_label_right d-flex justify-content-center align-items-end">{downValueLabelRight}</div>
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
