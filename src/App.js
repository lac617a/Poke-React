import React from 'react';
import './assets/scss/app.scss';
import Searchbar from './components/Searchbar';
import Header from './layouts/Header';
import Pokedex from './layouts/Pokedex';
import {PokemonProvider} from './context/PokemonContext';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <PokemonProvider>
          <Searchbar />
          <Pokedex />
        </PokemonProvider>
      </div>
    </div>
  );
}

export default App;
