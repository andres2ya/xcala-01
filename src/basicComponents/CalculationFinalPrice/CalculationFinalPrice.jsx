import React, { Component } from 'react'
import './CalculationFinalPrice.css'

export default class CalculationFinalPrice extends Component {
    render() {
        const {mode,active,number,value,icon,label,styleLabel,styleBox,options,optionSelectedDefault,getSelectedOption,inputDefaultValue,getInputValue}=this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div style={active?{opacity:1}:{opacity:0.5}} className="d-flex">
                            <div className="CalculationFinalPrice_number d-flex justify-content-center align-items-center">
                                {number}
                            </div>
                            <div className="CalculationFinalPrice_value_label d-flex align-items-center">
                                <div>
                                    <div className="d-flex align-items-center CalculationFinalPrice_value">
                                        {
                                            ((mode)=>{
                                                switch (mode) {
                                                    case 'simple':
                                                        return <div>{value}</div>
                                                    case 'select':
                                                        return <CalculationFinalPrice_select options={options} optionSelectedDefault={optionSelectedDefault} getSelectedOption={getSelectedOption}/>
                                                    case 'input':
                                                        return <CalculationFinalPrice_input getInputValue={getInputValue} inputDefaultValue={inputDefaultValue}/>
                                                    case 'box':
                                                        return <CalculationFinalPrice_box/>
                                                    default:
                                                        break;
                                                }
                                            })(mode)
                                        }
                                        <div className="CalculationFinalPrice_icon d-flex">
                                            <i style={styleLabel} className={`${icon}`}></i>
                                        </div>
                                    </div>
                                    <div style={styleLabel} className="d-flex align-items-center CalculationFinalPrice_label">{label}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


class CalculationFinalPrice_select extends Component {
  render() {
      const {options,optionSelectedDefault,getSelectedOption}=this.props
    return (
        <select className="CalculationFinalPrice_select" defaultValue={optionSelectedDefault} onChange={getSelectedOption}>
            <option className="CalculationFinalPrice_select_option" disabled value={optionSelectedDefault}>{optionSelectedDefault}</option>
            {
                options.map(option=>
                    <option className="CalculationFinalPrice_select_option" value={option}>{option}</option>
                )
            }
        </select>
    );
  }
}

class CalculationFinalPrice_input extends Component {
    render() {
        const {inputDefaultValue,getInputValue}=this.props
      return (
        <div className="CalculationFinalPrice_input">
            <input onChange={getInputValue} defaultValue={inputDefaultValue} type="text" name="" id=""/>
        </div>
      );
    }
}

class CalculationFinalPrice_box extends Component {
    render() {
      return (
        <div className="CalculationFinalPrice_box">
            $ 69.000
        </div>
      );
    }
}

