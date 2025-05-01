import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import { ArrowBackIosSharp } from "@mui/icons-material";

const PokemonDetailed = () => {
  const { id } = useParams(); // Getting the Pokémon ID from the URL
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null); // State for the evolution chain
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        // Fetching basic Pokémon details
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = {
          id: res.data.id,
          name: res.data.name,
          image: res.data.sprites.front_default,
          types: res.data.types.map((t) => t.type.name),
          stats: res.data.stats,
          abilities: res.data.abilities.map((a) => a.ability.name),
          moves: res.data.moves.slice(0, 10).map((m) => m.move.name), // limiting to 10 moves for display
          speciesUrl: res.data.species.url, // Store species URL for evolution data
        };

        // Now fetch the evolution chain data
        const speciesRes = await axios.get(pokemonData.speciesUrl);
        const evolutionChainUrl = speciesRes.data.evolution_chain.url;

        // Fetching evolution chain details
        const evolutionRes = await axios.get(evolutionChainUrl);
        setEvolutionChain(evolutionRes.data.chain);

        setPokemon(pokemonData);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!pokemon) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="#C75820">
          No Pokémon found.
        </Typography>
      </Box>
    );
  }
  const renderEvolutionChain = (chain) => {
    if (!chain) return null;

    return (
      <Box display="flex" gap={2} justifyContent="center" mt={2}>
        <Card
          sx={{
            backgroundColor: "#EAC49D",
            textAlign: "center",
            boxShadow: 3,
            borderRadius: 3,
            padding: 2,
          }}
        >
          <img
            src={
              chain.species.url
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    chain.species.url.split("/")[6]
                  }.png`
                : ""
            }
            alt={chain.species.name}
            style={{ height: 100, marginBottom: 12 }}
          />
          <CardContent>
            <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
              {chain.species.name.charAt(0).toUpperCase() +
                chain.species.name.slice(1)}
            </Typography>
          </CardContent>
        </Card>
        {chain.evolves_to && renderEvolutionChain(chain.evolves_to[0])}{" "}
        {/* Recursively render next stage */}
      </Box>
    );
  };

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        mb={3}
        textAlign="center"
        fontWeight="bold"
        color="#2a75bb"
      >
        My name is{" "}
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Typography>

      {/* Pokémon Card with Image */}
      <Card
        sx={{
          backgroundColor: "#FFC945",
          textAlign: "center",
          boxShadow: 3,
          borderRadius: 3,
          padding: 2,
          color:'beige'
        }}
      >
        <img
          src={pokemon.image}
          alt={pokemon.name}
          style={{ height: 300, marginBottom: 12 }}
        />
        <CardContent>
          <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
            #{pokemon.id}{" "}
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Typography>
          <Typography variant="body1">
            Types: {pokemon.types.join(", ")}
          </Typography>

          {/* Stats Section */}
          <Box mt={2}>
            <Typography variant="h6">Stats:</Typography>
            {pokemon.stats.map((stat) => (
              <Typography key={stat.stat.name} variant="body2">
                {stat.stat.name}: {stat.base_stat}
              </Typography>
            ))}
          </Box>

          {/* Abilities Section */}
          <Box mt={2}>
            <Typography variant="h6">Abilities:</Typography>
            {pokemon.abilities.map((ability) => (
              <Typography key={ability} variant="body2">
                {ability}
              </Typography>
            ))}
          </Box>

          {/* Moves Section */}
          <Box mt={2}>
            <Typography variant="h6">Top Moves:</Typography>
            {pokemon.moves.map((move) => (
              <Typography key={move} variant="body2">
                {move}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Evolution Chain */}
      <Box mt={4}>
        <Typography variant="h6" textAlign={'center'} fontStyle={'italic'}>Evolution Chain:</Typography>
        {renderEvolutionChain(evolutionChain)}
      </Box>
      <Box display="flex" justifyContent="center" margin={4}>
        <Button
          onClick={() => navigate("/pokemon")}
          sx={{ color: "white", backgroundColor: "#EC407A" }}
          startIcon={<ArrowBackIosSharp />}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default PokemonDetailed;
