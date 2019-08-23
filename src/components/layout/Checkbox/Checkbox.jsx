import React from 'react'
import {Link} from 'react-router-dom';
import '../Checkbox/Checkbox.css'

 export default function Checkbox(props) {
        return (
        <div className={props.styleBox}>
            <input id={props.id} type="checkbox"/>
            <span className={props.styleCheck}></span>
            <label htmlFor={props.id}>
                {props.text}{' '}
                {props.link===null?'':<Link to={props.link}>{props.textLink}</Link>}
            </label>
        </div>
        )
}
