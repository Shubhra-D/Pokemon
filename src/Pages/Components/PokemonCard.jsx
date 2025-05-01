import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const PokemonCard = ({ pokemon, isFavorite, toggleFavorite  }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        backgroundColor: '#FFC0CB',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection:"column",
        justifyContent:"space-around",
        boxShadow: 3,
        borderRadius: 3,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          cursor: 'pointer',
          backgroundColor:" #EAC49D"
        }
      }}
    >
      <Box>
        <img src={pokemon.image} alt={pokemon.name}/>
        <CardContent>
          <Typography variant="h6" sx={{ textTransform: 'capitalize',color:"#B9860C" }}>
            {pokemon.id}. <span style={{ color: "#B9860C" ,fontWeight:"bold"}}>{pokemon.name}</span>
          </Typography>
          <Typography variant="body2" sx={{color:"#B9860C",fontWeight:"bold"}}>
            {pokemon.types.join(', ')}
          </Typography>
          {/* Heart Icon to Add/Remove Favorite */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click from firing
          toggleFavorite(pokemon);
        }}
        color={isFavorite ? 'error' : 'default'}
      >
        {isFavorite ? <Favorite /> : <FavoriteBorder/>}
      </IconButton>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PokemonCard;
