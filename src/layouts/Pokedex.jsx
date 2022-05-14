import React from 'react';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import { usePokemon } from '../context/PokemonContext';
import preloader from '../assets/img/preloader.gif';


const Preloader = () => {
  return <div className="preloader">
    <img className="preloader-img" src={preloader} alt="preloader"/>
  </div>
}

export default function Pokedex() {
  const {state} = usePokemon();
  return (
    <div className="pokedex">
      <Pagination />
      <div className="pokedex-wrap">
        { state.loading
        ? <Preloader/>
        : state.pokemon?.length > 0 && state.pokemon.map((item, index) => <Card key={index} item={item} />)
        }
      </div>
    </div>
  )
}
