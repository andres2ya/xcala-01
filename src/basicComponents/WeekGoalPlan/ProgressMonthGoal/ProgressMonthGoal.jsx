import React, { Component } from 'react'
import './ProgressMonthGoal.css'
export default class ProgressMonthGoal extends Component {
    render() {
        const {title,labelBar,items}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="ProgressMonthGoal">
                            <div className="ProgressMonthGoal_title">{title}</div>
                            <div style={{height:'7.5px'}} className="progress ProgressMonthGoal_bar">
                                {
                                items.map(item=>
                                    item.isBar?
                                    <div style={item.styleBar} className="progress-bar" role="progressbar" aria-valuenow={item.percent} aria-valuemin="0" aria-valuemax="100"></div>
                                    :
                                    null
                                )
                                }
                            </div>
                            <div className="ProgressMonthGoal_labelBar d-flex justify-content-end">{labelBar}</div>
                                {
                                items.map(item=>
                                <div className="d-flex">
                                    <div className="ProgressMonthGoal_indicator d-flex align-items-center">
                                        <div className="ProgressMonthGoal_indicator_span" style={item.styleIndicator}></div>
                                        <div className="ProgressMonthGoal_indicator_spanText" style={{color:item.styleIndicator.backgroundColor}}>{item.value}</div>
                                    </div>
                                    <div className="ProgressMonthGoal_labelIndicator">{item.label}</div>
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
