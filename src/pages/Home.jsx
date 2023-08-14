import React, { useEffect, useState } from 'react'
import NavBar from '../components/Nav Bar'
import PokemonCard from '../components/Pokemon Card'
import { Container, Grid } from '@mui/material'
import axios from 'axios'

export const Home = () => {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

const getPokemons = () => {
var endpoints = [];
for (var i = 1; i < 700; i++)  {

  endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)


}

var response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
return response

};


const pokemonFilter =(name) =>{
var filteredPokemons = [];

if (name=== "" ) {

  getPokemons();  

}

for (var i in pokemons ){

  if (pokemons[i].data.name.includes(name)){

    filteredPokemons.push(pokemons[i]);
  }

}
console.log(filteredPokemons);
setPokemons(filteredPokemons);
};
  return (
    <div>
    <NavBar  pokemonFilter={pokemonFilter}/>
    <Container maxWidth="false">
    <Grid  container spacing={4} justifyContent="center">


      
      {pokemons.map((pokemon, key) =>(
        <Grid item xs={12} sm={6} md = {2}key={key} >
        <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_shiny}  types={pokemon.data.types}/>
        </Grid>
))}
 </Grid>
 </Container>
    </div>
  )
}
