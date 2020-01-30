import React, { Component } from 'react'
import './AttachEvidence.css'

export default class AttachEvidence extends Component {
    render() {
        const {className,inputID,inputName,leerDatos,evidence}=this.props
        
        return (
            <div className="inputEvidencesFileBox">
                <label className={`${className} d-flex justify-content-center align-items-center`} htmlFor={inputID}>
                    {/* /NOTE: Si hay adjunto, muestra un chulo, sino muestra un + */}

                    {evidence?
                        <i className="icon-check centerVertical"></i>
                    :
                        <i className="icon-plus centerVertical"></i>
                    }
                </label>
                <input accept="image/*"  id={inputID} name={inputName} className="evidenceFileInput" onChange={leerDatos} type="file"/>
            </div>
        )
    }
}
