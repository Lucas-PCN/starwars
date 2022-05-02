import React from 'react';
import './App.css';
import CurrentFilters from './components/CurrentFilters';
import NameFilter from './components/NameFilter';
import NumberFilter from './components/NumberFilter';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <NameFilter />
      <NumberFilter />
      <CurrentFilters />
      <Table />
    </Provider>
  );
}

export default App;
