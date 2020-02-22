import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Questionnaire.css'
import logoXcala from './../../assets/logoXcala_180w_SVG_azul_smaller.svg'
import {CSSTransition} from 'react-transition-group'
import ButtonAuth from './../1-Auth-With-cellPhoneNumber/Layouts/ButtonAuth/ButtonAuth'
// import PlusMinusInput from './LayOuts/PlusMinusInput/PlusMinusInput'
import CustomizedSelect from './LayOuts/CustomizedSelect/CustomizedSelect'
import BoxOption from './LayOuts/BoxOption/BoxOption'
import DateInput from './LayOuts/DateInput/DateInput'
import Modal from './../12-Modal/Modal'
import ModalSuccessScreen from './../16-SuccessScreen/ModalSuccessScreen/ModalSuccessScreen'


// NOTE: Elements:
// <PlusMinusInput style={{backGround:{margin:'3px'},quantityInput:{height:'40px',width:'70px'},minus:{height:'40px',width:'40px'},plus:{height:'40px',width:'40px'}}} getValue={(value)=>this.setState({edad:value})} id='edadInput' min={18} max={150}/>
// <CustomizedSelect style={{label:{margin:'3px'},select:{width:'150px',height:'40px'}}} getValue={(value)=>this.setState({ciudad:value})} options={['Bogota','Cucuta','Cartagena de indias']}/>
// <BoxOption classNameActive={`${this.state.option==='Ama de casa'?'boxx_active':'boxx'}`} style={{width:'150px',height:'40px',margin:'3px'}} option={'Ama de casa'} getValue={(value)=>this.setState({option:value})}/>
// <BoxOption classNameActive={`${this.state.option==='Estudiante'?'boxx_active':'boxx'}`} style={{width:'150px',height:'40px',margin:'3px'}} option={'Estudiante'} getValue={(value)=>this.setState({option:value})}/>
// <BoxOption classNameActive={`${this.state.optionDos==='Profesional'?'boxx_active':'boxx'}`} style={{width:'150px',height:'40px',margin:'3px'}} option={'Profesional'} getValue={(value)=>this.setState({optionDos:value})}/>
// <BoxOption classNameActive={`${this.state.optionDos==='Otro'?'boxx_active':'boxx'}`} style={{width:'150px',height:'40px',margin:'3px'}} option={'Otro'} getValue={(value)=>this.setState({optionDos:value})}/>

export default class Questionnaire extends Component {
    state={
        showModalSuccess:true,
        userName:this.props.match.params.userName,
        edad:18,
        ciudad:'Bogota',
        genero:'Hombre',
        ocupacion:'',
        estadoCivil:'Soltero',
        hijos:'No tengo',
    }

    componentDidUpdate=()=>{
        console.log(this.state)
    }

