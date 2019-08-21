import React from 'react'
import '../MainNavbar/MainNavbar.css'

 export default function MainNavbar(props) {
        return (
        <div>
            <button>{props.text}</button>
        </div>
        )
}