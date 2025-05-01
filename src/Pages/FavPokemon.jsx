import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';

const FavPokemon = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(savedFavorites);
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} textAlign="center" fontWeight={'bold'} color="#2a75bb">
        My Favorite Pokémon
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center"><CircularProgress /></Box>
      ) : (
        <>
          {favorites.length === 0 ? (
            <Typography textAlign="center" color="text.secondary">
              No favorites yet. Start adding some!
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {favorites.map(pokemon => (
                <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
                  <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none' }}>
                    <Box
                      sx={{
                        backgroundColor: '#EAC49D',
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 3,
                        borderRadius: 3,
                        padding: 2
                      }}
                    >
                      <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        style={{ height: 100, marginBottom: 12 }}
                      />
                      <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                        #{pokemon.id} <span style={{ color: "#B9860C" }}>{pokemon.name}</span>
                      </Typography>
                      <Favorite color="error" />
                    </Box>
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default FavPokemon;
