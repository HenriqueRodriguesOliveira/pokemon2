import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const PokemonList = () => {
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((r) => r.json())
      .then((json) => {
        setPokemons(json.results);
      });
  }, []);

  if (!pokemons) {
    return null;
  }

  return (
    <ul className="PokemonList">
      {pokemons.map(({ name }) => (
        <li key={name}>
          <Link to={`/pokemons/${name}`}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
