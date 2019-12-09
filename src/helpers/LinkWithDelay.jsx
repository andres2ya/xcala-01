import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom';

class LinkWithDelay extends Component {

    state={
        redirect:false,
        timeOut:null
    }

    componentWillUnmount() {
        if (this.state.timeOut) {
          clearTimeout(this.state.timeOut);
        }
    }

    runLink=()=>{
        const {delay}=this.props
        this.setState({
            timeout:setTimeout(()=>{
                this.setState({redirect:true})
            },delay)
        })
    }

    render() {
        const props = Object.assign({}, this.props);
        const {to}=this.props
        if(this.state.redirect){
            return <Redirect to={to}/>
        } else{
            delete props.delay;
            delete props.to;
            return (<Link {...props} to='#' onClick={this.runLink}/>)
        }
    }
}

export default LinkWithDelay