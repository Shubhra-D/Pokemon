import "./App.css";
import Navbar from "./Pages/Navbar";
import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { useState } from "react";
import Pokemon from "./Pages/Pokemon";
import { Box } from "@mui/material";

function App() {
  const [user, setUser] = useState(null);

  const handleSignup = (formData) => {
    setUser({ name: formData.name });
  };
  
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#f3eeb6', // soft light yellow
      display: 'flex',
      flexDirection: 'column',
    }}
>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/signup" element={<Signup setUser={setUser} onSignup={handleSignup} />} />
        <Route path="/pokemon" element={<Pokemon />} />
      </Routes>
    </Box>
  );
}

export default App;
