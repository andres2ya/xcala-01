import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './QuickAccessIcons.css'

export default class QuickAccessIcons extends Component {
    render() {
        const {icons}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center align-items-center QuickAccessIcons">
                            {
                            icons.map(icon=> 
                                <Link to={icon.url}>        
                                    <div className="QuickAccessIcons_iconCard">
                                        <i className={icon.icon}/>
                                        <div className="QuickAccessIcons_iconLabel">{icon.label}</div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}
