import React, { Component } from 'react'
import './OptionsWithText.css'
import BoxOption from './../../components/15-Questionnaire/LayOuts/BoxOption/BoxOption'
import CustomizedSelect from '../../components/15-Questionnaire/LayOuts/CustomizedSelect/CustomizedSelect'
export default class OptionsWithText extends Component {
    state={
        selectedOption:null,
        spanBold:'',
        descriptionSelectedOption:'',
        optionsNames:[]
    }

    componentDidMount=()=>{
        const {options}=this.props
        let names=[]
        options.map(option=>
            names.push(option.name)    
        )
        this.setState({
            optionsNames:names
        })
    }
    
    selectOption=(option)=>{
        const {options}=this.props
        let optionData=options.filter(optionInside=>optionInside.name===option)
        this.setState({
            selectedOption:optionData[0].name,
            spanBold:optionData[0].spanBold,
            descriptionSelectedOption:optionData[0].description
        })
    }

    render() {
        const {title,optionsFormat,options}=this.props
        return (
            <div className="container OptionsWithText">
                <div className="row">
                    <div className="col-12">
                        <div className="OptionsWithText_title">
                            {title}
                        </div>
                        <div style={{paddingLeft:'15px',paddingRight:'15px'}} className="row">
                            {
                            ((optionsFormat,options)=>{
                                switch (optionsFormat) {
                                    case 1:
                                        return(
                                            options.map(option=>
                                                <div style={{paddingRight:'10px'}} className="d-flex justify-content-center">
                                                    <BoxOption classNameActive={`${this.state.selectedOption===option.name?'boxx_active':'boxx'}`} style={{lineHeight:'1',fontSize:'13px',height:'30px',margin:'5px 0px 5px 0px'}} option={option.name} getValue={(x)=>this.selectOption(x)}/> 
                                                </div>
                                            )
                                        )
                                    case 2:
                                        return(
                                            <div className="d-flex justify-content-start">
                                                <CustomizedSelect style={{label:{margin:'8px 0px 8px 0px'},select:{width:'80vw',height:'30px'}}} getValue={(x)=>this.selectOption(x)} options={this.state.optionsNames}/>
                                            </div>
                                        ) 
                                    default:
                                        break;
                                }
                            })(optionsFormat,options)
                            }
                        </div>
                        <div className="OptionsWithText_optionDescription">
                            <span style={{fontWeight:'bold'}}>{this.state.spanBold}</span>{this.state.descriptionSelectedOption}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
