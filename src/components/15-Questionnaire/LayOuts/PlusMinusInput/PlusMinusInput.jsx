import React, { Component } from 'react'
import './PlusMinusInput.css'

//NOTE: Propiedades de PlusMinusInput Ejemplo
{/* <PlusMinusInput getValue={(value)=>this.setState({edad:value})} id={'edadInput'} min={18} max={150}/> */}

export default class PlusMinusInput extends Component {

    state={
        value:this.props.min,
        min:this.props.min,
        max:this.props.max
    }
   
    increment=(e)=>{
        e.preventDefault();
        const {value,max}=this.state
        if(value+1<=max){
            this.setState({value:value+1})
        }
    }

    decrement=(e)=>{
        e.preventDefault();
        const {value,min}=this.state
        if(value-1>=min){
            this.setState({value:value-1})
        }
    }

    changeValue=(e)=>{
        e.preventDefault()
        const {max}=this.state
        if(e.target.value<=max){
            this.setState({value:parseInt(e.target.value)})
        }
    }

    verifyValue=(e)=>{
        e.preventDefault()
        const {value,min}=this.state
        if(value<min || isNaN(value)===true){
            this.setState({value:min})
        }
    }

    componentDidUpdate=(prevProps,prevState)=>{
        const {value}=this.state
        if(prevState.value!==value){
            this.props.getValue(value)
        }
    }

    render() {
        return (
            <div className="PlusMinusInput d-flex justify-content-center align-items-center">
                <div style={this.props.style.backGround} className="backGround">
                    <input style={this.props.style.minus} type='button' className='minus' value='-'  field='quantity' onClick={this.decrement}/>
                    <input style={this.props.style.quantityInput} id={this.props.id} type='number' className="quantityInput" value={this.state.value} name='quantity' onChange={this.changeValue} onBlur={this.verifyValue}/>
                    <input style={this.props.style.plus} type='button' className='plus' value='+'  field='quantity' onClick={this.increment} />
                </div>
            </div>
        )
    }
}
