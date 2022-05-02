import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [name, setName] = useState('');

  const apiRequest = async () => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const response = await fetch(endpoint);
    const data = await response.json();
    setPlanetsInfo(data.results);
  };

  useEffect(() => {
    apiRequest();
  }, []);

  const handleName = ({ target: { value } }) => {
    setName(value);
  };

  const contextValue = {
    planetsInfo,
    filterByName: {
      name,
    },
    handleName,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
