import React, { useEffect, useState, useMemo } from 'react';
import { Box, CircularProgress, Typography, TextField, MenuItem, IconButton } from '@mui/material';
import axios from 'axios';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import PokemonGrid from './Components/PokemonGrid';
import PaginationControls from './Components/PaginationControls';

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];

const Pokemon = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOption, setSortOption] = useState('id-asc');
  const [favorites, setFavorites] = useState([]);

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
        const allTypes = pokemonData.flatMap(p => p.types);
        setTypes([...new Set(allTypes)]);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const addToFavorites = (pokemon) => {
    const updatedFavorites = [...favorites, pokemon];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (pokemonId) => {
    const updatedFavorites = favorites.filter(pokemon => pokemon.id !== pokemonId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const filteredPokemon = useMemo(() => {
    return allPokemon.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      selectedTypes.every(type => p.types.includes(type))
    );
  }, [allPokemon, searchTerm, selectedTypes]);

  const sortedPokemon = useMemo(() => {
    const sorted = [...filteredPokemon];
    if (sortOption === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortOption === 'name-desc') sorted.sort((a, b) => b.name.localeCompare(a.name));
    else if (sortOption === 'id-desc') sorted.sort((a, b) => b.id - a.id);
    else sorted.sort((a, b) => a.id - b.id);
    return sorted;
  }, [filteredPokemon, sortOption]);

  const totalPages = Math.ceil(sortedPokemon.length / itemsPerPage);
  const displayedPokemon = sortedPokemon.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} textAlign="center" fontWeight={'bold'} color="#2a75bb">
        Pokémon Directory
      </Typography>

      {/* Search and Filter */}
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
          value={selectedTypes}
          onChange={e => setSelectedTypes(e.target.value)}
          sx={{ minWidth: 200 }}
          SelectProps={{
            multiple: true
          }}
        >
          {types.map(type => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Sort by"
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="id-asc">ID: Ascending</MenuItem>
          <MenuItem value="id-desc">ID: Descending</MenuItem>
          <MenuItem value="name-asc">Name: A-Z</MenuItem>
          <MenuItem value="name-desc">Name: Z-A</MenuItem>
        </TextField>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center"><CircularProgress /></Box>
      ) : (
        <>
          {/* Pokémon Grid */}
          <PokemonGrid pokemonList={displayedPokemon} favorites={favorites}
  toggleFavorite={(pokemon) =>
    favorites.some(fav => fav.id === pokemon.id)
      ? removeFromFavorites(pokemon.id)
      : addToFavorites(pokemon)
  }/>

          {/* Pagination */}
          <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
        </>
      )}
    </Box>
  );
};

export default Pokemon;
