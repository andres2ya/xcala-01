import React, { Component } from 'react'
import './CategoriesHorizontalScrolling.css'

export default class CategoriesHorizontalScrolling extends Component {
    state={
        categories:this.props.categories
    }

    render() {
        return (
            <div className="container-fluid CategoriesHorizontalScrolling">
                <div className="row">
                    <div className="col-12 d-flex align-items-center CategoriesHorizontalScrolling_wrapper">
                        {
                            this.state.categories.map(category=>
                                <div className="CategoriesHorizontalScrolling_categoryCard">
                                    <img
                                    src={category.img}
                                    id={category.nombre}/>
                                    <p>
                                    {category.nombre}
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
