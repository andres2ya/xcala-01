import React, { Component } from 'react'
import './EllipsisDownloading.css'

export default class EllipsisDownloading extends Component {
    render() {
        return (
            <div className="lds-ellipsis_downloading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}
