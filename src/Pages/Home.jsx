// Home.jsx
import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import homepoke from "../assets/homepoke.gif";
import { linearGradient } from "framer-motion/client";

const Home = ({ user }) => {
  return (
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          p: 4,
            animation: 'fadeIn 1s ease-in',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 }
            }
        }}
      >
        {/* Top Welcome Section */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            sx={{
              color: "#FFCB05",
              fontWeight: "bold",
              textShadow: "2px 2px 5px #2a75bb",
              mb: 2,
            }}
          >
            Welcome {user ? user.name : "to Pokémon World"}!
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "#3B4CCA",
              textShadow: "1px 1px 3px #ffffff",
            }}
          >
            {user
              ? "Ready to catch 'em all?"
              : "Join us on an epic Pokémon adventure!"}
          </Typography>
        </Box>

        {/* Main Content (Grid Left + Right) */}
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Left side: Button */}
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                component={RouterLink}
                to="/pokemon"
                variant="contained"
                size="large"
                sx={{
                  background : 'linear-gradient(to right , rgb(173, 101, 221),rgb(224, 78, 193))',
                  "&:hover": {
                    backgroundColor: "#cc0000",
                    transform: "scale(1.05)",
                  },
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  px: 5,
                  py: 2,
                  borderRadius:"20px",
                  transition: "all 0.3s ease",
                }}
              >
                Start Exploring
              </Button>
            </Box>
          </Grid>

          {/* Right side: Pokémon GIF */}
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                src={homepoke}
                alt="Pokemon Running"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "20px",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default Home;
