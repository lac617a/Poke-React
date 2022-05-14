import React from 'react';
import svgSearch from '../assets/img/pokesearch.svg';
import {usePokemon} from '../context/PokemonContext';

export default function Searchbar() {
  const {state, dispatch} = usePokemon();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({type: 'setSearch', payload: e.target.value});
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <input
        className="form-input"
        placeholder="Buscar pokemon..."
        onChange={onSubmit}
        value={state.search}
        type="text" />
      <button className="btn btn-search" type="submit" onClick={onSubmit}>
        <img src={svgSearch} alt="search"/>
      </button>
    </form>
  )
}
