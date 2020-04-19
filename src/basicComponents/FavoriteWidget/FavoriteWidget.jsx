import React, { Component } from 'react'
import './FavoriteWidget.css'
import noFavoriteIcon from '../../assets/noFavoriteIcon.svg'
import favoriteIcon from '../../assets/favoriteIcon.svg'

export default class FavoriteWidget extends Component {
    state={
        isFavorite:this.props.isFavorite,
        height:this.props.height,
    }

    toggleFavorite=()=>{
        this.setState({
            isFavorite:!this.state.isFavorite
        })
    }
    render() {
        return (
            <div onClick={this.toggleFavorite}>
            {
                this.state.isFavorite===true?
                <img className="shadowCircle" height={this.props.height} src={favoriteIcon} alt=""/>
                :
                <img className="shadowCircle" height={this.props.height} src={noFavoriteIcon} alt=""/>
            }  
            </div>
        )
    }
}
