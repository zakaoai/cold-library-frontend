/* eslint-disable @typescript-eslint/no-misused-promises */
import type ISearchForm from "@/interfaces/containers/Activite/Search/SearchForm"
import type SearchFormValues from "@/interfaces/containers/Activite/Search/SearchFormValues"
import SearchIcon from "@mui/icons-material/Search"
import { Toolbar } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import { useCallback } from "react"

import useDisplayAnimeFilterBar from "@/components/DisplayAnime/hooks/useDisplayAnimeFilterBar"
import RenderButtons from "@/components/RenderButtons/RenderButtons"

const SearchForm = ({ searchAnime, form }: ISearchForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form
  const onSubmit = useCallback(
    ({ search }: SearchFormValues) => {
      searchAnime({ search, page: undefined })
    },
    [searchAnime]
  )

  const searchInput = register("search", {
    required: "Champs requis",
    minLength: { value: 3, message: "La recherche doit faire 3 caractères minimum" }
  })

  const { handleChangeRenderMode, selectedRenderMode } = useDisplayAnimeFilterBar()

  return (
    <Box mb={1}>
      <AppBar position="relative" color="transparent">
        <Toolbar>
          <Grid container spacing={2} justifyContent="space-between" display={"flex"} size={{ xs: 12 }}>
            <Grid alignItems="center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label={"Anime à chercher"}
                  error={errors.search !== undefined}
                  helperText={errors.search?.message ?? ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton color="primary" type="submit" aria-label="submit" size="large">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    ...searchInput
                  }}
                />
              </form>
            </Grid>
            <Grid container size={{ lg: 6, xs: 12 }} display="flex" justifyContent={"end"}>
              <RenderButtons handleChangeRenderMode={handleChangeRenderMode} selectedRenderMode={selectedRenderMode} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default SearchForm
