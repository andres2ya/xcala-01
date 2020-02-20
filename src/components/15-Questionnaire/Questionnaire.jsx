import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Questionnaire.css'
import logoXcala from './../../assets/logoXcala_180w_SVG_azul_smaller.svg'
import {CSSTransition} from 'react-transition-group'
import ButtonLogin from './../1-Auth-With-cellPhoneNumber/Layouts/ButtonLogin/ButtonLogin'
import PlusMinusInput from './LayOuts/PlusMinusInput/PlusMinusInput'
import CustomizedSelect from './LayOuts/CustomizedSelect/CustomizedSelect'
import BoxOption from './LayOuts/BoxOption/BoxOption'

export default class Questionnaire extends Component {
    state={
        userName:this.props.match.params.userName,
        edad:'',
    }

    componentDidUpdate=()=>{
        console.log(this.state)
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

                <div className="row">
                    <div className="col-12">
                        <PlusMinusInput style={{backGround:{margin:'3px'},quantityInput:{height:'40px',width:'70px'},minus:{height:'40px',width:'40px'},plus:{height:'40px',width:'40px'}}} getValue={(value)=>this.setState({edad:value})} id='edadInput' min={18} max={150}/>
                        <CustomizedSelect style={{label:{margin:'3px'},select:{width:'150px',height:'40px'}}} getValue={(value)=>this.setState({ciudad:value})} options={['Bogota','Cucuta','Cartagena de indias']}/>
                        <BoxOption style={{width:'150px',height:'40px',margin:'3px'}} option={'Ama de casa'} getValue={(value)=>this.setState({option:value})}/>
                        <BoxOption style={{width:'150px',height:'40px',margin:'3px'}} option={'Estudiante'} getValue={(value)=>this.setState({option:value})}/>
                    </div>
                </div>
            </div>
        )
    }
}
