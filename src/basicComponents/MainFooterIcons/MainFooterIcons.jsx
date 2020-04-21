import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './MainFooterIcons.css'

export default class MainFooterIcons extends Component {
    render() {
        const {icons,iconSelected}=this.props
        return (
            <footer className="sticky-footer">
                <div className="row MainFooterIcons">
                    <div className="col-12">
                        <div className="d-flex justify-content-center align-items-center">
                            {
                            icons.map(icon=> 
                                <Link to={icon.url}>        
                                    <div className={`${iconSelected===icon.label?'MainFooterIcons_iconCardSelected':'MainFooterIcons_iconCard'}`}>
                                        <i className={icon.icon}/>
                                        <div className={`${iconSelected===icon.label?'MainFooterIcons_iconLabelSelected':'MainFooterIcons_iconLabel'}`}>{icon.label}</div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
