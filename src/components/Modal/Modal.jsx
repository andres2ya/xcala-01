import React, { Component } from 'react'
import './Modal.css'
import {createPortal} from 'react-dom'
const modalRoot=document.getElementById('ownModal')

export default class Modal extends Component {
    constructor(props){
        super(props);
        this.element = document.createElement('div')
    }

    componentDidMount=()=>{
        console.log('Se cargó el modal')
        document.getElementById('ownModal').className='ownModal'
        document.body.className='overFlowYHidden'

        modalRoot.appendChild(this.element)
    }

    componentWillUnmount=()=>{
        console.log('Se desmonto el modal')
        document.getElementById('ownModal').removeAttribute('class')
        document.body.removeAttribute('class')
        document.body.className='myAccountStyle'
        
        modalRoot.removeChild(this.element)
    }

    render() {
        return createPortal(this.props.children,this.element)
    }
}
