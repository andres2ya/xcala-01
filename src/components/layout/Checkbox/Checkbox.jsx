import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {keepSesion} from '../../../ducks/authDucks/authDuckLogin'
import {acceptTermsCondition} from '../../../ducks/authDucks/authDuckSignUp'
import {acceptTyCForOpenCase} from '../../../ducks/accountDuck/openCaseDuck';
import '../Checkbox/Checkbox.css'

class Checkbox extends Component  {

    state={
        checked:false,
        acceptTermCondition:false,
        acceptTermConditionForOpenCase:false
    }

    componentDidUpdate=()=>{
        const {mode}=this.props
        if(mode==='keepSesion'){
            this.props.keepSesion(this.state.checked)
        }
        else if(mode==='acceptT&C'){
            this.props.acceptTermsCondition(this.state.acceptTermCondition)
        }else if(mode==='acceptT&CForOpenCase'){
            this.props.acceptTyCForOpenCase(this.state.acceptTermConditionForOpenCase)
        }
    }
    
    toogleKeep=()=>{
        const {mode}=this.props
        if(mode==='keepSesion'){
            this.setState({ checked: !this.state.checked });
        }
        else if(mode==='acceptT&C'){
            this.setState({ acceptTermCondition: !this.state.acceptTermCondition });
        }else if(mode==='acceptT&CForOpenCase'){
            this.setState({acceptTermConditionForOpenCase: !this.state.acceptTermConditionForOpenCase})
        }
    }

    render(){
        return (
        <div className={this.props.styleBox}>
            <input checked={this.props.checked} onChange={this.toogleKeep}  id={this.props.id} type="checkbox"/>
            <span className={this.props.styleCheck}></span>
            <label htmlFor={this.props.id}>
                {this.props.text}{' '}
                {this.props.link===null?'':<Link to={this.props.link}><span className={this.props.colorLink?this.props.colorLink:'link'}>{this.props.textLink}</span></Link>}
            </label>
        </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        keepSesion:(option)=>dispatch(keepSesion(option)),
        acceptTermsCondition:(option)=>dispatch(acceptTermsCondition(option)),
        acceptTyCForOpenCase:(option)=>dispatch(acceptTyCForOpenCase(option))
    }
}

export default  connect(null,mapDispatchToProps)(Checkbox)