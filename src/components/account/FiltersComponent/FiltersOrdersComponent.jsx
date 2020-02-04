import React, { Component } from 'react'
import './FiltersOrdersComponent.css'

export default class FiltersOrdersComponent extends Component {
    render() {
        const {vectorClientes,applyFilterByCustomer,toggleModal,selectedOrderState}=this.props
        return (
        <div className="row filtersContainer">
            <div className="col-5 d-flex justify-content-start align-items-center">
            {/* NOTE:Inicio Filtro por cliente */}
                <select onChange={applyFilterByCustomer} id="filterByConstumer" defaultValue={'BuscarPorCliente'}>
                    <option value="BuscarPorCliente" disabled>Buscar por cliente</option>
                    {vectorClientes.map(cliente=><option value={cliente.nombre}>{cliente.nombre}</option>)}
                    <option value="MostrarTodos">Mostrar todos</option>
                </select>
            {/* FIn Filtro por cliente */}
            </div>

            {/* --------------------------------------------------------------------------------------------------------------------- */}

            {/* NOTE:Inicio Filtro por estado */}
            <div className="col-7 col-stateFilter ">
                <div onClick={()=>toggleModal('filterByState')} className="filterBox d-flex justify-content-end align-items-center">
                    
                    {selectedOrderState!==undefined?
                    <div className="d-flex justify-content-end align-items-center">
                        <div className='orderStateCard'>
                            <div className={`stateCircle ${selectedOrderState==='Caso abierto'?'Caso-abierto':selectedOrderState}`}/>
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