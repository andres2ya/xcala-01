import React, { Component } from 'react'
import './FooterButton_list.css'
export default class FooterButton_list extends Component {
    render() {
        const {nameList,items}=this.props
        return (
            <div className="container">
                <span className="FooterButton_list_name">{`${nameList}: `}</span>
                {
                    items.map(item=>
                        <span className="FooterButton_list_item">{`${item}, `}</span>
                    )
                }        
            </div>
        )
    }
}
