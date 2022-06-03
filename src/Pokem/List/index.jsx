import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil(pokemons.length / itensPerPage)
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = pokemons.slice(startIndex, endIndex)

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
    <>
    <div>
      <select value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      {Array.from(Array(pages), (item, index) => {
        return <button value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}>{index + 1}</button>
      })}
    </div>
    <ul className="PokemonList">
      {currentItens.map(({ name }) => (
        <li key={name}>
          <Link to={`/pokemons/${name}`}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
    </>
  );
};

export default PokemonList;
