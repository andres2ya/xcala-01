import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {keepSesion} from '../../../ducks/authDucks/authDuckLogin'
import '../Checkbox/Checkbox.css'

class Checkbox extends Component  {

    state={
        checked:false
    }

    toogleKeep=()=>{
        this.setState({ checked: !this.state.checked });
    }

    componentDidUpdate=()=>{
        const {mode}=this.props
        if(mode==='keepSesion'){
            this.props.keepSesion(this.state.checked)
        }
        else if(mode==='acceptT&C'){
            console.log('despachando action para aceptar terminos y condiciones')
        }
    }

    render(){
        return (
        <div className={this.props.styleBox}>
            <input checked={this.props.checked} onChange={this.toogleKeep}  id={this.props.id} type="checkbox"/>
            <span className={this.props.styleCheck}></span>
            <label htmlFor={this.props.id}>
                {this.props.text}{' '}
                {this.props.link===null?'':<Link to={this.props.link}>{this.props.textLink}</Link>}
            </label>
        </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        keepSesion:(option)=>dispatch(keepSesion(option))
    }
}

export default  connect(null,mapDispatchToProps)(Checkbox)