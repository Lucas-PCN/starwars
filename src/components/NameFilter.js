import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function NameFilter() {
  const { filterByName: { planetName }, handleName } = useContext(AppContext);

  return (
    <label htmlFor="name-filter">
      Nome do planeta:
      <input
        type="text"
        data-testid="name-filter"
        id="name-filter"
        value={ planetName }
        onChange={ handleName }
      />
    </label>
  );
}

export default NameFilter;
