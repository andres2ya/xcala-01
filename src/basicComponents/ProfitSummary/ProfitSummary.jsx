import React, { Component } from 'react'
import './ProfitSummary.css'

export default class ProfitSummary extends Component {
    render() {
        const {title,items}=this.props
        return (
            <div className="container ProfitSummary">
                <div className="row">
                    <div className="col-12">
                        
                        <div className="ProfitSummary_box">
                            <div className="ProfitSummary_title">{title}</div> 
                        {items.map(item=>
                            <div className="ProfitSummary_item">
                                <div className="row">
                                    <div className="col-12 d-flex align-items-center"> 
                                        <div style={{width:'65%'}}>
                                            <div className={`ProfitSummary_itemText ${item.text==='Ganancia pagada'?'ProfitSummary_itemText_NEQUI':null}`}>
                                                {item.text}
                                                {
                                                    item.text==='Ganancia pagada'?
                                                    <span className="ProfitSummary_NEQUI">NEQUI</span>
                                                    :
                                                    null
                                                }
                                            </div>
                                            <div className={`ProfitSummary_itemDescription ${item.text==='Ganancia pagada'?'ProfitSummary_itemDescription_NEQUI':null}`}>
                                                {item.description}
                                            </div>
                                        </div>   
                                        <div style={{width:'35%'}} className={`ProfitSummary_itemValue`}>{item.value}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
