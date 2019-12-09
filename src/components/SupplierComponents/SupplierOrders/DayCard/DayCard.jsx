import React, { Component } from 'react'
import './DayCard.css'

class DayCard extends Component {
    render() {
        return (
            <div className="col-12 DayCard">
                <div className="row">
                    <div className="col-7">
                        <span className="DayCard-titleDay">Miercoles 19/11/2019</span>
                    </div>
                    <div className="col-5 d-flex justify-content-center">
                        <span className="DayCard-stateCard">Sin atender</span>
                    </div>
                </div>
                <div className="row">
                        <DayCardByRef/>
                        <DayCardByRef/>
                        <DayCardByRef/>
                        <DayCardByRef/>
                        <DayCardByRef/>
                </div>
                <div className="row DayCard-addButtoms-row">
                    <div className="col-12 d-flex">
                        <div className="DayCard-addButtom">
                            <i className="iconCheckCircle icon-check-circle"/>
                            <div>Despachar pendientes</div>
                        </div>
                        <div className="DayCard-addButtom">
                            <i className="iconCheckCircle icon-check-circle"/>
                            <div>Despacho especifico</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="DayCard-separator"/>
                    </div>
                </div>
            </div>
        )
    }
}
export default  DayCard




export class DayCardByRef extends Component {
    render() {
        return (
            <div className="DayCardByRef col-12 d-flex">
                <div className="DayCardByRef-product">
                    <div className="DayCardByRef-name d-flex align-items-center">A0785 Rojos Everithi</div>
                    <div className="DayCardByRef-variation d-flex align-items-center">Talla 35</div>
                </div>

                <div className="DayCardByRef-option">
                    <div className="DayCardByRef-option-number">25</div>
                    <div className="DayCardByRef-option-label">pedidos</div>
                </div>

                <div className="DayCardByRef-separator"/>

                <div className="DayCardByRef-option">
                    <div className="DayCardByRef-option-number">25</div>
                    <div className="DayCardByRef-option-label">pendientes</div>
                </div>

                <div className="DayCardByRef-separator"/>

                <div className="DayCardByRef-option-despacho">
                    <input min="0" max="25" type="number" className="DayCardByRef-option-input"/>
                    <div className="DayCardByRef-option-label-depacho">despachar</div>
                </div>
            </div>
        )
    }
}
