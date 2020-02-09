import React, { Component } from 'react'

export default class CategoryProducts extends Component {
    componentDidMount=()=>{
        console.log('Productos de la categoria',this.props)
    }
    render() {
        return (
            <div>
                Productos de la categoria {this.props.match.params.id}
            </div>
        )
    }
}
