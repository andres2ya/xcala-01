import React, { Component } from 'react'
import './CustomizedSelect.css'

//NOTE: Propiedades de CustomizedSelect Ejemplo:
{/* <CustomizedSelect getValue={(value)=>this.setState({ciudad:value})} options={['Bogota','Cucuta','Cartagena de indias']}/> */}
export default class CustomizedSelect extends Component {
    render() {
        return (
            <div className="CustomizedSelect d-flex justify-content-center align-items-center">
                <label style={this.props.style.label}>
                    <select style={this.props.style.select} onChange={(e)=>this.props.getValue(e.target.value)} name='options'>
                        {this.props.options.map(option=>
                            <option id={option} value={option}>{option}</option>
                        )}
                    </select>
                </label>
            </div>
        )
    }
}
