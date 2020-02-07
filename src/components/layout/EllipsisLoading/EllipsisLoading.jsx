import React, { Component } from 'react'
import './EllipsisLoading.css'

export default class EllipsisLoading extends Component {
    render() {
        return (
            <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}
