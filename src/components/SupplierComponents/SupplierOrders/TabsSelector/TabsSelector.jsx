import React, { Component } from 'react'
import './TabsSelector.css'


class TabsSelector extends Component {
    render() {
        const {namesTabs}=this.props
        return (
            <div className="TabsSelectorTabRow col-12 d-flex justify-content-center align-items-center">
                {namesTabs.map(nameTab=>
                    <div 
                    key={nameTab} 
                    id={nameTab} 
                    onClick={this.props.onClick} 
                    className={`${'TabsSelectorTab'} ${'TabsSelectorTab-'}${this.props.activeTab===nameTab?'active':'desactive'} ${'d-flex align-items-center justify-content-center'}`}>
                        {nameTab}
                    </div>
                )}
            </div>
        )
    }
}
export default  TabsSelector
