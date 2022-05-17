import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from 'react';

import getPokemon from '../api/getPokemon';
import getPokemonData from '../api/getPokemonData';

const PokemonContext = createContext(null);

const stateGlobal = {
  pokemon: [],
  page: 0,
  total: 0,
  loading: true,
  search: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setPage':
      return {...state, page: action.payload}
    case 'setLoading':
      return {...state, loading: action.payload}
    case 'setTotal':
      return {...state, total: action.payload}
    case 'setPokemon':
      return {...state, pokemon: action.payload}
    case 'setSearch':
      return {...state, search: action.payload}
    default:
      throw new Error();
  }
};

export const PokemonProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, stateGlobal);
  const AMOUNTPOKEMON = 30;

  const showPokemon = async () => {
    try {
      dispatch({type: 'setLoading', payload: true});
      const data = await getPokemon(AMOUNTPOKEMON, AMOUNTPOKEMON * state.page);
      const promise = data.results.map(async poke => await getPokemonData(poke.url));
      const results = await Promise.all(promise);
      dispatch({type: 'setPokemon', payload: results});
      dispatch({type: 'setTotal', payload: Math.ceil(data.count / AMOUNTPOKEMON)});
      dispatch({type: 'setLoading', payload: false});
    } catch (error) { console.error(error); }
  };

  const seekerPokemon = async () => {
    try {
      dispatch({type: 'setLoading', payload: true});
      const data = await getPokemon(1126);
      const searchPokemon = await data.results.filter(item => item.name.startsWith(state.search));
      const promise = searchPokemon.map(async element => await getPokemonData(element.url));
      let results = await Promise.all(promise);
      // result search transform
      let transforResult = results.slice(AMOUNTPOKEMON * state.page, Math.ceil(results.length * (state.page + 1) / 2.8));
      dispatch({type: 'setPokemon', payload: transforResult});
      dispatch({type: 'setTotal', payload: Math.ceil(results.length / AMOUNTPOKEMON)});
      dispatch({type: 'setLoading', payload: false});
    } catch (error) {console.error(error)}
  };

  useEffect(() => {
    if (state.search?.length > 0){
      seekerPokemon();
    } else { showPokemon(); }
    return () => null;
    // eslint-disable-next-line
  }, [state.page, state.search]);

  const value = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch]);

  return <PokemonContext.Provider value={value} {...props}/>;
}

export function usePokemon() {
  const context = useContext(PokemonContext);
  if (!context) throw new Error('usePokemon debe estar dentro del proveedor PokemonContext');
  return context;
}