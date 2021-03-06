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
        const {background,center}=this.props
        document.getElementById('ownModal').className='ownModal'
        if(background){
            document.getElementById('ownModal').setAttribute("style", `background-color: ${background};`);
        }
        if(center){
            document.getElementById('ownModal').setAttribute("style", `background-color: ${background};display:flex;justify-content:center;align-items:center`);
        }
        document.body.className='overFlowYHidden'

        modalRoot.appendChild(this.element)
    }

    componentWillUnmount=()=>{
        console.log('Se desmonto el modal')
        document.getElementById('ownModal').removeAttribute('class')
        document.getElementById('ownModal').removeAttribute('style')//***
        document.body.removeAttribute('class')
        document.body.className='myAccountStyle'
        
        modalRoot.removeChild(this.element)
    }

    render() {
        return createPortal(this.props.children,this.element)
    }
}
