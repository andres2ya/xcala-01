import React, { Component } from 'react'
import './SliderPrincipal.css'

export default class SliderPrincipal extends Component {
    state={
        sliders:this.props.sliders
    }
    render() {
        return (
            <div data-pause="hover" data-interval="3000" id="SliderPrincipal" className="SliderPrincipal carousel slide" data-ride="carousel">
                <ol className="SliderPrincipal_pointIndicators carousel-indicators">
                    {
                        this.state.sliders.map((slide,index)=>
                            <li data-target="#SliderPrincipal" data-slide-to={index} className={index===0?"active":''}/> 
                        )
                    }
                </ol>
                <div className="SliderPrincipal_carrusel carousel-inner">

                    {
                        this.state.sliders.map((slide,index)=>
                            <div onClick={()=>alert(slide.url)} className={`carousel-item ${index===0?'active':''}`}>
                                <img className="SliderPrincipal_slide d-block w-100" src={slide.img} alt={slide.nombre}/>
                            </div>
                        )
                    }
                </div>
                <a className="carousel-control-prev" href="#SliderPrincipal" role="button" data-slide="prev">
                    <span className="SliderPrincipal_arrowButton carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#SliderPrincipal" role="button" data-slide="next">
                    <span className="SliderPrincipal_arrowButton carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}
