import React, {
    useEffect,
    useState,
  } from 'react';
  import { useParams } from 'react-router-dom';
  import './style.css'
  import logo from '../../assets/logo.png'
  import pokemon2 from '../../assets/gif2.gif'
  import { Link } from 'react-router-dom';

  const PokemonView = () => {
    const [pokemon, setPokemon] = useState(null);
    const { name } = useParams();
  
    useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((r) => r.json())
        .then((json) => {
          setPokemon(json);
        });
    }, [name]);
  
    if (!pokemon) {
      return null;
    }
  
    return (
      <div className='container p-2'>
        <div className="row">
          <div className="tabela">
           <Link to="/pokemons/list" className='botao2'><img src={logo} alt="" className='botao m-1' /></Link>
            <div className="PokemonView">
            <p className='nick'>{pokemon.name}</p>
             <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
             Abilities
             <ul className="PokemonView__abilities">
             {pokemon.abilities.map((item) => (
                <li>{item.ability.name}</li>
                  ))}
              </ul>
            </div>
          </div>
          <img src={pokemon2} alt="" className='pokemon2'/>

        </div>
      </div>
    );
  };
  
  export default PokemonView;
  