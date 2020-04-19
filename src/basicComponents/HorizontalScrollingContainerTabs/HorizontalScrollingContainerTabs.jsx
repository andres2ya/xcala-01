import React, { Component } from 'react'
import './HorizontalScrollingContainerTabs.css'


//NOTE: Forma de llamar a este componente
{/* <HorizontalScrollingContainerTabs 
functionSelectTab={this.selectTab} 
selectedTab={this.state.selectedTab} 
tabs={['Juguetes','Ropa','Accesorios','Teteros','Estimulacion temprana','Otros']}/> */}
export default class HorizontalScrollingContainerTabs extends Component {
    state={
        tabs:this.props.tabs
    }

    render() {
        return (
            <div className="container-fluid HorizontalScrollingContainerTabs">
                <div className="row">
                    <div className="col-12 d-flex align-items-end HorizontalScrollingContainerTabs_wrapper">
                        {
                            this.state.tabs.map(tab=>
                                <div
                                id={tab}
                                onClick={(e)=>this.props.functionSelectTab(e,tab)}
                                className={this.props.selectedTab===tab?'HorizontalScrollingContainerTabs_tab_active':'HorizontalScrollingContainerTabs_tab'}>
                                    {tab}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
