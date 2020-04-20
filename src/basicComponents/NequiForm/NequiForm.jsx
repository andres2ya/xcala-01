import React, { Component } from 'react'
import './NequiForm.css'
import logoNequi from './../../assets/logoNequi.svg'
import InputForm from '../InputForm/InputForm'
import {Link} from 'react-router-dom'

export default class NequiForm extends Component {
    render() {
        const {url}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center align-items-center">
                            <img height="150px" src={logoNequi} alt=""/>
                        </div>
                        <div>
                            <InputForm
                            color={'red'}//'blue' or 'red' or 'green' or 'grey'
                            onChange={()=>alert('Changing...')}
                            placeholder={'Ejemplo 3183667033'}
                            value={''}
                            type={'text'}
                            />
                            <InputForm
                            color={'red'}//'blue' or 'red' or 'green' or 'grey'
                            onChange={()=>alert('Changing...')}
                            placeholder={'Cedula de ciudadania'}
                            value={''}
                            type={'text'}
                            />
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div>
                                <div className="d-flex justify-content-center NequiForm_lineOne">¿Aun no tienes una cuenta NEQUI?</div>
                                <Link to={url}>
                                    <div className="d-flex justify-content-center NequiForm_lineTwo">Creala gratis aqui</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
