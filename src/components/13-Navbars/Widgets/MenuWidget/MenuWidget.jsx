import React, { Component } from 'react'
import './MenuWidget.css'

class MenuWidget extends Component {
    render() {
        return (
            <div className={this.props.classNavIcon}>
                <i className="icon-menu centerVertical"></i>
            </div>
        )
    }
}
export default  MenuWidget