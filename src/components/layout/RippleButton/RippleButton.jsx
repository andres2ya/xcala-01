import React, { Component } from 'react'
import './RippleButton.css'
import $ from 'jquery'

//NOTE: Formato llamada componente RippleButton, medidas en: px
// segAnimation={2}
// texto={this.state.textShareButton} textoDobleLinea={false} classNameIcon={"icon-whatsapp"}
// styleButton={{background:'-moz-linear-gradient(180deg, #61fd7d 0%, #2bb826 100%)',background:'-webkit-linear-gradient(180deg, rgba(97,253,125,1) 0%, rgba(43,184,38,1) 100%)',background:'linear-gradient(180deg, rgba(97,253,125,1) 0%, rgba(43,184,38,1) 100%)',borderRadius:10,height:35,width:'100%',margin:'6px 0px 0px 0px'}}
// styleIcon={{padding:'0px 5px 0px 0px',margin:'',color:'',fontSize:25,fontWeight:'700',}}
// styleTexto={{padding:'0px 5px 6px 0px',marginTop:25,maxHeight:20,fontSize:14,fontWeight:600,color:'white'}}
// styleRipple={{height:'100px',width:'100px',borderRadius:'100%',backgroundColor:'rgb(143, 255, 164,0.8)',}}>

export default class RippleButton extends Component {
    
    componentDidMount=()=>{
        let segAnimation=this.props.segAnimation?this.props.segAnimation:0.6
        $(".buttonRipple").mousedown(function(e) {
            var ripple = $(this).find(".ripple");
            ripple.css({animation: ''})
            var x = parseInt(e.pageX - $(this).offset().left) - ripple.width() / 2;
            var y = parseInt(e.pageY - $(this).offset().top) - ripple.height() / 2;
            ripple
                .css({
                    top: y,
                    left: x,
                    animation: `ripple ${segAnimation}s linear`,
                })
        });

        const {styleButton,styleIcon,classNameIcon,styleTexto,textoDobleLinea,styleRipple}=this.props
        let marginTopTexto
        let marginTopRipple
        if(textoDobleLinea===true){
             marginTopTexto=styleButton.height/2 - styleTexto.fontSize/2 -8
             marginTopRipple=-1*(styleTexto.maxHeight+marginTopTexto)
        }else{
             marginTopTexto=styleButton.height/2 - styleTexto.fontSize/2
             marginTopRipple=-1*(styleTexto.maxHeight+marginTopTexto)
        }


        //NOTE: Si min and max width and height of the botton is not defined, then they get the same value of width and height
        let minHeightButton;styleButton.minHeight===undefined?minHeightButton=styleButton.height:minHeightButton=styleButton.minHeight
        let maxHeightButton;styleButton.maxHeight===undefined?maxHeightButton=styleButton.height:maxHeightButton=styleButton.maxHeight
        let minWidthButton;styleButton.minWidth===undefined?minWidthButton=styleButton.minWidth:minWidthButton=styleButton.minWidth
        let maxWidthButton;styleButton.maxWidth===undefined?maxWidthButton=styleButton.maxWidth:maxWidthButton=styleButton.maxWidth


        this.styleButton={
            backgroundColor:styleButton.backgroundColor,
            background:styleButton.background,
            borderRadius:styleButton.borderRadius,

            width:styleButton.width,
            minWidth:minWidthButton,
            maxWidth:maxWidthButton,

            height:styleButton.height,
            minHeight:minHeightButton,
            maxHeight:maxHeightButton,

            margin:styleButton.margin,
        }

        //NOTE: Si no se especifica el className del icono, entonces no se lee su estilo.
        //Si se espeficica el className pero no el estilo, entonces genera error
        if(classNameIcon){
            this.styleIcon={
                padding:styleIcon.padding,
                margin:styleIcon.margin,
                color:styleIcon.color,
                fontSize:styleIcon.fontSize,
                fontWeight:styleIcon.fontWeight,
            }
        }
    
        this.styleTexto={
            maxHeight:styleTexto.maxHeight,
            fontSize:styleTexto.fontSize,
            fontWeight:styleTexto.fontWeight,
            color:styleTexto.color,
            marginTop:marginTopTexto,
            padding:styleTexto.padding,
        }
    
        this.styleRipple={
            backgroundColor:styleRipple.backgroundColor,
            borderRadius:styleRipple.borderRadius,
            height:styleRipple.height,
            width:styleRipple.width,
            marginTop:marginTopRipple,
        }
    }

    render() {
        return (
            <div id={this.props.id} style={this.styleButton} className={`buttonRipple ${this.props.className}`}>
                <div style={this.styleTexto} id="texto" className='d-flex align-items-center justify-content-center'>
                    {/* NOTE: Si no se especifica el className del icono, entonces no se renderiza  */}
                    {this.props.classNameIcon?<i style={this.styleIcon} className={this.props.classNameIcon}/>:null}
                    {this.props.texto}
                </div>
                <div style={this.styleRipple} className="ripple"/>
            </div>
        )
    }
}
