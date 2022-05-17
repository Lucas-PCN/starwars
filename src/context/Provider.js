import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Provider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [planetsFiltered, setPlanetsFiltered] = useState([]);
  const [planetName, setPlanetName] = useState('');
  const [filtersUsed, setFiltersUsed] = useState([]);
  const [optionsValue, setOptionsValue] = useState(OPTIONS);

  const apiRequest = async () => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const response = await fetch(endpoint);
    const data = await response.json();
    setPlanetsInfo(data.results);
    setPlanetsFiltered(data.results);
  };

  useEffect(() => {
    apiRequest();
  }, []);

  const handleName = ({ target: { value } }) => {
    setPlanetName(value);

    if (value.length === 0) {
      setPlanetsFiltered(planetsInfo);
    } else {
      const valueToLower = value.toLowerCase();
      const planetsFilteredByName = planetsInfo.filter(
        (planet) => planet.name.toLowerCase().includes(valueToLower),
      );
      setPlanetsFiltered(planetsFilteredByName);
    }
  };

  const handleNumber = ({ column, comparison, valueCompare }) => {
    setFiltersUsed((prevState) => [...prevState, { column, comparison, valueCompare }]);
    const optionsFiltered = optionsValue.filter((item) => item !== column);
    setOptionsValue(optionsFiltered);

    if (comparison === 'maior que') {
      const filteredArray = planetsFiltered.filter(
        (item) => Number(item[column]) > Number(valueCompare),
      );
      setPlanetsFiltered(filteredArray);
    } else if (comparison === 'menor que') {
      const filteredArray = planetsFiltered.filter(
        (item) => Number(item[column]) < Number(valueCompare),
      );
      setPlanetsFiltered(filteredArray);
    } else {
      const filteredArray = planetsFiltered.filter(
        (item) => Number(item[column]) === Number(valueCompare),
      );
      setPlanetsFiltered(filteredArray);
    }
  };

  const handleDeleteFilter = (removedFilter) => {
    const newFilters = filtersUsed.filter((filter) => filter !== removedFilter);
    setFiltersUsed(newFilters);
    setOptionsValue(optionsValue.concat(removedFilter.column));
    let planets = planetsInfo;
    newFilters.forEach(({ column, comparison, valueCompare }) => {
      planets = planetsInfo.filter((planet) => {
        if (comparison === 'maior que') {
          return Number(planet[column]) > Number(valueCompare);
        } if (comparison === 'menor que') {
          return Number(planet[column]) < Number(valueCompare);
        }
        return Number(planet[column]) === Number(valueCompare);
      });
    });
    setPlanetsFiltered(planets);
  };

  const removeAllFilters = () => {
    setFiltersUsed([]);
    setOptionsValue(OPTIONS);
    setPlanetsFiltered(planetsInfo);
  };

  const contextValue = {
    planetsFiltered,
    filterByName: {
      planetName,
    },
    handleName,
    handleNumber,
    handleDeleteFilter,
    removeAllFilters,
    filtersUsed,
    optionsValue,
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
