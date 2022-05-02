import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);

  const apiRequest = async () => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const response = await fetch(endpoint);
    const data = await response.json();
    setPlanetsInfo(data.results);
  };

  useEffect(() => {
    apiRequest();
  }, []);

  return (
    <AppContext.Provider value={ planetsInfo }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
