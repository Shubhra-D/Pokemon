import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({ pokemon, isFavorite, toggleFavorite  }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        backgroundColor: '#EAC49D',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 3,
        borderRadius: 3,
        padding: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          cursor: 'pointer'
        }
      }}
    >
      <Box>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          style={{ height: 100, marginBottom: 12 }}
        />
        <CardContent>
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
            #{pokemon.id} <span style={{ color: "#B9860C" }}>{pokemon.name}</span>
          </Typography>
          <Typography variant="body2">
            {pokemon.types.join(', ')}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PokemonCard;
