import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pikachu from '../../assets/pikachu.gif'
import logo from '../../assets/logo.png'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(8);
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



    <div className='container p-2'>
      <div className='row'>
        <div className='tabela'>
          <Link to="/pokemons/list" className='botao2'><img src={logo} alt="" className='botao m-1' /></Link>
            
            <div className='Nome border'>
              <p>Nomes</p>
            </div>
            <ul className="PokemonList border">
             {currentItens.map(({ name }) => (
             <li key={name}>
             <Link to={`/pokemons/${name}`}>
              {name}
             </Link>
             </li>))}
            </ul>
            <div className='pgs'>
              {Array.from(Array(pages), (item, index) => {
                return <button value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}>{index + 1}</button>
              })}
            </div>
          </div>
        </div>
      </div>

      <img src={pikachu} alt="" className='pikachu'/>
    </>
  );
};

export default PokemonList;
