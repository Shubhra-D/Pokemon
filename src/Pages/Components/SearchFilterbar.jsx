import { Box, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const SearchFilterbar = ({
    searchTerm, setSearchTerm,
    selectedTypes, setSelectedTypes,
    types, sortOption, setSortOption,
    itemsPerPage, setItemsPerPage,
    itemsPerPageOptions
  }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} mb={4} justifyContent="center">
      
      {/* Search Input */}
      <TextField
        label="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Type Filter (Multi-select) */}
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Filter by type</InputLabel>
        <Select
          multiple
          value={selectedTypes}
          onChange={(e) => setSelectedTypes(e.target.value)}
          renderValue={(selected) => selected.join(', ')}
        >
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={selectedTypes.includes(type)} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Sort Options */}
      <TextField
        select
        label="Sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="id-asc">ID ↑</MenuItem>
        <MenuItem value="id-desc">ID ↓</MenuItem>
        <MenuItem value="name-asc">Name A-Z</MenuItem>
        <MenuItem value="name-desc">Name Z-A</MenuItem>
      </TextField>

      {/* Items per Page */}
      <TextField
        select
        label="Items per page"
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        sx={{ minWidth: 160 }}
      >
        {itemsPerPageOptions.map((opt) => (
          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
        ))}
      </TextField>
    </Box>
  )
}

export default SearchFilterbar