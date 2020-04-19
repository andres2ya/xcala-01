import React, { Component } from 'react'
import './CalculationTable.css'
import OptionsWithText from '../OptionsWithText/OptionsWithText'

export default class CalculationTable extends Component {
    render() {
        const {withOptions,title,optionsFormat,options,items}=this.props
        return (
            <div className="container CalculationTable">
                <div className="row">
                    <div className="col-12">
                        <div className="CalculationTable_box">


                            {
                                withOptions?
                                <div style={{marginLeft:'-15px'}}>
                                    <OptionsWithText
                                    title={title}
                                    optionsFormat={optionsFormat}
                                    options={options}
                                    />
                                </div>
                                :
                                <div className="CalculationTable_title">{title}</div>  
                            }


                            {
                                items.map(item=>
                                    <div>
                                        <div style={item.styleType} className={`row CalculationTable_${item.type}`}>
                                            <div className="col-12 d-flex align-items-center">    
                                                <div style={item.styleText} className={`CalculationTable_itemText`}>
                                                    <span style={{marginRight:'2px'}}>{item.simbol}</span>
                                                    {item.text}
                                                </div>
                                                <div style={item.styleValue}  className={`CalculationTable_itemValue`}>{item.value}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>                
            </div>
        )
    }
}
