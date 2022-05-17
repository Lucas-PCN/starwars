import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function NumberFilter() {
  const [column, setColumn] = useState('population');
  const [comparison, setcomparison] = useState('maior que');
  const [valueCompare, setValueCompare] = useState(0);

  const { handleNumber, optionsValue, removeAllFilters,
    columnSort, setColumnSort, sortDirection,
    setSortDirection, sortData } = useContext(AppContext);

  const handleChangeGeneric = ({ target: { name, value } }) => {
    if (name === 'column') {
      setColumn(value);
    } else if (name === 'comparison') {
      setcomparison(value);
    } else {
      setValueCompare(value);
    }
  };

  return (
    <div>
      <label htmlFor="column-filter">
        Coluna:
        {' '}
        <select
          name="column"
          id="column-filter"
          data-testid="column-filter"
          onChange={ handleChangeGeneric }
        >
          {
            optionsValue.map((option, index) => (
              <option key={ index } value={ option }>{ option }</option>
            ))
          }
        </select>
      </label>
      {' '}
      <label htmlFor="column-filter">
        Operador:
        {' '}
        <select
          name="comparison"
          id="column-filter"
          data-testid="comparison-filter"
          onChange={ handleChangeGeneric }
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
      </label>
      {' '}
      <input
        type="number"
        data-testid="value-filter"
        name="valueCompare"
        value={ valueCompare }
        onChange={ handleChangeGeneric }
      />
      {' '}
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          handleNumber({ column, comparison, valueCompare });
        } }
      >
        Filtrar
      </button>
      {' '}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover todos os filtros
      </button>
      {' '}
      <label htmlFor="column-sort">
        Ordenar:
        <select
          name="column-sort"
          id="column-sort"
          data-testid="column-sort"
          value={ columnSort }
          onChange={ (e) => setColumnSort(e.target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <div
        onChange={ (e) => setSortDirection(e.target.value) }
        value={ sortDirection }
      >
        <label htmlFor="ASC">
          ASC
          <input
            type="radio"
            id="ASC"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="DESC">
          DESC
          <input
            type="radio"
            id="DESC"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ sortData }
        >
          Ordenar
        </button>
      </div>
    </div>
  );
}

export default NumberFilter;
