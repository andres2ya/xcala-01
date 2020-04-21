import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './AdsCard.css'

export default class AdsCard extends Component {
    render() {
        const {backgroundColor,text,span,url}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Link to={url}>
                            <div className={`d-flex justify-content-center align-items-center AdsCard AdsCard_${backgroundColor}`}>
                                <div className="AdsCard_text">
                                    {text}
                                    <span>{span}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
