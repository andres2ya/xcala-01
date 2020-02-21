import React, { Component } from 'react'
import './BoxOption.css'

export default class BoxOption extends Component {
    state={
        active:false,
    }

    active=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        this.setState({active:!this.state.active})
        this.props.getValue(e.target.id)
    }

    render() {
        return (
            <div className="BoxOption d-flex justify-content-center align-items-center">
                <div 
                id={this.props.option} 
                style={this.props.style} 
                // className={`${this.state.active?'boxx_active':'boxx'} d-flex justify-content-center align-items-center`} 
                className={`${this.props.classNameActive} d-flex justify-content-center align-items-center`} 
                onClick={this.active}>
                    {this.props.option}
                </div>
            </div>   
        )
    }
}
