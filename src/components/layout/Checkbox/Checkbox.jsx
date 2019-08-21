import React from 'react'
import '../Checkbox/Checkbox.css'

 export default function Checkbox() {
        return (
        <div className="box">
            <input id="recordarme" type="checkbox"/>
            <span className="check"></span>
            <label htmlFor="recordarme">Recordarme</label>
        </div>
        )
}
