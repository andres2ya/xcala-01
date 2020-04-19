import React, { Component } from 'react'
import './UpFooterSuggestedPrice.css'

export default class UpFooterSuggestedPrice extends Component {
    render() {
        const {suggestedPrice,promo,suggestedProfit}=this.props
        return (
            <div className="sticky-footer_SuggestedPrice">
                <div className="row UpFooterSuggestedPrice">
                    <div className="col-12">
                        <div className="d-flex align-items-center">
                            <div className="UpFooterSuggestedPrice_suggestedPrice">{suggestedPrice}</div>
                            {
                                this.props.promo?
                                <div className="UpFooterSuggestedPrice_promo">{promo}</div>
                                :
                                null
                            }
                        </div>
                        <div className="d-flex">
                            {
                                this.props.promo?
                                <div className="UpFooterSuggestedPrice_oldPrice">$69.000</div>
                                :
                                null
                            }
                            <div className="UpFooterSuggestedPrice_suggestedPrice_label">Precio sugerido</div>
                            <div>|</div>
                            <div className="UpFooterSuggestedPrice_suggestedProfit">{suggestedProfit}</div>
                            <div className="UpFooterSuggestedPrice_suggestedProfit_label">Ganancia sugerida</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
