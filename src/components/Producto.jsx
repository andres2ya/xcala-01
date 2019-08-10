import React, { Component } from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect,firestoreConnect} from 'react-redux-firebase'
import { Link } from "react-router-dom";


class Producto extends Component {
    render() {
        return (
            <div>
                <h1>Productos</h1>
                {console.log(this.props.productos)}
            </div>
        )
    }
}

const mapStateToProps=(state,onwprops)=>({
productos:state.firestore
})

const mapDispatchToProps=dispatch=>({

})

export default compose(
    firestoreConnect([{collection:'productos'}]),
    connect(mapStateToProps,mapDispatchToProps)
)(Producto)
