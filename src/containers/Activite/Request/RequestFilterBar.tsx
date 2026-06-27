import type IRequestFilterBar from "@/interfaces/containers/Activite/Request/RequestFilterBar"
import type { RequestFilters } from "@/interfaces/containers/Activite/Request/RequestFilters"
import { Box, MenuItem, TextField } from "@mui/material"
import React from "react"
import { statusOptions, typeOptions } from "./const"

const RequestFilterBar = ({ onFilterChange }: IRequestFilterBar) => {
  const [filters, setFilters] = React.useState<RequestFilters>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "2" }}>
      <TextField
        select
        label="Statut"
        name="status"
        value={filters.status || ""}
        onChange={handleChange}
        size="small"
        sx={{ minWidth: 150 }}>
        {statusOptions.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Type"
        name="type"
        value={filters.type || ""}
        onChange={handleChange}
        size="small"
        sx={{ minWidth: 150 }}>
        {typeOptions.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}

export default RequestFilterBar
