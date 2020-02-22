import React, { Component } from 'react'
import './DateInput.css'

export default class DateInput extends Component {
    render() {
        return (
            <div className="DateInput d-flex justify-content-center align-items-center">
                <label style={this.props.style.label}>
                    <input style={this.props.style.input} type='date' defaultValue="1999-01-01" onChange={(e)=>this.props.getValue(e.target.value)}/>
                </label>
            </div>
        )
    }
}
