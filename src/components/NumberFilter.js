import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function NumberFilter() {
  const [column, setColumn] = useState('population');
  const [comparison, setcomparison] = useState('maior que');
  const [valueCompare, setValueCompare] = useState(0);

  const { handleNumber, optionsValue } = useContext(AppContext);

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
    </div>
  );
}

export default NumberFilter;
