import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './LevelCard.css'

export default class LevelCard extends Component {
    render() {
        const {level,text,benefits,url}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Link to={url}>
                            <div className={`LevelCard LevelCard_${level}`}>
                                <div className="LevelCard_level">{level}</div>
                                <div className="LevelCard_text">{text}</div>
                                <div className="LevelCard_benefits d-flex justify-content-end">{benefits}</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