    empezar=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        this.setState({showModalSuccess:false})
    }

    render() {
        return (
            <div className="QuestionnaireContainer container-fluid">
                <div className="row sticky-top QuestionnaireContainer_sticky-top">
                    <div className="col-12">
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



                <div className="row QuestionnaireContainer_Age_City_y_gender_Questions">
                    <div className="col-6">
                        <div className='QuestionnaireContainer_label d-flex align-items-center'>¿Cuando naciste?</div>
                        <div className='QuestionnaireContainer_label d-flex align-items-center' >¿Donde vives?</div>
                        <div className='QuestionnaireContainer_label d-flex align-items-center'>¿Cual es tu genero?</div>
                    </div>
                    <div className="col-6">
                        {/* <PlusMinusInput style={{backGround:{margin:'8px 0px 8px 0px'},quantityInput:{height:'35px',width:'60px'},minus:{height:'35px',width:'30px'},plus:{height:'35px',width:'30px'}}} getValue={(value)=>this.setState({edad:value})} id='edadInput' min={18} max={150}/> */}
                        {/* <CustomizedSelect style={{label:{margin:'8px 0px 8px 0px'},select:{width:'120px',height:'35px'}}} getValue={(value)=>this.setState({fechaNacimiento:value})} options={['Bogota','Cucuta','Cartagena de indias']}/> */}
                        <DateInput style={{label:{margin:'8px 0px 8px 0px'},input:{width:'135px',height:'35px'}}} getValue={(value)=>this.setState({fechaNacimiento:value})}/>
                        <CustomizedSelect style={{label:{margin:'8px 0px 8px 0px'},select:{width:'135px',height:'35px'}}} getValue={(value)=>this.setState({ciudad:value})} options={['Bogota','Cucuta','Cartagena de indias']}/>
                        <CustomizedSelect style={{label:{margin:'8px 0px 8px 0px'},select:{width:'135px',height:'35px'}}} getValue={(value)=>this.setState({genero:value})} options={['Hombre','Mujer','Otros']}/>
                    </div>
                </div>

                

                <div className="row QuestionnaireContainer_occupation_Question">
                    <div className="col-12">
                        <div style={{marginRight:'30px'}} className='QuestionnaireContainer_label d-flex align-items-center'>¿A que te dedicas?</div>
                        <div className="row">
                            <div className="col-6">
                                <BoxOption classNameActive={`${this.state.ocupacion==='Ama de casa'?'boxx_active':'boxx'}`} style={{width:'135px',height:'35px',margin:'8px 0px 8px 0px'}} option={'Ama de casa'} getValue={(value)=>this.setState({ocupacion:value})}/>
                                <BoxOption classNameActive={`${this.state.ocupacion==='Profesor'?'boxx_active':'boxx'}`} style={{width:'135px',height:'35px',margin:'8px 0px 8px 0px'}} option={'Profesor'} getValue={(value)=>this.setState({ocupacion:value})}/>
                                <BoxOption classNameActive={`${this.state.ocupacion==='Estudiante'?'boxx_active':'boxx'}`} style={{width:'135px',height:'35px',margin:'8px 0px 8px 0px'}} option={'Estudiante'} getValue={(value)=>this.setState({ocupacion:value})}/>
                            </div>
                            <div className="col-6">
                                <BoxOption classNameActive={`${this.state.ocupacion==='Independiente'?'boxx_active':'boxx'}`} style={{width:'135px',height:'35px',margin:'8px 0px 8px 0px'}} option={'Independiente'} getValue={(value)=>this.setState({ocupacion:value})}/>
                                <BoxOption classNameActive={`${this.state.ocupacion==='Empleado'?'boxx_active':'boxx'}`} style={{width:'135px',height:'35px',margin:'8px 0px 8px 0px'}} option={'Empleado'} getValue={(value)=>this.setState({ocupacion:value})}/>
                                <BoxOption classNameActive={`${this.state.ocupacion==='Otros'?'boxx_active':'boxx'}`} style={{width:'135px',height:'35px',margin:'8px 0px 8px 0px'}} option={'Otros'} getValue={(value)=>this.setState({ocupacion:value})}/>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="row QuestionnaireContainer_numberChildren">
                    <div className="col-6">
                        <div className='QuestionnaireContainer_label d-flex align-items-center'>¿Cual es tu estado civil?</div>
                        <div className='QuestionnaireContainer_label d-flex align-items-center'>¿Cuantos hijos tienes?</div>
                    </div>
                    <div className="col-6">
                        <CustomizedSelect style={{label:{margin:'8px 0px 8px 0px'},select:{width:'135px',height:'35px'}}} getValue={(value)=>this.setState({estadoCivil:value})} options={['Soltero','Casado','Union libre','Separado','Otro']}/>
                        <CustomizedSelect style={{label:{margin:'8px 0px 8px 0px'},select:{width:'135px',height:'35px'}}} getValue={(value)=>this.setState({hijos:value})} options={['No tengo','1','2','3','5','+5']}/>
                    </div>
                </div>

                <div className="row QuestionnaireContainer_buttons">
                    <div className="col-12">
                        <ButtonAuth style={{marginTop:'30px',marginBottom:'10px',height:'35px',width:'100%',padding:'5px 15px 5px 15px'}} texto={'Continuar'}/>
                        <ButtonAuth secondary={true} style={{marginBottom:'30px',height:'35px',width:'100%',padding:'5px 15px 5px 15px'}} texto={'Omitir'}/>
                    </div>
                </div>



                {this.state.showModalSuccess?<Modal center={true} background={'rgb(255, 255, 255,0.95)'}><ModalSuccessScreen empezar={this.empezar} userName={this.state.userName}/></Modal>:null}
            </div>
        )
    }
}
