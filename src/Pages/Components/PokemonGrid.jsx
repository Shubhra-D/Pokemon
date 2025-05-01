import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
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
    <Box display="flex" flexWrap="wrap" gap={3}>
  {pokemonList.map((pokemon) => (
    <Box key={pokemon.id} flex="1 1 calc(25% - 1.5rem)" minWidth={200}>
      <PokemonCard
        pokemon={pokemon}
        isFavorite={favorites.some(fav => fav.id === pokemon.id)}
        toggleFavorite={toggleFavorite}
      />
    </Box>
  ))}
</Box>
  );
};

export default PokemonGrid;
