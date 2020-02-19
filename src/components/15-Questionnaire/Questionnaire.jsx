import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Questionnaire.css'
import logoXcala from './../../assets/logoXcala_180w_SVG_azul_smaller.svg'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import ButtonLogin from './../1-Auth-With-cellPhoneNumber/Layouts/ButtonLogin/ButtonLogin'

export default class Questionnaire extends Component {
    state={
        userName:this.props.match.params.userName
    }

    render() {
        return (
            <div className="QuestionnaireContainer container-fluid">
               <div className="sticky-top">
                    <div className="row QuestionnaireContainer_loginButton">
                    <div className="col-12 d-flex justify-content-end">
                        <Link to="/login">
                        <ButtonLogin onClick={()=>{console.log('ok')}}/>
                        </Link>
                    </div>
                    </div>

                    <CSSTransition key={1}in={true}appear={true}timeout={1000}classNames="fade">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-start">
                        <img className="QuestionnaireContainer_logo" src={logoXcala} alt=""/>
                        </div>
                    </div>
                    </CSSTransition>

                    <div className="row">
                    <div className="col-12 d-flex justify-content-start">
                        <div className="QuestionnaireContainer_titulo">
                        <span>{this.state.userName}</span>, queremos conocerte mejor!
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
