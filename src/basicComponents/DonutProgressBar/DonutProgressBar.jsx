//Fuente: https://codepen.io/peavy/pen/NzYVjw
import React, { Component } from 'react'
import './DonutProgressBar.css';
import updateDonutChart from './../DonutProgressBar/DonutProgressBar';


export default class DonutProgressBar extends Component {
    componentDidMount=()=>{
        const {idDonutProgressBar,percent,isDonut}=this.props
        let id='#'+idDonutProgressBar
        updateDonutChart(id,percent,isDonut)
    }
    render() {
        const {idDonutProgressBar,userImg}=this.props
        return (
            <div id={idDonutProgressBar} className="DonutProgressBar_donut-size">
                <div className="DonutProgressBar_pie-wrapper">
                    <span className="DonutProgressBar_label">
                        <img className="DonutProgressBar_img" src={userImg} alt=""/>
                        {/* <span class="num">0</span><span class="smaller">%</span> */}
                    </span>
                    <div className="DonutProgressBar_pie">
                        <div className="DonutProgressBar_left-side DonutProgressBar_half-circle"></div>
                        <div className="DonutProgressBar_right-side DonutProgressBar_half-circle"></div>
                    </div>
                    <div className="DonutProgressBar_shadow"></div>
                </div>
            </div>
        )
    }
}
