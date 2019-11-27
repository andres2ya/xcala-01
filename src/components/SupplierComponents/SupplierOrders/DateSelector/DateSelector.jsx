import React, { Component } from 'react'
import './DateSelector.css'

class DateSelector extends Component {
    render() {
        return (
            <div className="col-12">
                <div className="row DateSelectorSpacer"></div>
                <div className="row">
                    <div className="col-12 d-flex align-items-center">
                        <div className="DateSelectorTitle">Pedidos semana</div>
                        <div className="DateSelectorSpacerBetweenArrow"/>
                        <div className="DateSelectorArrow">
                            <i className="icon-caret-left centerVerticalAndHorizontal"></i>
                        </div>
                        <div className="DateSelector-Date">18-24 Nov 19</div>
                    </div>
                </div>
                
                <div className="row DateSelectorSpacerLess"></div>

                <div className="row">
                    <div className="col-12">
                        <div className="DateSelectorParagraph">
                            Aca puedes ver los pedidos semanales discriminados por dia y referencia.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default  DateSelector