import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function CurrentFilters() {
  const { filtersUsed } = useContext(AppContext);

  return (
    filtersUsed.map((item) => (
      <div key={ item.column }>
        <p>{ `${item.column} ${item.comparison} ${item.valueCompare}` }</p>
        <button
          type="button"
        >
          X
        </button>
      </div>
    ))
  );
}

export default CurrentFilters;
