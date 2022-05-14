import React, {useState} from 'react';
import '../assets/scss/card.scss';
import pokeballFloat from '../assets/img/pokeball.png';

export default function Card({item}) {
  const [sprite, setSprite] = useState(true);
  let types = item.types.map(item =>  item.type.name);
  types = types.join().replace(',', '-');

  const onMouse = (e) => {
    setSprite(current => !current);
    e.stopPropagation();
  }
  return (
    <div
      className="card-wrap"
      onMouseEnter={onMouse}
      onMouseLeave={onMouse}>
      <div className={`card ${types}`}>
        <div className="card-header">
          <h2>{item.name}</h2>
          <p>#{item.id}</p>
        </div>
        <div className="card-content">
          <img src={pokeballFloat} alt="pokeball" className="img-float" />
          <ul className="card-nav">
            {item.types.map((item, index) => (
              <li key={index} className="card-item">{item.type.name}</li>
            ))}
          </ul>
          <figure className="card-figure">
            <img
              loading="lazy"
              className="card__img"
              src={sprite
                ? item.sprites.front_default
                : item.sprites.back_default
              }
              alt={item.name} />
          </figure>
        </div>
      </div>
    </div>
  )
}
