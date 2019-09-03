import React, { Component } from 'react'

class SpecificOrder extends Component {
    render() {
        var orderId=this.props.match.params.id
        console.log(orderId)
        return (
            <div>
                Specific Order:{orderId}
            </div>
        )
    }
}
export default SpecificOrder