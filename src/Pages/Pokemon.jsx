import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Card, CardContent, Typography,
  TextField, MenuItem, CircularProgress, Button
} from '@mui/material';
import axios from 'axios';

const Pokemon = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const results = await Promise.all(res.data.results.map(p => axios.get(p.url)));
        const pokemonData = results.map(res => ({
          id: res.data.id,
          name: res.data.name,
          image: res.data.sprites.front_default,
          types: res.data.types.map(t => t.type.name),
        }));
        setAllPokemon(pokemonData);
        setTypes(getUniqueTypes(pokemonData));
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = allPokemon.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedType) {
      filtered = filtered.filter(p => p.types.includes(selectedType));
    }
    setFilteredPokemon(filtered);
    setPage(1); // Reset to first page on filter
  }, [searchTerm, selectedType, allPokemon]);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedPokemon(filteredPokemon.slice(startIndex, endIndex));
  }, [filteredPokemon, page]);

  const getUniqueTypes = (pokemonList) => {
    const allTypes = pokemonList.flatMap(p => p.types);
    return [...new Set(allTypes)];
  };

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} textAlign="center" sx={{ color: '#2a75bb' }} fontWeight={'bold'}>
        Pokémon Directory
      </Typography>

      {/* Search & Filter */}
      <Box display="flex" gap={2} mb={4} justifyContent="center" flexWrap="wrap">
        <TextField
          label="Search by name"
          variant="outlined"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <TextField
          select
          label="Filter by type"
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Types</MenuItem>
          {types.map(type => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Loading State */}
      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {/* Empty State */}
      {!loading && filteredPokemon.length === 0 && (
        <Typography textAlign="center" color="text.secondary">
          No Pokémon found.
        </Typography>
      )}

      {/* Pokémon Grid */}
      <Grid container spacing={3}>
        {displayedPokemon.map(pokemon => (
          <Grid item xs={12} sm={6} md={4} margin={3} lg={3} key={pokemon.id}>
            <Card
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
                style={{ height: 100, margin: '0 auto' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                  #{pokemon.id} <span style={{color:"#B9860C"}} >{pokemon.name}</span>
                </Typography>
                <Typography variant="body2">
                  {pokemon.types.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {filteredPokemon.length > itemsPerPage && (
        <Box mt={4} display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={() => setPage(prev => prev - 1)}
            sx={{ backgroundColor: '#3B4CCA' }}
          >
            Previous
          </Button>
          <Typography mt={1.2}>Page {page} of {totalPages}</Typography>
          <Button
            variant="contained"
            disabled={page === totalPages}
            onClick={() => setPage(prev => prev + 1)}
            sx={{ backgroundColor: '#3B4CCA' }}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Pokemon;
