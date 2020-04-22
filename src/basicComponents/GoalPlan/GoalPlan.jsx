import React, { Component } from 'react'
import './GoalPlan.css';

export default class GoalPlan extends Component {
    render() {
        const {upLabel,upValue,upValueLabel,downLabel,downValue,downValueLabel}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                            <div className="d-flex align-items-center GoalPlan GoalPlan_up">
                                <div className="GoalPlan_up_label">{upLabel}</div>
                                <div className="GoalPlan_up_value d-flex justify-content-end">
                                    <div>
                                        <div>{upValue}</div>
                                        <div className="GoalPlan_up_value_label d-flex justify-content-end">{upValueLabel}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center GoalPlan GoalPlan_down">
                                <div className="GoalPlan_down_label">{downLabel}</div>
                                <div className="GoalPlan_down_value d-flex justify-content-end">
                                    <div>
                                        <div>{downValue}</div>
                                        <div className="GoalPlan_down_value_label d-flex justify-content-end">{downValueLabel}</div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}
