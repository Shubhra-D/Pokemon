import React from 'react';
import { Grid, Typography } from '@mui/material';
import PokemonCard from './PokemonCard';

const PokemonGrid = ({ pokemonList, favorites, toggleFavorite }) => {
  if (!pokemonList.length) {
    return (
      <Typography textAlign="center" mt={4} color="text.secondary">
        No Pokémon found.
      </Typography>
    );
  }

  return (
    <Grid container gap={3}>
      {pokemonList.map((pokemon) => (
        <Grid key={pokemon.id}>
          <PokemonCard pokemon={pokemon} isFavorite={favorites.some(fav => fav.id === pokemon.id)}
            toggleFavorite={toggleFavorite}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonGrid;
