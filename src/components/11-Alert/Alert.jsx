import React, { Component } from 'react'
import {createPortal} from 'react-dom'
import './Alert.css'
const modalRoot=document.getElementById('alert')
{/* <i style={{marginRight:20,fontSize:30}} className="icon-cancel-circled"/> */}
{/* <i style={{marginRight:20,fontSize:30}} className="icon-check-circle"/> */}
// mode="alertCard-green"
// mode="alertCard-red"

export default class Alert extends Component {
    constructor(props){
        super(props);
        this.element = document.createElement('div')
    }
    componentDidMount=()=>{
        console.log('Se cargó el Alert')
        this.element.setAttribute("id","alertCard")
        this.element.setAttribute("class",`d-flex justify-content-center align-items-center alertCard ${this.props.mode}`)
        modalRoot.appendChild(this.element)
    }

    componentWillUnmount=()=>{
        console.log('Se desmonto el Alert')
        modalRoot.removeChild(this.element)
        this.element.removeAttribute('id')
        this.element.removeAttribute('class')
    }
    render() {
        return createPortal(this.props.children,this.element)
    }
}
