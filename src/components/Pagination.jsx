import React, {useCallback} from 'react';
import '../assets/scss/pagination.scss';
import svgArrow from '../assets/img/arrow-poke.png';
import { usePokemon } from '../context/PokemonContext';

export default function Pagination() {
  const {state, dispatch} = usePokemon();

  const lastPage = useCallback(() => {
    const last = Math.max(state.page - 1, 0);
    dispatch({type: 'setPage', payload: last});
  }, [state.page, dispatch]);

  const nextPage = useCallback(() => {
    const page = state.page + 1;
    if (state.total >= page + 1) {
      const next = Math.min(page, state.total);
      dispatch({type: 'setPage', payload: next});
    }

  }, [state.page, dispatch, state.total]);

  return (
    <div className="pagination">
      <h1>Pokedex</h1>
      <div className="pagination-group">
        <button onClick={lastPage} className="btn pagination-btn">
          <img className="pagination-img" src={svgArrow} alt="arrow-left" />
        </button>
        <p>{state.page + 1} de {state.total}</p>
        <button onClick={nextPage} className="btn pagination-btn">
          <img className="pagination-img right" src={svgArrow} alt="arrow-left" />
        </button>
      </div>
    </div>
  )
}
