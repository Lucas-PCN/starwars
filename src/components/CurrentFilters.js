import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function CurrentFilters() {
  const { filtersUsed, handleDeleteFilter } = useContext(AppContext);

  return (
    filtersUsed.map((item) => (
      <div key={ item.column } data-testid="filter">
        <p>{ `${item.column} ${item.comparison} ${item.valueCompare}` }</p>
        <button
          type="button"
          onClick={ () => handleDeleteFilter(item) }
        >
          X
        </button>
      </div>
    ))
  );
}

export default CurrentFilters;
