import React, { Component } from 'react'

export default class FiltersOrdersComponent extends Component {
    render() {
        const {vectorClientes,applyFilterByCustomer,applyFilterByState,selectedOrderState}=this.props
        return (
        <div className="row filtersContainer">
            <div className="col-5 filterByConstumer-col  d-flex justify-content-start align-items-center">
            {/* NOTE:Inicio Filtro por cliente */}
                <select onChange={applyFilterByCustomer} id="filterByConstumer" defaultValue={'BuscarPorCliente'}>
                    <option value="BuscarPorCliente" disabled>Buscar por cliente</option>
                    {vectorClientes.map(cliente=><option value={cliente}>{cliente}</option>)}
                    <option value="MostrarTodos">Mostrar todos</option>
                </select>
            {/* FIn Filtro por cliente */}
            </div>

            {/* --------------------------------------------------------------------------------------------------------------------- */}

            {/* NOTE:Inicio Filtro por estado */}
            <div className="col-7 col-stateFilter ">
                <div onClick={applyFilterByState} className="filterBox d-flex justify-content-end align-items-center">
                    
                    {selectedOrderState!==undefined?
                    <div className="d-flex justify-content-end align-items-center">
                        <div className='orderStateCard'>
                            <div className={`stateCircle ${selectedOrderState}`}/>
                        </div>  
                        {selectedOrderState} 
                    </div>
                    : 
                    'Filtrar por estado'}
                    
                    <i className="icon-filterBox icon-filter centerVerticalAndHorizontal"/>
                
                </div>
            </div>
            {/* Fin Filtro por estado */}
        </div>
        )
    }
}