import React, { Component } from 'react'
import './SearchBar.css'

export default class SearchBar extends Component {
    state={
        typeAreaText:this.props.typeAreaText,
        showFilter:this.props.showFilter
    }
    render() {
        return (
            <div className="container SearchBar">
                <div className="row">
                    <div className="col-12 d-flex">
                        <input placeholder={this.state.typeAreaText} style={{width:this.state.showFilter?'80%':'90%'}} className="SearchBar_typeArea d-flex align-items-center"/>
                        <div style={{width:this.state.showFilter?'10%':'10%'}} className="SearchBar_button d-flex align-items-center justify-content-center">
                            <i className="icon-searchbutton"/>
                        </div>

                        {
                        this.state.showFilter?
                        <div style={{width:'10%'}} className="SearchBar_filterButton d-flex align-items-center justify-content-center">
                            <i className="icon-filter"/>
                        </div>
                        :
                        null
                        }
                    </div>
                </div>
                
            </div>
        )
    }
}
