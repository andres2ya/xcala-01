import React, { Component } from 'react'
import './TabsSelector.css'


class TabsSelector extends Component {
    render() {
        const {namesTabs,onClick,activeTab}=this.props
        return (
            <div className="TabsSelectorTabRow col-12 d-flex justify-content-center align-items-center">
                {namesTabs.map(nameTab=>
                    <div 
                    key={nameTab} 
                    id={nameTab} 
                    onClick={onClick} 
                    className={`${'TabsSelectorTab'} ${'TabsSelectorTab-'}${activeTab===nameTab?'active':'desactive'} ${'d-flex align-items-center justify-content-center'}`}>
                        {nameTab}
                    </div>
                )}
            </div>
        )
    }
}
export default  TabsSelector
