import React, { Component } from 'react'
import './TwoWordsCircle.css'
export default class TwoWordsCircle extends Component {
    render() {
        return (
            <div style={this.props.style} className="TwoWordsCircle d-flex justify-content-center align-items-center">
                {this.props.TwoWords}
            </div>
        )
    }
}
