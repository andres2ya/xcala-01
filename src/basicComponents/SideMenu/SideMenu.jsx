import React, { Component } from 'react'
import { slideInLeft,slideOutLeft} from 'react-animations';
import Radium, {StyleRoot} from 'radium'
import './SideMenu.css'
import QuickAccessIcons from '../QuickAccessIcons/QuickAccessIcons';
import AdsCard from '../AdsCard/AdsCard';
import AccountOptionBox from '../AccountOptionBox/AccountOptionBox';
import OptionSideMenu from '../OptionSideMenu/OptionSideMenu';

const styles = {
    slideInLeft: {
      animation: 'x 0.8s',
      animationName: Radium.keyframes(slideInLeft, 'slideInLeft'),
      width:'100vw',
    //   display:'flex',
    //   justifyContent:'center'
    },
    slideOutLeft: {
        animation: 'x 0.8s',
        animationName: Radium.keyframes(slideOutLeft, 'slideOutLeft'),
        width:'100vw',
        // display:'flex',
        // justifyContent:'center'
      },
}
export default class SideMenu extends Component {
    state={
        slideIn:'slideInLeft',
    }
    
    cerrarModal=()=>{
        this.setState({slideIn:'slideOutLeft'})
        this.timeOutToggleModal=setTimeout(()=>{
            this.props.toggle()
        },350)
    }

    componentWillUnmount=()=>{
        clearTimeout(this.timeOutToggleModal)
    }

    render() {
        const {slideIn}=this.state
        return (
            <StyleRoot>
            <div style={slideIn==='slideInLeft'?styles.slideInLeft:styles.slideOutLeft} className="animationBox">
            <div className="SideMenu">
                <button onClick={this.cerrarModal}>x</button>
                <QuickAccessIcons
                icons={
                [{url:'google.com.co',icon:'icon-customericon-1',label:'Tus clientes'},
                {url:'google.com.co',icon:'icon-goalicon',label:'Tu meta'},
                {url:'google.com.co',icon:'icon-nequiquickicon',label:'Tu NEQUI'}]}
                />
                <AdsCard
                backgroundColor={'green'}//'green' or 'orange' or 'violet' or 'blue' or 'red'
                text={'Gana el 50% '}
                span={'de tu meta mensual'}
                url={'google.com.co'}
                />
                <OptionSideMenu
                withRightCircle={false}
                number={'10'}
                backgroundCircleColor={'white'}
                icon={'icon-pencilonly'}
                text={'Mis ganancias'}
                url={'google.com.co'}
                />
                <OptionSideMenu
                withRightCircle={false}
                number={'10'}
                backgroundCircleColor={'white'}
                icon={'icon-pencilonly'}
                text={'Mis ganancias'}
                url={'google.com.co'}
                />
                <OptionSideMenu
                withRightCircle={false}
                number={'10'}
                backgroundCircleColor={'white'}
                icon={'icon-pencilonly'}
                text={'Mis ganancias'}
                url={'google.com.co'}
                />
                <OptionSideMenu
                withRightCircle={false}
                number={'10'}
                backgroundCircleColor={'white'}
                icon={'icon-pencilonly'}
                text={'Mis ganancias'}
                url={'google.com.co'}
                />
                <OptionSideMenu
                withRightCircle={false}
                number={'10'}
                backgroundCircleColor={'white'}
                icon={'icon-pencilonly'}
                text={'Mis ganancias'}
                url={'google.com.co'}
                />
                <OptionSideMenu
                withRightCircle={false}
                number={'10'}
                backgroundCircleColor={'white'}
                icon={'icon-pencilonly'}
                text={'Mis ganancias'}
                url={'google.com.co'}
                />
            </div>
            </div>
            </StyleRoot>
        )
    }
}
