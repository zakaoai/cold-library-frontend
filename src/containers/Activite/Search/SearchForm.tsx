import type ISearchForm from "@/interfaces/containers/Activite/Search/SearchForm"
import type SearchFormValues from "@/interfaces/containers/Activite/Search/SearchFormValues"
import SearchIcon from "@mui/icons-material/Search"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import { useCallback } from "react"

const SearchForm = ({ searchAnime, form }: ISearchForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form
  const onSubmit = useCallback(
    ({ search }: SearchFormValues) => {
      searchAnime(search)
    },
    [searchAnime]
  )

  const searchInput = register("search", {
    required: "Champs requis",
    minLength: { value: 3, message: "La recherche doit faire 3 caractères minimum" }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label={"Anime à chercher"}
        error={!!errors.search}
        helperText={errors.search?.message || ""}
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
  )
}

export default SearchForm
