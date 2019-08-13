import React, { Component } from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import { Link } from "react-router-dom";


class Producto extends Component {
    render() {
        return (
            <div>
                <h1>Productos</h1>
                <Link to='https://google.com.co'>Abrir Google</Link>
                {console.log(this.props.productos)}
            </div>
        )
    }
}

const mapStateToProps=(state,onwprops)=>({
productos:state
})

const mapDispatchToProps=dispatch=>({

})

export default compose(
     firestoreConnect([{collection:'productos'}]),
     connect(mapStateToProps,mapDispatchToProps)
)(Producto)
